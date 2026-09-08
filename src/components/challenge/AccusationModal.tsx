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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-2.5 sm:p-4 overflow-y-auto">
      <div className="bg-slate-950 border-2 border-amber-500/60 rounded-2xl max-w-2xl w-full p-4 sm:p-6 md:p-8 shadow-2xl relative my-auto max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-3.5 top-3.5 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-900 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex-shrink-0 pr-8 mb-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-1.5">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>OFFICIAL DETERMINATION // FINAL ACCUSATION</span>
          </div>

          <h2 className="text-lg sm:text-2xl font-black text-white mb-1">
            {currentCase.title}: SUBMIT CHARGES
          </h2>

          <p className="text-xs text-slate-300 leading-relaxed">
            {currentCase.targetQuestion}
          </p>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto flex-1 pr-1 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentCase.suspects.map((suspect) => {
              const isSelected = selectedSuspectId === suspect.id;

              return (
                <div
                  key={suspect.id}
                  onClick={() => { onUserActivity(); setSelectedSuspectId(suspect.id); }}
                  className={`p-3.5 sm:p-4 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-400 bg-amber-950/40 shadow-lg ring-2 ring-amber-400/50 text-white'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {suspect.alias ? `"${suspect.alias}"` : 'SUSPECT'}
                      </span>
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                      )}
                    </div>

                    <div className="text-sm font-extrabold text-white mb-0.5">
                      {suspect.name}
                    </div>

                    <div className="text-xs text-slate-400 mb-2 font-mono">
                      {suspect.role}
                    </div>

                    {/* Full suspect background description without any line clamp or truncation */}
                    <div className="text-xs text-slate-300 leading-relaxed mb-2.5">
                      {suspect.background}
                    </div>
                  </div>

                  {suspect.alibi && (
                    <div className="text-[11px] font-mono text-slate-400 bg-slate-950/80 p-2 rounded-lg border border-slate-800/80 mt-1">
                      <strong className="text-amber-300">ALIBI:</strong> {suspect.alibi}
                    </div>
                  )}
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

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-2 pb-1">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold text-center"
            >
              Continue Reviewing Clues
            </button>

            <button
              type="submit"
              disabled={!selectedSuspectId}
              className={`w-full sm:w-auto px-7 py-3 rounded-xl text-xs font-extrabold transition-all shadow-xl text-center ${
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
