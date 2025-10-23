import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-sm text-gray-600">
            © {currentYear} 株式会社運動通信社. All rights reserved.
          </p>
          <Link
            href="/90-advanced-test"
            className="text-xs text-gray-500 hover:text-primary-600 transition-colors underline"
          >
            隠しコンテンツ
          </Link>
        </div>
      </div>
    </footer>
  );
}
