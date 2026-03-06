import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function TableOfContents() {
  const { pathname } = useLocation();
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Wait for React to finish rendering the new page
    const timer = setTimeout(() => {
      const container = document.getElementById('main-content');
      if (!container) return;
      const els = Array.from(container.querySelectorAll('h2, h3'));
      const parsed: TocItem[] = [];
      els.forEach((el) => {
        if (!el.id) {
          const slug = slugify(el.textContent ?? '');
          if (slug) el.id = slug;
        }
        if (el.id && el.textContent) {
          parsed.push({
            id: el.id,
            text: el.textContent.trim(),
            level: parseInt(el.tagName[1], 10),
          });
        }
      });
      setItems(parsed);
      setActiveId(parsed[0]?.id ?? '');
    }, 120);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-64px 0px -60% 0px', threshold: 0 }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <aside className="site-toc" aria-label="On this page">
      <p className="site-toc__title">On this page</p>
      <nav>
        <ul className="site-toc__list">
          {items.map((item) => (
            <li
              key={item.id}
              className={`site-toc__item site-toc__item--h${item.level}${activeId === item.id ? ' site-toc__item--active' : ''}`}
            >
              <a
                href={`#${item.id}`}
                className="site-toc__link"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(item.id);
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top, behavior: 'smooth' });
                    setActiveId(item.id);
                    history.replaceState(null, '', `#${item.id}`);
                  }
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
