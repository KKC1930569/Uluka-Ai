import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ChallengeBoardNode, 
  ChallengeBoardEdge, 
  EntityType,
  ChallengeEntity
} from '../../types';
import { 
  Plus, 
  Minus,
  X, 
  Link2, 
  Share2,
  Maximize2,
  RotateCcw,
  Layers,
  Sparkles
} from 'lucide-react';
import { SymbolLegend } from '../common/SymbolLegend';

interface InvestigationBoardProps {
  nodes: ChallengeBoardNode[];
  edges: ChallengeBoardEdge[];
  availableEntities?: ChallengeEntity[];
  onAddNode: (node: ChallengeBoardNode) => void;
  onRemoveNode: (nodeId: string) => void;
  onUpdateNodePosition: (nodeId: string, x: number, y: number) => void;
  onAddEdge: (source: string, target: string, label: string) => void;
  onRemoveEdge: (edgeId: string) => void;
  onUserActivity: () => void;
}

const ENTITY_COLORS: Record<EntityType, { bg: string; border: string; text: string; badge: string }> = {
  SUSPECT: { bg: 'bg-purple-950/80', border: 'border-purple-500/70', text: 'text-purple-300', badge: 'bg-purple-900 text-purple-200' },
  PHONE: { bg: 'bg-amber-950/80', border: 'border-amber-500/70', text: 'text-amber-300', badge: 'bg-amber-900 text-amber-200' },
  VEHICLE: { bg: 'bg-emerald-950/80', border: 'border-emerald-500/70', text: 'text-emerald-300', badge: 'bg-emerald-900 text-emerald-200' },
  LOCATION: { bg: 'bg-sky-950/80', border: 'border-sky-500/70', text: 'text-sky-300', badge: 'bg-sky-900 text-sky-200' },
  ACCOUNT: { bg: 'bg-cyan-950/80', border: 'border-cyan-500/70', text: 'text-cyan-300', badge: 'bg-cyan-900 text-cyan-200' },
  ORGANIZATION: { bg: 'bg-indigo-950/80', border: 'border-indigo-500/70', text: 'text-indigo-300', badge: 'bg-indigo-900 text-indigo-200' },
  DEVICE: { bg: 'bg-rose-950/80', border: 'border-rose-500/70', text: 'text-rose-300', badge: 'bg-rose-900 text-rose-200' },
  EVIDENCE: { bg: 'bg-red-950/80', border: 'border-red-500/70', text: 'text-red-300', badge: 'bg-red-900 text-red-200' },
  DOCUMENT: { bg: 'bg-slate-900/90', border: 'border-slate-500/70', text: 'text-slate-300', badge: 'bg-slate-800 text-slate-200' },
  EVENT: { bg: 'bg-yellow-950/80', border: 'border-yellow-500/70', text: 'text-yellow-300', badge: 'bg-yellow-900 text-yellow-200' }
};

const COMMON_RELATIONSHIPS = [
  'Associated With',
  'Calls / Contacted',
  'Transfers Funds to',
  'Seen At / Located at',
  'Operates / Controls',
  'Seen Driving',
  'Direct Link',
  'Contradicts Alibi',
  'Suspected Accomplice'
];

export const InvestigationBoard: React.FC<InvestigationBoardProps> = ({
  nodes,
  edges,
  availableEntities = [],
  onAddNode,
  onRemoveNode,
  onUpdateNodePosition,
  onAddEdge,
  onRemoveEdge,
  onUserActivity
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Zoom & Pan state
  const [zoom, setZoom] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return 0.8;
    }
    return 1;
  });
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Canvas pan state
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const touchDistanceRef = useRef<number | null>(null);

  // Connection creation state
  const [connectingSourceId, setConnectingSourceId] = useState<string | null>(null);
  const [pendingTargetId, setPendingTargetId] = useState<string | null>(null);
  const [edgeLabel, setEdgeLabel] = useState<string>(COMMON_RELATIONSHIPS[0]);
  const [customEdgeLabel, setCustomEdgeLabel] = useState<string>('');
  const [showEdgeModal, setShowEdgeModal] = useState<boolean>(false);

  // Add Node Modal State (existing entity or custom entity)
  const [showAddNodeModal, setShowAddNodeModal] = useState<boolean>(false);
  const [addNodeTab, setAddNodeTab] = useState<'EXISTING' | 'CUSTOM'>('EXISTING');
  const [selectedExistingEntityId, setSelectedExistingEntityId] = useState<string>('');
  const [customNodeLabel, setCustomNodeLabel] = useState<string>('');
  const [customNodeType, setCustomNodeType] = useState<EntityType>('EVIDENCE');
  const [customNodeDesc, setCustomNodeDesc] = useState<string>('');

  // Initial connection state when adding node
  const [addWithConnection, setAddWithConnection] = useState<boolean>(false);
  const [connectTargetNodeId, setConnectTargetNodeId] = useState<string>('');
  const [connectRelationLabel, setConnectRelationLabel] = useState<string>(COMMON_RELATIONSHIPS[0]);
  const [connectCustomRelationLabel, setConnectCustomRelationLabel] = useState<string>('');

  // Dragging state (mouse & touch)
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Filter available entities that are not yet on the board
  const unaddedEntities = availableEntities.filter(
    ent => !nodes.some(n => n.id === ent.id)
  );

  // Apply zoom anchored at canvas center
  const applyZoom = useCallback((newZoom: number) => {
    const clamped = Math.max(0.35, Math.min(2.0, Number(newZoom.toFixed(2))));
    if (!containerRef.current) {
      setZoom(clamped);
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = (rect.width / 2 - pan.x) / zoom;
    const centerY = (rect.height / 2 - pan.y) / zoom;

    const newPanX = rect.width / 2 - (centerX * clamped);
    const newPanY = rect.height / 2 - (centerY * clamped);

    setZoom(clamped);
    setPan({ x: Math.round(newPanX), y: Math.round(newPanY) });
  }, [pan.x, pan.y, zoom]);

  const handleZoomIn = () => {
    onUserActivity();
    applyZoom(zoom + 0.2);
  };

  const handleZoomOut = () => {
    onUserActivity();
    applyZoom(zoom - 0.2);
  };

  const handleResetZoom = () => {
    onUserActivity();
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleFitGraph = useCallback(() => {
    onUserActivity();
    if (nodes.length === 0) {
      setZoom(1);
      setPan({ x: 0, y: 0 });
      return;
    }

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    const minX = Math.min(...nodes.map(n => n.x));
    const maxX = Math.max(...nodes.map(n => n.x + 210));
    const minY = Math.min(...nodes.map(n => n.y));
    const maxY = Math.max(...nodes.map(n => n.y + 110));

    const contentW = maxX - minX + 80;
    const contentH = maxY - minY + 80;

    const scaleX = rect.width / Math.max(contentW, 100);
    const scaleY = rect.height / Math.max(contentH, 100);
    const fitScale = Math.max(0.35, Math.min(1.1, Number(Math.min(scaleX, scaleY).toFixed(2))));

    const contentCenterX = (minX + maxX) / 2;
    const contentCenterY = (minY + maxY) / 2;

    const newPanX = (rect.width / 2) - (contentCenterX * fitScale);
    const newPanY = (rect.height / 2) - (contentCenterY * fitScale);

    setZoom(fitScale);
    setPan({ x: Math.round(newPanX), y: Math.round(newPanY) });
  }, [nodes, onUserActivity]);

  // Wheel zoom support with Ctrl key or direct wheel
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheelNative = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.15 : -0.15;
        applyZoom(zoom + delta);
      }
    };

    container.addEventListener('wheel', onWheelNative, { passive: false });
    return () => {
      container.removeEventListener('wheel', onWheelNative);
    };
  }, [zoom, applyZoom]);

  // Node drag start
  const startDrag = (clientX: number, clientY: number, nodeId: string) => {
    onUserActivity();
    const node = nodes.find(n => n.id === nodeId);
    if (!node || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const mouseCanvasX = (clientX - rect.left - pan.x) / zoom;
    const mouseCanvasY = (clientY - rect.top - pan.y) / zoom;

    setDraggingNodeId(nodeId);
    setDragOffset({
      x: mouseCanvasX - node.x,
      y: mouseCanvasY - node.y
    });
  };

  // Node drag move
  const moveDrag = (clientX: number, clientY: number) => {
    if (!draggingNodeId || !containerRef.current) return;
    onUserActivity();

    const rect = containerRef.current.getBoundingClientRect();
    const mouseCanvasX = (clientX - rect.left - pan.x) / zoom;
    const mouseCanvasY = (clientY - rect.top - pan.y) / zoom;

    const newX = Math.max(10, Math.min(2600, mouseCanvasX - dragOffset.x));
    const newY = Math.max(10, Math.min(2000, mouseCanvasY - dragOffset.y));

    onUpdateNodePosition(draggingNodeId, Math.round(newX), Math.round(newY));
  };

  // Canvas pan start
  const startPan = (clientX: number, clientY: number) => {
    onUserActivity();
    setIsPanning(true);
    setPanStart({
      x: clientX - pan.x,
      y: clientY - pan.y
    });
  };

  // Canvas pan move
  const movePan = (clientX: number, clientY: number) => {
    if (!isPanning) return;
    onUserActivity();
    setPan({
      x: Math.round(clientX - panStart.x),
      y: Math.round(clientY - panStart.y)
    });
  };

  const endDragOrPan = () => {
    if (draggingNodeId) {
      setDraggingNodeId(null);
    }
    if (isPanning) {
      setIsPanning(false);
    }
    touchDistanceRef.current = null;
  };

  // Mouse handlers
  const handleMouseDownCanvas = (e: React.MouseEvent) => {
    if (e.button === 0) {
      startPan(e.clientX, e.clientY);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingNodeId) {
      moveDrag(e.clientX, e.clientY);
    } else if (isPanning) {
      movePan(e.clientX, e.clientY);
    }
  };

  const handleMouseDownNode = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    startDrag(e.clientX, e.clientY, nodeId);
  };

  // Touch handlers
  const handleTouchStartCanvas = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      startPan(touch.clientX, touch.clientY);
    } else if (e.touches.length === 2) {
      setIsPanning(false);
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchDistanceRef.current = dist;
    }
  };

  const handleTouchStartNode = (e: React.TouchEvent, nodeId: string) => {
    e.stopPropagation();
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      startDrag(touch.clientX, touch.clientY, nodeId);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      if (draggingNodeId) {
        moveDrag(touch.clientX, touch.clientY);
      } else if (isPanning) {
        movePan(touch.clientX, touch.clientY);
      }
    } else if (e.touches.length === 2 && touchDistanceRef.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const delta = dist - touchDistanceRef.current;
      if (Math.abs(delta) > 12) {
        const factor = delta > 0 ? 0.05 : -0.05;
        applyZoom(zoom + factor);
        touchDistanceRef.current = dist;
      }
    }
  };

  const handleStartConnect = (e: React.MouseEvent | React.TouchEvent, nodeId: string) => {
    e.stopPropagation();
    onUserActivity();
    if (connectingSourceId === nodeId) {
      setConnectingSourceId(null);
    } else {
      setConnectingSourceId(nodeId);
    }
  };

  const handleNodeClick = (nodeId: string) => {
    onUserActivity();
    if (connectingSourceId) {
      if (connectingSourceId === nodeId) {
        setConnectingSourceId(null);
        return;
      }
      const existing = edges.find(
        e => (e.source === connectingSourceId && e.target === nodeId) ||
             (e.source === nodeId && e.target === connectingSourceId)
      );
      if (existing) {
        alert('A connection already exists between these entities!');
        setConnectingSourceId(null);
        return;
      }

      setPendingTargetId(nodeId);
      setShowEdgeModal(true);
    }
  };

  const handleConfirmConnection = () => {
    if (!connectingSourceId || !pendingTargetId) return;
    onUserActivity();
    const finalLabel = customEdgeLabel.trim() || edgeLabel;
    onAddEdge(connectingSourceId, pendingTargetId, finalLabel);
    setConnectingSourceId(null);
    setPendingTargetId(null);
    setShowEdgeModal(false);
    setCustomEdgeLabel('');
  };

  const handleOpenAddNodeModal = () => {
    onUserActivity();
    if (unaddedEntities.length > 0) {
      setAddNodeTab('EXISTING');
      setSelectedExistingEntityId(unaddedEntities[0].id);
    } else {
      setAddNodeTab('CUSTOM');
    }
    if (nodes.length > 0) {
      setConnectTargetNodeId(nodes[0].id);
    }
    setShowAddNodeModal(true);
  };

  const handleAddNodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUserActivity();

    let defaultX = 60 + Math.floor(Math.random() * 80);
    let defaultY = 60 + Math.floor(Math.random() * 80);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const viewCenterX = (rect.width / 2 - pan.x) / zoom;
      const viewCenterY = (rect.height / 2 - pan.y) / zoom;
      defaultX = Math.max(20, Math.round(viewCenterX - 105 + (Math.random() * 60 - 30)));
      defaultY = Math.max(20, Math.round(viewCenterY - 40 + (Math.random() * 60 - 30)));
    }

    let newNode: ChallengeBoardNode;

    if (addNodeTab === 'EXISTING') {
      const selectedEntity = availableEntities.find(ent => ent.id === selectedExistingEntityId);
      if (!selectedEntity) {
        alert('Please select an entity from the case data.');
        return;
      }
      newNode = {
        id: selectedEntity.id,
        label: selectedEntity.label,
        type: selectedEntity.type,
        description: selectedEntity.description,
        x: defaultX,
        y: defaultY,
        isCustom: false
      };
    } else {
      if (!customNodeLabel.trim()) return;
      newNode = {
        id: `CUSTOM_${Date.now()}`,
        label: customNodeLabel.trim(),
        type: customNodeType,
        description: customNodeDesc.trim() || 'Custom entity identified by investigator.',
        x: defaultX,
        y: defaultY,
        isCustom: true
      };
    }

    onAddNode(newNode);

    if (addWithConnection && connectTargetNodeId) {
      const finalRel = connectCustomRelationLabel.trim() || connectRelationLabel;
      onAddEdge(newNode.id, connectTargetNodeId, finalRel);
    }

    // Reset state
    setCustomNodeLabel('');
    setCustomNodeDesc('');
    setSelectedExistingEntityId('');
    setAddWithConnection(false);
    setConnectTargetNodeId('');
    setConnectCustomRelationLabel('');
    setShowAddNodeModal(false);
  };

  const sourceNodeObj = nodes.find(n => n.id === connectingSourceId);
  const targetNodeObj = nodes.find(n => n.id === pendingTargetId);

  return (
    <div className="space-y-3">
      {/* Investigation Billboard Container */}
      <div className="relative w-full h-[450px] sm:h-[500px] lg:h-[560px] bg-[#070B14] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col select-none touch-none">
        {/* Top Billboard Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-5 py-2.5 sm:py-3 border-b border-slate-800/80 bg-slate-950/90 z-20">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400">
              <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="truncate max-w-[130px] sm:max-w-none">INVESTIGATION BILLBOARD</span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 shrink-0">
              {nodes.length} DOTS • {edges.length} LINKS
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {connectingSourceId && (
              <div className="flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded bg-amber-500/20 border border-amber-500/50 text-amber-300 text-[10px] sm:text-xs font-mono animate-pulse">
                <span className="truncate max-w-[100px] sm:max-w-[150px]">Link: <strong>{sourceNodeObj?.label}</strong></span>
                <button 
                  onClick={() => setConnectingSourceId(null)}
                  className="text-amber-400 hover:text-white underline font-bold px-1"
                >
                  ✕
                </button>
              </div>
            )}

            <button
              onClick={handleOpenAddNodeModal}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/40 text-[11px] sm:text-xs text-sky-300 font-bold transition-colors shrink-0"
              title="Add a node from case data or create custom node"
            >
              <Plus className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Add Node</span>
            </button>
          </div>
        </div>

      {/* Main Canvas Viewport */}
      <div 
        ref={containerRef}
        onMouseDown={handleMouseDownCanvas}
        onMouseMove={handleMouseMove}
        onMouseUp={endDragOrPan}
        onMouseLeave={endDragOrPan}
        onTouchStart={handleTouchStartCanvas}
        onTouchMove={handleTouchMove}
        onTouchEnd={endDragOrPan}
        onTouchCancel={endDragOrPan}
        className={`relative flex-1 w-full h-full overflow-hidden bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] ${
          isPanning ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* Scalable & Pannable Graph World */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
            width: '2800px',
            height: '2000px',
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none'
          }}
        >
          {/* SVG Layer for Connections */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
            width="2800"
            height="2000"
          >
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
              </marker>
            </defs>

            {edges.map(edge => {
              const src = nodes.find(n => n.id === edge.source);
              const tgt = nodes.find(n => n.id === edge.target);
              if (!src || !tgt) return null;

              // Card center estimations: width 210px, height approx 80px
              const x1 = src.x + 105;
              const y1 = src.y + 40;
              const x2 = tgt.x + 105;
              const y2 = tgt.y + 40;

              const midX = (x1 + x2) / 2;
              const midY = (y1 + y2) / 2;

              return (
                <g key={edge.id} className="pointer-events-auto group">
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#0284c7"
                    strokeWidth="3"
                    strokeOpacity="0.4"
                  />
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#38bdf8"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                    markerEnd="url(#arrow)"
                  />

                  <foreignObject
                    x={midX - 110}
                    y={midY - 20}
                    width="220"
                    height="48"
                    className="overflow-visible"
                  >
                    <div className="flex items-center justify-center w-full h-full">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/95 border border-sky-500/60 shadow-xl text-xs font-mono font-semibold text-sky-200 group-hover:border-rose-500 transition-colors pointer-events-auto max-w-[210px] text-center leading-snug">
                        <span className="whitespace-normal break-words">{edge.label}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onUserActivity();
                            onRemoveEdge(edge.id);
                          }}
                          className="text-slate-400 hover:text-rose-400 p-0.5 shrink-0"
                          title="Delete Connection"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>

          {/* Nodes Layer - Standard size across PC and Mobile */}
          {nodes.map(node => {
            const colors = ENTITY_COLORS[node.type] || ENTITY_COLORS.DOCUMENT;
            const isSelectedSource = connectingSourceId === node.id;

            return (
              <div
                key={node.id}
                style={{ left: `${node.x}px`, top: `${node.y}px` }}
                onClick={() => handleNodeClick(node.id)}
                onTouchStart={(e) => handleTouchStartNode(e, node.id)}
                className={`pointer-events-auto absolute w-[210px] rounded-xl border p-3 cursor-pointer shadow-xl transition-shadow z-20 touch-manipulation ${colors.bg} ${colors.border} ${
                  isSelectedSource 
                    ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-[#070B14] scale-105' 
                    : 'hover:border-slate-400'
                }`}
              >
                <div 
                  className="flex items-center justify-between pb-1 mb-1 border-b border-slate-800/60 cursor-grab active:cursor-grabbing touch-none"
                  onMouseDown={(e) => handleMouseDownNode(e, node.id)}
                >
                  <span className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${colors.badge}`}>
                    {node.type}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleStartConnect(e, node.id)}
                      className={`p-1.5 rounded hover:bg-slate-800 transition-colors ${
                        isSelectedSource ? 'text-amber-400' : 'text-slate-400 hover:text-sky-300'
                      }`}
                      title={isSelectedSource ? 'Cancel Connection' : 'Connect to another node'}
                    >
                      <Link2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUserActivity();
                        onRemoveNode(node.id);
                      }}
                      className="p-1.5 rounded hover:bg-slate-800 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Remove from Billboard"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-xs font-bold text-white truncate mb-0.5">
                  {node.label}
                </div>
                {node.description && (
                  <div className="text-[10px] text-slate-300 line-clamp-2 leading-tight">
                    {node.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-6 pointer-events-none z-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-2 sm:mb-3">
              <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-300 mb-1">
              THE BILLBOARD IS EMPTY
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 max-w-xs leading-relaxed mb-3">
              Read evidence clues below and click <strong className="text-slate-300">+ Add to Board</strong> to place suspect entities, vehicles, and phones here.
            </p>
            <div className="text-[10px] sm:text-[11px] font-mono text-cyan-400">
              Drag nodes to move • Drag background to pan • Use + / − to zoom
            </div>
          </div>
        )}

        {/* Floating Zoom & Fit Controls (Touch-friendly & Desktop-ready) */}
        <div 
          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-30 flex items-center bg-slate-950/95 backdrop-blur-md border border-slate-700/90 rounded-xl shadow-2xl p-1 gap-1 select-none"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          {/* Zoom Out Button (−) */}
          <button
            type="button"
            onClick={handleZoomOut}
            title="Zoom Out (−)"
            aria-label="Zoom Out"
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-slate-200 hover:text-white border border-slate-800 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>

          {/* Reset Zoom Button (Percentage) */}
          <button
            type="button"
            onClick={handleResetZoom}
            title="Reset Zoom (100%)"
            aria-label="Reset Zoom"
            className="px-2 h-8 sm:h-9 flex items-center justify-center rounded-lg bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-slate-300 hover:text-white border border-slate-800 text-[11px] sm:text-xs font-mono font-bold transition-colors"
          >
            <RotateCcw className="w-3 h-3 mr-1 text-slate-400" />
            <span>{Math.round(zoom * 100)}%</span>
          </button>

          {/* Zoom In Button (+) */}
          <button
            type="button"
            onClick={handleZoomIn}
            title="Zoom In (+)"
            aria-label="Zoom In"
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-slate-200 hover:text-white border border-slate-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-5 bg-slate-800 mx-0.5" />

          {/* Fit Graph Button */}
          <button
            type="button"
            onClick={handleFitGraph}
            title="Fit All Nodes in View"
            aria-label="Fit Graph"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 h-8 sm:h-9 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 active:bg-sky-500/30 text-sky-400 hover:text-sky-300 border border-sky-500/40 text-[11px] sm:text-xs font-semibold font-mono transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Fit Graph</span>
          </button>
        </div>
      </div>
    </div>

      {/* Connect Modal */}
      {showEdgeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
          <div className="bg-slate-950 border border-sky-500/50 rounded-2xl p-4 sm:p-6 max-w-md w-full shadow-2xl my-auto max-h-[90vh] flex flex-col">
            <h3 className="text-xs sm:text-sm font-mono font-bold text-sky-400 mb-2 flex items-center gap-2">
              <Link2 className="w-4 h-4 shrink-0" />
              <span>ESTABLISH INVESTIGATIVE RELATIONSHIP</span>
            </h3>
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              Connecting <strong>{sourceNodeObj?.label}</strong> → <strong>{targetNodeObj?.label}</strong>
            </p>

            <div className="mb-4 overflow-y-auto flex-1 pr-1">
              <label className="block text-[11px] font-mono text-slate-400 mb-1.5">
                Select Relationship Type:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3">
                {COMMON_RELATIONSHIPS.map(rel => (
                  <button
                    key={rel}
                    type="button"
                    onClick={() => { setEdgeLabel(rel); setCustomEdgeLabel(''); }}
                    className={`px-3 py-2 rounded-lg text-left text-xs font-medium border transition-colors ${
                      edgeLabel === rel && !customEdgeLabel
                        ? 'border-sky-500 bg-sky-950/60 text-sky-200'
                        : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {rel}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Or type custom relationship..."
                value={customEdgeLabel}
                onChange={(e) => setCustomEdgeLabel(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => { setShowEdgeModal(false); setConnectingSourceId(null); }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmConnection}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold shadow-lg shadow-sky-500/20 text-center"
              >
                Create Connection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Symbol Legend Section */}
      <SymbolLegend />

      {/* Comprehensive Add Node Modal */}
      {showAddNodeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
          <form onSubmit={handleAddNodeSubmit} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-6 max-w-lg w-full shadow-2xl my-auto max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-sky-400" />
                <h3 className="text-xs sm:text-sm font-mono font-bold text-white uppercase">
                  ADD NODE TO BILLBOARD
                </h3>
              </div>
              <button 
                type="button"
                onClick={() => setShowAddNodeModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mode Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setAddNodeTab('EXISTING')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold transition-colors flex items-center justify-center gap-1.5 ${
                  addNodeTab === 'EXISTING'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/50'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Case Evidence ({unaddedEntities.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setAddNodeTab('CUSTOM')}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold transition-colors flex items-center justify-center gap-1.5 ${
                  addNodeTab === 'CUSTOM'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Create Custom Entity</span>
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto flex-1 pr-1 mb-4">
              {/* TAB 1: Existing Entities */}
              {addNodeTab === 'EXISTING' && (
                <div>
                  {unaddedEntities.length > 0 ? (
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-2">
                        Select Case Entity to Place on Billboard:
                      </label>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {unaddedEntities.map(ent => {
                          const isSelected = selectedExistingEntityId === ent.id;
                          const colors = ENTITY_COLORS[ent.type] || ENTITY_COLORS.DOCUMENT;
                          return (
                            <div
                              key={ent.id}
                              onClick={() => setSelectedExistingEntityId(ent.id)}
                              className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-2 ${
                                isSelected
                                  ? 'border-sky-500 bg-sky-950/40 ring-1 ring-sky-400'
                                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                              }`}
                            >
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded ${colors.badge}`}>
                                    {ent.type}
                                  </span>
                                  <span className="text-xs font-bold text-white truncate">
                                    {ent.label}
                                  </span>
                                </div>
                                <p className="text-[10px] text-slate-400 line-clamp-2">
                                  {ent.description}
                                </p>
                              </div>
                              <input 
                                type="radio" 
                                name="selectedEntity" 
                                checked={isSelected}
                                onChange={() => setSelectedExistingEntityId(ent.id)}
                                className="mt-1 accent-sky-400"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                      <p className="text-xs text-slate-400 mb-2">
                        All identified case entities have already been added to the billboard.
                      </p>
                      <button
                        type="button"
                        onClick={() => setAddNodeTab('CUSTOM')}
                        className="text-xs font-bold text-amber-400 hover:underline"
                      >
                        Create a custom entity instead →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Custom Entity */}
              {addNodeTab === 'CUSTOM' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Entity Name / Label:
                    </label>
                    <input
                      type="text"
                      required={addNodeTab === 'CUSTOM'}
                      placeholder="e.g. Rs 50,000 Hawala Transfer, Red SUV, Warehouse Dock 3"
                      value={customNodeLabel}
                      onChange={(e) => setCustomNodeLabel(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Entity Category / Type:
                    </label>
                    <select
                      value={customNodeType}
                      onChange={(e) => setCustomNodeType(e.target.value as EntityType)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="SUSPECT">Suspect / Individual</option>
                      <option value="VEHICLE">Vehicle / Automobile</option>
                      <option value="PHONE">Phone / SIM Line</option>
                      <option value="DEVICE">Device / Hardware</option>
                      <option value="LOCATION">Location / Facility</option>
                      <option value="ORGANIZATION">Organization / Business</option>
                      <option value="ACCOUNT">Account / Financial</option>
                      <option value="EVIDENCE">Evidence / Record</option>
                      <option value="EVENT">Event / Timeline</option>
                      <option value="DOCUMENT">Document</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Investigator Notes / Details:
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Why is this node relevant to the investigation?"
                      value={customNodeDesc}
                      onChange={(e) => setCustomNodeDesc(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none"
                    />
                  </div>
                </div>
              )}

              {/* OPTIONAL CONNECTION BUILDER */}
              {nodes.length > 0 && (
                <div className="pt-3 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      id="addWithConn"
                      checked={addWithConnection}
                      onChange={(e) => setAddWithConnection(e.target.checked)}
                      className="accent-sky-500 rounded"
                    />
                    <label htmlFor="addWithConn" className="text-xs font-mono font-bold text-sky-300 cursor-pointer flex items-center gap-1.5">
                      <Link2 className="w-3.5 h-3.5 text-sky-400" />
                      <span>Connect to an existing node on billboard</span>
                    </label>
                  </div>

                  {addWithConnection && (
                    <div className="p-3 bg-slate-900/70 border border-slate-800 rounded-xl space-y-2.5">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 mb-1">
                          Select Target Node:
                        </label>
                        <select
                          value={connectTargetNodeId}
                          onChange={(e) => setConnectTargetNodeId(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-sky-500"
                        >
                          {nodes.map(n => (
                            <option key={n.id} value={n.id}>
                              {n.label} ({n.type})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 mb-1">
                          Relationship Type:
                        </label>
                        <div className="grid grid-cols-2 gap-1 mb-2">
                          {COMMON_RELATIONSHIPS.slice(0, 6).map(rel => (
                            <button
                              key={rel}
                              type="button"
                              onClick={() => { setConnectRelationLabel(rel); setConnectCustomRelationLabel(''); }}
                              className={`px-2 py-1 rounded text-left text-[10px] font-medium border transition-colors ${
                                connectRelationLabel === rel && !connectCustomRelationLabel
                                  ? 'border-sky-500 bg-sky-950/70 text-sky-200'
                                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                              }`}
                            >
                              {rel}
                            </button>
                          ))}
                        </div>
                        <input
                          type="text"
                          placeholder="Or type custom relationship..."
                          value={connectCustomRelationLabel}
                          onChange={(e) => setConnectCustomRelationLabel(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddNodeModal(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold shadow-lg shadow-sky-500/20 text-center"
              >
                Place Node on Billboard
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
