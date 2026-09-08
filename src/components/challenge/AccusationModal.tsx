import React, { useState } from 'react';
import { ChallengeCase } from '../../types';
import { ShieldAlert, CheckCircle2, X } from 'lucide-react';

interface AccusationModalProps {
  currentCase: ChallengeCase;
  isOpen: boolean;
  onClose: () => void;
  onSubmitAccusation: (suspectId: string, notes: string) => void;
  onUserActivity: () => void;
}

export const AccusationModal: React.FC<AccusationModalProps> = ({
  currentCase,
  isOpen,
  onClose,
  onSubmitAccusation,
  onUserActivity
}) => {
  const [selectedSuspectId, setSelectedSuspectId] = useState<string | null>(null);
  const [statement, setStatement] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSuspectId) {
      alert('Please select one suspect to accuse!');
      return;
    }
    onUserActivity();
    onSubmitAccusation(selectedSuspectId, statement);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-slate-950 border-2 border-amber-500/60 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-900"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>OFFICIAL DETERMINATION // FINAL ACCUSATION</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
          {currentCase.title}: SUBMIT CHARGES
        </h2>

        <p className="text-xs text-slate-300 mb-5 leading-relaxed">
          {currentCase.targetQuestion}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentCase.suspects.map((suspect) => {
              const isSelected = selectedSuspectId === suspect.id;

              return (
                <div
                  key={suspect.id}
                  onClick={() => { onUserActivity(); setSelectedSuspectId(suspect.id); }}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-amber-400 bg-amber-950/40 shadow-lg ring-2 ring-amber-400/50 text-white'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {suspect.alias ? `"${suspect.alias}"` : 'SUSPECT'}
                    </span>
                    {isSelected ? (
                      <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-600" />
                    )}
                  </div>

                  <div className="text-sm font-extrabold text-white mb-0.5">
                    {suspect.name}
                  </div>

                  <div className="text-xs text-slate-400 mb-2 font-mono">
                    {suspect.role}
                  </div>

                  <div className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                    {suspect.background}
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">
              Investigator Statement & Evidence Summary (Optional):
            </label>
            <textarea
              rows={2}
              placeholder="Outline your primary evidence trail connecting this suspect to the crime..."
              value={statement}
              onChange={(e) => { onUserActivity(); setStatement(e.target.value); }}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none font-mono"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold"
            >
              Continue Reviewing Clues
            </button>

            <button
              type="submit"
              disabled={!selectedSuspectId}
              className={`px-7 py-2.5 rounded-lg text-xs font-extrabold transition-all shadow-xl ${
                selectedSuspectId
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              SUBMIT ACCUSATION
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
