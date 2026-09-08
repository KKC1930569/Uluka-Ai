import React, { useState, useEffect } from 'react';
import { CaseSummary, AppView } from '../../types';
import { fetchCases, createCase } from '../../api';
import { 
  FolderGit2, 
  ArrowRight, 
  Users, 
  FileText, 
  Share2, 
  GitPullRequest, 
  Clock,
  Plus,
  X,
  CheckCircle2,
  AlertCircle,
  Car,
  Phone,
  MapPin
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
  const [cases, setCases] = useState<CaseSummary[]>(() => {
    try {
      const saved = localStorage.getItem('uluka_custom_cases');
      if (saved) {
        const custom = JSON.parse(saved);
        return [...mockCases, ...custom.filter((c: any) => !mockCases.some(m => m.id === c.id))];
      }
    } catch {}
    return mockCases;
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'suspects' | 'assets' | 'links'>('info');

  // New Case Builder Form State
  const [caseId, setCaseId] = useState('');
  const [title, setTitle] = useState('');
  const [district, setDistrict] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [status, setStatus] = useState<'ACTIVE' | 'CLOSED'>('ACTIVE');

  // Entities state
  const [suspects, setSuspects] = useState<Array<{ name: string; role: string; notes: string }>>([
    { name: '', role: 'Prime Suspect', notes: '' }
  ]);
  const [vehicles, setVehicles] = useState<string[]>(['']);
  const [phones, setPhones] = useState<string[]>(['']);
  const [locations, setLocations] = useState<string[]>(['']);
  const [organizations, setOrganizations] = useState<string[]>(['']);
  const [evidence, setEvidence] = useState<string[]>(['']);
  const [connections, setConnections] = useState<Array<{ source: string; target: string; relationship: string }>>([
    { source: '', target: '', relationship: 'COORDINATES_WITH' }
  ]);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch updated list from server on mount
  useEffect(() => {
    async function loadCases() {
      try {
        const serverCases = await fetchCases();
        if (serverCases && Array.isArray(serverCases) && serverCases.length > 0) {
          setCases(serverCases);
        }
      } catch (err) {
        console.warn('Using local case cache:', err);
      }
    }
    loadCases();
  }, []);

  const handleOpenAddModal = () => {
    const randomId = `ULK-${Math.floor(2100 + Math.random() * 7800)}`;
    setCaseId(randomId);
    setTitle('');
    setDistrict('');
    setSynopsis('');
    setStatus('ACTIVE');
    setSuspects([{ name: '', role: 'Prime Suspect', notes: '' }]);
    setVehicles(['']);
    setPhones(['']);
    setLocations(['']);
    setOrganizations(['']);
    setEvidence(['']);
    setConnections([{ source: '', target: '', relationship: 'COORDINATES_WITH' }]);
    setErrorMsg('');
    setActiveTab('info');
    setShowAddModal(true);
  };

  const handleSaveCase = async () => {
    if (!title.trim() || !synopsis.trim()) {
      setErrorMsg('Please provide a Case Title and Case Synopsis.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    const formattedSuspects = suspects
      .filter(s => s.name.trim().length > 0)
      .map((s, idx) => ({
        id: `SUS_${idx + 1}`,
        name: s.name.trim(),
        role: s.role.trim() || 'Suspect',
        notes: s.notes.trim()
      }));

    const formattedVehicles = vehicles
      .filter(v => v.trim().length > 0)
      .map((v, idx) => ({ id: `VEH_${idx + 1}`, label: v.trim(), notes: 'Transit vehicle' }));

    const formattedPhones = phones
      .filter(p => p.trim().length > 0)
      .map((p, idx) => ({ id: `PH_${idx + 1}`, label: p.trim(), notes: 'Telecom line' }));

    const formattedLocations = locations
      .filter(l => l.trim().length > 0)
      .map((l, idx) => ({ id: `LOC_${idx + 1}`, label: l.trim(), notes: 'Scene or checkpoint' }));

    const formattedOrgs = organizations
      .filter(o => o.trim().length > 0)
      .map((o, idx) => ({ id: `ORG_${idx + 1}`, label: o.trim(), notes: 'Corporate front or bank' }));

    const formattedEvidence = evidence
      .filter(e => e.trim().length > 0)
      .map((e, idx) => ({ id: `EVI_${idx + 1}`, label: e.trim(), notes: 'Forensic document' }));

    const formattedConns = connections
      .filter(c => c.source.trim().length > 0 && c.target.trim().length > 0)
      .map((c, idx) => ({
        id: `e_${idx + 1}`,
        source: c.source.trim(),
        target: c.target.trim(),
        relationship: c.relationship.trim() || 'CONNECTED_TO'
      }));

    const payload = {
      id: caseId.trim() || `ULK-${Math.floor(2100 + Math.random() * 7800)}`,
      title: title.trim(),
      district: district.trim() || 'Multi-Jurisdiction',
      status,
      synopsis: synopsis.trim(),
      suspects: formattedSuspects,
      vehicles: formattedVehicles,
      phones: formattedPhones,
      locations: formattedLocations,
      organizations: formattedOrgs,
      evidence: formattedEvidence,
      connections: formattedConns
    };

    try {
      const created = await createCase(payload);
      const newSummary: CaseSummary = {
        id: created.id,
        caseNumber: created.caseNumber || `CASE #${created.id}`,
        title: created.title,
        district: created.district,
        status: created.status,
        lastUpdated: 'Today, Just now',
        entitiesCount: created.entitiesCount || (formattedSuspects.length + formattedVehicles.length + formattedPhones.length + formattedLocations.length || 8),
        recordsCount: created.recordsCount || 32,
        relationshipsCount: created.relationshipsCount || (formattedConns.length || 6),
        potentialMatchesCount: created.potentialMatchesCount || 1,
        potentialIntermediariesCount: 1,
        plantedHiddenScenario: false,
        synopsis: created.synopsis
      };

      const updated = [newSummary, ...cases.filter(c => c.id !== newSummary.id)];
      setCases(updated);
      try {
        localStorage.setItem('uluka_custom_cases', JSON.stringify(updated.filter(c => !mockCases.some(m => m.id === c.id))));
      } catch {}

      setShowAddModal(false);
      onOpenCase(newSummary.id);
      onNavigate('investigation');
    } catch (err) {
      console.warn('Error saving to server, falling back to client cache:', err);
      const fallbackSummary: CaseSummary = {
        id: payload.id,
        caseNumber: `CASE #${payload.id}`,
        title: payload.title,
        district: payload.district,
        status: payload.status,
        lastUpdated: 'Today, Just now',
        entitiesCount: formattedSuspects.length + formattedVehicles.length + formattedPhones.length + formattedLocations.length || 10,
        recordsCount: 40,
        relationshipsCount: formattedConns.length || 8,
        potentialMatchesCount: 1,
        potentialIntermediariesCount: 1,
        plantedHiddenScenario: false,
        synopsis: payload.synopsis
      };

      const updated = [fallbackSummary, ...cases.filter(c => c.id !== fallbackSummary.id)];
      setCases(updated);
      try {
        localStorage.setItem('uluka_custom_cases', JSON.stringify(updated.filter(c => !mockCases.some(m => m.id === c.id))));
      } catch {}

      setShowAddModal(false);
      onOpenCase(fallbackSummary.id);
      onNavigate('investigation');
    } finally {
      setSubmitting(false);
    }
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

          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>ADD NEW CASE</span>
          </button>
        </div>
      </div>

      {/* Case Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((caseItem) => {
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

      {/* ADD NEW CASE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Add New Investigation Case
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Tabs */}
            <div className="flex gap-1 border-b border-slate-800 text-xs overflow-x-auto pb-1">
              <button
                onClick={() => setActiveTab('info')}
                className={`px-3 py-1.5 rounded font-medium transition-colors ${
                  activeTab === 'info'
                    ? 'bg-cyan-500/20 text-cyan-300 border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                1. Case Overview
              </button>
              <button
                onClick={() => setActiveTab('suspects')}
                className={`px-3 py-1.5 rounded font-medium transition-colors ${
                  activeTab === 'suspects'
                    ? 'bg-cyan-500/20 text-cyan-300 border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                2. Suspects ({suspects.filter(s => s.name.trim()).length})
              </button>
              <button
                onClick={() => setActiveTab('assets')}
                className={`px-3 py-1.5 rounded font-medium transition-colors ${
                  activeTab === 'assets'
                    ? 'bg-cyan-500/20 text-cyan-300 border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                3. Vehicles & Telecom
              </button>
              <button
                onClick={() => setActiveTab('links')}
                className={`px-3 py-1.5 rounded font-medium transition-colors ${
                  activeTab === 'links'
                    ? 'bg-cyan-500/20 text-cyan-300 border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                4. Connections ({connections.filter(c => c.source && c.target).length})
              </button>
            </div>

            {/* TAB 1: INFO */}
            {activeTab === 'info' && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-mono">CASE ID</label>
                    <input
                      type="text"
                      value={caseId}
                      onChange={e => setCaseId(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-mono">STATUS</label>
                    <select
                      value={status}
                      onChange={e => setStatus(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white"
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-mono">CASE TITLE *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Interstate Luxury Vehicle Theft Ring"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-mono">DISTRICT / JURISDICTION</label>
                  <input
                    type="text"
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    placeholder="e.g. Bengaluru Urban / Hosur Highway"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-mono">CASE SYNOPSIS & NARRATIVE *</label>
                  <textarea
                    rows={4}
                    value={synopsis}
                    onChange={e => setSynopsis(e.target.value)}
                    placeholder="Describe the operational rings, modus operandi, transit checkpoints, and suspected key leads..."
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-white leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: SUSPECTS */}
            {activeTab === 'suspects' && (
              <div className="space-y-3 text-xs max-h-72 overflow-y-auto pr-1">
                <div className="text-slate-400">
                  Add identified individuals, aliases, and known operational roles:
                </div>
                {suspects.map((s, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-cyan-400 font-bold">Suspect #{idx + 1}</span>
                      {suspects.length > 1 && (
                        <button
                          onClick={() => setSuspects(suspects.filter((_, i) => i !== idx))}
                          className="text-red-400 hover:text-red-300 text-[11px]"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Suspect Name"
                        value={s.name}
                        onChange={e => {
                          const copy = [...suspects];
                          copy[idx].name = e.target.value;
                          setSuspects(copy);
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                      />
                      <input
                        type="text"
                        placeholder="Role (e.g. Primary Handler, Broker)"
                        value={s.role}
                        onChange={e => {
                          const copy = [...suspects];
                          copy[idx].role = e.target.value;
                          setSuspects(copy);
                        }}
                        className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Notes / Alibi / Intelligence remarks"
                      value={s.notes}
                      onChange={e => {
                        const copy = [...suspects];
                        copy[idx].notes = e.target.value;
                        setSuspects(copy);
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setSuspects([...suspects, { name: '', role: 'Suspect', notes: '' }])}
                  className="w-full py-2 rounded border border-dashed border-slate-700 hover:border-cyan-500 text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  + Add Another Suspect
                </button>
              </div>
            )}

            {/* TAB 3: ASSETS & TELECOM */}
            {activeTab === 'assets' && (
              <div className="space-y-4 text-xs max-h-72 overflow-y-auto pr-1">
                {/* Vehicles */}
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-emerald-400 font-semibold mb-1">
                    <Car className="w-3.5 h-3.5" />
                    <span>VEHICLES</span>
                  </div>
                  {vehicles.map((v, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-1.5">
                      <input
                        type="text"
                        placeholder="Registration or Model (e.g. KA05MN4412 Toyota Fortuner)"
                        value={v}
                        onChange={e => {
                          const copy = [...vehicles];
                          copy[idx] = e.target.value;
                          setVehicles(copy);
                        }}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                      />
                      {vehicles.length > 1 && (
                        <button onClick={() => setVehicles(vehicles.filter((_, i) => i !== idx))} className="text-red-400">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button onClick={() => setVehicles([...vehicles, ''])} className="text-cyan-400 text-[11px]">+ Add Vehicle</button>
                </div>

                {/* Phones */}
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-amber-400 font-semibold mb-1">
                    <Phone className="w-3.5 h-3.5" />
                    <span>TELECOM & PHONES</span>
                  </div>
                  {phones.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-1.5">
                      <input
                        type="text"
                        placeholder="Phone or IMEI (e.g. +91 9845012345 Burner SIM)"
                        value={p}
                        onChange={e => {
                          const copy = [...phones];
                          copy[idx] = e.target.value;
                          setPhones(copy);
                        }}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                      />
                      {phones.length > 1 && (
                        <button onClick={() => setPhones(phones.filter((_, i) => i !== idx))} className="text-red-400">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button onClick={() => setPhones([...phones, ''])} className="text-cyan-400 text-[11px]">+ Add Phone</button>
                </div>

                {/* Locations */}
                <div>
                  <div className="flex items-center gap-1.5 font-mono text-sky-400 font-semibold mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>LOCATIONS / SCENES</span>
                  </div>
                  {locations.map((l, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-1.5">
                      <input
                        type="text"
                        placeholder="Location (e.g. Hosur Industrial Chop Shop)"
                        value={l}
                        onChange={e => {
                          const copy = [...locations];
                          copy[idx] = e.target.value;
                          setLocations(copy);
                        }}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white"
                      />
                      {locations.length > 1 && (
                        <button onClick={() => setLocations(locations.filter((_, i) => i !== idx))} className="text-red-400">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button onClick={() => setLocations([...locations, ''])} className="text-cyan-400 text-[11px]">+ Add Location</button>
                </div>
              </div>
            )}

            {/* TAB 4: CONNECTIONS */}
            {activeTab === 'links' && (
              <div className="space-y-3 text-xs max-h-72 overflow-y-auto pr-1">
                <div className="text-slate-400">
                  Establish relationships between suspects, vehicles, phones, and scenes:
                </div>
                {connections.map((c, idx) => (
                  <div key={idx} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Source (e.g. Suspect Name)"
                      value={c.source}
                      onChange={e => {
                        const copy = [...connections];
                        copy[idx].source = e.target.value;
                        setConnections(copy);
                      }}
                      className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-white text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Relationship (e.g. USES, DRIVES, OWNS)"
                      value={c.relationship}
                      onChange={e => {
                        const copy = [...connections];
                        copy[idx].relationship = e.target.value;
                        setConnections(copy);
                      }}
                      className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-cyan-300 text-xs font-mono"
                    />
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        placeholder="Target (e.g. Vehicle, Phone)"
                        value={c.target}
                        onChange={e => {
                          const copy = [...connections];
                          copy[idx].target = e.target.value;
                          setConnections(copy);
                        }}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded px-2 py-1 text-white text-xs"
                      />
                      {connections.length > 1 && (
                        <button onClick={() => setConnections(connections.filter((_, i) => i !== idx))} className="text-red-400 px-1">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setConnections([...connections, { source: '', target: '', relationship: 'ASSOCIATED_WITH' }])}
                  className="w-full py-2 rounded border border-dashed border-slate-700 hover:border-cyan-500 text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  + Add Relationship Link
                </button>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveCase}
                disabled={submitting}
                className="px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all active:scale-95 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{submitting ? 'Creating Case...' : 'Create Case & Launch Workspace'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
