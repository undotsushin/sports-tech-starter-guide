'use client';

import { useState, useEffect } from 'react';
import type { Progress } from '@/types';

const PROGRESS_KEY = 'learning-progress';

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({});
  const [mounted, setMounted] = useState(false);

  // LocalStorageから進捗を読み込む関数
  const loadProgress = () => {
    const savedProgress = localStorage.getItem(PROGRESS_KEY);
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (error) {
        console.error('Failed to parse progress:', error);
      }
    }
  };

  useEffect(() => {
    setMounted(true);
    loadProgress();

    // LocalStorageの変更を監視
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === PROGRESS_KEY) {
        loadProgress();
      }
    };

    // カスタムイベントも監視（同じタブ内での変更用）
    const handleCustomStorageChange = () => {
      loadProgress();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('progress-updated', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('progress-updated', handleCustomStorageChange);
    };
  }, []);

  const updateProgress = (
    slug: string,
    data: {
      completed?: boolean;
      quizScore?: number;
    }
  ) => {
    const newProgress = {
      ...progress,
      [slug]: {
        ...progress[slug],
        ...data,
        lastVisited: new Date().toISOString(),
      },
    };
    setProgress(newProgress);
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
    // カスタムイベントを発火して他のコンポーネントに通知
    window.dispatchEvent(new Event('progress-updated'));
  };

  const markAsCompleted = (slug: string) => {
    updateProgress(slug, { completed: true });
  };

  const markAsVisited = (slug: string) => {
    if (!progress[slug]) {
      updateProgress(slug, {});
    }
  };

  const getCompletedCount = () => {
    return Object.values(progress).filter((p) => p.completed).length;
  };

  const getCompletionPercentage = (totalCount: number) => {
    return Math.round((getCompletedCount() / totalCount) * 100);
  };

  const isCompleted = (slug: string) => {
    return progress[slug]?.completed || false;
  };

  const resetProgress = (slug?: string) => {
    if (slug) {
      // 特定の章のみリセット
      const newProgress = { ...progress };
      delete newProgress[slug];
      setProgress(newProgress);
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
    } else {
      // 全体をリセット
      setProgress({});
      localStorage.removeItem(PROGRESS_KEY);
    }
    // カスタムイベントを発火して他のコンポーネントに通知
    window.dispatchEvent(new Event('progress-updated'));
  };

  return {
    progress,
    updateProgress,
    markAsCompleted,
    markAsVisited,
    getCompletedCount,
    getCompletionPercentage,
    isCompleted,
    resetProgress,
    mounted,
  };
}
