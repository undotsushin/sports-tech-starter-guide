import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-sm text-gray-600 text-center">
          © {currentYear} 株式会社運動通信社. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
