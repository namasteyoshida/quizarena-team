import type { CategoryFilter, Question, QuestionOrder } from '../../types';
import { shuffleQuestions } from './shuffleQuestions';

/**
 * カテゴリ・出題順の設定から、出題する問題id配列を作る
 * @param questions 全問題
 * @param category 'All' または特定カテゴリで絞り込み
 * @param order 'registered'（登録順）または 'shuffle'（シャッフル）
 */
export function buildOrder(
  questions: Question[],
  category: CategoryFilter,
  order: QuestionOrder,
): string[] {
  const filtered =
    category === 'All' ? questions : questions.filter((q) => q.category === category);

  const ordered = order === 'shuffle' ? shuffleQuestions(filtered) : filtered;

  return ordered.map((q) => q.id);
}
