import { ChallengeCase } from '../../types';
import { CASE_1 } from './case1';
import { CASE_2 } from './case2';
import { CASE_3 } from './case3';
import { CASE_4 } from './case4';
import { CASE_5 } from './case5';

export const ALL_CHALLENGE_CASES: ChallengeCase[] = [
  CASE_1,
  CASE_2,
  CASE_3,
  CASE_4,
  CASE_5
];

export function getCaseById(caseId: string): ChallengeCase {
  const found = ALL_CHALLENGE_CASES.find(c => c.id === caseId);
  return found || CASE_1;
}

export { CASE_1, CASE_2, CASE_3, CASE_4, CASE_5 };
