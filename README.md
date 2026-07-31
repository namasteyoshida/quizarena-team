# QuizArena

研修課題【課題6】自作クイズ大会 - QuizArena

## 起動手順

bash
pnpm install
pnpm dev




## コンポーネント構成

```
App
+-- Panel                 ... 共通レイアウト（見出し＋枠線）
+-- QuizAuthoring         ... F-1 作問モード
|   +-- QuestionForm      ... RHF + Yup の作問フォーム（登録内容を onAdd で親へ）
|   +-- QuestionList      ... 登録済み一覧（map + key）
|       +-- QuestionItem
+-- QuizRunner            ... F-2〜F-7 プレイモード。useReducer で状態機械を管理
    +-- StartScreen       ... F-2
    +-- QuestionScreen    ... F-3/F-4（Timer を内包）
    |   +-- Timer         ... useEffect + useRef のカウントダウン
    +-- ResultScreen      ... F-6 結果・復習リスト
```



## メンバー担当

| メンバー | 担当箇所 |
|---|---|
| 関谷 | （QuizAuthoring APP main ThemeContext questions panel） |
| 吉田 | （QuizRunner logic,  type） |

## F/T 自己チェック表

### 機能要件（F-1〜F-7）

| ID | 機能 | 実装状況 | 備考 |
|---|---|---|---|
| F-1 | 作問フォーム | （完了） | |
| F-2 | スタート画面 | （記入） | |
| F-3 | 制限時間タイマー | （完了） | |
| F-4 | 回答・判定 | （完了） | |
| F-5 | 次の問題へ | （完了） | |
| F-6 | 結果・復習 | （完了） | |
| F-7 | 状態管理（useReducer） | （完了） | |

### 挙動要件（T-1〜T-4）

| ID | 挙動要件 | 実装状況 | 備考 |
|---|---|---|---|
| T-1 | タイマーのリセット | （完了） | |
| T-2 | 回答後の停止 | （完了） | |
| T-3 | クリーンアップ（setInterval解除） | （完了） | |
| T-4 | 二重回答防止 | （完了） | |


## 発展課題（任意）
してません涙