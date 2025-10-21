'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useProgress } from '@/hooks/useProgress';

const TOTAL_CHAPTERS = 9;

interface HeaderProps {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
}

export default function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  const { getCompletedCount, mounted } = useProgress();
  const completedCount = mounted ? getCompletedCount() : 0;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/undotsushinsya.png"
                alt="運動通信社"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-gray-900 hidden sm:inline">
                Sports Tech Starter Guide
              </span>
              <span className="text-lg font-bold text-gray-900 sm:hidden">
                Starter Guide
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* 進捗インジケーター */}
            <div className="text-sm text-gray-600">
              進捗:{' '}
              <span className="font-semibold">
                {completedCount} / {TOTAL_CHAPTERS}
              </span>
            </div>

            {/* ハンバーガーメニュー */}
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 text-gray-600 hover:text-primary-500 hover:bg-gray-50 rounded-lg transition"
              aria-label="メニュー"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
