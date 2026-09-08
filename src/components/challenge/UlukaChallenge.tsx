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

  // Combine allEntities and suspects into availableEntities for the Add Node modal
  const availableEntities: ChallengeEntity[] = React.useMemo(() => {
    const list: ChallengeEntity[] = [...(currentCase.allEntities || [])];
    const existingIds = new Set(list.map(e => e.id));
    if (currentCase.suspects) {
      for (const s of currentCase.suspects) {
        if (!existingIds.has(s.id)) {
          list.push({
            id: s.id,
            label: s.name,
            type: 'SUSPECT',
            description: `${s.role}${s.background ? ' • ' + s.background : ''}`
          });
          existingIds.add(s.id);
        }
      }
    }
    return list;
  }, [currentCase]);

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
      x: 30 + (idx * 190),
      y: 40
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

  // Global event listener for activity (including touch events for mobile)
  useEffect(() => {
    const handleGlobalInteraction = () => {
      recordActivity();
    };

    window.addEventListener('mousemove', handleGlobalInteraction);
    window.addEventListener('keydown', handleGlobalInteraction);
    window.addEventListener('touchstart', handleGlobalInteraction);
    window.addEventListener('touchmove', handleGlobalInteraction);
    window.addEventListener('mousedown', handleGlobalInteraction);

    return () => {
      window.removeEventListener('mousemove', handleGlobalInteraction);
      window.removeEventListener('keydown', handleGlobalInteraction);
      window.removeEventListener('touchstart', handleGlobalInteraction);
      window.removeEventListener('touchmove', handleGlobalInteraction);
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
    const col = currentCount % 3;
    const row = Math.floor(currentCount / 3);

    const newNode: ChallengeBoardNode = {
      id: entity.id,
      label: entity.label,
      type: entity.type,
      description: entity.description,
      x: Math.min(500, 20 + (col * 180)),
      y: Math.min(340, 160 + (row * 90))
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
    <div className="min-h-screen bg-[#070A12] text-slate-100 flex flex-col overflow-x-hidden">
      {/* Top Application Bar - responsive layout without overflowing */}
      <header className="border-b border-slate-800 bg-[#0B0F19]/95 backdrop-blur sticky top-0 z-30 px-2.5 sm:px-6 py-2 sm:py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Navigation & Case Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
            <button
              onClick={() => onNavigate('landing')}
              className="inline-flex items-center gap-1 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors shrink-0 p-1 rounded-lg"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span className="hidden md:inline">DASHBOARD</span>
            </button>

            <span className="text-slate-700 hidden sm:inline">|</span>

            <button
              onClick={() => { recordActivity(); setShowCaseSelectorModal(true); }}
              className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] sm:text-xs font-mono text-cyan-300 font-bold transition-colors truncate max-w-[130px] sm:max-w-[240px]"
            >
              <FolderKanban className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{currentCase.id}: {currentCase.title}</span>
            </button>
          </div>

          {/* Right: Live Timer, Pause, and Final Accusation */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {stage === 'PLAYING' && (
              <>
                <div className="flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-bold text-white tracking-wider">{timeDisplay}</span>
                </div>

                <button
                  onClick={() => setIsPaused(true)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="Pause Investigation"
                  aria-label="Pause Investigation"
                >
                  <Pause className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => { recordActivity(); setShowAccusationModal(true)} }
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold text-[11px] sm:text-xs transition-all shadow-md shadow-amber-500/20 animate-pulse"
                >
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline">FINAL ACCUSATION</span>
                  <span className="sm:hidden">ACCUSE</span>
                </button>
              </>
            )}

            {/* Seed badge (visible on tablet/desktop) */}
            <button
              onClick={handleCopySeed}
              className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] font-mono text-slate-400 hover:text-slate-200 transition-colors"
              title="Copy Playthrough Seed"
            >
              <span>SEED: {currentSeed}</span>
              {seedCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Mode View */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 lg:p-6 overflow-x-hidden">
        {/* BRIEFING STAGE */}
        {stage === 'BRIEFING' && (
          <div className="max-w-3xl mx-auto py-4 sm:py-8">
            <div className="rounded-2xl border border-cyan-500/40 bg-[#0B0F19] p-4 sm:p-8 shadow-2xl text-center mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-3 sm:mb-4">
                <FolderKanban className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>

              <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider mb-2 inline-block">
                CASE {currentCase.id} • {currentCase.difficulty} DIFFICULTY
              </span>

              <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-white mb-1.5">
                {currentCase.title}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-amber-300 mb-4 sm:mb-6 font-mono">
                {currentCase.subtitle} // {currentCase.category}
              </p>

              <div className="p-3.5 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs text-slate-200 leading-relaxed mb-4 sm:mb-6 space-y-3 font-sans shadow-inner">
                <p>{currentCase.briefing}</p>
                <div className="p-2.5 sm:p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-amber-200 font-mono text-[11px]">
                  <strong className="text-amber-300">INVESTIGATION MISSION:</strong> {currentCase.targetQuestion}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-6 sm:mb-8 text-left text-xs font-mono">
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

              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center">
                <button
                  onClick={() => initializeGame(activeCaseId, currentSeed)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm transition-all shadow-xl shadow-amber-500/25"
                >
                  <Play className="w-4 h-4" />
                  <span>START INVESTIGATION</span>
                </button>

                <button
                  onClick={() => setShowCaseSelectorModal(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-800 transition-colors"
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
          <div className="space-y-4 sm:space-y-6">
            {/* Active Case Full Description Banner (Untruncated, PC & Mobile) */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-lg backdrop-blur-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800/80 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {currentCase.id}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    {currentCase.category}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                    {currentCase.difficulty}
                  </span>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                  <span>SEED:</span>
                  <span className="text-amber-400">{currentSeed}</span>
                </div>
              </div>
              
              <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
                {currentCase.title}
              </h2>
              <p className="text-sm font-medium text-amber-300/90 mb-3">
                {currentCase.subtitle}
              </p>

              <div className="bg-slate-950/60 rounded-lg p-3.5 border border-slate-800/60 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line mb-3">
                {currentCase.briefing}
              </div>

              <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-xs sm:text-sm text-amber-200">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-300">Target Question: </span>
                  <span>{currentCase.targetQuestion}</span>
                </div>
              </div>
            </div>

            {/* Billboard Canvas (Player Connects the Dots) */}
            <section>
              <InvestigationBoard
                nodes={boardNodes}
                edges={boardEdges}
                availableEntities={availableEntities}
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
