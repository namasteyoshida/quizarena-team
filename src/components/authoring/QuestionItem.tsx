import type { Question } from '../../types';

type QuestionItemProps = {
  question: Question;
};

export function QuestionItem({ question }: QuestionItemProps) {
  return (
    <li>
      <strong>[{question.category}]</strong> {question.text}
      <span style={{ color: '#888', marginLeft: 8 }}>（制限時間: {question.timeLimitSec}秒）</span>
    </li>
  );
}
