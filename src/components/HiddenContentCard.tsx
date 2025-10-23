import Link from 'next/link';
import { FireIcon } from '@heroicons/react/24/solid';

export default function HiddenContentCard() {
  return (
    <Link
      href="/90-advanced-test"
      className="block p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border-2 border-red-300 hover:border-red-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center bg-red-100 rounded-xl">
          <FireIcon className="w-8 h-8 text-red-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-red-700 mb-2">
            隠しコンテンツ発見...!
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            運動通信社社員として更なる高みを目指すあなたへ。応用情報技術者試験レベルの難問30問があなたを待っています。
          </p>
          <span className="inline-block text-sm font-semibold text-red-600 bg-red-100 px-4 py-2 rounded-full">
            🔥 鬼レベルに挑戦する →
          </span>
        </div>
      </div>
    </Link>
  );
}
