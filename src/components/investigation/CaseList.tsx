import React from 'react';
import { CaseSummary, AppView } from '../../types';
import { 
  FolderGit2, 
  ArrowRight, 
  Users, 
  FileText, 
  Share2, 
  GitPullRequest, 
  Clock
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
    entitiesCount: 84,
    recordsCount: 623,
    relationshipsCount: 132,
    potentialMatchesCount: 17,
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
    relationshipsCount: 89,
    potentialMatchesCount: 8,
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
    entitiesCount: 45,
    recordsCount: 280,
    relationshipsCount: 71,
    potentialMatchesCount: 0,
    potentialIntermediariesCount: 2,
    plantedHiddenScenario: false,
    synopsis: 'Completed analytical review. The identified intermediary and customs clearing agents were resolved and forwarded to statutory enforcement agency for charge-sheeting.'
  }
];

export const CaseList: React.FC<CaseListProps> = ({ onOpenCase, onNavigate }) => {
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
            Select a synthetic investigation case to inspect intelligence graph, entity resolution candidates, and network metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            Total Cases: <strong className="text-slate-100">3 (2 Active, 1 Closed)</strong>
          </span>
        </div>
      </div>

      {/* Case Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {mockCases.map((caseItem) => {
          const isActive = caseItem.status === 'ACTIVE';
          const isPlanted = caseItem.plantedHiddenScenario;

          return (
            <div
              key={caseItem.id}
              className={`rounded-xl border flex flex-col justify-between p-6 transition-all duration-200 ${
                isPlanted
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
                    {isPlanted && (
                      <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        PRIMARY DEMO
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
                <p className="text-xs text-slate-300/90 leading-relaxed mb-6 bg-slate-950/60 p-3 rounded border border-slate-900">
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
                      <div className="text-[10px] text-slate-500">Potential Matches</div>
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

              {/* Action */}
              <div className="pt-2 border-t border-slate-800/70 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {caseItem.lastUpdated}
                </span>

                <button
                  onClick={() => {
                    onOpenCase(caseItem.id);
                    onNavigate('investigation');
                  }}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isPlanted
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span>OPEN INVESTIGATION</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
