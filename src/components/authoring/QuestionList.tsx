import type { Question } from '../../types';
import { QuestionItem } from './QuestionItem';

type QuestionListProps = {
  questions: Question[];
};

export function QuestionList({ questions }: QuestionListProps) {
  return (
    <div>
      <p>登録済み: {questions.length}問</p>
      <ul>
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </ul>
    </div>
  );
}
