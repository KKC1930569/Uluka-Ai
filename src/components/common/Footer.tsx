import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-[#090D17] py-6 px-4 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="max-w-2xl leading-relaxed text-slate-400 text-[11px]">
            <strong className="text-slate-300 font-semibold">LEGAL & ETHICAL PROTOCOL:</strong> ULUKA AI operates strictly as an analytical decision-support tool for authorized law enforcement investigators. It provides evidence-backed graph correlations, potential intermediaries, and identity leads. It does <span className="text-amber-300 underline underline-offset-2">NOT</span> determine guilt, establish conviction, or accuse individuals. All leads require independent human investigator verification.
          </p>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500 shrink-0">
          <span>SIH PROTOTYPE BUILD</span>
          <span>•</span>
          <span className="text-cyan-400/80">SYNTHETIC DATA ONLY</span>
        </div>

      </div>
    </footer>
  );
};
