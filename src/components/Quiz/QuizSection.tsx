'use client';

import { useState, useEffect } from 'react';
import QuizCard from './QuizCard';
import type { Quiz } from '@/types';

interface QuizSectionProps {
  quizzes: Quiz[];
  contentSlug: string;
}

export default function QuizSection({ quizzes, contentSlug }: QuizSectionProps) {
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // LocalStorageから結果を読み込む
    const savedResults = localStorage.getItem(`quiz-${contentSlug}`);
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }
  }, [contentSlug]);

  const handleAnswer = (quizId: string, isCorrect: boolean) => {
    const newResults = { ...results, [quizId]: isCorrect };
    setResults(newResults);

    // LocalStorageに保存
    localStorage.setItem(`quiz-${contentSlug}`, JSON.stringify(newResults));
  };

  // クライアントサイドでのみレンダリング（LocalStorage使用のため）
  if (!mounted) {
    return (
      <div className="space-y-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-900">理解度チェック</h2>
        <div className="text-center py-8 text-gray-500">Loading...</div>
      </div>
    );
  }

  const correctCount = Object.values(results).filter(Boolean).length;
  const answeredCount = Object.keys(results).length;
  const totalCount = quizzes.length;

  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">理解度チェック</h2>
        {answeredCount > 0 && (
          <div className="text-sm text-gray-600">
            正解数: {correctCount} / {totalCount} ({Math.round((correctCount / totalCount) * 100)}%)
          </div>
        )}
      </div>

      <div className="space-y-4">
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            onAnswer={handleAnswer}
          />
        ))}
      </div>

      {answeredCount === totalCount && (
        <div className={`p-4 rounded-lg ${
          correctCount === totalCount
            ? 'bg-green-50 border border-green-200'
            : correctCount >= totalCount * 0.7
            ? 'bg-blue-50 border border-blue-200'
            : 'bg-yellow-50 border border-yellow-200'
        }`}>
          <p className="text-center font-medium">
            {correctCount === totalCount && '🎉 完璧です！すべて正解しました！'}
            {correctCount >= totalCount * 0.7 && correctCount < totalCount && '👏 良くできました！もう一度見直してみましょう。'}
            {correctCount < totalCount * 0.7 && '📚 もう一度復習してみましょう！'}
          </p>
        </div>
      )}
    </div>
  );
}
