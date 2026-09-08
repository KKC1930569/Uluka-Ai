import React, { useState, useEffect } from 'react';
import { CaseSummary, AppView } from '../../types';
import { fetchCases, deleteCase } from '../../api';
import { 
  FolderGit2, 
  ArrowRight, 
  Users, 
  FileText, 
  Share2, 
  GitPullRequest, 
  Clock,
  Trash2,
  AlertTriangle,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';

interface CaseListProps {
  onOpenCase: (caseId: string) => void;
  onNavigate: (view: AppView) => void;
}

export const mockCases: CaseSummary[] = [
  {
    id: 'ULK-2047',
    caseNumber: 'CASE #ULK-2047',
    title: 'Cross-District Financial & Hawala Network',
    district: 'Hyderabad / Cyberabad / Guntur',
    status: 'ACTIVE',
    lastUpdated: '14 Mar 2026 22:45 IST',
    entitiesCount: 62,
    recordsCount: 623,
    relationshipsCount: 60,
    potentialMatchesCount: 3,
    potentialIntermediariesCount: 3,
    plantedHiddenScenario: true,
    synopsis: 'Disjointed bank fraud and illegal remittance reports spanning three districts. Two distinct operative rings (Group A & Group B) with zero direct calls. Evidence suggests an intermediary entity bridging vehicle logistics and secondary burn phones.'
  },
  {
    id: 'ULK-1892',
    caseNumber: 'CASE #ULK-1892',
    title: 'Interstate Vehicle Theft & Clone Plate Syndicate',
    district: 'Bengaluru Urban / Hosur / Chittoor',
    status: 'ACTIVE',
    lastUpdated: '11 Mar 2026 09:15 IST',
    entitiesCount: 62,
    recordsCount: 341,
    relationshipsCount: 59,
    potentialMatchesCount: 2,
    potentialIntermediariesCount: 1,
    plantedHiddenScenario: false,
    synopsis: 'Coordinated luxury vehicle theft. Entities register synthetic vehicle chassis numbers against dormant identity documents. Requires multi-district CDR and toll-plaza cross-referencing.'
  },
  {
    id: 'ULK-1104',
    caseNumber: 'CASE #ULK-1104',
    title: 'Port Container Smuggling Ring (Archived)',
    district: 'Visakhapatnam Port Zone',
    status: 'CLOSED',
    lastUpdated: '28 Jan 2026 16:30 IST',
    entitiesCount: 40,
    recordsCount: 280,
    relationshipsCount: 36,
    potentialMatchesCount: 1,
    potentialIntermediariesCount: 2,
    plantedHiddenScenario: false,
    synopsis: 'Completed analytical review. The identified intermediary and customs clearing agents were resolved and forwarded to statutory enforcement agency for charge-sheeting.'
  }
];

export const CaseList: React.FC<CaseListProps> = ({ onOpenCase, onNavigate }) => {
  const [deletedCaseIds, setDeletedCaseIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('uluka_deleted_cases');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cases, setCases] = useState<CaseSummary[]>(() => {
    try {
      const savedDeleted = localStorage.getItem('uluka_deleted_cases');
      const deletedSet = new Set<string>(savedDeleted ? JSON.parse(savedDeleted) : []);
      return mockCases.filter(c => !deletedSet.has(c.id));
    } catch {
      return mockCases;
    }
  });

  const [caseToDelete, setCaseToDelete] = useState<CaseSummary | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Fetch updated list from server on mount and filter out deleted cases
  useEffect(() => {
    async function loadCases() {
      try {
        const serverCases = await fetchCases();
        if (serverCases && Array.isArray(serverCases) && serverCases.length > 0) {
          const deletedSet = new Set(deletedCaseIds);
          setCases(serverCases.filter((c: any) => !deletedSet.has(c.id)));
        }
      } catch (err) {
        console.warn('Using local case cache:', err);
      }
    }
    loadCases();
  }, [deletedCaseIds]);

  const handleRequestDelete = (caseItem: CaseSummary) => {
    if (caseItem.id === 'ULK-2047' || caseItem.plantedHiddenScenario) {
      alert('This is a protected sample case required by the application and cannot be deleted.');
      return;
    }
    setCaseToDelete(caseItem);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!caseToDelete) return;
    const targetId = caseToDelete.id;

    // 1. Update deleted set in state and persist to localStorage
    const nextDeleted = [...new Set([...deletedCaseIds, targetId])];
    setDeletedCaseIds(nextDeleted);
    try {
      localStorage.setItem('uluka_deleted_cases', JSON.stringify(nextDeleted));
    } catch {}

    // 2. Remove from active cases state
    setCases(prev => prev.filter(c => c.id !== targetId));

    // 3. Inform server API
    await deleteCase(targetId);

    // 4. Close dialog
    setShowDeleteConfirm(false);
    setCaseToDelete(null);
  };

  const handleResetDefaultCases = () => {
    setDeletedCaseIds([]);
    try {
      localStorage.removeItem('uluka_deleted_cases');
    } catch {}
    setCases(mockCases);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FolderGit2 className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Case Repository
            </h1>
          </div>
          <p className="text-sm text-slate-400">
            Select an investigation case to inspect intelligence graph, entity resolution candidates, and network metrics.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
            Total Cases: <strong className="text-slate-100">{cases.length}</strong>
          </span>

          {deletedCaseIds.length > 0 && (
            <button
              onClick={handleResetDefaultCases}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono border border-slate-800 transition-colors"
              title="Restore all default cases"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Reset Default Cases</span>
            </button>
          )}
        </div>
      </div>

      {/* Case Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((caseItem) => {
          const isActive = caseItem.status === 'ACTIVE';
          const isProtected = caseItem.id === 'ULK-2047' || caseItem.plantedHiddenScenario;

          return (
            <div
              key={caseItem.id}
              className={`rounded-xl border flex flex-col justify-between p-6 transition-all duration-200 ${
                isProtected
                  ? 'border-cyan-500/60 bg-gradient-to-b from-[#0e1726] to-[#0a0f1c] shadow-lg shadow-cyan-950/40 hover:border-cyan-400'
                  : 'border-slate-800 bg-[#0B0F19] hover:border-slate-700'
              }`}
            >
              <div>
                {/* Top badges */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    {caseItem.caseNumber}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {isProtected && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        <ShieldCheck className="w-3 h-3" />
                        <span>PROTECTED DEMO</span>
                      </span>
                    )}
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono font-semibold rounded ${
                        isActive
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {caseItem.status}
                    </span>
                  </div>
                </div>

                {/* Title & District */}
                <h3 className="text-lg font-bold text-white mb-1 leading-snug">
                  {caseItem.title}
                </h3>
                <p className="text-xs font-medium text-slate-400 mb-4 flex items-center gap-1">
                  <span>District:</span>
                  <span className="text-slate-300">{caseItem.district}</span>
                </p>

                {/* Synopsis */}
                <p className="text-xs text-slate-300/90 leading-relaxed mb-6 bg-slate-950/60 p-3 rounded border border-slate-900 line-clamp-4">
                  {caseItem.synopsis}
                </p>

                {/* Intelligence Metrics */}
                <div className="grid grid-cols-2 gap-2 mb-6 text-xs font-mono">
                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80 flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    <div>
                      <div className="text-[10px] text-slate-500">Entities</div>
                      <div className="font-bold text-slate-200">{caseItem.entitiesCount}</div>
                    </div>
                  </div>

                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                    <div>
                      <div className="text-[10px] text-slate-500">Records</div>
                      <div className="font-bold text-slate-200">{caseItem.recordsCount}</div>
                    </div>
                  </div>

                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80 flex items-center gap-2">
                    <GitPullRequest className="w-3.5 h-3.5 text-indigo-400" />
                    <div>
                      <div className="text-[10px] text-slate-500">Matches</div>
                      <div className="font-bold text-cyan-400">{caseItem.potentialMatchesCount}</div>
                    </div>
                  </div>

                  <div className="p-2 rounded bg-slate-900/80 border border-slate-800/80 flex items-center gap-2">
                    <Share2 className="w-3.5 h-3.5 text-amber-400" />
                    <div>
                      <div className="text-[10px] text-slate-500">Intermediaries</div>
                      <div className="font-bold text-amber-400">{caseItem.potentialIntermediariesCount}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-slate-800/70 flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1 truncate">
                  <Clock className="w-3 h-3 shrink-0" />
                  <span>{caseItem.lastUpdated}</span>
                </span>

                <div className="flex items-center gap-2">
                  {!isProtected && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRequestDelete(caseItem);
                      }}
                      className="p-2 rounded-lg bg-slate-900/80 hover:bg-red-950/50 text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-800/60 transition-colors"
                      title="Delete this case"
                      aria-label="Delete this case"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={() => {
                      onOpenCase(caseItem.id);
                      onNavigate('investigation');
                    }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                      isProtected
                        ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span>OPEN CASE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {showDeleteConfirm && caseToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800 flex items-center justify-center shrink-0 text-red-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Delete Case</h3>
                <p className="text-xs text-slate-400 font-mono">{caseToDelete.caseNumber}</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Are you sure you want to delete this case?
            </p>

            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
              <div className="font-semibold text-white mb-0.5">{caseToDelete.title}</div>
              <div className="text-[11px] text-slate-500">
                This will remove its associated intelligence graph, suspect records, entity links, and case dossier.
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => { setShowDeleteConfirm(false); setCaseToDelete(null); }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-950/50 transition-all active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
