import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import type { Metadata } from 'next';
import CompleteButton from '@/components/CompleteButton';
import Breadcrumb from '@/components/Breadcrumb';
import TableOfContents from '@/components/TableOfContents';
import WhyNeeded from '@/components/MDX/WhyNeeded';
import Quiz from '@/components/MDX/Quiz';

// コンテンツ一覧
const contentSlugs = [
  '01-web-structure',
  '02-web-tech',
  '03-app-basics',
  '04-ad-marketing',
  '05-security',
  '06-practical',
  '07-ai-usage',
  '08-markdown',
  '09-final-test',
];

// 静的パスを生成
export async function generateStaticParams() {
  return contentSlugs.map((slug) => ({
    slug,
  }));
}

// メタデータ生成
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const contentPath = path.join(process.cwd(), 'content', `${slug}.mdx`);

  if (!fs.existsSync(contentPath)) {
    return { title: 'Not Found' };
  }

  const fileContent = fs.readFileSync(contentPath, 'utf-8');
  const { data } = matter(fileContent);

  return {
    title: `${data.title} | 運動通信社 Sports Tech Starter Guide`,
    description: data.description,
  };
}

// MDXページコンポーネント
export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const contentPath = path.join(process.cwd(), 'content', `${slug}.mdx`);

  // ファイルが存在しない場合は404
  if (!fs.existsSync(contentPath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(contentPath, 'utf-8');
  const { data, content } = matter(fileContent);

  return (
    <div className="flex gap-8 max-w-7xl mx-auto">
      <article className="prose prose-lg flex-1">
        {/* ヘッダー */}
        <div className="mb-8 p-6 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl border-l-4 border-primary-500">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.title}
        </h1>
        <p className="text-gray-700 mb-4">{data.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>約{data.estimatedTime}分</span>
          <span>•</span>
          <span>第{data.order}章</span>
        </div>
      </div>

      {/* MDXコンテンツ */}
      <div className="mdx-content">
        <MDXRemote
          source={content}
          components={{
            WhyNeeded,
            Quiz,
          }}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypePrism],
            },
          }}
        />
      </div>

      {/* 完了ボタン */}
      <CompleteButton slug={slug} />

      {/* ナビゲーション */}
      <div className="mt-8 pt-8 border-t border-gray-200 flex justify-between">
        {data.order > 1 && (
          <a
            href={`/${contentSlugs[data.order - 2]}`}
            className="text-primary-500 hover:text-primary-700 font-medium"
          >
            ← 前の章
          </a>
        )}
        {data.order < contentSlugs.length && (
          <a
            href={`/${contentSlugs[data.order]}`}
            className="text-primary-500 hover:text-primary-700 font-medium ml-auto"
          >
            次の章 →
          </a>
        )}
      </div>

        {/* パンくずリスト */}
        <Breadcrumb items={[{ label: data.title }]} />
      </article>

      <TableOfContents />
    </div>
  );
}
