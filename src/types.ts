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

// --- ULUKA CHALLENGE MODE TYPES ---

export type EntityType = 
  | 'SUSPECT' 
  | 'PHONE' 
  | 'VEHICLE' 
  | 'LOCATION' 
  | 'ACCOUNT' 
  | 'ORGANIZATION' 
  | 'DEVICE' 
  | 'EVIDENCE' 
  | 'DOCUMENT' 
  | 'EVENT';

export type ClueCategory = 
  | 'TELECOM' 
  | 'FINANCIAL' 
  | 'SURVEILLANCE' 
  | 'LOGISTICS' 
  | 'FORENSICS' 
  | 'DIGITAL' 
  | 'INFORMANT'
  | 'DOCUMENT';

export interface ChallengeSuspect {
  id: string;
  name: string;
  alias?: string;
  role: string;
  background: string;
  alibi: string;
}

export interface ChallengeEntity {
  id: string;
  label: string;
  type: EntityType;
  description: string;
}

export interface ChallengeClue {
  id: string;
  title: string;
  category: ClueCategory;
  preview: string;
  content: string;
  timestamp?: string;
  location?: string;
  isKeyLead: boolean;
  isRedHerring: boolean;
  redHerringReason?: string;
  extractableEntities: ChallengeEntity[];
  userNotes?: string;
  isReviewed?: boolean;
  isDiscarded?: boolean;
}

export interface ChallengeBoardNode {
  id: string;
  label: string;
  type: EntityType;
  description?: string;
  x: number;
  y: number;
  isCustom?: boolean;
}

export interface ChallengeBoardEdge {
  id: string;
  source: string;
  target: string;
  label: string;
}

export interface ChallengeSolution {
  correctSuspectId: string;
  correctSuspectName: string;
  keyLeadClueIds: string[];
  redHerringClueIds: string[];
  essentialRelationships: { source: string; target: string; label: string }[];
  explanation: string;
  keyEvidenceSummary: string;
  trapExplanation: string;
}

export interface ChallengeCase {
  id: string;
  title: string;
  subtitle: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'EXPERT';
  category: string;
  briefing: string;
  targetQuestion: string;
  suspects: ChallengeSuspect[];
  allEntities: ChallengeEntity[];
  clues: ChallengeClue[];
  solution: ChallengeSolution;
}

export interface ChallengeResult {
  caseId: string;
  caseTitle: string;
  selectedSuspectId: string;
  selectedSuspectName: string;
  isCorrect: boolean;
  correctSuspectName: string;
  investigationQuality: number; // 0-100
  finalConfidence: number;      // 0-100
  timeSpentSeconds: number;
  cluesReviewedCount: number;
  totalCluesCount: number;
  keyLeadsIdentifiedCount: number;
  totalKeyLeadsCount: number;
  boardNodesCount: number;
  boardEdgesCount: number;
  validConnectionsCount: number;
  explanation: string;
  keyEvidenceSummary: string;
  trapExplanation: string;
  investigatorNotes?: string;
}

