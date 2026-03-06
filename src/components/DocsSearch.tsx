import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigation } from '../lib/navigation';

interface SearchResult {
  label: string;
  path: string;
  section: string;
}

const ALL_ITEMS: SearchResult[] = navigation.flatMap((s) =>
  s.items.map((item) => ({ label: item.label, path: item.path, section: s.section }))
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const KbdIcon = () => (
  <span className="docs-search__kbd" aria-hidden="true">
    <kbd>⌘</kbd><kbd>K</kbd>
  </span>
);

interface DocsSearchProps {
  open: boolean;
  onClose: () => void;
}

export function DocsSearchModal({ open, onClose }: DocsSearchProps) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? ALL_ITEMS.filter(
        (item) =>
          item.label.toLowerCase().includes(trimmed) ||
          item.section.toLowerCase().includes(trimmed)
      )
    : ALL_ITEMS.slice(0, 8);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  const go = useCallback(
    (path: string) => {
      navigate(path);
      onClose();
      setQuery('');
    },
    [navigate, onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && results[activeIdx]) {
        go(results[activeIdx].path);
      }
    },
    [results, activeIdx, go, onClose]
  );

  useEffect(() => {
    if (!open) return;
    const item = listRef.current?.children[activeIdx] as HTMLElement | undefined;
    item?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx, open]);

  if (!open) return null;

  // Group by section for display
  const grouped: Record<string, SearchResult[]> = {};
  results.forEach((r) => {
    if (!grouped[r.section]) grouped[r.section] = [];
    grouped[r.section].push(r);
  });

  let flatIdx = 0;

  return (
    <div
      className="docs-search-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Search documentation"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="docs-search-modal">
        <div className="docs-search-input-wrap">
          <span className="docs-search-input-icon"><SearchIcon /></span>
          <input
            ref={inputRef}
            type="search"
            className="docs-search-input"
            placeholder="Search components, guides, concepts…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck={false}
            aria-label="Search documentation"
            aria-autocomplete="list"
            aria-controls="docs-search-results"
            aria-activedescendant={results[activeIdx] ? `dsr-${activeIdx}` : undefined}
          />
          <button className="docs-search-close" onClick={onClose} aria-label="Close search">
            <kbd>Esc</kbd>
          </button>
        </div>

        <ul
          id="docs-search-results"
          ref={listRef}
          className="docs-search-results"
          role="listbox"
        >
          {results.length === 0 && (
            <li className="docs-search-empty">No results for "{trimmed}"</li>
          )}
          {Object.entries(grouped).map(([section, items]) => (
            <React.Fragment key={section}>
              <li className="docs-search-section-label" role="presentation">{section}</li>
              {items.map((item) => {
                const idx = flatIdx++;
                return (
                  <li
                    key={item.path}
                    id={`dsr-${idx}`}
                    role="option"
                    aria-selected={activeIdx === idx}
                    className={`docs-search-result${activeIdx === idx ? ' docs-search-result--active' : ''}`}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => go(item.path)}
                  >
                    <span className="docs-search-result-label">{item.label}</span>
                    <span className="docs-search-result-path">{item.path}</span>
                  </li>
                );
              })}
            </React.Fragment>
          ))}
        </ul>

        <div className="docs-search-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
          <span><kbd>↵</kbd> Select</span>
          <span><kbd>Esc</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}

export function DocsSearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="site-navbar__search-btn"
      onClick={onClick}
      aria-label="Search documentation (⌘K)"
      aria-keyshortcuts="Meta+K"
    >
      <SearchIcon />
      <span className="site-navbar__search-text">Search docs…</span>
      <KbdIcon />
    </button>
  );
}
