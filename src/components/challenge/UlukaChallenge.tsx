import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AppView, ChallengeCase, ChallengeBoardNode, ChallengeBoardEdge, ChallengeResult, ChallengeEntity } from '../../types';
import { ALL_CHALLENGE_CASES, getCaseById } from '../../data/cases';
import { generateSeed, generatePlaythrough, evaluateInvestigation } from '../../utils/challengeEngine';
import { InvestigationBoard } from './InvestigationBoard';
import { ClueInspector } from './ClueInspector';
import { AccusationModal } from './AccusationModal';
import { PauseModal } from './PauseModal';
import { AfkModal } from './AfkModal';
import { CaseSelectorModal } from './CaseSelectorModal';
import { ResultScreen } from './ResultScreen';
import { 
  ArrowLeft, 
  Clock, 
  Pause, 
  ShieldAlert, 
  FolderKanban, 
  Shuffle, 
  Copy, 
  Check, 
  Play
} from 'lucide-react';

interface UlukaChallengeProps {
  onNavigate: (view: AppView) => void;
}

export const UlukaChallenge: React.FC<UlukaChallengeProps> = ({ onNavigate }) => {
  // Case & playthrough configuration
  const [activeCaseId, setActiveCaseId] = useState<string>('ULK-001');
  const [currentSeed, setCurrentSeed] = useState<string>(() => generateSeed());
  const [currentCase, setCurrentCase] = useState<ChallengeCase>(() => {
    return generatePlaythrough(getCaseById('ULK-001'), currentSeed);
  });

  // Billboard state
  const [boardNodes, setBoardNodes] = useState<ChallengeBoardNode[]>([]);
  const [boardEdges, setBoardEdges] = useState<ChallengeBoardEdge[]>([]);

  // Modals and UI state
  const [stage, setStage] = useState<'BRIEFING' | 'PLAYING' | 'RESULTS'>('BRIEFING');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isAfk, setIsAfk] = useState<boolean>(false);
  const [showAccusationModal, setShowAccusationModal] = useState<boolean>(false);
  const [showCaseSelectorModal, setShowCaseSelectorModal] = useState<boolean>(false);
  const [seedCopied, setSeedCopied] = useState<boolean>(false);

  // Time tracking & AFK state
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const lastActivityRef = useRef<number>(Date.now());

  // Result state
  const [finalResult, setFinalResult] = useState<ChallengeResult | null>(null);

  // Reset or start a new game configuration
  const initializeGame = useCallback((caseId: string, newSeed: string) => {
    const baseCase = getCaseById(caseId);
    const randomized = generatePlaythrough(baseCase, newSeed);
    setActiveCaseId(caseId);
    setCurrentSeed(newSeed);
    setCurrentCase(randomized);

    // Initial starting nodes on billboard (first 2 suspects to anchor investigation)
    const initialNodes: ChallengeBoardNode[] = randomized.suspects.slice(0, 2).map((s, idx) => ({
      id: s.id,
      label: s.name,
      type: 'SUSPECT',
      description: `${s.role} (${s.alias || 'Suspect'})`,
      x: 60 + (idx * 240),
      y: 60
    }));

    setBoardNodes(initialNodes);
    setBoardEdges([]);
    setElapsedSeconds(0);
    setIsPaused(false);
    setIsAfk(false);
    setFinalResult(null);
    lastActivityRef.current = Date.now();
    setStage('PLAYING');
  }, []);

  // Track user activity to reset AFK timer
  const recordActivity = useCallback(() => {
    lastActivityRef.current = Date.now();
    if (isAfk) {
      setIsAfk(false);
    }
  }, [isAfk]);

  // Global event listener for activity
  useEffect(() => {
    const handleGlobalInteraction = () => {
      recordActivity();
    };

    window.addEventListener('mousemove', handleGlobalInteraction);
    window.addEventListener('keydown', handleGlobalInteraction);
    window.addEventListener('touchstart', handleGlobalInteraction);
    window.addEventListener('mousedown', handleGlobalInteraction);

    return () => {
      window.removeEventListener('mousemove', handleGlobalInteraction);
      window.removeEventListener('keydown', handleGlobalInteraction);
      window.removeEventListener('touchstart', handleGlobalInteraction);
      window.removeEventListener('mousedown', handleGlobalInteraction);
    };
  }, [recordActivity]);

  // Accurate game timer and AFK countdown (5 mins = 300s)
  useEffect(() => {
    if (stage !== 'PLAYING' || isPaused || isAfk) return;

    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);

      // Check AFK condition (5 minutes without user activity)
      const inactiveMs = Date.now() - lastActivityRef.current;
      if (inactiveMs >= 300_000) {
        setIsAfk(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [stage, isPaused, isAfk]);

  // Copy seed to clipboard
  const handleCopySeed = () => {
    recordActivity();
    navigator.clipboard.writeText(currentSeed);
    setSeedCopied(true);
    setTimeout(() => setSeedCopied(false), 2000);
  };

  // Switch to another case
  const handleSelectCase = (caseId: string) => {
    recordActivity();
    initializeGame(caseId, generateSeed());
  };

  // Randomize current case replay
  const handlePlayAgain = () => {
    recordActivity();
    initializeGame(activeCaseId, generateSeed());
  };

  // Pick a totally random case from the 5 available
  const handleRandomCase = () => {
    recordActivity();
    const otherCases = ALL_CHALLENGE_CASES.filter(c => c.id !== activeCaseId);
    const chosen = otherCases[Math.floor(Math.random() * otherCases.length)] || ALL_CHALLENGE_CASES[0];
    initializeGame(chosen.id, generateSeed());
  };

  // Clue actions
  const handleToggleReview = (clueId: string) => {
    recordActivity();
    setCurrentCase(prev => ({
      ...prev,
      clues: prev.clues.map(c => c.id === clueId ? { ...c, isReviewed: !c.isReviewed } : c)
    }));
  };

  const handleToggleDiscard = (clueId: string) => {
    recordActivity();
    setCurrentCase(prev => ({
      ...prev,
      clues: prev.clues.map(c => c.id === clueId ? { ...c, isDiscarded: !c.isDiscarded } : c)
    }));
  };

  const handleUpdateNotes = (clueId: string, notes: string) => {
    recordActivity();
    setCurrentCase(prev => ({
      ...prev,
      clues: prev.clues.map(c => c.id === clueId ? { ...c, userNotes: notes } : c)
    }));
  };

  const handleAddEntityToBoard = (entity: ChallengeEntity) => {
    recordActivity();
    if (boardNodes.some(n => n.id === entity.id)) return;

    const currentCount = boardNodes.length;
    const col = currentCount % 4;
    const row = Math.floor(currentCount / 4);

    const newNode: ChallengeBoardNode = {
      id: entity.id,
      label: entity.label,
      type: entity.type,
      description: entity.description,
      x: Math.min(650, 40 + (col * 220)),
      y: Math.min(380, 180 + (row * 100))
    };

    setBoardNodes(prev => [...prev, newNode]);
  };

  // Board actions
  const handleAddBoardNode = (node: ChallengeBoardNode) => {
    recordActivity();
    if (boardNodes.some(n => n.id === node.id)) return;
    setBoardNodes(prev => [...prev, node]);
  };

  const handleRemoveBoardNode = (nodeId: string) => {
    recordActivity();
    setBoardNodes(prev => prev.filter(n => n.id !== nodeId));
    setBoardEdges(prev => prev.filter(e => e.source !== nodeId && e.target !== nodeId));
  };

  const handleUpdateNodePosition = (nodeId: string, x: number, y: number) => {
    setBoardNodes(prev => prev.map(n => n.id === nodeId ? { ...n, x, y } : n));
  };

  const handleAddBoardEdge = (source: string, target: string, label: string) => {
    recordActivity();
    const newEdge: ChallengeBoardEdge = {
      id: `EDGE_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      source,
      target,
      label
    };
    setBoardEdges(prev => [...prev, newEdge]);
  };

  const handleRemoveBoardEdge = (edgeId: string) => {
    recordActivity();
    setBoardEdges(prev => prev.filter(e => e.id !== edgeId));
  };

  // Final Accusation Submission
  const handleSubmitAccusation = (suspectId: string, statement: string) => {
    recordActivity();
    const result = evaluateInvestigation(
      currentCase,
      suspectId,
      currentCase.clues,
      boardNodes,
      boardEdges,
      elapsedSeconds,
      statement
    );

    setFinalResult(result);
    setShowAccusationModal(false);
    setStage('RESULTS');
  };

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col">
      {/* Top Application Bar */}
      <header className="border-b border-slate-800 bg-[#0B0F19]/90 backdrop-blur sticky top-0 z-30 px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Navigation & Case Switcher */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('landing')}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">DASHBOARD</span>
            </button>

            <span className="text-slate-700">|</span>

            <button
              onClick={() => { recordActivity(); setShowCaseSelectorModal(true); }}
              className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-cyan-300 font-bold transition-colors"
            >
              <FolderKanban className="w-3.5 h-3.5 text-cyan-400" />
              <span className="truncate max-w-[140px] sm:max-w-[220px]">{currentCase.id}: {currentCase.title}</span>
            </button>
          </div>

          {/* Center: Live Timer & Controls */}
          {stage === 'PLAYING' && (
            <div className="flex items-center gap-3 font-mono">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-950 border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-xs text-slate-400">TIME</span>
                <span className="text-sm font-bold text-white tracking-widest">{timeDisplay}</span>
              </div>

              <button
                onClick={() => setIsPaused(true)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Pause Investigation"
              >
                <Pause className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Right: Seed & Final Accusation */}
          <div className="flex items-center gap-2.5">
            {/* Seed badge */}
            <button
              onClick={handleCopySeed}
              className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] font-mono text-slate-400 hover:text-slate-200 transition-colors"
              title="Copy Playthrough Seed"
            >
              <span>SEED: {currentSeed}</span>
              {seedCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>

            {stage === 'PLAYING' && (
              <button
                onClick={() => { recordActivity(); setShowAccusationModal(true); }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-amber-500/20 animate-pulse"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>FINAL ACCUSATION</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Mode View */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {/* BRIEFING STAGE */}
        {stage === 'BRIEFING' && (
          <div className="max-w-3xl mx-auto py-8">
            <div className="rounded-2xl border-2 border-cyan-500/40 bg-[#0B0F19] p-6 sm:p-8 shadow-2xl text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4">
                <FolderKanban className="w-8 h-8" />
              </div>

              <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider mb-2 inline-block">
                CASE {currentCase.id} • {currentCase.difficulty} DIFFICULTY
              </span>

              <h1 className="text-2xl sm:text-4xl font-black text-white mb-2">
                {currentCase.title}
              </h1>
              <p className="text-sm font-semibold text-amber-300 mb-6 font-mono">
                {currentCase.subtitle} // {currentCase.category}
              </p>

              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs text-slate-200 leading-relaxed mb-6 space-y-3 font-sans shadow-inner">
                <p>{currentCase.briefing}</p>
                <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-amber-200 font-mono text-[11px]">
                  <strong>INVESTIGATION MISSION:</strong> {currentCase.targetQuestion}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left text-xs font-mono">
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-950">
                  <span className="text-slate-500 block mb-0.5">SUSPECTS</span>
                  <span className="font-bold text-white">{currentCase.suspects.length} Identified Persons</span>
                </div>
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-950">
                  <span className="text-slate-500 block mb-0.5">EVIDENCE LEADS</span>
                  <span className="font-bold text-white">{currentCase.clues.length} Telemetry & Forensics</span>
                </div>
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-950">
                  <span className="text-slate-500 block mb-0.5">INVESTIGATION TYPE</span>
                  <span className="font-bold text-white">Manual Dot Connecting</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => initializeGame(activeCaseId, currentSeed)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm transition-all shadow-xl shadow-amber-500/25"
                >
                  <Play className="w-4 h-4" />
                  <span>START INVESTIGATION</span>
                </button>

                <button
                  onClick={() => setShowCaseSelectorModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-800 transition-colors"
                >
                  <Shuffle className="w-4 h-4" />
                  <span>CHOOSE ANOTHER CASE</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ACTIVE PLAYING STAGE */}
        {stage === 'PLAYING' && (
          <div className="space-y-6">
            {/* Billboard Canvas (Player Connects the Dots) */}
            <section>
              <InvestigationBoard
                nodes={boardNodes}
                edges={boardEdges}
                onAddNode={handleAddBoardNode}
                onRemoveNode={handleRemoveBoardNode}
                onUpdateNodePosition={handleUpdateNodePosition}
                onAddEdge={handleAddBoardEdge}
                onRemoveEdge={handleRemoveBoardEdge}
                onUserActivity={recordActivity}
              />
            </section>

            {/* Evidence Clue Inspector */}
            <section>
              <ClueInspector
                clues={currentCase.clues}
                boardNodes={boardNodes}
                onToggleReview={handleToggleReview}
                onToggleDiscard={handleToggleDiscard}
                onUpdateNotes={handleUpdateNotes}
                onAddEntityToBoard={handleAddEntityToBoard}
                onUserActivity={recordActivity}
              />
            </section>
          </div>
        )}

        {/* RESULTS STAGE */}
        {stage === 'RESULTS' && finalResult && (
          <ResultScreen
            result={finalResult}
            onPlayAgain={handlePlayAgain}
            onPlayAnotherCase={() => setShowCaseSelectorModal(true)}
            onNavigate={onNavigate}
          />
        )}
      </main>

      {/* Modals */}
      <AccusationModal
        currentCase={currentCase}
        isOpen={showAccusationModal}
        onClose={() => setShowAccusationModal(false)}
        onSubmitAccusation={handleSubmitAccusation}
        onUserActivity={recordActivity}
      />

      <PauseModal
        isOpen={isPaused}
        onResume={() => { recordActivity(); setIsPaused(false); }}
      />

      <AfkModal
        isOpen={isAfk}
        onContinue={() => { recordActivity(); setIsAfk(false); }}
      />

      <CaseSelectorModal
        isOpen={showCaseSelectorModal}
        activeCaseId={activeCaseId}
        onClose={() => setShowCaseSelectorModal(false)}
        onSelectCase={handleSelectCase}
        onRandomCase={handleRandomCase}
      />
    </div>
  );
};
