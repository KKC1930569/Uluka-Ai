import React, { useState, useEffect } from 'react';
import { AppView } from '../../types';
import { CytoscapeCanvas } from './CytoscapeCanvas';
import { 
  fetchCaseGraph, 
  fetchHiddenConnection, 
  fetchResolutions, 
  submitResolutionDecision 
} from '../../api';
import { 
  Network, 
  Search, 
  User, 
  Phone, 
  Car, 
  FolderGit2, 
  MapPin, 
  Sliders, 
  ShieldAlert, 
  Sparkles, 
  Calendar, 
  FileCheck, 
  X, 
  RotateCcw, 
  ArrowRight
} from 'lucide-react';

interface InvestigationWorkspaceProps {
  caseId: string;
  onNavigate: (view: AppView) => void;
}

export const InvestigationWorkspace: React.FC<InvestigationWorkspaceProps> = ({ caseId }) => {
  const [elements, setElements] = useState<{ nodes: any[]; edges: any[] }>({ nodes: [], edges: [] });
  const [loadingGraph, setLoadingGraph] = useState(true);
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<any | null>(null);
  const [highlightedNodeIds, setHighlightedNodeIds] = useState<string[]>([]);
  const [highlightedEdgeIds, setHighlightedEdgeIds] = useState<string[]>([]);
  const [focusNodeId, setFocusNodeId] = useState<string | null>(null);

  const [hiddenConnection, setHiddenConnection] = useState<any | null>(null);
  const [analyzingHidden, setAnalyzingHidden] = useState(false);

  const [startingType, setStartingType] = useState<'PERSON' | 'PHONE' | 'VEHICLE' | 'CASE' | 'LOCATION'>('PERSON');
  const [queryInput, setQueryInput] = useState('Ravi Kumar');
  const [typeFilters, setTypeFilters] = useState<Record<string, boolean>>({
    PERSON: true,
    PHONE: true,
    VEHICLE: true,
    LOCATION: true,
    CASE: true,
    ACCOUNT: true
  });

  const timelineDates = [
    { label: 'JAN 2026', iso: '2026-01-31T23:59:59' },
    { label: 'FEB 2026', iso: '2026-02-28T23:59:59' },
    { label: 'MAR 2026 (INCIDENT)', iso: '2026-03-31T23:59:59' },
    { label: 'APR 2026', iso: '2026-04-30T23:59:59' },
    { label: 'MAY 2026', iso: '2026-05-31T23:59:59' }
  ];
  const [timelineIndex, setTimelineIndex] = useState(4);

  const [resolutions, setResolutions] = useState<any[]>([]);
  const [showResolutionsModal, setShowResolutionsModal] = useState(false);
  useEffect(() => {
    async function loadData() {
      setLoadingGraph(true);
      try {
        const graphData = await fetchCaseGraph(caseId);
        if (graphData && graphData.elements) {
          setElements(graphData.elements);
          const defaultNode = graphData.elements.nodes.find((n: any) => n.data.id === 'PER_001');
          if (defaultNode) {
            setSelectedNode(defaultNode.data);
          }
        }
        const resData = await fetchResolutions(caseId);
        if (resData) {
          setResolutions(resData);
        }
      } catch (err) {
        console.error('Error loading graph:', err);
      } finally {
        setLoadingGraph(false);
      }
    }
    loadData();
  }, [caseId]);

  const handleStartTypeChange = (type: 'PERSON' | 'PHONE' | 'VEHICLE' | 'CASE' | 'LOCATION') => {
    setStartingType(type);
    if (type === 'PERSON') setQueryInput('Ravi Kumar');
    if (type === 'PHONE') setQueryInput('+91 9876543221');
    if (type === 'VEHICLE') setQueryInput('AP39AB1234');
    if (type === 'CASE') setQueryInput('FIR #021/2026');
    if (type === 'LOCATION') setQueryInput('Guntur Warehouse Yard');
  };

  const handleInvestigateSeed = () => {
    const q = queryInput.trim().toLowerCase();
    const match = elements.nodes.find((n: any) => {
      const d = n.data;
      const label = (d.label || '').toLowerCase();
      const id = (d.id || '').toLowerCase();
      const aliases = (d.aliases || []).map((a: string) => a.toLowerCase());
      return label.includes(q) || id === q || aliases.some((a: string) => a.includes(q));
    });

    if (match) {
      setFocusNodeId(match.data.id);
      setSelectedNode(match.data);
      setSelectedEdge(null);
    } else {
      alert(`No exact entity node matched for: "${queryInput}". Try "Ravi Kumar", "+91 9876543221", or "AP39AB1234".`);
    }
  };

  const handleFindHiddenConnection = async () => {
    setAnalyzingHidden(true);
    try {
      const result = await fetchHiddenConnection(caseId);
      setHiddenConnection(result);

      const nodesToHighlight = result.bridge_nodes || ['PER_050', 'PH_050', 'VEH_050', 'LOC_003'];
      const edgesToHighlight = result.bridge_edges || ['e_bridge_call_A', 'e_bridge_call_B', 'e_bridge_vis_veh1', 'e_bridge_vis_veh2'];

      setHighlightedNodeIds(nodesToHighlight);
      setHighlightedEdgeIds(edgesToHighlight);

      setFocusNodeId(result.candidate.id);
      setSelectedNode(result.candidate);
      setSelectedEdge(null);
    } catch (err) {
      console.error('Error finding hidden connection:', err);
    } finally {
      setAnalyzingHidden(false);
    }
  };

  const handleResetHighlights = () => {
    setHighlightedNodeIds([]);
    setHighlightedEdgeIds([]);
    setHiddenConnection(null);
  };

  const handleResolutionDecision = async (matchId: string, status: 'ACCEPTED' | 'REJECTED' | 'UNRESOLVED') => {
    try {
      await submitResolutionDecision(caseId, matchId, status);
      setResolutions((prev) =>
        prev.map((r) => (r.id === matchId ? { ...r, status } : r))
      );
    } catch (err) {
      console.error('Error submitting resolution:', err);
    }
  };
  return (
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
      
      {/* Top Header & Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/80 flex items-center justify-center text-cyan-400">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-cyan-400">CASE #{caseId}</span>
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                ACTIVE INVESTIGATION
              </span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs text-slate-300 font-medium">Cross-District Financial & Hawala Investigation</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live Network Graph: {elements.nodes.length} Entities • {elements.edges.length} Relationships • 4 Match Candidates • 1 Planted Bridge Scenario
            </p>
          </div>
        </div>

        {/* Action Button: FIND HIDDEN CONNECTION */}
        <div className="flex items-center gap-2">
          {hiddenConnection && (
            <button
              onClick={handleResetHighlights}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Highlights</span>
            </button>
          )}

          <button
            onClick={handleFindHiddenConnection}
            disabled={analyzingHidden}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-bold text-xs transition-all shadow-lg ${
              hiddenConnection
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25 ring-2 ring-amber-400'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${analyzingHidden ? 'animate-spin' : ''}`} />
            <span>{analyzingHidden ? 'ANALYZING GRAPH...' : '🔎 FIND HIDDEN CONNECTION'}</span>
          </button>
        </div>
      </div>

      {/* 3-Column Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[540px]">
        
        {/* LEFT COLUMN: Controls & Starting Points */}
        <div className="lg:col-span-3 rounded-xl border border-slate-800 bg-[#0B0F19] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                INVESTIGATION SEED
              </span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">
                ENTRY POINT
              </span>
            </div>

            <div className="mb-4">
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-2">
                SELECT SEED ENTITY TYPE:
              </label>
              
              <div className="grid grid-cols-3 gap-1 mb-2">
                <button
                  onClick={() => handleStartTypeChange('PERSON')}
                  className={`px-2 py-1.5 text-xs rounded font-medium flex items-center justify-center gap-1 transition-colors ${
                    startingType === 'PERSON'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <User className="w-3 h-3" />
                  Person
                </button>

                <button
                  onClick={() => handleStartTypeChange('PHONE')}
                  className={`px-2 py-1.5 text-xs rounded font-medium flex items-center justify-center gap-1 transition-colors ${
                    startingType === 'PHONE'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <Phone className="w-3 h-3" />
                  Phone
                </button>

                <button
                  onClick={() => handleStartTypeChange('VEHICLE')}
                  className={`px-2 py-1.5 text-xs rounded font-medium flex items-center justify-center gap-1 transition-colors ${
                    startingType === 'VEHICLE'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
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
                  className={`px-2 py-1.5 text-xs rounded font-medium flex items-center justify-center gap-1 transition-colors ${
                    startingType === 'CASE'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                  }`}
                >
                  <FolderGit2 className="w-3 h-3" />
                  Case / FIR
                </button>

                <button
                  onClick={() => handleStartTypeChange('LOCATION')}
                  className={`px-2 py-1.5 text-xs rounded font-medium flex items-center justify-center gap-1 transition-colors ${
                    startingType === 'LOCATION'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
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
                  onKeyDown={(e) => e.key === 'Enter' && handleInvestigateSeed()}
                  placeholder={`Search ${startingType.toLowerCase()}...`}
                  className="w-full rounded bg-slate-950 border border-slate-800 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                />
                <button 
                  onClick={handleInvestigateSeed}
                  title="Search & center node"
                  className="absolute right-2 top-2 text-slate-400 hover:text-cyan-400"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleInvestigateSeed}
                className="w-full py-2 rounded bg-cyan-950 hover:bg-cyan-900/80 text-xs font-semibold text-cyan-300 border border-cyan-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>INVESTIGATE SEED</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="border-t border-slate-800 pt-3">
              <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">
                NODE TYPE VISIBILITY
              </span>
              <div className="space-y-1.5 text-xs">
                {Object.keys(typeFilters).map((type) => (
                  <label key={type} className="flex items-center justify-between cursor-pointer p-1 rounded hover:bg-slate-900/60">
                    <span className="flex items-center gap-2 text-slate-300 font-medium">
                      <input
                        type="checkbox"
                        checked={typeFilters[type]}
                        onChange={(e) =>
                          setTypeFilters((prev) => ({ ...prev, [type]: e.target.checked }))
                        }
                        className="rounded border-slate-700 text-cyan-500 bg-slate-900 focus:ring-0"
                      />
                      <span>{type}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {elements.nodes.filter((n: any) => n.data.type === type).length}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800">
            <button
              onClick={() => setShowResolutionsModal(true)}
              className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-900/60 text-xs font-semibold flex items-center justify-between transition-colors"
            >
              <span>HUMAN REVIEW LEADS</span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] font-mono border border-cyan-800">
                {resolutions.length} Candidates
              </span>
            </button>
          </div>
        </div>
        {/* CENTER COLUMN: Cytoscape Graph Canvas */}
        <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-[#070A12] relative overflow-hidden flex flex-col justify-between intel-grid">
          
          <div className="p-3 flex items-center justify-between border-b border-slate-800/80 bg-slate-900/80 backdrop-blur z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-200">CYTOSCAPE INTELLIGENCE GRAPH</span>
              <span className="text-[10px] font-mono text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                INTERACTIVE
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>{elements.nodes.length} Nodes</span>
              <span>•</span>
              <span>{elements.edges.length} Edges</span>
            </div>
          </div>

          <div className="relative flex-1 w-full h-full min-h-[440px]">
            {loadingGraph ? (
              <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-cyan-400">
                LOADING INTELLIGENCE GRAPH...
              </div>
            ) : (
              <CytoscapeCanvas
                elements={elements}
                onSelectNode={(nodeData) => {
                  setSelectedNode(nodeData);
                  setSelectedEdge(null);
                }}
                onSelectEdge={(edgeData) => {
                  setSelectedEdge(edgeData);
                  setSelectedNode(null);
                }}
                highlightedNodeIds={highlightedNodeIds}
                highlightedEdgeIds={highlightedEdgeIds}
                focusNodeId={focusNodeId}
                typeFilters={typeFilters}
                dateWindowMax={timelineDates[timelineIndex].iso}
              />
            )}

            {/* Canvas Legend */}
            <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-800 p-2.5 rounded-lg text-[10px] font-mono text-slate-400 space-y-1 pointer-events-none backdrop-blur shadow-md">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" />
                <span>PERSON</span>
                <span className="w-2.5 h-2.5 rounded bg-[#059669] ml-2" />
                <span>PHONE</span>
                <span className="w-2.5 h-2.5 rounded bg-[#4F46E5] ml-2" />
                <span>VEHICLE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-[#7E22CE]" />
                <span>LOCATION</span>
                <span className="w-2.5 h-2.5 rounded bg-[#C2410C] ml-2" />
                <span>CASE</span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] ml-2 animate-pulse" />
                <span className="text-amber-400 font-bold">BRIDGE</span>
              </div>
            </div>

            {/* Hidden Connection Banner */}
            {hiddenConnection && (
              <div className="absolute top-3 left-3 right-3 bg-amber-950/90 border border-amber-500/80 p-3 rounded-lg text-xs shadow-xl backdrop-blur flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-200">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold text-amber-300">POTENTIAL INTERMEDIARY IDENTIFIED: </span>
                    <strong className="text-white">{hiddenConnection.candidate.label}</strong>
                    <span className="text-amber-200/80 ml-1">
                      (Betweenness: {hiddenConnection.betweenness_centrality})
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleResetHighlights}
                  className="p-1 text-amber-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="p-2 border-t border-slate-800/80 bg-slate-900/60 text-xs flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-mono">
              CLICK ANY NODE OR EDGE TO INSPECT EVIDENCE DOSSIER
            </span>
            <span className="text-[11px] text-cyan-400 font-mono">
              ANALYTICAL GRAPH ENGINE
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Evidence Panel */}
        <div className="lg:col-span-3 rounded-xl border border-slate-800 bg-[#0B0F19] p-4 flex flex-col justify-between overflow-y-auto max-h-[640px]">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
                EVIDENCE DOSSIER
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                {selectedNode ? 'NODE' : selectedEdge ? 'EDGE' : 'SELECTION'}
              </span>
            </div>

            {/* Selected Node Details */}
            {selectedNode && (
              <div className="rounded-lg bg-slate-950 border border-slate-800 p-3 mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-800">
                    {selectedNode.type}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    ID: {selectedNode.id}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1">
                  {selectedNode.label || selectedNode.name}
                </h3>

                {selectedNode.district && (
                  <div className="text-xs text-slate-400 mb-2">
                    Jurisdiction: <span className="text-slate-200">{selectedNode.district}</span>
                  </div>
                )}

                {selectedNode.aliases && selectedNode.aliases.length > 0 && (
                  <div className="mb-2">
                    <span className="text-[10px] font-mono text-slate-500 block">KNOWN ALIASES</span>
                    <div className="flex flex-wrap gap-1 mt-0.5">
                      {selectedNode.aliases.map((a: string, i: number) => (
                        <span key={i} className="px-1.5 py-0.5 bg-slate-900 text-slate-300 rounded font-mono text-[10px] border border-slate-800">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 my-3 p-2 rounded bg-slate-900/60 border border-slate-800/80 text-[11px] font-mono">
                  <div>
                    <span className="text-slate-500 text-[9px] block">BETWEENNESS</span>
                    <span className="font-bold text-amber-400">
                      {selectedNode.betweenness_centrality ?? '0.04'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[9px] block">DEGREE</span>
                    <span className="font-bold text-cyan-400">
                      {selectedNode.degree_centrality ?? '0.05'}
                    </span>
                  </div>
                </div>

                {selectedNode.notes && (
                  <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/40 p-2 rounded border border-slate-800 mb-2">
                    {selectedNode.notes}
                  </div>
                )}

                {selectedNode.tags && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedNode.tags.map((t: string, i: number) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/50">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Selected Edge Details */}
            {selectedEdge && (
              <div className="rounded-lg bg-slate-950 border border-slate-800 p-3 mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800">
                    {selectedEdge.relationship}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">
                    CONFIDENCE: {Math.round((selectedEdge.confidence || 0.85) * 100)}%
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-300 mb-2">
                  <span className="text-slate-400">{selectedEdge.source}</span>
                  <span className="mx-1 text-cyan-400">➔</span>
                  <span className="text-slate-400">{selectedEdge.target}</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 block">SOURCE RECORD</span>
                    <span className="font-mono text-slate-200 font-semibold">{selectedEdge.source_id}</span>
                  </div>

                  {selectedEdge.timestamp && (
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 block">TIMESTAMP</span>
                      <span className="font-mono text-slate-300 text-[11px]">{selectedEdge.timestamp}</span>
                    </div>
                  )}

                  {selectedEdge.description && (
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 block">EVIDENCE DESCRIPTION</span>
                      <p className="text-slate-300 leading-relaxed bg-slate-900/50 p-2 rounded border border-slate-800 text-[11px]">
                        {selectedEdge.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Hidden Connection Findings Card */}
            {hiddenConnection && (
              <div className="rounded-lg bg-amber-950/30 border border-amber-500/50 p-3 mb-3">
                <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold mb-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>POTENTIAL INTERMEDIARY</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {hiddenConnection.candidate.label}
                </h4>
                <p className="text-xs text-amber-200/90 leading-relaxed mb-2">
                  {hiddenConnection.explanation}
                </p>

                <div className="text-[10px] font-mono text-slate-300 space-y-1 border-t border-amber-900/50 pt-2">
                  <div>
                    <span className="text-slate-500">CLUSTERS CONNECTED:</span>{' '}
                    <span className="text-amber-300">Cluster A ↔ Cluster B</span>
                  </div>
                  <div>
                    <span className="text-slate-500">SUPPORTING RECORDS:</span>{' '}
                    <span className="text-cyan-300">{hiddenConnection.evidence_sources.join(', ')}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Analytical Inference Label */}
            <div className="rounded-lg bg-cyan-950/30 border border-cyan-800/40 p-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 text-cyan-300 font-semibold mb-1 text-[11px]">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>ANALYTICAL INFERENCE</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Based on graph topology, CDR timestamps, and multi-record entity resolution. This is an analytical lead for prioritization, not a judicial conviction.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500 text-center">
            REQUIRES HUMAN INVESTIGATOR REVIEW
          </div>
        </div>

      </div>
      {/* BOTTOM: Investigation Timeline Slider */}
      <div className="mt-4 rounded-xl border border-slate-800 bg-[#0B0F19] p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
              INVESTIGATION TIMELINE SLIDER
            </span>
          </div>
          <span className="text-xs font-mono text-cyan-400 font-semibold">
            ACTIVE WINDOW: JAN 2026 ➔ {timelineDates[timelineIndex].label}
          </span>
        </div>

        <div className="relative py-2">
          <input
            type="range"
            min="0"
            max="4"
            step="1"
            value={timelineIndex}
            onChange={(e) => setTimelineIndex(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />

          <div className="flex justify-between text-[11px] font-mono mt-2">
            {timelineDates.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setTimelineIndex(idx)}
                className={`transition-colors ${
                  idx === timelineIndex
                    ? 'text-cyan-400 font-bold'
                    : idx < timelineIndex
                    ? 'text-slate-300'
                    : 'text-slate-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* HUMAN REVIEW MODAL */}
      {showResolutionsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="rounded-xl border border-slate-700 bg-[#0B0F19] max-w-2xl w-full p-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-bold text-white">
                  Entity Resolution — Human Review Queue
                </h2>
              </div>
              <button
                onClick={() => setShowResolutionsModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              ULUKA calculates weighted match probabilities between noisy records. Human investigators retain final authority to Accept, Reject, or Keep Unresolved. Rejecting preserves all original source records.
            </p>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {resolutions.map((res) => (
                <div key={res.id} className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-cyan-400 font-bold">{res.id}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-300">
                        MATCH PROBABILITY:
                      </span>
                      <span
                        className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                          res.matchScore >= 80
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}
                      >
                        {res.matchScore}%
                      </span>
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${
                          res.status === 'ACCEPTED'
                            ? 'bg-emerald-900/60 text-emerald-200'
                            : res.status === 'REJECTED'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {res.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-500 block mb-1">RECORD A</span>
                      <div className="font-bold text-white">{res.recordA.name}</div>
                      {res.recordA.phone && <div className="text-slate-300 font-mono text-[11px] mt-0.5">Phone: {res.recordA.phone}</div>}
                      {res.recordA.vehicle && <div className="text-slate-300 font-mono text-[11px]">Vehicle: {res.recordA.vehicle}</div>}
                      <div className="text-[10px] text-slate-500 mt-1">Source: {res.recordA.source}</div>
                    </div>

                    <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                      <span className="text-[10px] font-mono text-slate-500 block mb-1">RECORD B</span>
                      <div className="font-bold text-white">{res.recordB.name}</div>
                      {res.recordB.phone && <div className="text-slate-300 font-mono text-[11px] mt-0.5">Phone: {res.recordB.phone}</div>}
                      {res.recordB.vehicle && <div className="text-slate-300 font-mono text-[11px]">Vehicle: {res.recordB.vehicle}</div>}
                      <div className="text-[10px] text-slate-500 mt-1">Source: {res.recordB.source}</div>
                    </div>
                  </div>

                  <div className="space-y-1 mb-3 text-[11px] text-slate-300">
                    {res.reasons.map((reason: string, i: number) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="text-cyan-400">✓</span>
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-900">
                    <button
                      onClick={() => handleResolutionDecision(res.id, 'ACCEPTED')}
                      className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                        res.status === 'ACCEPTED'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      ACCEPT MATCH
                    </button>

                    <button
                      onClick={() => handleResolutionDecision(res.id, 'REJECTED')}
                      className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                        res.status === 'REJECTED'
                          ? 'bg-rose-600 text-white'
                          : 'bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800'
                      }`}
                    >
                      REJECT MATCH
                    </button>

                    <button
                      onClick={() => handleResolutionDecision(res.id, 'UNRESOLVED')}
                      className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                        res.status === 'UNRESOLVED'
                          ? 'bg-slate-700 text-slate-100'
                          : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                      }`}
                    >
                      KEEP UNRESOLVED
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowResolutionsModal(false)}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
              >
                CLOSE QUEUE
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
