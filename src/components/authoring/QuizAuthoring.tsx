import type { Question } from '../../types';
import { Panel } from '../Panel';
import { QuestionForm } from './QuestionForm';
import { QuestionList } from './QuestionList';

type QuizAuthoringProps = {
  questions: Question[];
  onAdd: (question: Question) => void;
};

export function QuizAuthoring({ questions, onAdd }: QuizAuthoringProps) {
  return (
    <Panel title="QuizArena 問題を作る 🖊">
      <QuestionForm onAdd={onAdd} />
      <QuestionList questions={questions} />
    </Panel>
  );
}
