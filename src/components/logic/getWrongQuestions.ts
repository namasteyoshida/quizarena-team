import type { Answer, Question } from '../../types';

/**
 * 回答履歴と全問題から、不正解だった問題だけを抽出する（復習リスト用）
 */
export function getWrongQuestions(answers: Answer[], questions: Question[]): Question[] {
  const wrongIds = new Set(answers.filter((a) => !a.isCorrect).map((a) => a.questionId));
  return questions.filter((q) => wrongIds.has(q.id));
}
