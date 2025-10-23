import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center gap-4">
          <p className="text-sm text-gray-600">
            © {currentYear} 株式会社運動通信社. All rights reserved.
          </p>
          <Link
            href="/90-advanced-test"
            className="text-2xl hover:scale-125 transition-transform duration-300 cursor-pointer"
            title="隠しコンテンツ？"
          >
            👹
          </Link>
        </div>
      </div>
    </footer>
  );
}
