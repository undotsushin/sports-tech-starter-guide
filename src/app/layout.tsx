import type { Metadata } from 'next';
import ClientLayout from '@/components/ClientLayout';
import '@/styles/globals.css';

const basePath = process.env.NODE_ENV === 'production' ? '/sports-tech-starter-guide' : '';

export const metadata: Metadata = {
  title: '運動通信社 Sports Tech Starter Guide',
  description: '新卒社員向けIT基礎知識の学習サイト',
  keywords: ['IT基礎知識', 'Web技術', 'アプリ開発', 'セキュリティ', '運動通信社'],
  icons: {
    icon: `${basePath}/images/undotsushinsya.png`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <ClientLayout>{children}</ClientLayout>
    </html>
  );
}
