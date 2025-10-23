# 運動通信社 Sports Tech Starter Guide

新卒社員向けIT基礎知識の学習サイト

## 概要

このプロジェクトは、運動通信社の新入社員がIT・Web・デザイン・マーケティングの基礎知識を体系的に学ぶための教育コンテンツです。

### 主な機能

- 10章の学習コンテンツ（Webサイト構造、Web技術、アプリ、広告、サービス、セキュリティ、実践、AI活用、Markdown、総合テスト）
- 各章ごとの理解度チェッククイズ
- LocalStorageによる学習進捗管理
- レスポンシブデザイン対応（PC/タブレット/スマホ）
- 目次機能とパンくずリスト
- 進捗リセット機能

## 技術スタック

- **Framework**: [Next.js 15.5.6](https://nextjs.org/) (App Router, SSG)
- **UI Library**: [React 19.2](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Heroicons](https://heroicons.com/)
- **Content**: MDX (Markdown + React components)
- **Language**: TypeScript 5.9+
- **Deployment**: GitHub Pages

## 開発環境のセットアップ

### 必要な環境

- Node.js 20.x以上
- npm 10.x以上

### インストール手順

```bash
# リポジトリのクローン
git clone https://github.com/undotsushin/sports-tech-starter-guide.git
cd sports-tech-starter-guide

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

開発サーバーが起動したら、ブラウザで `http://localhost:3000` を開いてください。

### 利用可能なコマンド

```bash
npm run dev      # 開発サーバー起動（ホットリロード有効）
npm run build    # 本番用ビルド（静的サイト生成）
npm run start    # ビルド後のプレビュー
npm run lint     # コードの静的解析
```

## コンテンツの編集

### MDXファイルの構造

コンテンツは `content/` ディレクトリ内のMDXファイルで管理されています。

```
content/
├── 01-web-structure.mdx    # Webサイト構造とパーツ集
├── 02-web-tech.mdx          # Web技術基礎
├── 03-app-basics.mdx        # アプリ基礎知識
├── 04-ad-marketing.mdx      # 広告・マーケティング技術
├── 05-services.mdx          # サービス・システム基礎
├── 06-security.mdx          # セキュリティ基礎
├── 07-practical.mdx         # 実践シチュエーション集
├── 08-ai-usage.mdx          # AI活用実践編
├── 09-markdown.mdx          # マークダウン記法
├── 10-final-test.mdx        # 総合テスト集
└── 90-advanced-test.mdx     # 総合テスト集【鬼】（隠しコンテンツ）
```

### MDXファイルのフロントマター

各MDXファイルの先頭には、以下のようなメタデータを記述します：

```yaml
---
title: "章のタイトル"
description: "章の説明"
icon: ""
order: 1
estimatedTime: 30
---
```

### MDXで使用可能なコンポーネント

- `<Quiz>` - クイズコンポーネント（選択式問題）
- `<WhyNeeded>` - 「なぜ必要か」を説明するボックス
- `<HiddenContentCard>` - 隠しコンテンツへの誘導カード

### コンテンツの追加・編集

1. `content/` ディレクトリ内のMDXファイルを編集
2. Markdown形式でコンテンツを記述
3. 保存すると自動的にホットリロードで反映されます

## セキュリティ

このプロジェクトは**公開リポジトリ**として運用されています。

### セキュリティ対策

- 完全な静的サイト - サーバーサイドのコードなし
- 環境変数不使用 - APIキーや秘密情報なし
- LocalStorageのみ - ユーザーデータはブラウザに保存
- .gitignore完備 - 機密ファイルの除外設定済み
- PR テンプレート - セキュリティチェックリスト付き

### 注意事項

- 個人情報を含むコンテンツは追加しないでください
- APIキーや認証情報をコミットしないでください
- 内部専用情報は含めないでください

## デプロイ

### GitHub Pagesへの自動デプロイ

mainブランチへのpush時に自動的にGitHub Pagesにデプロイされます。

デプロイURL: `https://undotsushin.github.io/sports-tech-starter-guide/`

### 手動デプロイ

```bash
# 静的サイトをビルド
npm run build

# out/ ディレクトリが生成されます
# このディレクトリをホスティングサービスにデプロイ可能
```

## ディレクトリ構造

```
sports-tech-starter-guide/
├── .github/
│   ├── workflows/
│   │   └── deploy.yml              # GitHub Actions設定
│   └── pull_request_template.md    # PRテンプレート
├── content/                         # MDXコンテンツ
│   └── *.mdx                        # 各章のコンテンツファイル
├── public/                          # 静的ファイル
│   ├── images/                      # 画像ファイル
│   ├── .nojekyll                    # GitHub Pages設定
│   └── favicon.ico                  # ファビコン
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── [slug]/                  # 動的ルーティング
│   │   ├── layout.tsx               # ルートレイアウト
│   │   └── page.tsx                 # トップページ
│   ├── components/                  # Reactコンポーネント
│   │   ├── Layout/                  # レイアウト関連
│   │   ├── MDX/                     # MDXカスタムコンポーネント
│   │   ├── Breadcrumb.tsx           # パンくずリスト
│   │   ├── CompleteButton.tsx       # 完了ボタン
│   │   ├── HiddenContentCard.tsx    # 隠しコンテンツカード
│   │   └── TableOfContents.tsx      # 目次コンポーネント
│   ├── hooks/                       # カスタムフック
│   │   └── useProgress.ts           # 進捗管理フック
│   ├── styles/
│   │   └── globals.css              # グローバルスタイル
│   └── types/
│       └── index.ts                 # TypeScript型定義
├── next.config.mjs                  # Next.js設定
├── package.json                     # 依存関係
├── tsconfig.json                    # TypeScript設定
└── README.md                        # このファイル
```

## コントリビューション

プルリクエストを作成する際は、PRテンプレートのセキュリティチェックリストを必ず確認してください。

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## ライセンス

ISC

## 作成者

運動通信社

## リンク

- [GitHub リポジトリ](https://github.com/undotsushin/sports-tech-starter-guide)
- [公開サイト](https://undotsushin.github.io/sports-tech-starter-guide/)

---

**Note**: このプロジェクトは教育目的で作成されており、公開リポジトリとして運用されています。機密情報や個人情報を含めないようご注意ください。
