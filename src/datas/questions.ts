import type { Question } from "../types";

// TODO: これはまだ8問（JS2/TS2/React4）です。要件定義書の「9問（JS3/TS3/React3）」に合わせて調整してください。

export const initialQuestions: Question[] = (() => {
  const q1Choices = [
    { id: crypto.randomUUID(), label: 'letは再代入可能,constは再代入不可ただしオブジェクトの中身は変更可能' },
    { id: crypto.randomUUID(), label: 'letは再代入できるがconstはできないしオブジェクトの中身も変えられない' },
    { id: crypto.randomUUID(), label: 'const は再代入できるが let はできないしオブジェクトの中身も変えられない' },
    { id: crypto.randomUUID(), label: 'どちらも再代入できない' },
  ];

  const q2Choices = [
    { id: crypto.randomUUID(), label: 'yield' },
    { id: crypto.randomUUID(), label: 'await' },
    { id: crypto.randomUUID(), label: 'defer' },
    { id: crypto.randomUUID(), label: 'sync' },
  ];

  const q3Choices = [
    { id: crypto.randomUUID(), label: 'any' },
    { id: crypto.randomUUID(), label: 'never' },
    { id: crypto.randomUUID(), label: 'unknown' },
    { id: crypto.randomUUID(), label: 'void' },
  ];

  const q4Choices = [
    { id: crypto.randomUUID(), label: 'A & B（インターセクション型）' },
    { id: crypto.randomUUID(), label: 'A -> B' },
    { id: crypto.randomUUID(), label: 'A => B' },
    { id: crypto.randomUUID(), label: 'A | B（ユニオン型）' },
  ];

  const q5Choices = [
    { id: crypto.randomUUID(), label: '状態を更新するための関数' },
    { id: crypto.randomUUID(), label: '現在の状態の値' },
    { id: crypto.randomUUID(), label: '初期値' },
    { id: crypto.randomUUID(), label: 'コンポーネント名' },
  ];

  const q6Choices = [
    { id: crypto.randomUUID(), label: 'マウント時のみ' },
    { id: crypto.randomUUID(), label: '次のeffect実行前 or アンマウント時' },
    { id: crypto.randomUUID(), label: '毎回のレンダリング後すぐ' },
    { id: crypto.randomUUID(), label: '実行されることはない' },
  ];

  const q7Choices = [
    { id: crypto.randomUUID(), label: 'useMemo' },
    { id: crypto.randomUUID(), label: 'useCallback' },
    { id: crypto.randomUUID(), label: 'useReducer' },
    { id: crypto.randomUUID(), label: 'useLayoutEffect' },
  ];

  const q8Choices = [
    { id: crypto.randomUUID(), label: 'コンポーネントを再レンダリングさせる' },
    { id: crypto.randomUUID(), label: '副作用を実行する' },
    { id: crypto.randomUUID(), label: '状態遷移を管理する' },
    { id: crypto.randomUUID(), label: '再レンダリングを起こさずに値を保持する' },
  ];

  return [
    {
      id: crypto.randomUUID(),
      text: 'JavaScriptでletとconst の違いとして正しいものはどれ？',
      choices: q1Choices,
      correctChoiceId: q1Choices[0].id,
      explanation: 'letは再代入可能,constは再代入不可ただしオブジェクトの中身は変更可能。',
      timeLimitSec: 20,
      category: 'JavaScript',
    },
    {
      id: crypto.randomUUID(),
      text: '非同期処理で Promise を待つ際に使うキーワードはどれ？',
      choices: q2Choices,
      correctChoiceId: q2Choices[1].id,
      explanation: 'async関数の中で await を使うと、Promiseの解決を待ってから次の処理に進む。',
      timeLimitSec: 20,
      category: 'JavaScript',
    },
    {
      id: crypto.randomUUID(),
      text: 'TypeScriptで「値は不明だが型安全に扱いたい」場合に使う型はどれ？',
      choices: q3Choices,
      correctChoiceId: q3Choices[2].id,
      explanation: 'unknown は any と違い、型ガードで絞り込むまでプロパティアクセス等ができない。',
      timeLimitSec: 25,
      category: 'TypeScript',
    },
    {
      id: crypto.randomUUID(),
      text: 'TypeScriptで複数の型のいずれかを表すときに使う記法はどれ？',
      choices: q4Choices,
      correctChoiceId: q4Choices[3].id,
      explanation: 'ユニオン型（|）は「AまたはB」、インターセクション型（&）は「AかつB」を表す。',
      timeLimitSec: 20,
      category: 'TypeScript',
    },
    {
      id: crypto.randomUUID(),
      text: 'Reactの useState が返す配列の2番目の要素は何？',
      choices: q5Choices,
      correctChoiceId: q5Choices[0].id,
      explanation: 'useState は [値, 更新関数] のペアを返す。1番目が現在値、2番目が更新関数。',
      timeLimitSec: 20,
      category: 'React',
    },
    {
      id: crypto.randomUUID(),
      text: 'useEffect のクリーンアップ関数はどのタイミングで実行される？',
      choices: q6Choices,
      correctChoiceId: q6Choices[1].id,
      explanation: 'useEffectの戻り値として返した関数は、依存配列の値が変わって再実行される直前、またはコンポーネントのアンマウント時に呼ばれる。',
      timeLimitSec: 25,
      category: 'React',
    },
    {
      id: crypto.randomUUID(),
      text: '複数の値が同時に変化する複雑な状態遷移を管理するのに適したフックはどれ？',
      choices: q7Choices,
      correctChoiceId: q7Choices[2].id,
      explanation: 'useReducerは状態遷移ロジックを1箇所（reducer関数）に集約でき、複数値の一括更新に向いている。',
      timeLimitSec: 25,
      category: 'React',
    },
    {
      id: crypto.randomUUID(),
      text: 'useRef の主な用途として正しいものはどれ？',
      choices: q8Choices,
      correctChoiceId: q8Choices[3].id,
      explanation: 'useRefで作った.currentへの書き換えは再レンダリングを引き起こさない。DOM参照やinterval ID保持などに使う。',
      timeLimitSec: 20,
      category: 'React',
    },
  ];
})();
