// コンテンツのメタデータ
export interface ContentMetadata {
  slug: string;              // URL用スラグ（例: "01-web-structure"）
  title: string;             // タイトル（例: "Webサイト構造とパーツ集"）
  description: string;       // 説明
  order: number;             // 順序（1, 2, 3...）
  icon?: string;             // アイコン絵文字（オプション）
  estimatedTime: number;     // 推定学習時間（分）
}

// クイズの型定義
export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;     // 正解のインデックス（0始まり）
  explanation?: string;      // 解説（オプション）
}

// 学習進捗の型定義
export interface Progress {
  [slug: string]: {
    completed: boolean;
    quizScore?: number;      // クイズの正答率
    lastVisited: string;     // ISO 8601形式の日時
  };
}
