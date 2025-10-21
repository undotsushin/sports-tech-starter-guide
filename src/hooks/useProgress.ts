'use client';

import { useState, useEffect } from 'react';
import type { Progress } from '@/types';

const PROGRESS_KEY = 'learning-progress';

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // LocalStorageから進捗を読み込む
    const savedProgress = localStorage.getItem(PROGRESS_KEY);
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (error) {
        console.error('Failed to parse progress:', error);
      }
    }
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

  const resetProgress = () => {
    setProgress({});
    localStorage.removeItem(PROGRESS_KEY);
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
