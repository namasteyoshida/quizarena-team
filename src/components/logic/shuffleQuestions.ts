import type { Question } from '../../types';

/**
 * Fisher-Yates アルゴリズムで配列をシャッフルする（元の配列は変更しない）
 */
export function shuffleQuestions(questions: Question[]): Question[] {
  const result = [...questions];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
