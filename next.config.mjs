import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 静的エクスポート（GitHub Pages用）
  basePath: process.env.NODE_ENV === 'production' ? '/sports-tech-starter-guide' : '',
  images: {
    unoptimized: true,  // GitHub Pagesでは画像最適化API使えない
  },
  trailingSlash: true,  // GitHub Pages用
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: ['rehype-prism-plus'],
  },
});

export default withMDX(nextConfig);
