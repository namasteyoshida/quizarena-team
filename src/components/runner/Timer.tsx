import { useEffect, useRef, useState } from 'react';
import { formatTime } from '../logic/formatTime';

type TimerProps = {
  timeLimit: number; // この問題の制限時間（秒）
  isRunning: boolean; // false（answered状態など）ならカウントダウンを止める（T-2）
  onTimeout: () => void;
  // 問題が変わったことを検知するためのキー（T-1: これが変わるたびにリセットする）
  resetKey: string;
};

export function Timer({ timeLimit, isRunning, onTimeout, resetKey }: TimerProps) {
  const [remainingSec, setRemainingSec] = useState(timeLimit);
  const intervalIdRef = useRef<number | null>(null);

  // T-1: 問題が切り替わる（resetKeyが変わる）たびに制限時間へリセット
  useEffect(() => {
    setRemainingSec(timeLimit);
  }, [resetKey, timeLimit]);

  // T-2, T-3: isRunning の間だけカウントダウンし、
  // クリーンアップで確実に setInterval を解除する
  useEffect(() => {
    if (!isRunning) {
      return;
    }

    intervalIdRef.current = window.setInterval(() => {
      setRemainingSec((prev) => {
        if (prev <= 1) {
          // 0秒未満にはしない（T-2）
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // T-3: 依存配列の値が変わって再実行される直前、またはアンマウント時に必ず解除
    return () => {
      if (intervalIdRef.current !== null) {
        window.clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [isRunning, resetKey]);

  // 0秒になったら1回だけ onTimeout を呼ぶ
  useEffect(() => {
    if (isRunning && remainingSec === 0) {
      onTimeout();
    }
  }, [isRunning, remainingSec, onTimeout]);

  return <div>⏱ 残り {formatTime(remainingSec)}</div>;
}
