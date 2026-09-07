import React from 'react';
import { AppView } from '../../types';
import { 
  Gamepad2, 
  ArrowLeft, 
  Zap
} from 'lucide-react';

interface ChallengePlaceholderProps {
  onNavigate: (view: AppView) => void;
}

export const ChallengePlaceholder: React.FC<ChallengePlaceholderProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Top back button */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
        <button
          onClick={() => onNavigate('landing')}
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO ULUKA DASHBOARD</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
            MODE 2: ULUKA CHALLENGE
          </span>
        </div>
      </div>

      {/* Hero Game Briefing */}
      <div className="rounded-2xl border-2 border-amber-500/40 bg-gradient-to-b from-[#1c1826] to-[#0d0a14] p-8 shadow-2xl text-center mb-8 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono mb-4">
          <Gamepad2 className="w-4 h-4" />
          <span>INTERACTIVE PITCH GAME</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          🦉 ULUKA CHALLENGE
        </h1>
        <p className="text-lg text-amber-300 font-medium mb-6">
          Can you connect the clues?
        </p>

        {/* Case 007 Briefing Card */}
        <div className="max-w-md mx-auto rounded-xl bg-slate-950/80 border border-amber-950/80 p-5 text-left mb-8 shadow-inner">
          <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-2">
            <span>CASE #007</span>
            <span>DIFFICULTY: JURY CHALLENGE</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed mb-4">
            A suspicious cross-district activity pattern has been detected between two secretive operational groups. You do <strong className="text-white">NOT</strong> have all the information.
          </p>

          <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-800/40 flex items-center justify-between text-xs font-mono">
            <span className="text-amber-300">INVESTIGATION POINTS</span>
            <span className="text-amber-400 font-bold text-sm">10 / 10 AVAILABLE</span>
          </div>
        </div>

        {/* Gameplay Preview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto mb-8">
          
          <div className="rounded-lg bg-slate-900/80 border border-slate-800 p-3.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 mb-1">
              <span>CLUE #04</span>
              <span className="text-slate-500">1 POINT</span>
            </div>
            <div className="text-xs text-slate-200 font-bold mb-1">Phone 98XXXXXX21</div>
            <div className="text-[11px] text-slate-400">Observed 22:43 in Guntur Hub</div>
          </div>

          <div className="rounded-lg bg-slate-900/80 border border-slate-800 p-3.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-amber-400 mb-1">
              <span>RED HERRING</span>
              <span className="text-slate-500">DELIBERATE</span>
            </div>
            <div className="text-xs text-slate-200 font-bold mb-1">Shared Location</div>
            <div className="text-[11px] text-slate-400">Used by 19 unrelated civilian entities</div>
          </div>

          <div className="rounded-lg bg-slate-900/80 border border-slate-800 p-3.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400 mb-1">
              <span>THE BRIDGE</span>
              <span className="text-slate-500">HIDDEN</span>
            </div>
            <div className="text-xs text-slate-200 font-bold mb-1">Intermediary Lead</div>
            <div className="text-[11px] text-slate-400">Bridges Group A and Group B</div>
          </div>

        </div>

        {/* Phase 1 placeholder notification */}
        <div className="max-w-xl mx-auto rounded-lg bg-slate-900/90 border border-slate-800 p-4 text-xs text-slate-300 mb-6">
          <span className="font-semibold text-amber-400 block mb-1">PHASE 1 STATUS:</span>
          Game mode view structure & navigation established. Full interactive point subtraction, SVG clue tree, and scoring engine will be implemented in Phase 6 as pure client-side TypeScript (zero external dependencies).
        </div>

        <button
          onClick={() => alert('ULUKA Challenge Game Engine activates in Phase 6!')}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/25"
        >
          <Zap className="w-4 h-4" />
          <span>START INVESTIGATION (PHASE 6 READY)</span>
        </button>

      </div>

    </div>
  );
};
