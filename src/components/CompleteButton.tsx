'use client';

import { useProgress } from '@/hooks/useProgress';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface CompleteButtonProps {
  slug: string;
}

export default function CompleteButton({ slug }: CompleteButtonProps) {
  const { isCompleted, markAsCompleted, mounted } = useProgress();

  if (!mounted) return null;

  const completed = isCompleted(slug);

  const handleComplete = () => {
    markAsCompleted(slug);
  };

  return (
    <div className="my-8 flex justify-center">
      <button
        onClick={handleComplete}
        disabled={completed}
        className={`
          flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all
          ${completed
            ? 'bg-green-100 text-green-700 cursor-default'
            : 'bg-primary-500 text-white hover:bg-primary-600 hover:shadow-lg hover:-translate-y-0.5'
          }
        `}
      >
        <CheckCircleIcon className="w-6 h-6" />
        <span>{completed ? '完了済み' : 'この章を完了する'}</span>
      </button>
    </div>
  );
}
