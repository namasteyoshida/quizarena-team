import type { Answer, Question } from '../../types';
import { Timer } from './Timer';

type QuestionScreenProps = {
  question: Question;
  questionNumber: number; // 1始まりの現在の問題番号
  totalCount: number;
  status: 'playing' | 'answered';
  lastAnswer: Answer | undefined; // answered状態のときの直近の回答
  onSelect: (choiceId: string) => void;
  onTimeout: () => void;
  onNext: () => void;
};

export function QuestionScreen({
  question,
  questionNumber,
  totalCount,
  status,
  lastAnswer,
  onSelect,
  onTimeout,
  onNext,
}: QuestionScreenProps) {
  const isAnswered = status === 'answered';

  return (
    <div>
      <Timer
        timeLimit={question.timeLimitSec}
        isRunning={status === 'playing'}
        onTimeout={onTimeout}
        resetKey={question.id}
      />

      <p>
        Q{questionNumber} / {totalCount}　カテゴリ: {question.category}
      </p>

      <h3>{question.text}</h3>

      <div>
        {question.choices.map((choice) => {
          const isSelected = lastAnswer?.choiceId === choice.id;
          const isCorrectChoice = choice.id === question.correctChoiceId;

          let style: React.CSSProperties = {};
          if (isAnswered && isCorrectChoice) {
            style = { fontWeight: 'bold', color: 'green' };
          } else if (isAnswered && isSelected && !isCorrectChoice) {
            style = { color: 'red' };
          }

          return (
            <div key={choice.id} style={style}>
              <button
                // T-4: 回答済みなら選択肢を押しても何も起きない
                disabled={isAnswered}
                onClick={() => onSelect(choice.id)}
              >
                {choice.label}
              </button>
            </div>
          );
        })}
      </div>

      {isAnswered && (
        <div>
          <p>{lastAnswer?.isCorrect ? '正解！' : '不正解...'}</p>
          <p>解説：{question.explanation}</p>
          <button onClick={onNext}>次へ</button>
        </div>
      )}
    </div>
  );
}
