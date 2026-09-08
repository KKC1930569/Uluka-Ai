import React from 'react';
import { ALL_CHALLENGE_CASES } from '../../data/cases';
import { FolderKanban, Shuffle, X, ChevronRight } from 'lucide-react';

interface CaseSelectorModalProps {
  isOpen: boolean;
  activeCaseId: string;
  onClose: () => void;
  onSelectCase: (caseId: string) => void;
  onRandomCase: () => void;
}

const DIFFICULTY_BADGES: Record<string, { bg: string; text: string }> = {
  EASY: { bg: 'bg-emerald-950 border-emerald-800', text: 'text-emerald-300' },
  MEDIUM: { bg: 'bg-amber-950 border-amber-800', text: 'text-amber-300' },
  HARD: { bg: 'bg-orange-950 border-orange-800', text: 'text-orange-300' },
  EXPERT: { bg: 'bg-rose-950 border-rose-800', text: 'text-rose-300' }
};

export const CaseSelectorModal: React.FC<CaseSelectorModalProps> = ({
  isOpen,
  activeCaseId,
  onClose,
  onSelectCase,
  onRandomCase
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1.5">
          <FolderKanban className="w-4 h-4" />
          <span>CASE REGISTRY // 5 PLAYABLE SCENARIOS</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
          SELECT AN INVESTIGATION CASE
        </h2>

        <p className="text-xs text-slate-400 mb-5">
          Each scenario features distinct suspects, forensic evidence feeds, red herrings, and solvable solution paths.
        </p>

        <div className="mb-4">
          <button
            onClick={() => { onRandomCase(); onClose(); }}
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-xs transition-all shadow-md shadow-amber-500/20"
          >
            <Shuffle className="w-4 h-4" />
            <span>PICK A RANDOM CASE & PLAY</span>
          </button>
        </div>

        <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
          {ALL_CHALLENGE_CASES.map(c => {
            const isCurrent = c.id === activeCaseId;
            const diffStyle = DIFFICULTY_BADGES[c.difficulty] || DIFFICULTY_BADGES.MEDIUM;

            return (
              <div
                key={c.id}
                onClick={() => { onSelectCase(c.id); onClose(); }}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  isCurrent
                    ? 'border-cyan-500 bg-cyan-950/30 ring-1 ring-cyan-500/40'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1 text-[10px] font-mono">
                  <span className="font-bold text-slate-400">{c.id}</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded border font-bold ${diffStyle.bg} ${diffStyle.text}`}>
                      {c.difficulty}
                    </span>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-bold border border-cyan-800">
                        ACTIVE
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-sm font-bold text-white mb-0.5">
                  {c.title}: <span className="text-slate-300 font-normal">{c.subtitle}</span>
                </div>

                <div className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-2">
                  {c.briefing}
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400">
                  <span>{c.suspects.length} Suspects • {c.clues.length} Evidence Clues</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
