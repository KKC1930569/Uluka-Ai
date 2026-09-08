import { 
  ChallengeCase, 
  ChallengeClue, 
  ChallengeBoardNode, 
  ChallengeBoardEdge, 
  ChallengeResult 
} from '../types';

// Seeded pseudo-random number generator (Mulberry32)
export function createPRNG(seedStr: string): () => number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 16777619);
  }
  return function() {
    h += 0x6D2B79F5;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateSeed(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = 'ULK-';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function shuffleArray<T>(arr: T[], rng: () => number): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Generates a randomized playthrough for a given case and seed
export function generatePlaythrough(baseCase: ChallengeCase, seed: string): ChallengeCase {
  const rng = createPRNG(seed);

  // Deep clone
  const clonedCase: ChallengeCase = JSON.parse(JSON.stringify(baseCase));

  // Deterministically shuffle clues and suspects
  clonedCase.clues = shuffleArray(clonedCase.clues, rng).map(clue => ({
    ...clue,
    userNotes: '',
    isReviewed: false,
    isDiscarded: false
  }));

  clonedCase.suspects = shuffleArray(clonedCase.suspects, rng);

  return clonedCase;
}

// Evaluates the player investigation and produces normalized scores (0-100)
export function evaluateInvestigation(
  currentCase: ChallengeCase,
  selectedSuspectId: string,
  clues: ChallengeClue[],
  boardNodes: ChallengeBoardNode[],
  boardEdges: ChallengeBoardEdge[],
  elapsedSeconds: number,
  investigatorNotes?: string
): ChallengeResult {
  const solution = currentCase.solution;
  const isCorrect = selectedSuspectId === solution.correctSuspectId;
  const selectedSuspect = currentCase.suspects.find(s => s.id === selectedSuspectId);

  // 1. Clue Review Metric (0-30 pts)
  const totalClues = clues.length;
  const reviewedClues = clues.filter(c => c.isReviewed);
  const reviewedKeyLeads = clues.filter(c => c.isReviewed && c.isKeyLead);
  const totalKeyLeads = clues.filter(c => c.isKeyLead).length;

  const clueCoverageRatio = totalClues > 0 ? reviewedClues.length / totalClues : 0;
  const keyLeadRatio = totalKeyLeads > 0 ? reviewedKeyLeads.length / totalKeyLeads : 0;
  const clueScore = (clueCoverageRatio * 10) + (keyLeadRatio * 20); // max 30

  // 2. Billboard Nodes Metric (0-30 pts)
  const keyEntityIds = new Set<string>();
  solution.essentialRelationships.forEach(rel => {
    keyEntityIds.add(rel.source);
    keyEntityIds.add(rel.target);
  });

  const boardEntityIds = new Set(boardNodes.map(n => n.id));
  let matchedKeyEntities = 0;
  keyEntityIds.forEach(id => {
    if (boardEntityIds.has(id)) matchedKeyEntities++;
  });

  const entityCoverageRatio = keyEntityIds.size > 0 ? matchedKeyEntities / keyEntityIds.size : 0;
  const nodeVolumeScore = Math.min(10, boardNodes.length * 2); // reward up to 5 nodes
  const nodeScore = (entityCoverageRatio * 20) + nodeVolumeScore; // max 30

  // 3. Billboard Connections Metric (0-40 pts)
  let matchedEssentialConnections = 0;
  const edgePairs = new Set(
    boardEdges.map(e => `${e.source}-->${e.target}`)
  );
  // Also check bidirectional
  boardEdges.forEach(e => edgePairs.add(`${e.target}-->${e.source}`));

  solution.essentialRelationships.forEach(rel => {
    if (edgePairs.has(`${rel.source}-->${rel.target}`) || edgePairs.has(`${rel.target}-->${rel.source}`)) {
      matchedEssentialConnections++;
    }
  });

  const connectionCoverage = solution.essentialRelationships.length > 0 
    ? matchedEssentialConnections / solution.essentialRelationships.length 
    : 0;
  
  // Guard against spamming random connections
  const totalEdges = boardEdges.length;
  const spamPenalty = totalEdges > 15 ? Math.min(15, (totalEdges - 15) * 2) : 0;

  const edgeScore = Math.max(0, (connectionCoverage * 40) - spamPenalty); // max 40

  // Total Investigation Quality (0-100)
  const rawQuality = clueScore + nodeScore + edgeScore;
  const investigationQuality = Math.max(0, Math.min(100, Math.round(rawQuality)));

  // Final Confidence Score (0-100)
  // Ensures confidence score NEVER exceeds 100 and NEVER goes below 0.
  // Rewards genuine investigation work combined with correct culprit identification.
  let finalConfidence = 0;
  if (isCorrect) {
    // Range: 40% (pure guess with 0 quality) to 100% (high quality + correct suspect)
    finalConfidence = Math.round(40 + (investigationQuality * 0.60));
  } else {
    // Incorrect accusation caps confidence at 25% max
    finalConfidence = Math.round(Math.max(5, (investigationQuality * 0.30) - 5));
  }
  finalConfidence = Math.max(0, Math.min(100, finalConfidence));

  return {
    caseId: currentCase.id,
    caseTitle: currentCase.title,
    selectedSuspectId,
    selectedSuspectName: selectedSuspect ? selectedSuspect.name : 'Unknown',
    isCorrect,
    correctSuspectName: solution.correctSuspectName,
    investigationQuality,
    finalConfidence,
    timeSpentSeconds: Math.max(1, elapsedSeconds),
    cluesReviewedCount: reviewedClues.length,
    totalCluesCount: totalClues,
    keyLeadsIdentifiedCount: reviewedKeyLeads.length,
    totalKeyLeadsCount: totalKeyLeads,
    boardNodesCount: boardNodes.length,
    boardEdgesCount: boardEdges.length,
    validConnectionsCount: matchedEssentialConnections,
    explanation: solution.explanation,
    keyEvidenceSummary: solution.keyEvidenceSummary,
    trapExplanation: solution.trapExplanation,
    investigatorNotes
  };
}
