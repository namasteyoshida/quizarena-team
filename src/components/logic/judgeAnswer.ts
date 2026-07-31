import type { Question } from '../../types';

/**
 * 選択した選択肢が正解かどうかを判定する
 * choiceId が null（時間切れ）の場合は常に不正解
 */
export function judgeAnswer(question: Question, choiceId: string | null): boolean {
  if (choiceId === null) return false;
  return choiceId === question.correctChoiceId;
}
