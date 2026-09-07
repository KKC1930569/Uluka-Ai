import React from 'react';
import { OwlLogo } from './OwlLogo';
import { AppView } from '../../types';
import { 
  FolderGit2, 
  Network, 
  Home, 
  Gamepad2, 
  Lock 
} from 'lucide-react';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  activeCaseId?: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, activeCaseId }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#0B0F19]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Identity */}
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 cursor-pointer group"
          title="Return to ULUKA AI Home"
        >
          <OwlLogo size="md" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-wider text-base text-slate-100 group-hover:text-cyan-400 transition-colors">
                ULUKA <span className="text-cyan-400 font-mono text-sm font-semibold">AI</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase rounded bg-slate-800 text-slate-300 border border-slate-700/60">
                PROTOTYPE
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium tracking-tight">
              Criminal Network Intelligence
            </span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-lg">
          <button
            onClick={() => onNavigate('landing')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              currentView === 'landing'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Dashboard
          </button>

          <button
            onClick={() => onNavigate('cases')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              currentView === 'cases'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            Cases
          </button>

          <button
            onClick={() => onNavigate('investigation')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              currentView === 'investigation'
                ? 'bg-blue-600/25 text-blue-300 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            Investigation
            {activeCaseId && (
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-1 rounded border border-cyan-800/50">
                #ULK-2047
              </span>
            )}
          </button>

          <div className="h-4 w-[1px] bg-slate-800 mx-1" />

          <button
            onClick={() => onNavigate('challenge')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              currentView === 'challenge'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-amber-400/80 hover:text-amber-300 hover:bg-amber-950/30'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            Challenge
            <span className="text-[9px] px-1 py-0.2 bg-amber-500/20 text-amber-300 rounded font-mono">
              GAME
            </span>
          </button>
        </nav>

        {/* Right: Security Status & Synthetic DB Indicator */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-[11px] font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>SYNTHETIC INTEL DB</span>
          </div>

          <div className="flex items-center gap-1 text-slate-500 text-xs px-2 py-1 rounded bg-slate-900/50 border border-slate-800/60">
            <Lock className="w-3 h-3 text-slate-400" />
            <span className="font-mono text-[11px]">PHASE 1</span>
          </div>
        </div>

      </div>
    </header>
  );
};
