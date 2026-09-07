export type AppView = 'landing' | 'cases' | 'investigation' | 'challenge';

export interface CaseSummary {
  id: string;
  caseNumber: string;
  title: string;
  district: string;
  status: 'ACTIVE' | 'CLOSED';
  lastUpdated: string;
  entitiesCount: number;
  recordsCount: number;
  relationshipsCount: number;
  potentialMatchesCount: number;
  potentialIntermediariesCount: number;
  plantedHiddenScenario?: boolean;
  synopsis: string;
}

export type EntityResolutionDecision = 'ACCEPTED' | 'REJECTED' | 'UNRESOLVED';

export interface EntityResolutionLead {
  id: string;
  recordA: {
    name: string;
    phone?: string;
    vehicle?: string;
    address?: string;
    source: string;
  };
  recordB: {
    name: string;
    phone?: string;
    vehicle?: string;
    address?: string;
    source: string;
  };
  matchScore: number;
  reasons: string[];
  status: EntityResolutionDecision;
}
