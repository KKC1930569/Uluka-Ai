import React, { useState } from 'react';
import { 
  ChallengeClue, 
  ChallengeBoardNode, 
  ClueCategory, 
  ChallengeEntity 
} from '../../types';
import { 
  CheckCircle2, 
  Trash2, 
  RotateCcw, 
  Edit3, 
  Share2, 
  Clock, 
  MapPin, 
  Plus, 
  Check, 
  Search
} from 'lucide-react';

interface ClueInspectorProps {
  clues: ChallengeClue[];
  boardNodes: ChallengeBoardNode[];
  onToggleReview: (clueId: string) => void;
  onToggleDiscard: (clueId: string) => void;
  onUpdateNotes: (clueId: string, notes: string) => void;
  onAddEntityToBoard: (entity: ChallengeEntity) => void;
  onUserActivity: () => void;
}

const CATEGORY_COLORS: Record<ClueCategory, { bg: string; text: string; border: string }> = {
  TELECOM: { bg: 'bg-amber-950/60', text: 'text-amber-300', border: 'border-amber-800/60' },
  FINANCIAL: { bg: 'bg-emerald-950/60', text: 'text-emerald-300', border: 'border-emerald-800/60' },
  SURVEILLANCE: { bg: 'bg-sky-950/60', text: 'text-sky-300', border: 'border-sky-800/60' },
  LOGISTICS: { bg: 'bg-indigo-950/60', text: 'text-indigo-300', border: 'border-indigo-800/60' },
  FORENSICS: { bg: 'bg-rose-950/60', text: 'text-rose-300', border: 'border-rose-800/60' },
  DIGITAL: { bg: 'bg-cyan-950/60', text: 'text-cyan-300', border: 'border-cyan-800/60' },
  INFORMANT: { bg: 'bg-purple-950/60', text: 'text-purple-300', border: 'border-purple-800/60' },
  DOCUMENT: { bg: 'bg-slate-900/80', text: 'text-slate-300', border: 'border-slate-700/60' }
};

export const ClueInspector: React.FC<ClueInspectorProps> = ({
  clues,
  boardNodes,
  onToggleReview,
  onToggleDiscard,
  onUpdateNotes,
  onAddEntityToBoard,
  onUserActivity
}) => {
  const [activeTab, setActiveTab] = useState<'ACTIVE' | 'REVIEWED' | 'DISCARDED'>('ACTIVE');
  const [selectedClueId, setSelectedClueId] = useState<string | null>(clues[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedClue = clues.find(c => c.id === selectedClueId) || null;

  // Filter clues
  const filteredClues = clues.filter(clue => {
    if (activeTab === 'ACTIVE' && clue.isDiscarded) return false;
    if (activeTab === 'REVIEWED' && (!clue.isReviewed || clue.isDiscarded)) return false;
    if (activeTab === 'DISCARDED' && !clue.isDiscarded) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = clue.title.toLowerCase().includes(q);
      const matchContent = clue.content.toLowerCase().includes(q);
      const matchPreview = clue.preview.toLowerCase().includes(q);
      if (!matchTitle && !matchContent && !matchPreview) return false;
    }

    return true;
  });

  const activeCount = clues.filter(c => !c.isDiscarded).length;
  const reviewedCount = clues.filter(c => c.isReviewed && !c.isDiscarded).length;
  const discardedCount = clues.filter(c => c.isDiscarded).length;

  const handleSelectClue = (id: string) => {
    onUserActivity();
    setSelectedClueId(id);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full">
      {/* Clues List Column */}
      <div className="lg:col-span-5 flex flex-col rounded-2xl border border-slate-800 bg-[#0B0F19] p-4 shadow-xl">
        {/* Navigation Tabs */}
        <div className="flex gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800/80 mb-3 text-xs font-mono">
          <button
            onClick={() => { onUserActivity(); setActiveTab('ACTIVE'); }}
            className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all ${
              activeTab === 'ACTIVE'
                ? 'bg-slate-800 text-white font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ACTIVE ({activeCount})
          </button>
          <button
            onClick={() => { onUserActivity(); setActiveTab('REVIEWED'); }}
            className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all ${
              activeTab === 'REVIEWED'
                ? 'bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            REVIEWED ({reviewedCount})
          </button>
          <button
            onClick={() => { onUserActivity(); setActiveTab('DISCARDED'); }}
            className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all ${
              activeTab === 'DISCARDED'
                ? 'bg-rose-950 border border-rose-800 text-rose-300 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            DISCARDED ({discardedCount})
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search clues by keyword, vehicle, phone..."
            value={searchQuery}
            onChange={(e) => { onUserActivity(); setSearchQuery(e.target.value); }}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>

        {/* Clue Scroll List */}
        <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[520px] pr-1">
          {filteredClues.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 font-mono">
              No clues in this view.
            </div>
          ) : (
            filteredClues.map(clue => {
              const isSelected = selectedClueId === clue.id;
              const catTheme = CATEGORY_COLORS[clue.category] || CATEGORY_COLORS.SURVEILLANCE;

              return (
                <div
                  key={clue.id}
                  onClick={() => handleSelectClue(clue.id)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'border-cyan-500 bg-slate-900/90 shadow-md ring-1 ring-cyan-500/40'
                      : 'border-slate-800/80 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                    <span className={`px-2 py-0.5 rounded border font-bold ${catTheme.bg} ${catTheme.text} ${catTheme.border}`}>
                      {clue.category}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {clue.isReviewed && (
                        <span className="inline-flex items-center gap-0.5 text-emerald-400 font-bold" title="Marked as Reviewed">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>REVIEWED</span>
                        </span>
                      )}

                      {clue.userNotes && (
                        <span className="text-amber-400 font-bold" title="Investigator notes attached">
                          <Edit3 className="w-3 h-3" />
                        </span>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onUserActivity();
                          onToggleDiscard(clue.id);
                        }}
                        className={`p-1 rounded hover:bg-slate-800 transition-colors ${
                          clue.isDiscarded ? 'text-rose-400 hover:text-emerald-400' : 'text-slate-500 hover:text-rose-400'
                        }`}
                        title={clue.isDiscarded ? 'Restore Clue' : 'Discard Clue'}
                      >
                        {clue.isDiscarded ? <RotateCcw className="w-3 h-3" /> : <Trash2 className="w-3 h-3" />}
                      </button>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-white mb-1 line-clamp-1">
                    {clue.title}
                  </h4>

                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {clue.preview}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Clue Inspector & Entity Extractor Column */}
      <div className="lg:col-span-7 flex flex-col rounded-2xl border border-slate-800 bg-[#0B0F19] p-5 shadow-xl">
        {selectedClue ? (
          <div className="flex flex-col h-full">
            {/* Header / Classification Bar */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  INTELLIGENCE DOSSIER // {selectedClue.id}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => { onUserActivity(); onToggleReview(selectedClue.id); }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    selectedClue.isReviewed
                      ? 'border-emerald-500 bg-emerald-950/60 text-emerald-300'
                      : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{selectedClue.isReviewed ? 'Marked Reviewed ✓' : 'Mark as Reviewed'}</span>
                </button>

                <button
                  onClick={() => { onUserActivity(); onToggleDiscard(selectedClue.id); }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    selectedClue.isDiscarded
                      ? 'border-emerald-600 text-emerald-300 bg-emerald-950/40'
                      : 'border-rose-900/60 text-rose-300 bg-rose-950/30 hover:bg-rose-950/60'
                  }`}
                >
                  {selectedClue.isDiscarded ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore to Active</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Discard Clue</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Clue Meta Stamps */}
            <div className="flex flex-wrap gap-4 mb-3 text-xs font-mono text-slate-400 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              {selectedClue.timestamp && (
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>TIMESTAMP: {selectedClue.timestamp}</span>
                </div>
              )}
              {selectedClue.location && (
                <div className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>LOCATION: {selectedClue.location}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">CATEGORY:</span>
                <span className="text-white font-bold">{selectedClue.category}</span>
              </div>
            </div>

            {/* Title & Body */}
            <h3 className="text-base font-extrabold text-white mb-2">
              {selectedClue.title}
            </h3>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-200 leading-relaxed font-sans mb-4 shadow-inner">
              {selectedClue.content}
            </div>

            {/* Extractable Entities Section */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5" />
                  IDENTIFIED CASE ENTITIES (SEND TO BILLBOARD)
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  Click to add as nodes
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedClue.extractableEntities.map(entity => {
                  const isAlreadyOnBoard = boardNodes.some(n => n.id === entity.id);

                  return (
                    <div
                      key={entity.id}
                      className="p-2.5 rounded-lg border border-slate-800 bg-slate-950 flex items-center justify-between gap-2"
                    >
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold text-slate-100 truncate">
                          {entity.label}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 truncate">
                          {entity.type} • {entity.description}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (!isAlreadyOnBoard) {
                            onUserActivity();
                            onAddEntityToBoard(entity);
                          }
                        }}
                        disabled={isAlreadyOnBoard}
                        className={`px-2.5 py-1 rounded text-xs font-medium font-mono shrink-0 transition-colors flex items-center gap-1 ${
                          isAlreadyOnBoard
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 cursor-default'
                            : 'bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold shadow'
                        }`}
                      >
                        {isAlreadyOnBoard ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>On Board</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Editable Investigator Notes Area */}
            <div className="mt-auto pt-3 border-t border-slate-800">
              <label className="block text-xs font-mono font-bold text-slate-400 mb-1.5 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>INVESTIGATOR DEDUCTIONS / CLUE NOTES</span>
              </label>
              <textarea
                rows={2}
                placeholder="Write your personal notes or theories on this clue (e.g., this timestamp contradicts the alibi)..."
                value={selectedClue.userNotes || ''}
                onChange={(e) => {
                  onUserActivity();
                  onUpdateNotes(selectedClue.id, e.target.value);
                }}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 resize-none font-mono"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 text-slate-500 text-xs font-mono">
            Select a clue from the left to inspect official evidence.
          </div>
        )}
      </div>
    </div>
  );
};
