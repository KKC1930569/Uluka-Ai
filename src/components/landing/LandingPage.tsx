import React from 'react';
import { OwlLogo } from '../common/OwlLogo';
import { AppView } from '../../types';
import { 
  Network, 
  Gamepad2, 
  ArrowRight, 
  Layers, 
  FileSpreadsheet, 
  GitMerge, 
  Activity, 
  Database,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (view: AppView) => void;
  onOpenCase: (caseId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onOpenCase }) => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center pt-4 pb-10">
        
        {/* Subtle Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/60 text-cyan-300 text-xs font-mono font-medium mb-6">
          <OwlLogo size="sm" />
          <span>ULUKA AI // DEFENSE & POLICE INTELLIGENCE SUITE</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
          ULUKA <span className="text-cyan-400">AI</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl sm:text-2xl font-semibold text-slate-200 mb-3 tracking-wide">
          AI-Powered Criminal Network Intelligence
        </p>

        {/* Tagline */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Connecting fragmented intelligence across records, phones, vehicles, and CDRs to uncover hidden networks.
        </p>

        {/* The Two Main Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left max-w-4xl mx-auto">
          
          {/* MODE 1: REAL CASE INVESTIGATION (Visually Primary: 7 cols) */}
          <div className="md:col-span-7 group relative rounded-xl border-2 border-cyan-500/50 bg-gradient-to-b from-[#0F1829] to-[#0B0F19] p-7 shadow-xl shadow-cyan-950/30 transition-all hover:border-cyan-400 hover:shadow-cyan-900/40 flex flex-col justify-between">
            
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold">
                MAIN PRODUCT
              </span>
            </div>

            <div>
              <div className="w-12 h-12 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
                <Network className="w-6 h-6" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                REAL CASE INVESTIGATION
              </h2>

              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Serious investigation workflow. Ingest fragmented CDRs, FIRs, vehicle sightings, and phone registries. Run entity resolution, graph centrality, and identify hidden intermediary bridge candidates.
              </p>

              {/* Sample Case Snapshot Box */}
              <div className="rounded-lg bg-slate-950/80 border border-slate-800 p-4 mb-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-cyan-400 font-semibold">CASE #ULK-2047</span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
                    ACTIVE SCENARIO
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-medium mb-3">
                  Cross-District Financial Hawala & Syndicate Investigation
                </p>
                <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-slate-400">
                  <div>
                    <span className="block text-slate-500 text-[10px]">ENTITIES</span>
                    <span className="text-slate-200 font-bold">84</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 text-[10px]">POTENTIAL MATCHES</span>
                    <span className="text-cyan-400 font-bold">17</span>
                  </div>
                  <div>
                    <span className="block text-slate-500 text-[10px]">INTERMEDIARIES</span>
                    <span className="text-amber-400 font-bold">3 Potential</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  onOpenCase('ULK-2047');
                  onNavigate('investigation');
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors shadow-lg shadow-cyan-500/25"
              >
                <span>OPEN INVESTIGATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => onNavigate('cases')}
                className="px-4 py-3 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 font-medium text-sm transition-colors border border-slate-700"
              >
                Browse Cases (3)
              </button>
            </div>

          </div>

          {/* MODE 2: ULUKA CHALLENGE (Interactive Pitch Game: 5 cols) */}
          <div className="md:col-span-5 group relative rounded-xl border border-amber-500/40 bg-gradient-to-b from-[#18151f] to-[#0F0D15] p-7 shadow-lg transition-all hover:border-amber-400/80 flex flex-col justify-between">
            
            <div className="absolute top-3 right-3">
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold">
                INTERACTIVE PITCH
              </span>
            </div>

            <div>
              <div className="w-12 h-12 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
                <Gamepad2 className="w-6 h-6" />
              </div>

              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                ULUKA CHALLENGE
              </h2>

              <p className="text-xs text-amber-200/80 font-mono mb-3">
                Can you connect the clues?
              </p>

              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                An interactive digital investigation game for jury & evaluators. Analyze forensic clues, place entities on the billboard, manually connect the dots, and indict the correct culprit.
              </p>

              {/* Game Feature Highlights */}
              <div className="space-y-2 rounded-lg bg-slate-950/60 border border-amber-950/50 p-3 mb-6 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-mono text-slate-400">SCENARIOS</span>
                  <span className="font-mono text-amber-400 font-bold">5 Replayable Cases</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-mono text-slate-400">MECHANIC</span>
                  <span className="text-slate-200">Billboard & Dot Connecting</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-mono text-slate-400">OBJECTIVE</span>
                  <span className="text-cyan-300 font-mono font-bold">Indict True Culprit</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('challenge')}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition-colors shadow-lg shadow-amber-500/20"
            >
              <span>PLAY CHALLENGE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

        {/* Pipeline Architecture Graphic Banner */}
        <div className="mt-14 max-w-5xl mx-auto rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              ULUKA CORE ARCHITECTURAL PIPELINE
            </span>
            <span className="text-[11px] font-mono text-cyan-400">
              END-TO-END ANALYTICAL FLOW
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
            
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col items-center">
              <FileSpreadsheet className="w-5 h-5 text-slate-400 mb-2" />
              <span className="text-xs font-bold text-slate-200">Fragmented Records</span>
              <span className="text-[10px] text-slate-400 mt-1">FIR, CDR, Vahan</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col items-center">
              <GitMerge className="w-5 h-5 text-cyan-400 mb-2" />
              <span className="text-xs font-bold text-slate-200">Entity Resolution</span>
              <span className="text-[10px] text-slate-400 mt-1">Weighted Matching</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col items-center">
              <Database className="w-5 h-5 text-blue-400 mb-2" />
              <span className="text-xs font-bold text-slate-200">Evidence Graph</span>
              <span className="text-[10px] text-slate-400 mt-1">Multi-modal Nodes</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col items-center">
              <Activity className="w-5 h-5 text-indigo-400 mb-2" />
              <span className="text-xs font-bold text-slate-200">Network Analysis</span>
              <span className="text-[10px] text-slate-400 mt-1">Centrality & Bridges</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col items-center">
              <Zap className="w-5 h-5 text-amber-400 mb-2" />
              <span className="text-xs font-bold text-slate-200">Hidden Connections</span>
              <span className="text-[10px] text-slate-400 mt-1">Planted Clusters</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col items-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mb-2" />
              <span className="text-xs font-bold text-slate-200">Investigator Review</span>
              <span className="text-[10px] text-slate-400 mt-1">Human Decision</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
