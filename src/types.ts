export type Category = 'JavaScript' | 'TypeScript' | 'React';

export type Choice = {
  id: string; // 選択肢id（crypto.randomUUID()）
  label: string; // 選択肢の文言
};

export type Question = {
  id: string; // 問題id（crypto.randomUUID()）
  text: string; // 問題文
  choices: Choice[]; // 選択肢（4個）
  correctChoiceId: string; // 正解の選択肢id
  explanation: string; // 解説
  timeLimitSec: number; // 制限時間（秒）
  category: Category;
};

// ----- ここから下は QuizRunner（プレイモード）の状態管理用 -----
// 設計書 §3-2 State の形 に対応

export type QuestionOrder = 'registered' | 'shuffle'; // 出題順（登録順／シャッフル）
export type CategoryFilter = 'All' | Category; // 出題カテゴリフィルタ

export type Answer = {
  questionId: string;
  choiceId: string | null; // null = 時間切れ（未回答のまま不正解扱い）
  isCorrect: boolean;
};

export type QuizStatus = 'idle' | 'playing' | 'answered' | 'finished';

export type QuizState = {
  status: QuizStatus;
  order: string[]; // 出題順の問題id配列
  currentIndex: number;
  score: number;
  answers: Answer[];
};

export type QuizAction =
  | { type: 'START'; payload: { category: CategoryFilter; order: QuestionOrder } }
  | { type: 'SELECT'; payload: { choiceId: string } }
  | { type: 'TIMEOUT' }
  | { type: 'NEXT' }
  | { type: 'RESTART' };
