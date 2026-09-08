import React from 'react';
import { AlertTriangle, Activity } from 'lucide-react';

interface AfkModalProps {
  isOpen: boolean;
  onContinue: () => void;
}

export const AfkModal: React.FC<AfkModalProps> = ({ isOpen, onContinue }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-slate-950 border-2 border-amber-500/60 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl animate-pulse">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-4">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h2 className="text-lg font-extrabold text-white mb-1">
          ARE YOU STILL INVESTIGATING?
        </h2>

        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          You have been inactive for 5 minutes. The case timer has been suspended to protect your time record.
        </p>

        <button
          onClick={onContinue}
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-amber-500/20"
        >
          <Activity className="w-4 h-4" />
          <span>CONTINUE INVESTIGATION</span>
        </button>
      </div>
    </div>
  );
};
