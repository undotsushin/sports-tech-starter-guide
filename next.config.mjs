import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 静的エクスポート（GitHub Pages用）
  basePath: process.env.NODE_ENV === 'production' ? '/sports-tech-starter-guide' : '',
  images: {
    unoptimized: true,  // GitHub Pagesでは画像最適化API使えない
  },
  trailingSlash: true,  // GitHub Pages用
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Note: Turbopack has compatibility issues with @next/mdx (serialization error)
  // Use standard webpack mode for development
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm], // GitHubスタイルMarkdown
    rehypePlugins: [rehypePrism], // シンタックスハイライト
  },
});

export default withMDX(nextConfig);
