'use client';

import Link from 'next/link';
import { useProgress } from '@/hooks/useProgress';
import Breadcrumb from '@/components/Breadcrumb';
import HiddenContentCard from '@/components/HiddenContentCard';
import {
  PaintBrushIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  CloudIcon,
  ShieldCheckIcon,
  BriefcaseIcon,
  SparklesIcon,
  DocumentTextIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

// コンテンツ一覧（後でcontentから動的に取得）
const contents = [
  {
    slug: '01-web-structure',
    title: 'Webサイト構造とパーツ集',
    description: 'Webサイトの基本構造とパーツの役割を理解する',
    Icon: PaintBrushIcon,
    order: 1,
    estimatedTime: 30,
  },
  {
    slug: '02-web-tech',
    title: 'Web技術基礎',
    description: 'ブラウザ、ドメイン、サーバーなどWeb技術の基礎知識',
    Icon: GlobeAltIcon,
    order: 2,
    estimatedTime: 30,
  },
  {
    slug: '03-app-basics',
    title: 'アプリ基礎知識',
    description: 'アプリの種類、開発方法、コストの目安を学ぶ',
    Icon: DevicePhoneMobileIcon,
    order: 3,
    estimatedTime: 30,
  },
  {
    slug: '04-ad-marketing',
    title: '広告・マーケティング技術',
    description: '動画広告、効果測定、広告配信システムの理解',
    Icon: ChartBarIcon,
    order: 4,
    estimatedTime: 30,
  },
  {
    slug: '05-services',
    title: 'サービス・システム基礎',
    description: 'API、クラウドサービス、IaaS/PaaS/SaaSの理解',
    Icon: CloudIcon,
    order: 5,
    estimatedTime: 30,
  },
  {
    slug: '06-security',
    title: 'セキュリティ基礎',
    description: 'パスワード管理、フィッシング対策、情報管理の基礎',
    Icon: ShieldCheckIcon,
    order: 6,
    estimatedTime: 30,
  },
  {
    slug: '07-practical',
    title: '実践シチュエーション集',
    description: 'クライアント対応、エンジニア連携の実践的なシーン',
    Icon: BriefcaseIcon,
    order: 7,
    estimatedTime: 30,
  },
  {
    slug: '08-ai-usage',
    title: 'AI活用実践編',
    description: 'プロンプトエンジニアリング、業務への活用方法',
    Icon: SparklesIcon,
    order: 8,
    estimatedTime: 30,
  },
  {
    slug: '09-markdown',
    title: 'マークダウン記法',
    description: 'マークダウンの基本記法と実務での活用',
    Icon: DocumentTextIcon,
    order: 9,
    estimatedTime: 20,
  },
  {
    slug: '10-final-test',
    title: '総合テスト集',
    description: '基礎知識確認テスト、実践問題、ケーススタディ',
    Icon: CheckCircleIcon,
    order: 10,
    estimatedTime: 90,
  },
];

export default function Home() {
  const { getCompletedCount, getCompletionPercentage, isCompleted, mounted, resetProgress } =
    useProgress();

  // 通常のコンテンツ数（90-advanced-testを除く）
  const normalContentsCount = contents.filter(c => c.order < 90).length;

  const completedCount = mounted ? getCompletedCount() : 0;
  const completionPercentage = mounted
    ? getCompletionPercentage(normalContentsCount)
    : 0;

  return (
    <div className="space-y-8">
      {/* ヒーローセクション */}
      <section className="text-center py-8 md:py-12 bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl mb-8 px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          運動通信社 Sports Tech Starter Guide
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
          社員として知っておくべきIT・Web・デザイン・マーケティングの知識を学ぼう
        </p>

        {/* 進捗バー */}
        <div className="max-w-md mx-auto">
          <div className="bg-white/50 rounded-full h-6 overflow-hidden border-2 border-white shadow-sm">
            <div
              className="bg-gradient-to-r from-primary-500 to-blue-500 h-full transition-all duration-500 flex items-center justify-center"
              style={{ width: `${completionPercentage}%` }}
            >
              {completionPercentage > 10 && (
                <span className="text-xs font-bold text-white">
                  {completionPercentage}%
                </span>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-700 mt-3 font-medium">
            進捗: {completedCount} / {normalContentsCount} 章完了（
            {completionPercentage}%）
          </p>
        </div>
      </section>

      {/* コンテンツカード一覧 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">目次</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {contents.map((content) => {
            const completed = mounted && isCompleted(content.slug);
            const IconComponent = content.Icon;
            return (
              <Link
                key={content.slug}
                href={`/${content.slug}`}
                className={`group block p-5 md:p-6 bg-white rounded-xl border-2 hover:shadow-xl transition-all duration-300 ${
                  completed
                    ? 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50'
                    : 'border-gray-200 hover:border-primary-400 hover:-translate-y-1'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 flex items-center justify-center bg-primary-100 rounded-xl">
                      <IconComponent className="w-8 h-8 text-primary-600" />
                    </div>
                    {completed && (
                      <span className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                        <CheckCircleIcon className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {content.order}. {content.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {content.description}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        ⏱️ 約{content.estimatedTime}分
                      </span>
                      <span
                        className={`text-sm font-semibold ${
                          completed
                            ? 'text-green-600'
                            : 'text-primary-600 group-hover:text-primary-700'
                        }`}
                      >
                        {completed ? '完了済み ✓' : '学習開始 →'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 隠しコンテンツカード - 2章以上完了で表示 */}
      {completedCount >= 2 && (
        <section className="mt-8">
          <HiddenContentCard />
        </section>
      )}

      {/* 使い方セクション */}
      <section className="mt-12 p-6 bg-primary-50 rounded-lg border border-primary-200">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-900">使い方</h2>
          {mounted && completedCount > 0 && (
            <button
              onClick={() => {
                if (confirm('進捗をリセットしますか？')) {
                  resetProgress();
                }
              }}
              className="text-xs text-red-600 hover:text-red-700 underline"
            >
              進捗をリセット
            </button>
          )}
        </div>
        <ul className="space-y-2 text-gray-700 list-disc list-inside">
          <li>各章を順番に学習していきます</li>
          <li>各章の最後にはクイズがあります</li>
          <li>進捗は各章の最後の「完了」ボタンで記録されます</li>
          <li>最後に総合テストで理解度を確認しましょう</li>
        </ul>
      </section>

      {/* パンくずリスト */}
      <Breadcrumb items={[]} />
    </div>
  );
}
