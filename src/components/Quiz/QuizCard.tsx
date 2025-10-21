'use client';

import { useState } from 'react';
import type { Quiz } from '@/types';

interface QuizCardProps {
  quiz: Quiz;
  onAnswer: (quizId: string, isCorrect: boolean) => void;
}

export default function QuizCard({ quiz, onAnswer }: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === quiz.correctAnswer;
    setShowResult(true);
    onAnswer(quiz.id, isCorrect);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setShowResult(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      {/* 質問 */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {quiz.question}
      </h3>

      {/* 選択肢 */}
      <div className="space-y-3 mb-6">
        {quiz.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = index === quiz.correctAnswer;
          const showCorrectAnswer = showResult && isCorrect;
          const showWrongAnswer = showResult && isSelected && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => !showResult && setSelectedOption(index)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-lg border-2 transition ${
                showCorrectAnswer
                  ? 'border-green-500 bg-green-50'
                  : showWrongAnswer
                  ? 'border-red-500 bg-red-50'
                  : isSelected
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center space-x-3">
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    showCorrectAnswer
                      ? 'border-green-500 bg-green-500'
                      : showWrongAnswer
                      ? 'border-red-500 bg-red-500'
                      : isSelected
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                  }`}
                >
                  {showCorrectAnswer && (
                    <span className="text-white text-sm">✓</span>
                  )}
                  {showWrongAnswer && (
                    <span className="text-white text-sm">✗</span>
                  )}
                  {!showResult && isSelected && (
                    <span className="text-white text-sm">●</span>
                  )}
                </span>
                <span className="text-gray-800">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 結果表示 */}
      {showResult && quiz.explanation && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-700">
            <strong className="text-blue-700">解説:</strong> {quiz.explanation}
          </p>
        </div>
      )}

      {/* ボタン */}
      <div className="flex space-x-3">
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
              selectedOption !== null
                ? 'bg-primary-500 text-white hover:bg-primary-600'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            回答する
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="flex-1 py-2 px-4 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            もう一度挑戦
          </button>
        )}
      </div>
    </div>
  );
}
