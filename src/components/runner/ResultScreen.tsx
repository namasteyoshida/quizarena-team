import type { Answer, Question } from '../../types';
import { calcResult } from '../logic/calcResult';
import { getWrongQuestions } from '../logic/getWrongQuestions';

type ResultScreenProps = {
  answers: Answer[];
  questions: Question[];
  startedAt: number;
  finishedAt: number;
  onRestart: () => void;
};

export function ResultScreen({
  answers,
  questions,
  startedAt,
  finishedAt,
  onRestart,
}: ResultScreenProps) {
  const result = calcResult(answers, startedAt, finishedAt);
  const wrongQuestions = getWrongQuestions(answers, questions);

  return (
    <div>
      <h3>結果</h3>
      <p>
        正答数：{result.correctCount} / {result.totalCount}（正答率 {result.accuracyRate}%）
      </p>
      <p>所要時間：{result.elapsedSec}秒</p>

      <h4>復習リスト</h4>
      {wrongQuestions.length === 0 ? (
        <p>全問正解でした！</p>
      ) : (
        <ul>
          {wrongQuestions.map((q) => (
            <li key={q.id}>
              [{q.category}] {q.text}　→ 正解：
              {q.choices.find((c) => c.id === q.correctChoiceId)?.label}
              <br />
              解説：{q.explanation}
            </li>
          ))}
        </ul>
      )}

      <button onClick={onRestart}>もう一度</button>
    </div>
  );
}
