import { useState } from 'react';
import type { CategoryFilter, QuestionOrder } from '../../types';

type StartScreenProps = {
  onStart: (category: CategoryFilter, order: QuestionOrder) => void;
};

export function StartScreen({ onStart }: StartScreenProps) {
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [order, setOrder] = useState<QuestionOrder>('registered');

  return (
    <div>
      <h3>クイズ設定</h3>

      <div>
        <span>出題カテゴリ：</span>
        {(['All', 'JavaScript', 'TypeScript', 'React'] as const).map((c) => (
          <label key={c} style={{ marginRight: 8 }}>
            <input
              type="radio"
              name="category"
              checked={category === c}
              onChange={() => setCategory(c)}
            />
            {c === 'All' ? 'すべて' : c}
          </label>
        ))}
      </div>

      <div>
        <span>出題順：</span>
        <label style={{ marginRight: 8 }}>
          <input
            type="radio"
            name="order"
            checked={order === 'registered'}
            onChange={() => setOrder('registered')}
          />
          登録順
        </label>
        <label>
          <input
            type="radio"
            name="order"
            checked={order === 'shuffle'}
            onChange={() => setOrder('shuffle')}
          />
          シャッフル
        </label>
      </div>

      <button onClick={() => onStart(category, order)}>スタート</button>
    </div>
  );
}
