# タスク管理：新卒向け研修資料サイト

## プロジェクト情報

- **開始日**: 2025-10-21
- **見積もり工数**: 4-5日
- **優先度**: 高
- **担当者**: TBD

---

## Phase 1: 環境構築とセットアップ（0.5日）

### Task 1.1: Next.jsプロジェクトの初期化（2025年最新版）
- [ ] Next.js 15.5.6 プロジェクト作成（App Router + Turbopack）
  ```bash
  npx create-next-app@latest sports-tech-starter-guide --typescript --tailwind --app --turbo
  ```
- [ ] 必要な依存関係のインストール（最新版）
  ```bash
  npm install @next/mdx@^15.5.6
  npm install gray-matter@^4.0.3
  npm install remark-gfm@^4.0.0
  npm install rehype-prism-plus@^2.0.0
  ```
- [ ] next.config.mjsの作成（@next/mdx設定）
  - `@next/mdx`の設定
  - `output: 'export'`で静的エクスポート
  - Turbopack有効化
- [ ] Tailwind CSS v4.0設定
  - globals.cssにCSS-First設定（@theme使用）
  - カスタムカラー追加
  - P3カラースペース対応

**受け入れ基準**:
- ✅ `npm run dev --turbo` でTurbopack起動する
- ✅ TypeScriptエラーがない
- ✅ Tailwind CSS v4.0が正常に動作する

**技術スタック（最新版）**:
- Next.js: 15.5.6
- React: 19.2
- TypeScript: 5.7+
- @next/mdx: 15.5.6（next-mdx-remoteは非推奨）
- Tailwind CSS: v4.0

---

### Task 1.2: ディレクトリ構造の作成
- [ ] `content/` ディレクトリ作成（プロジェクトルート直下）
  - 非エンジニアもここだけ編集できるように分離
- [ ] `content/README.md` 作成（編集ガイド）
- [ ] `src/components/` 配下のディレクトリ作成
  - `Layout/`
  - `MDX/`
  - `Progress/`
  - `Navigation/`
- [ ] `src/lib/` ディレクトリ作成
- [ ] `src/types/` ディレクトリ作成
- [ ] `public/images/` ディレクトリ作成
- [ ] `.github/` ディレクトリ作成
  - `workflows/`（GitHub Actions用）
  - `pull_request_template.md`（PRテンプレート）

**受け入れ基準**:
- ✅ design.mdに記載された構造が作成されている
- ✅ `content/` がプロジェクトルート直下にある

---

### Task 1.3: セキュリティ設定（公開リポジトリ対応）

- [ ] `.gitignore` 作成
  - 環境変数ファイル（.env）を除外
  - ビルド成果物を除外
  - エディタ設定を除外
  - `design.md` の「9.2 .gitignore設定」を参照
- [ ] `.github/pull_request_template.md` 作成
  - セキュリティチェックリスト
  - `design.md` の「9.4 PRテンプレート」を参照
- [ ] README.md にセキュリティ注意事項を記載
  - コミットしてはいけないもの
  - 誤ってコミットした場合の対応
  - `design.md` の「9.3 README.mdセキュリティ注意事項」を参照

**受け入れ基準**:
- ✅ `.gitignore` が作成され、機密情報が除外されている
- ✅ PRテンプレートにセキュリティチェックリストがある
- ✅ README.mdにセキュリティ注意事項が記載されている

**重要**: このタスクは公開リポジトリのため必須です

---

### Task 1.4: 型定義の作成
- [ ] `src/types/index.ts` 作成
  - `ContentMetadata` interface
  - `Quiz` interface
  - `Progress` interface
  - その他必要な型

**受け入れ基準**:
- ✅ 型定義ファイルが作成されている
- ✅ TypeScriptでインポート可能

---

## Phase 2: 基本レイアウトの実装（0.5日）

### Task 2.1: Layoutコンポーネントの実装
- [ ] `Header.tsx` 実装
  - ロゴ表示
  - タイトル表示
  - 進捗インジケーター（簡易版）
- [ ] `Footer.tsx` 実装
  - 著作権表記
  - GitHubリンク
  - 最終更新日
- [ ] `Sidebar.tsx` 実装
  - セクション一覧表示
  - 現在ページのハイライト
  - スマホ対応（ハンバーガーメニュー）

**受け入れ基準**:
- ✅ 各コンポーネントが正常に表示される
- ✅ レスポンシブデザインが機能する
- ✅ スマホでサイドバーが適切に表示される

---

### Task 2.2: ルートレイアウトの設定
- [ ] `src/app/layout.tsx` 実装
  - メタデータ設定（title、description）
  - グローバルスタイル適用
  - Header、Footerの配置
  - Sidebarの配置

**受け入れ基準**:
- ✅ 全ページで共通レイアウトが適用される
- ✅ SEO用メタタグが設定されている

---

### Task 2.3: グローバルスタイルの調整
- [ ] `src/styles/globals.css` 調整
  - タイポグラフィ設定
  - カスタムスクロールバー（オプション）
  - コードブロック用スタイル

**受け入れ基準**:
- ✅ 読みやすいフォント・行間設定
- ✅ 全体的なデザインの統一感

---

## Phase 3: MDXコンテンツ管理（1日）

### Task 3.1: MDXファイル読み込みライブラリの実装
- [ ] `src/lib/mdx.ts` 実装
  - `getContentBySlug()`: スラグからMDXを取得
  - `getAllContentSlugs()`: 全コンテンツのスラグ一覧
  - `getContentMetadata()`: メタデータ取得
- [ ] `src/lib/content.ts` 実装
  - コンテンツ一覧の定義
  - 順序管理
  - メタデータ管理

**受け入れ基準**:
- ✅ MDXファイルを正常に読み込める
- ✅ frontmatterを解析できる
- ✅ エラーハンドリングが実装されている

---

### Task 3.2: HTMLからMDXへのコンテンツ移行
- [ ] `content/01-web-structure.mdx` 作成（プロジェクトルート直下）
  - 既存HTMLから内容を移行
  - frontmatter追加（title、description、order等）
  - クイズをQuizコンポーネントに変換
- [ ] `content/02-web-tech.mdx` 作成
- [ ] `content/03-app-basics.mdx` 作成
- [ ] `content/04-ad-marketing.mdx` 作成
- [ ] `content/05-security.mdx` 作成
  - 既存HTMLの「データ・システム基礎」を「セキュリティ基礎」に変更
  - `05-security-content-draft.md` の内容を使用
- [ ] `content/06-practical.mdx` 作成
- [ ] `content/07-ai-usage.mdx` 作成
- [ ] `content/08-markdown.mdx` 作成
- [ ] `content/09-final-test.mdx` 作成

**受け入れ基準**:
- ✅ 全9セクションのMDXファイルが `content/` ディレクトリに作成されている
- ✅ 既存HTMLの内容が正確に移行されている
- ✅ frontmatterが正しく設定されている
- ✅ マークダウン記法が正しい

**注意事項**:
- 大量のコンテンツなので、AIに段階的に依頼することを推奨
- 最初に1ファイル完成させてレビュー、その後残りを作成
- `content/` はプロジェクトルート直下に配置（非エンジニアが編集しやすいように）

---

### Task 3.3: MDX用カスタムコンポーネントの実装
- [ ] `src/components/MDX/MDXComponents.tsx` 実装
  - h1, h2, h3等の見出しスタイル
  - p, ul, ol等の基本要素スタイル
  - カスタムコンポーネントのマッピング
- [ ] `src/components/MDX/Callout.tsx` 実装
  - info、warning、success、error タイプ対応
- [ ] `src/components/MDX/CodeBlock.tsx` 実装
  - `react-syntax-highlighter` 使用
  - コピーボタン
  - 行番号表示

**受け入れ基準**:
- ✅ MDXコンテンツが美しくレンダリングされる
- ✅ コードブロックがシンタックスハイライトされる
- ✅ Calloutコンポーネントが正常に動作する

---

## Phase 4: インタラクティブ機能（クイズ・進捗）の実装（1日）

### Task 4.1: クイズコンポーネントの実装
- [ ] `src/components/MDX/Quiz.tsx` 実装
  - 選択肢の表示（ラジオボタン）
  - 「回答する」ボタン
  - 正解/不正解のフィードバック表示
  - 解説の表示
  - アニメーション（正解時、不正解時）
  - 回答結果をLocalStorageに保存

**受け入れ基準**:
- ✅ クイズが正常に動作する
- ✅ 正解・不正解のフィードバックが表示される
- ✅ 解説が表示される
- ✅ 回答結果が保存される

---

### Task 4.2: 進捗管理機能の実装
- [ ] `src/lib/progress.ts` 実装
  - `getProgress()`: LocalStorageから進捗取得
  - `saveProgress()`: 進捗を保存
  - `markAsCompleted()`: セクションを完了としてマーク
  - `resetProgress()`: 進捗リセット
  - `calculateOverallProgress()`: 全体進捗計算
- [ ] `src/components/Progress/ProgressTracker.tsx` 実装
  - 進捗管理のラッパーコンポーネント
  - 「完了」ボタン

**受け入れ基準**:
- ✅ 進捗がLocalStorageに保存される
- ✅ ページリロード後も進捗が保持される
- ✅ 全体進捗が正しく計算される

---

### Task 4.3: 進捗バーコンポーネントの実装
- [ ] `src/components/Progress/ProgressBar.tsx` 実装
  - 視覚的な進捗バー
  - パーセンテージ表示
  - アニメーション

**受け入れ基準**:
- ✅ 進捗バーが表示される
- ✅ 進捗に応じてバーが変化する
- ✅ スムーズなアニメーション

---

## Phase 5: ページ実装（0.5日）

### Task 5.1: トップページの実装
- [ ] `src/app/page.tsx` 実装
  - サイトの説明
  - 全9セクションのカード一覧
  - 各カードに必要な情報表示
    - タイトル
    - 説明
    - 推定学習時間
    - 完了状態（チェックマーク）
  - 全体進捗バー
  - 総合テストへのリンク

**受け入れ基準**:
- ✅ トップページが美しく表示される
- ✅ 各セクションのカードが正しく表示される
- ✅ 進捗が反映される
- ✅ リンクが正常に動作する

---

### Task 5.2: 動的コンテンツページの実装
- [ ] `src/app/[slug]/page.tsx` 実装
  - 動的ルーティング設定
  - MDXコンテンツの読み込み
  - MDXコンテンツのレンダリング
  - パンくずリストの表示
  - 前後ページへのナビゲーション
  - 「完了」ボタンの配置
- [ ] `generateStaticParams()` 実装（静的生成用）

**受け入れ基準**:
- ✅ 各セクションのページが表示される
- ✅ MDXコンテンツが正しくレンダリングされる
- ✅ 前後ページへの移動が可能
- ✅ 完了ボタンが動作する

---

### Task 5.3: パンくずリストの実装
- [ ] `src/components/Navigation/Breadcrumb.tsx` 実装
  - トップページへのリンク
  - 現在のセクション表示

**受け入れ基準**:
- ✅ パンくずリストが表示される
- ✅ リンクが正常に動作する

---

### Task 5.4: 総合テストページの実装（オプション）
- [ ] `src/app/test/page.tsx` 実装
  - 30問の基礎知識テスト
  - ケーススタディ
  - スコア表示
  - 弱点セクションの提案

**受け入れ基準**:
- ✅ テストページが動作する
- ✅ スコアが計算される
- ✅ 結果が表示される

**注意**: このタスクは優先度低め。Phase 1-5完了後に実装。

---

## Phase 6: GitHub Pages対応（0.5日）

### Task 6.1: Next.js静的エクスポート設定
- [ ] `next.config.mjs` 設定（@next/mdx使用）
  - `output: 'export'` 追加
  - `basePath` 設定（リポジトリ名に応じて）
  - `images.unoptimized: true` 設定
  - `trailingSlash: true` 設定
  - `@next/mdx` プラグイン設定
- [ ] `public/.nojekyll` ファイル作成（GitHub Pages用）
- [ ] ビルドテスト
  ```bash
  npm run build
  ```

**受け入れ基準**:
- ✅ `npm run build` が成功する
- ✅ `out/` ディレクトリに静的ファイルが生成される
- ✅ ローカルで静的ファイルをテスト可能（`npx serve out`）

---

### Task 6.2: GitHub Actions自動デプロイ設定

SSG（静的サイト生成）なので、GitHub Actions でビルド環境を用意します。

- [ ] `.github/workflows/deploy.yml` 作成
  - ビルドジョブ（Node.js 22、npm ci、npm run build）
  - デプロイジョブ（GitHub Pagesへのデプロイ）
  - `design.md` の「6.3 GitHub Pagesへのデプロイ」を参照
- [ ] GitHubリポジトリ作成・プッシュ
- [ ] Settings > Pages > Source を **"GitHub Actions"** に設定
- [ ] mainブランチにpush
- [ ] Actionsタブでデプロイ確認

**受け入れ基準**:
- ✅ `.github/workflows/deploy.yml` が作成されている
- ✅ mainブランチへのpushで自動ビルド・デプロイされる
- ✅ GitHub Pagesで正常に表示される
- ✅ `https://<username>.github.io/sports-tech-starter-guide` でアクセス可能

**動作フロー**:
```
マークダウン編集 → push → GitHub Actions（ビルド） → GitHub Pages（公開）
```

**なぜ必要？**
- SSGはマークダウン→HTML変換が必要
- GitHub Actions がビルド環境を提供
- 非エンジニアがマークダウン編集だけで公開可能に

---

## Phase 7: テストとデザイン調整（0.5日）

### Task 7.1: クロスブラウザ・デバイステスト
- [ ] デスクトップテスト
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
- [ ] モバイルテスト
  - [ ] iOS Safari
  - [ ] Android Chrome
- [ ] タブレットテスト
  - [ ] iPad
  - [ ] Androidタブレット

**受け入れ基準**:
- ✅ 全デバイス・ブラウザで正常に動作する
- ✅ レイアウトが崩れない

---

### Task 7.2: パフォーマンステスト
- [ ] Lighthouse実行
  - パフォーマンススコア目標: 90以上
  - アクセシビリティスコア目標: 90以上
- [ ] バンドルサイズ確認
- [ ] 必要に応じて最適化

**受け入れ基準**:
- ✅ Lighthouseスコアが目標値を達成
- ✅ 初回ロード時間が3秒以内

---

### Task 7.3: デザイン最終調整
- [ ] スペーシング調整
- [ ] カラー統一
- [ ] タイポグラフィ調整
- [ ] アニメーション調整
- [ ] ダークモード対応（オプション）

**受け入れ基準**:
- ✅ デザインが統一されている
- ✅ 読みやすいレイアウト

---

### Task 7.4: 機能テスト
- [ ] 全ページの表示確認
- [ ] クイズ機能の動作確認
- [ ] 進捗保存・復元の確認
- [ ] ナビゲーションの確認
- [ ] リンクの確認

**受け入れ基準**:
- ✅ 全機能が正常に動作する
- ✅ バグがない

---

## Phase 8: ドキュメント整備とリリース（0.5日）

### Task 8.1: README.md作成
- [ ] プロジェクト説明
- [ ] 開発環境のセットアップ手順
- [ ] ビルド・デプロイ手順
- [ ] コンテンツの編集方法
- [ ] ライセンス情報

**受け入れ基準**:
- ✅ 第三者がREADMEを読んで開発環境を構築できる

---

### Task 8.2: コントリビューションガイドの作成（オプション）
- [ ] `CONTRIBUTING.md` 作成
  - コンテンツ追加方法
  - バグ報告方法
  - プルリクエストのガイドライン

---

### Task 8.3: セキュリティ最終チェック（公開リポジトリ）

**公開前の必須チェック**:

- [ ] `.gitignore` の確認
  - `.env` ファイルが除外されているか
  - ビルド成果物が除外されているか
- [ ] コミット履歴の確認
  - APIキーやパスワードが含まれていないか
  - 個人情報が含まれていないか
  - 社内機密情報が含まれていないか
- [ ] `content/` ディレクトリの確認
  - 全コンテンツが公開可能か
  - 社内固有の情報が含まれていないか
- [ ] 依存関係の脆弱性チェック
  ```bash
  npm audit
  ```
- [ ] GitHub Dependabotの有効化
  - Settings > Security > Dependabot alerts

**受け入れ基準**:
- ✅ `.gitignore` が適切に設定されている
- ✅ コミット履歴に機密情報が含まれていない
- ✅ `npm audit` で重大な脆弱性がない
- ✅ README.mdにセキュリティ注意事項が記載されている
- ✅ PRテンプレートが設定されている

**重要**: 公開前に必ずこのチェックリストを完了してください

---

### Task 8.4: 最終チェックとリリース
- [ ] 全タスクの完了確認
- [ ] デザインドキュメントとの整合性確認
- [ ] 要件定義との整合性確認
- [ ] セキュリティチェック完了の確認
- [ ] リリースノート作成（オプション）
- [ ] mainブランチへマージ
- [ ] GitHub Pagesで本番公開

**受け入れ基準**:
- ✅ 全要件が実装されている
- ✅ セキュリティチェックが完了している
- ✅ 本番環境で正常に動作する
- ✅ URLを社内で共有可能

---

## 進捗管理

### 全体進捗
- [ ] Phase 1: 環境構築とセットアップ（0.5日）
- [ ] Phase 2: 基本レイアウトの実装（0.5日）
- [ ] Phase 3: MDXコンテンツ管理（1日）
- [ ] Phase 4: インタラクティブ機能の実装（1日）
- [ ] Phase 5: ページ実装（0.5日）
- [ ] Phase 6: GitHub Pages対応（0.5日）
- [ ] Phase 7: テストとデザイン調整（0.5日）
- [ ] Phase 8: ドキュメント整備とリリース（0.5日）

### 完了率
0% (0 / 8 フェーズ完了)

---

## リスク・課題管理

### 🚨 リスク1: コンテンツ移行の作業量
**影響度**: 高
**発生確率**: 高
**対策**:
- AIを活用して自動変換スクリプトを作成
- 段階的に移行（1ファイルずつ確認）
- テンプレート作成で効率化

---

### 🚨 リスク2: Next.jsのGitHub Pages対応
**影響度**: 中
**発生確率**: 低
**対策**:
- 事前に小規模プロジェクトでテスト
- 公式ドキュメントに従う
- 問題発生時はVitePressなど別SSGを検討

---

### 🚨 リスク3: クイズ機能の複雑度
**影響度**: 中
**発生確率**: 中
**対策**:
- MVP（最小機能）から開始
- 段階的に機能追加
- ライブラリの活用を検討（react-quiz-component等）

---

## 次のアクション

1. ✅ **設計書を確認してもらう**
2. ⏳ **Phase 1のタスクから開始**
3. ⏳ **1日の終わりに進捗を更新**

---

## メモ・議事録

### 2025-10-21
- 設計書作成完了
- 次回: 環境構築から開始

---

## 参考リンク

- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
