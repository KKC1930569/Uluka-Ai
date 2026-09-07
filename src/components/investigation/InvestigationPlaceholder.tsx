import React, { useState } from 'react';
import { AppView } from '../../types';
import { 
  Network, 
  Search, 
  User, 
  Phone, 
  Car, 
  FolderGit2, 
  MapPin, 
  Sliders, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  ShieldAlert, 
  Sparkles,
  Calendar,
  AlertCircle,
  FileCheck
} from 'lucide-react';

interface InvestigationWorkspaceProps {
  caseId: string;
  onNavigate: (view: AppView) => void;
}

export const InvestigationPlaceholder: React.FC<InvestigationWorkspaceProps> = ({ caseId }) => {
  const [startingType, setStartingType] = useState<'PERSON' | 'PHONE' | 'VEHICLE' | 'CASE' | 'LOCATION'>('PERSON');
  const [queryInput, setQueryInput] = useState('Ravi Kumar');
  const [selectedEntityMock] = useState({
    name: 'Ravi Kumar',
    type: 'PERSON',
    aliases: ['Ravi K.', 'Ravi Kumr', 'R. Kumar'],
    degreeCentrality: '0.74 (High)',
    betweennessCentrality: '0.88 (Potential Intermediary)',
    recordsCount: 14,
    sourceRef: 'CDR_183, FIR_021, VAHAN_044'
  });

  const handleStartTypeChange = (type: 'PERSON' | 'PHONE' | 'VEHICLE' | 'CASE' | 'LOCATION') => {
    setStartingType(type);
    if (type === 'PERSON') setQueryInput('Ravi Kumar');
    if (type === 'PHONE') setQueryInput('98XXXXXX21');
    if (type === 'VEHICLE') setQueryInput('AP39AB1234');
    if (type === 'CASE') setQueryInput('FIR_021/2026');
    if (type === 'LOCATION') setQueryInput('Guntur Logistics Hub');
  };

  return (
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      
      {/* Top Case Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center text-cyan-400">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-cyan-400">CASE #{caseId}</span>
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                ACTIVE INVESTIGATION
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-400">Cross-District Financial Investigation</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Target Graph: 84 Entities • 132 Relationships • 17 Potential Matches • 3 Potential Intermediaries
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Phase 4 Graph Analysis Engine: Clicking [Find Hidden Connection] executes NetworkX betweenness centrality and community detection to isolate the bridge node.')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>FIND HIDDEN CONNECTION</span>
          </button>
        </div>
      </div>

      {/* Phase 1 Status Banner */}
      <div className="rounded-lg bg-blue-950/40 border border-blue-800/60 p-3 mb-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-blue-200">
          <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <strong>Phase 1 Workspace Foundation:</strong> 3-column analysis workspace layout, starting point selector, and evidence inspector initialized. Cytoscape.js canvas and FastAPI graph services integrate in Phase 2.
          </span>
        </div>
        <span className="font-mono text-[11px] text-cyan-400 px-2 py-0.5 bg-blue-900/60 rounded border border-blue-700/50">
          UI SYSTEM ONLINE
        </span>
      </div>

      {/* 3-Column Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[520px]">
        
        {/* LEFT COLUMN: Case Info / Controls / Starting Points (3 cols) */}
        <div className="lg:col-span-3 rounded-xl border border-slate-800 bg-[#0B0F19] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                INVESTIGATION CONTROLS
              </span>
              <Sliders className="w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Starting Point Section */}
            <div className="mb-5">
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-2">
                INVESTIGATION STARTING POINT
              </label>
              
              <div className="grid grid-cols-3 gap-1 mb-3">
                <button
                  onClick={() => handleStartTypeChange('PERSON')}
                  className={`px-2 py-1.5 text-xs rounded font-medium flex items-center justify-center gap-1 ${
                    startingType === 'PERSON'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <User className="w-3 h-3" />
                  Person
                </button>

                <button
                  onClick={() => handleStartTypeChange('PHONE')}
                  className={`px-2 py-1.5 text-xs rounded font-medium flex items-center justify-center gap-1 ${
                    startingType === 'PHONE'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <Phone className="w-3 h-3" />
                  Phone
                </button>

                <button
                  onClick={() => handleStartTypeChange('VEHICLE')}
                  className={`px-2 py-1.5 text-xs rounded font-medium flex items-center justify-center gap-1 ${
                    startingType === 'VEHICLE'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <Car className="w-3 h-3" />
                  Vehicle
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1 mb-3">
                <button
                  onClick={() => handleStartTypeChange('CASE')}
                  className={`px-2 py-1.5 text-xs rounded font-medium flex items-center justify-center gap-1 ${
                    startingType === 'CASE'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <FolderGit2 className="w-3 h-3" />
                  Case / FIR
                </button>

                <button
                  onClick={() => handleStartTypeChange('LOCATION')}
                  className={`px-2 py-1.5 text-xs rounded font-medium flex items-center justify-center gap-1 ${
                    startingType === 'LOCATION'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                  Location
                </button>
              </div>

              <div className="relative mb-2">
                <input
                  type="text"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder={`Search ${startingType.toLowerCase()}...`}
                  className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <button className="absolute right-2 top-2 text-slate-400 hover:text-cyan-400">
                  <Search className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => alert(`Starting investigation seed from ${startingType}: "${queryInput}"`)}
                className="w-full py-2 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-300 border border-cyan-900/50 transition-colors"
              >
                INVESTIGATE SEED
              </button>
            </div>

            {/* Entity Filters Mock */}
            <div className="border-t border-slate-800 pt-3">
              <span className="text-[11px] font-mono text-slate-400 block mb-2">NODE TYPE FILTERS</span>
              <div className="space-y-1.5 text-xs text-slate-300">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-700 text-cyan-500 bg-slate-900" />
                  <span>PERSON (28)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-700 text-cyan-500 bg-slate-900" />
                  <span>PHONE (31)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-700 text-cyan-500 bg-slate-900" />
                  <span>VEHICLE (12)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded border-slate-700 text-cyan-500 bg-slate-900" />
                  <span>LOCATION (8)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500">
            SEED: {startingType} // {queryInput}
          </div>
        </div>

        {/* CENTER COLUMN: Interactive Network Graph Canvas (6 cols) */}
        <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-[#070A12] relative overflow-hidden flex flex-col justify-between intel-grid">
          
          {/* Top Canvas Controls */}
          <div className="p-3 flex items-center justify-between border-b border-slate-800/80 bg-slate-900/70 backdrop-blur z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-300">GRAPH VIEW</span>
              <span className="text-[10px] font-mono text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                CYTOSCAPE.JS PREVIEW
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button 
                title="Zoom In" 
                onClick={() => {}}
                className="p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button 
                title="Zoom Out" 
                onClick={() => {}}
                className="p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button 
                title="Reset View" 
                onClick={() => {}}
                className="p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Graph Mock SVG (Phase 1 preview) */}
          <div className="relative flex-1 flex items-center justify-center p-6">
            
            <svg viewBox="0 0 500 320" className="w-full h-full max-h-[360px]">
              {/* Cluster A Box */}
              <rect x="20" y="30" width="160" height="240" rx="8" fill="#0B0F19" stroke="#1E293B" strokeDasharray="3 3" />
              <text x="30" y="50" fill="#64748B" fontSize="10" fontFamily="monospace">CLUSTER A: FIN. RING</text>

              {/* Cluster B Box */}
              <rect x="320" y="30" width="160" height="240" rx="8" fill="#0B0F19" stroke="#1E293B" strokeDasharray="3 3" />
              <text x="330" y="50" fill="#64748B" fontSize="10" fontFamily="monospace">CLUSTER B: LOGISTICS</text>

              {/* Edges Cluster A */}
              <line x1="70" y1="90" x2="130" y2="130" stroke="#334155" strokeWidth="2" />
              <line x1="70" y1="190" x2="130" y2="130" stroke="#334155" strokeWidth="2" />
              <line x1="130" y1="130" x2="70" y2="230" stroke="#334155" strokeWidth="2" />

              {/* Edges Cluster B */}
              <line x1="370" y1="130" x2="430" y2="90" stroke="#334155" strokeWidth="2" />
              <line x1="370" y1="130" x2="430" y2="190" stroke="#334155" strokeWidth="2" />
              <line x1="370" y1="130" x2="430" y2="230" stroke="#334155" strokeWidth="2" />

              {/* Hidden Bridge Edges (Connecting Intermediary) */}
              <line x1="130" y1="130" x2="250" y2="150" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="4 2" />
              <line x1="250" y1="150" x2="370" y2="130" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="4 2" />

              {/* Nodes Cluster A */}
              <circle cx="70" cy="90" r="14" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
              <text x="70" y="94" fill="#FFF" fontSize="9" textAnchor="middle" fontFamily="sans-serif">P1</text>

              <circle cx="70" cy="190" r="14" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
              <text x="70" y="194" fill="#FFF" fontSize="9" textAnchor="middle" fontFamily="sans-serif">P2</text>

              <circle cx="70" cy="230" r="12" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
              <text x="70" y="234" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="sans-serif">PH1</text>

              <circle cx="130" cy="130" r="16" fill="#0F172A" stroke="#06B6D4" strokeWidth="2" />
              <text x="130" y="134" fill="#38BDF8" fontSize="9" fontWeight="bold" textAnchor="middle">Ravi K.</text>

              {/* Central Planted Intermediary Node */}
              <circle cx="250" cy="150" r="22" fill="#1E1B4B" stroke="#F59E0B" strokeWidth="3" className="animate-pulse" />
              <text x="250" y="154" fill="#FBBF24" fontSize="10" fontWeight="bold" textAnchor="middle">BRIDGE</text>
              <text x="250" y="186" fill="#F59E0B" fontSize="9" textAnchor="middle" fontFamily="monospace">Intermediary X</text>

              {/* Nodes Cluster B */}
              <circle cx="370" cy="130" r="16" fill="#0F172A" stroke="#EAB308" strokeWidth="2" />
              <text x="370" y="134" fill="#FCD34D" fontSize="9" fontWeight="bold" textAnchor="middle">P_Hub</text>

              <circle cx="430" cy="90" r="14" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
              <text x="430" y="94" fill="#FFF" fontSize="9" textAnchor="middle">P3</text>

              <circle cx="430" cy="190" r="14" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
              <text x="430" y="194" fill="#FFF" fontSize="9" textAnchor="middle">V_04</text>

              <circle cx="430" cy="230" r="12" fill="#1E293B" stroke="#64748B" strokeWidth="1.5" />
              <text x="430" y="234" fill="#94A3B8" fontSize="8" textAnchor="middle">LOC</text>
            </svg>

            {/* Floating Legend */}
            <div className="absolute bottom-3 left-3 bg-slate-950/80 border border-slate-800 p-2 rounded text-[10px] font-mono text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <span>Cluster A (Financial Ring)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>Potential Intermediary Bridge</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                <span>Cluster B (Logistics Hub)</span>
              </div>
            </div>

          </div>

          <div className="p-2.5 border-t border-slate-800/80 bg-slate-900/60 text-xs flex items-center justify-between text-slate-400">
            <span className="font-mono text-[11px]">84 NODES • 132 EDGES LOADED</span>
            <span className="text-[11px] text-cyan-400">SELECT A NODE TO INSPECT EVIDENCE</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Evidence / Resolution / Explanation Panel (3 cols) */}
        <div className="lg:col-span-3 rounded-xl border border-slate-800 bg-[#0B0F19] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                EVIDENCE PANEL
              </span>
              <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
            </div>

            {/* Selected Node Details */}
            <div className="rounded-lg bg-slate-950 border border-slate-800/80 p-3 mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800">
                  {selectedEntityMock.type}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {selectedEntityMock.recordsCount} RECORDS
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {selectedEntityMock.name}
              </h3>
              
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">RESOLVED ALIASES</span>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {selectedEntityMock.aliases.map((a, i) => (
                      <span key={i} className="px-1.5 py-0.5 bg-slate-900 text-slate-300 rounded font-mono text-[10px]">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-slate-500 block text-[10px]">BETWEENNESS CENTRALITY</span>
                  <span className="font-mono text-amber-400 font-semibold">
                    {selectedEntityMock.betweennessCentrality}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[10px]">EVIDENCE SOURCES</span>
                  <span className="font-mono text-slate-300 text-[11px]">
                    {selectedEntityMock.sourceRef}
                  </span>
                </div>
              </div>
            </div>

            {/* Analytical Lead Explanation Box */}
            <div className="rounded-lg bg-cyan-950/30 border border-cyan-800/50 p-3 mb-3">
              <div className="flex items-center gap-1.5 text-cyan-300 text-xs font-semibold mb-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>ANALYTICAL EXPLANATION</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connects 2 network clusters with high bridge probability. Supported by 4 independent records across CDR and Vahan registry.
              </p>
              <div className="mt-2 text-[10px] font-mono text-cyan-400">
                Requires Human Investigator Review
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => alert('Phase 3 Human Review Modal: Accept / Reject / Keep Unresolved workflow')}
              className="w-full py-2 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-medium"
            >
              REVIEW IDENTITY MATCHES (17)
            </button>
          </div>
        </div>

      </div>

      {/* BOTTOM: Timeline Bar */}
      <div className="mt-4 rounded-xl border border-slate-800 bg-[#0B0F19] p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              INVESTIGATION TIMELINE
            </span>
          </div>
          <span className="text-xs font-mono text-cyan-400">
            ACTIVE WINDOW: 01 JAN 2026 — 15 MAY 2026
          </span>
        </div>

        {/* Timeline Slider Track */}
        <div className="relative py-3">
          <div className="h-1.5 bg-slate-800 rounded-full w-full relative">
            <div className="absolute left-[20%] right-[30%] h-full bg-cyan-500/50 rounded-full" />
            <div className="absolute left-[45%] top-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full border-2 border-slate-950 shadow cursor-pointer" />
          </div>

          {/* Month markers */}
          <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-2">
            <span>JAN 2026</span>
            <span>FEB 2026</span>
            <span className="text-cyan-400 font-bold">MAR 2026 (14 MAR INCIDENT)</span>
            <span>APR 2026</span>
            <span>MAY 2026</span>
          </div>
        </div>
      </div>

    </div>
  );
};
