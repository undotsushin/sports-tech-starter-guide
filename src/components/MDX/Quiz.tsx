'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface QuizOption {
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

interface QuizProps {
  questions: QuizQuestion[];
}

export default function Quiz({ questions }: QuizProps) {
  const pathname = usePathname();
  const slug = pathname.replace('/', '');
  const storageKey = `quiz-${slug}`;

  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [showAnswers, setShowAnswers] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // localStorageから進捗を読み込み
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const data = JSON.parse(saved);
      setSelectedAnswers(data.selectedAnswers || new Array(questions.length).fill(null));
      setShowAnswers(data.showAnswers || false);
      setIsCompleted(data.isCompleted || false);
    }
  }, [storageKey, questions.length]);

  // 変更をlocalStorageに保存
  useEffect(() => {
    const data = {
      selectedAnswers,
      showAnswers,
      isCompleted,
    };
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [selectedAnswers, showAnswers, isCompleted, storageKey]);

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  const handleReset = () => {
    setSelectedAnswers(new Array(questions.length).fill(null));
    setShowAnswers(false);
    setIsCompleted(false);
  };

  const allAnswered = selectedAnswers.every((answer) => answer !== null);
  const correctCount = questions.filter(
    (q, i) =>
      selectedAnswers[i] !== null &&
      q.options[selectedAnswers[i]!].isCorrect
  ).length;

  return (
    <div className="my-8 p-6 bg-blue-50 border-2 border-blue-300 rounded-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-4 !border-l-0 !pl-0">
        理解度チェック問題
      </h3>

      <div className="space-y-6">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="bg-white p-4 rounded-lg shadow-sm">
            <p className="font-semibold text-gray-900 mb-3">
              問題 {qIndex + 1}: {q.question}
            </p>
            <div className="space-y-2">
              {q.options.map((option, oIndex) => {
                const isSelected = selectedAnswers[qIndex] === oIndex;
                const isCorrect = option.isCorrect;
                const showResult = showAnswers && isSelected;

                return (
                  <button
                    key={oIndex}
                    onClick={() => handleSelectOption(qIndex, oIndex)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? showResult
                          ? isCorrect
                            ? 'bg-green-100 border-green-500'
                            : 'bg-red-100 border-red-500'
                          : 'bg-blue-100 border-blue-500'
                        : 'bg-gray-50 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-400'
                        }`}
                      >
                        {isSelected && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="text-gray-800">{option.text}</span>
                      {showResult && isCorrect && (
                        <span className="ml-auto text-green-600 font-semibold">
                          正解！
                        </span>
                      )}
                      {showResult && !isCorrect && (
                        <span className="ml-auto text-red-600 font-semibold">
                          不正解
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {allAnswered && (
        <div className="mt-6 space-y-3">
          <button
            onClick={toggleAnswers}
            className="w-full bg-primary-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors"
          >
            {showAnswers ? '回答を閉じる' : '回答を確認する'}
          </button>
          {showAnswers && (
            <div className="space-y-3">
              <div className="p-4 bg-white rounded-lg border-2 border-primary-300">
                <p className="text-center text-lg font-semibold">
                  正解数: {correctCount} / {questions.length}
                </p>
                {correctCount === questions.length && (
                  <div className="mt-3 p-3 bg-green-100 border-2 border-green-500 rounded-lg">
                    <p className="text-center text-green-700 font-semibold">
                      全問正解です！素晴らしい！
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={handleReset}
                className="w-full bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-600 transition-colors"
              >
                リセットして最初からやり直す
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
