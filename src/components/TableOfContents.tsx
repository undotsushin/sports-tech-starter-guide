'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // ページ内のh2, h3タグを取得
    const elements = document.querySelectorAll('.mdx-content h2, .mdx-content h3');
    const items: TocItem[] = [];

    elements.forEach((element, index) => {
      const id = element.id || `heading-${index}`;
      if (!element.id) {
        element.id = id;
      }

      items.push({
        id,
        text: element.textContent || '',
        level: parseInt(element.tagName.substring(1)),
      });
    });

    setHeadings(items);

    // スクロール監視
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -35% 0%' }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block">
      <nav className="sticky top-24 w-56 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <div className="bg-gray-50 rounded-lg p-4">
          <h2 className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">
            目次
          </h2>
          <ul className="space-y-1.5 border-l-2 border-gray-200">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={`text-xs ${
                  heading.level === 3 ? 'ml-4' : 'ml-2'
                }`}
              >
                <a
                  href={`#${heading.id}`}
                  className={`block py-1.5 px-2 -ml-px border-l-2 transition-all ${
                    activeId === heading.id
                      ? 'border-primary-500 text-primary-600 font-medium bg-primary-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(heading.id)?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
