import { useMemo, useReducer, useRef } from 'react';
import type { Question } from '../../types';
import { createQuizReducer, initialQuizState } from '../logic/quizReducer';
import { Panel } from '../Panel';
import { StartScreen } from './StartScreen';
import { QuestionScreen } from './QuestionScreen';
import { ResultScreen } from './ResultScreen';

type QuizRunnerProps = {
  questions: Question[];
};

export function QuizRunner({ questions }: QuizRunnerProps) {
  // questions が変わらない限り同じ reducer 関数を使い回す
  const reducer = useMemo(() => createQuizReducer(questions), [questions]);
  const [state, dispatch] = useReducer(reducer, initialQuizState);

  // 結果画面の所要時間計算用（QuizState には含めず、副次的な値としてrefで持つ）
  const startedAtRef = useRef<number>(0);
  const finishedAtRef = useRef<number>(0);

  const currentQuestionId = state.order[state.currentIndex];
  const currentQuestion = questions.find((q) => q.id === currentQuestionId);
  const lastAnswer = state.answers[state.answers.length - 1];

  if (state.status === 'finished' && finishedAtRef.current === 0) {
    finishedAtRef.current = Date.now();
  }

  return (
    <Panel title="QuizArena">
      {state.status === 'idle' && (
        <StartScreen
          onStart={(category, order) => {
            startedAtRef.current = Date.now();
            finishedAtRef.current = 0;
            dispatch({ type: 'START', payload: { category, order } });
          }}
        />
      )}

      {(state.status === 'playing' || state.status === 'answered') && currentQuestion && (
        <QuestionScreen
          question={currentQuestion}
          questionNumber={state.currentIndex + 1}
          totalCount={state.order.length}
          status={state.status}
          lastAnswer={lastAnswer}
          onSelect={(choiceId) => dispatch({ type: 'SELECT', payload: { choiceId } })}
          onTimeout={() => dispatch({ type: 'TIMEOUT' })}
          onNext={() => dispatch({ type: 'NEXT' })}
        />
      )}

      {state.status === 'finished' && (
        <ResultScreen
          answers={state.answers}
          questions={questions}
          startedAt={startedAtRef.current}
          finishedAt={finishedAtRef.current}
          onRestart={() => dispatch({ type: 'RESTART' })}
        />
      )}
    </Panel>
  );
}
