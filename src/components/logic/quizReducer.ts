import type { Question, QuizAction, QuizState } from '../../types';
import { buildOrder } from './buildOrder';
import { judgeAnswer } from './judgeAnswer';

export const initialQuizState: QuizState = {
  status: 'idle',
  order: [],
  currentIndex: 0,
  score: 0,
  answers: [],
};

/**
 * quizReducer は問題一覧（questions）に依存するため、
 * 全問題データを受け取って reducer 関数を生成するファクトリ関数にしている。
 * QuizRunner 側では以下のように使う：
 *
 *   const reducer = createQuizReducer(questions);
 *   const [state, dispatch] = useReducer(reducer, initialQuizState);
 */
export function createQuizReducer(questions: Question[]) {
  return function quizReducer(state: QuizState, action: QuizAction): QuizState {
    switch (action.type) {
      case 'START': {
        const order = buildOrder(questions, action.payload.category, action.payload.order);
        return {
          status: 'playing',
          order,
          currentIndex: 0,
          score: 0,
          answers: [],
        };
      }

      case 'SELECT': {
        // T-4: 回答済み（answered）の状態では二重回答を無視する
        if (state.status !== 'playing') return state;

        const currentQuestionId = state.order[state.currentIndex];
        const currentQuestion = questions.find((q) => q.id === currentQuestionId);
        if (!currentQuestion) return state;

        const isCorrect = judgeAnswer(currentQuestion, action.payload.choiceId);

        return {
          ...state,
          status: 'answered',
          score: isCorrect ? state.score + 1 : state.score,
          answers: [
            ...state.answers,
            { questionId: currentQuestionId, choiceId: action.payload.choiceId, isCorrect },
          ],
        };
      }

      case 'TIMEOUT': {
        // T-4: すでに回答済みなら何もしない（多重発火対策）
        if (state.status !== 'playing') return state;

        const currentQuestionId = state.order[state.currentIndex];

        return {
          ...state,
          status: 'answered',
          answers: [
            ...state.answers,
            { questionId: currentQuestionId, choiceId: null, isCorrect: false },
          ],
        };
      }

      case 'NEXT': {
        if (state.status !== 'answered') return state;

        const isLastQuestion = state.currentIndex >= state.order.length - 1;

        if (isLastQuestion) {
          return { ...state, status: 'finished' };
        }

        return {
          ...state,
          status: 'playing',
          currentIndex: state.currentIndex + 1,
        };
      }

      case 'RESTART': {
        return initialQuizState;
      }

      default:
        return state;
    }
  };
}
