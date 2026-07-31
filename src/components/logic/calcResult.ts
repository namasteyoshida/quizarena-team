import type { Answer } from '../../types';

export type QuizResult = {
  totalCount: number;
  correctCount: number;
  accuracyRate: number; // 0〜100（%）
  elapsedSec: number;
};

/**
 * 回答履歴から正答数・正答率・所要時間を計算する
 * @param answers 回答履歴
 * @param startedAt クイズ開始時刻（Date.now()）
 * @param finishedAt クイズ終了時刻（Date.now()）
 */
export function calcResult(
  answers: Answer[],
  startedAt: number,
  finishedAt: number,
): QuizResult {
  const totalCount = answers.length;
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const accuracyRate = totalCount === 0 ? 0 : Math.round((correctCount / totalCount) * 100);
  const elapsedSec = Math.max(0, Math.round((finishedAt - startedAt) / 1000));

  return { totalCount, correctCount, accuracyRate, elapsedSec };
}
