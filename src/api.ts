// Production-ready API client for ULUKA AI
// Uses environment variable VITE_API_BASE_URL if specified, otherwise defaults to relative /api
const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/+$/, '');
  }
  // In production (when served by FastAPI or same-origin), use relative /api
  // In development without env var, check if running on localhost dev server
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost' && window.location.port === '5173') {
    return 'http://localhost:8000/api';
  }
  return '/api';
};

export const API_BASE_URL = getApiBaseUrl();

export async function fetchCases() {
  try {
    const res = await fetch(`${API_BASE_URL}/cases`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('API error fetching cases:', err);
    return null;
  }
}

export async function fetchCaseGraph(caseId: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/cases/${caseId}/graph`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('API error fetching case graph:', err);
    throw err;
  }
}

export async function fetchEntityDossier(caseId: string, entityId: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/cases/${caseId}/entities/${entityId}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('API error fetching entity dossier:', err);
    throw err;
  }
}

export async function fetchHiddenConnection(caseId: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/cases/${caseId}/analysis/hidden-connection`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('API error fetching hidden connection:', err);
    throw err;
  }
}

export async function fetchNetworkMetrics(caseId: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/cases/${caseId}/analysis/metrics`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('API error fetching network metrics:', err);
    throw err;
  }
}

export async function fetchShortestPath(caseId: string, source: string, target: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/cases/${caseId}/analysis/shortest-path?source=${encodeURIComponent(source)}&target=${encodeURIComponent(target)}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('API error fetching shortest path:', err);
    throw err;
  }
}

export async function fetchResolutions(caseId: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/cases/${caseId}/resolutions`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('API error fetching resolutions:', err);
    throw err;
  }
}

export async function submitResolutionDecision(caseId: string, matchId: string, status: 'ACCEPTED' | 'REJECTED' | 'UNRESOLVED', notes?: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/cases/${caseId}/resolutions/${matchId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes })
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('API error submitting resolution decision:', err);
    throw err;
  }
}

export async function createCase(caseData: any) {
  try {
    const res = await fetch(`${API_BASE_URL}/cases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(caseData)
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('API error creating case:', err);
    throw err;
  }
}

