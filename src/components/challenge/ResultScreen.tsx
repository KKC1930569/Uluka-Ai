import React from 'react';
import { ChallengeResult, AppView } from '../../types';
import { 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  FileText, 
  Lightbulb, 
  ShieldCheck,
  FolderKanban
} from 'lucide-react';

interface ResultScreenProps {
  result: ChallengeResult;
  onPlayAgain: () => void;
  onPlayAnotherCase: () => void;
  onNavigate: (view: AppView) => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  onPlayAgain,
  onPlayAnotherCase,
  onNavigate
}) => {
  const minutes = Math.floor(result.timeSpentSeconds / 60);
  const seconds = result.timeSpentSeconds % 60;
  const timeFormatted = `${minutes}m ${seconds.toString().padStart(2, '0')}s`;

  // Safely clamp confidence to 0 - 100
  const clampedConfidence = Math.max(0, Math.min(100, Math.round(result.finalConfidence)));
  const clampedQuality = Math.max(0, Math.min(100, Math.round(result.investigationQuality)));

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6">
      {/* Outcome Banner */}
      <div className={`rounded-2xl border-2 p-6 sm:p-8 text-center shadow-2xl mb-8 ${
        result.isCorrect
          ? 'border-emerald-500/60 bg-gradient-to-b from-emerald-950/40 to-[#0B0F19]'
          : 'border-rose-500/60 bg-gradient-to-b from-rose-950/40 to-[#0B0F19]'
      }`}>
        <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mx-auto mb-4 ${
          result.isCorrect
            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
            : 'bg-rose-500/15 border-rose-500/30 text-rose-400'
        }`}>
          {result.isCorrect ? <ShieldCheck className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
        </div>

        <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 block mb-1">
          CASE FILE SEALED // {result.caseId}
        </span>

        <h1 className="text-2xl sm:text-4xl font-black text-white mb-2">
          {result.isCorrect ? 'ACCUSATION VERIFIED // CULPRIT IDENTIFIED' : 'MISIDENTIFICATION // CHARGES DISMISSED'}
        </h1>

        <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
          You accused <strong className="text-white">{result.selectedSuspectName}</strong>.{' '}
          {result.isCorrect 
            ? 'The evidence trail directly corroborates this indictment beyond reasonable doubt.' 
            : `Forensic audit confirms ${result.selectedSuspectName} is not the perpetrator. The actual culprit was ${result.correctSuspectName}.`}
        </p>

        {/* Primary Scores Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-6 text-left">
          <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/80">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">FINAL CONFIDENCE</span>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-black font-mono ${
                result.isCorrect ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {clampedConfidence}
              </span>
              <span className="text-xs font-mono text-slate-500">/ 100</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className={`h-full rounded-full ${result.isCorrect ? 'bg-emerald-400' : 'bg-rose-400'}`}
                style={{ width: `${clampedConfidence}%` }}
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/80">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">INVESTIGATION QUALITY</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black font-mono text-cyan-400">
                {clampedQuality}
              </span>
              <span className="text-xs font-mono text-slate-500">/ 100</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full rounded-full bg-cyan-400"
                style={{ width: `${clampedQuality}%` }}
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/80">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">TIME SPENT</span>
            <div className="text-lg font-black font-mono text-white truncate mt-1">
              {timeFormatted}
            </div>
            <span className="text-[10px] font-mono text-slate-500 block mt-1">Active Duration</span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/80">
            <span className="text-[10px] font-mono text-slate-400 block mb-1">EVIDENCE COVERAGE</span>
            <div className="text-lg font-black font-mono text-amber-400 mt-1">
              {result.keyLeadsIdentifiedCount} / {result.totalKeyLeadsCount} Leads
            </div>
            <span className="text-[10px] font-mono text-slate-500 block mt-1">
              {result.boardNodesCount} Nodes • {result.boardEdgesCount} Links
            </span>
          </div>
        </div>

        {/* Quality Assessment Insight */}
        <div className="text-xs font-mono text-slate-400 bg-slate-950/90 p-3 rounded-xl border border-slate-800/80 max-w-2xl mx-auto">
          {clampedQuality >= 80 ? (
            <span className="text-emerald-300">
              ★ Exceptional Investigative Quality: You conducted extensive clue reviews and assembled a comprehensive relationship billboard.
            </span>
          ) : clampedQuality >= 50 ? (
            <span className="text-cyan-300">
              ◆ Solid Field Analysis: You gathered key evidence pieces, though some supporting connections remained unexplored.
            </span>
          ) : (
            <span className="text-amber-300">
              ▲ Speculative Accusation: Your conclusion relied on minimal verified billboard connections and clue reviews.
            </span>
          )}
        </div>
      </div>

      {/* Case Solution & Forensic Explanation */}
      <div className="rounded-2xl border border-slate-800 bg-[#0B0F19] p-6 sm:p-8 shadow-xl mb-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
            <FileText className="w-4 h-4" />
            <span>OFFICIAL INVESTIGATION DEBRIEF // THE TRUE CHAIN OF EVENTS</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
            {result.explanation}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>KEY EVIDENCE THAT PINNED THE CULPRIT</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
            {result.keyEvidenceSummary}
          </p>
        </div>

        {result.trapExplanation && (
          <div className="rounded-xl border border-amber-500/40 bg-gradient-to-b from-[#1c1626] to-[#0f0d18] p-5 shadow-inner">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold font-mono mb-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>THE RED HERRING TRAP // WHY NOVICE INVESTIGATORS GET MISLED</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              {result.trapExplanation}
            </p>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-amber-950 text-center">
              <p className="text-xs font-semibold text-amber-300 italic">
                "Good investigators don't just find connections. They question them."
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Replay & Navigation Controls */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onPlayAgain}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-amber-500/20"
        >
          <RotateCcw className="w-4 h-4" />
          <span>PLAY AGAIN (NEW RANDOM CONFIG)</span>
        </button>

        <button
          onClick={onPlayAnotherCase}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-cyan-600/20"
        >
          <FolderKanban className="w-4 h-4" />
          <span>PLAY ANOTHER CASE (5 AVAILABLE)</span>
        </button>

        <button
          onClick={() => onNavigate('landing')}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-800 transition-colors"
        >
          <span>RETURN TO DASHBOARD</span>
        </button>
      </div>
    </div>
  );
};
