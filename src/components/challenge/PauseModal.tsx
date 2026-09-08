import React from 'react';
import { Pause, Play } from 'lucide-react';

interface PauseModalProps {
  isOpen: boolean;
  onResume: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({ isOpen, onResume }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto mb-4">
          <Pause className="w-6 h-6" />
        </div>

        <h2 className="text-xl font-extrabold text-white mb-1">
          GAME PAUSED
        </h2>

        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          Your investigation is paused. The game timer and inactivity monitoring are suspended.
        </p>

        <button
          onClick={onResume}
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs transition-all shadow-lg shadow-cyan-500/20"
        >
          <Play className="w-4 h-4" />
          <span>RESUME INVESTIGATION</span>
        </button>
      </div>
    </div>
  );
};
