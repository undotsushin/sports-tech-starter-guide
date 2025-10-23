'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProgress } from '@/hooks/useProgress';
import {
  HomeIcon,
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
  { slug: '01-web-structure', title: 'Webサイト構造とパーツ集', Icon: PaintBrushIcon, order: 1 },
  { slug: '02-web-tech', title: 'Web技術基礎', Icon: GlobeAltIcon, order: 2 },
  { slug: '03-app-basics', title: 'アプリ基礎知識', Icon: DevicePhoneMobileIcon, order: 3 },
  { slug: '04-ad-marketing', title: '広告・マーケティング技術', Icon: ChartBarIcon, order: 4 },
  { slug: '05-services', title: 'サービス・システム基礎', Icon: CloudIcon, order: 5 },
  { slug: '06-security', title: 'セキュリティ基礎', Icon: ShieldCheckIcon, order: 6 },
  { slug: '07-practical', title: '実践シチュエーション集', Icon: BriefcaseIcon, order: 7 },
  { slug: '08-ai-usage', title: 'AI活用実践編', Icon: SparklesIcon, order: 8 },
  { slug: '09-markdown', title: 'マークダウン記法', Icon: DocumentTextIcon, order: 9 },
  { slug: '10-final-test', title: '総合テスト集', Icon: CheckCircleIcon, order: 10 },
  { slug: '90-advanced-test', title: '総合テスト集【鬼】', Icon: CheckCircleIcon, order: 90 },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { isCompleted, mounted } = useProgress();

  return (
    <>
      {/* デスクトップサイドバー（左固定） */}
      <aside className="hidden lg:block fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto shadow-lg">
        <nav className="p-4">
          <div className="mb-6">
            <Link
              href="/"
              className={`
                flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition
                ${pathname === '/' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'}
              `}
            >
              <HomeIcon className="w-5 h-5" />
              <span>トップページ</span>
            </Link>
          </div>

          <div className="space-y-1">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              コンテンツ
            </h3>
            {contents.map((content) => {
              const isActive = pathname === `/${content.slug}`;
              const completed = mounted && isCompleted(content.slug);
              const IconComponent = content.Icon;
              return (
                <Link
                  key={content.slug}
                  href={`/${content.slug}`}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-md text-sm transition
                    ${isActive ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  <IconComponent className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1 truncate text-xs">{content.order}. {content.title}</span>
                  {completed && (
                    <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* モバイルサイドバー（全画面） */}
      <aside
        className={`
          lg:hidden fixed top-16 left-0 right-0 bottom-0 w-full bg-white overflow-y-auto
          transition-opacity duration-300 z-50
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
      >
        <nav className="p-4">
          <div className="mb-6">
            <Link
              href="/"
              onClick={onClose}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition
                ${pathname === '/' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'}
              `}
            >
              <HomeIcon className="w-5 h-5" />
              <span>トップページ</span>
            </Link>
          </div>

          <div className="space-y-1">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              コンテンツ
            </h3>
            {contents.map((content) => {
              const isActive = pathname === `/${content.slug}`;
              const completed = mounted && isCompleted(content.slug);
              const IconComponent = content.Icon;
              return (
                <Link
                  key={content.slug}
                  href={`/${content.slug}`}
                  onClick={onClose}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-md text-sm transition
                    ${isActive ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  <IconComponent className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1 truncate text-xs">{content.order}. {content.title}</span>
                  {completed && (
                    <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}
