import { useState } from 'react';
import type { Question } from './types';
import { initialQuestions } from './datas/questions';
import { QuizAuthoring } from './components/authoring/QuizAuthoring';
import { QuizRunner } from './components/runner/QuizRunner';
import { ThemeProvider } from './context/ThemeContext';

type Mode = 'authoring' | 'play';

function App() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [mode, setMode] = useState<Mode>('authoring');

  const handleAdd = (question: Question) => {
    setQuestions((prev) => [...prev, question]);
  };

  return (
    <ThemeProvider>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: 16 }}>
        <h1>QuizArena</h1>

        <div style={{ marginBottom: 16 }}>
          <button disabled={mode === 'authoring'} onClick={() => setMode('authoring')}>
            問題を作る
          </button>
          <button disabled={mode === 'play'} onClick={() => setMode('play')}>
            クイズで遊ぶ
          </button>
        </div>

        {mode === 'authoring' ? (
          <QuizAuthoring questions={questions} onAdd={handleAdd} />
        ) : (
          <QuizRunner questions={questions} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
