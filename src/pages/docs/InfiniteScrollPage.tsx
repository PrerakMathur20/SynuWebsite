import React, { useState, useCallback, useMemo } from 'react';
import { InfiniteScroll } from '@tokis/react';
import { ComponentPreview } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const infiniteScrollProps: PropDef[] = [
  { name: 'children', type: 'ReactNode', required: true, description: 'The list content to render above the sentinel.' },
  { name: 'hasMore', type: 'boolean', required: true, description: 'Whether more data is available to load.' },
  { name: 'loading', type: 'boolean', required: true, description: 'Whether a load operation is currently in progress.' },
  { name: 'onLoadMore', type: '() => void', required: true, description: 'Called when the sentinel enters the viewport and hasMore is true.' },
  { name: 'loadingComponent', type: 'ReactNode', description: 'Custom loading indicator shown below the list while loading.' },
  { name: 'endMessage', type: 'ReactNode', description: 'Content shown when hasMore is false and loading is done.' },
  { name: 'threshold', type: 'number', default: '0.1', description: 'IntersectionObserver threshold — how visible the sentinel must be to trigger.' },
  { name: 'className', type: 'string', description: 'Additional CSS class applied to the root wrapper.' },
];

interface Item {
  id: number;
  name: string;
  role: string;
  initials: string;
  color: string;
}

const COLORS = ['#7c3aed', '#2563eb', '#059669', '#d97706', '#dc2626', '#db2777', '#0284c7'];
const ROLES = ['Engineer', 'Designer', 'Product Manager', 'Data Analyst', 'DevOps', 'QA'];

function makeItems(from: number, count: number): Item[] {
  return Array.from({ length: count }, (_, i) => {
    const n = from + i;
    const name = `User ${n}`;
    return {
      id: n,
      name,
      role: ROLES[n % ROLES.length],
      initials: `U${n}`,
      color: COLORS[n % COLORS.length],
    };
  });
}

const INITIAL_ITEMS = makeItems(1, 20);

const LoadingSpinner = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '16px 0', color: 'var(--tokis-text-tertiary)', fontSize: 'var(--tokis-font-size-sm)' }}>
    <svg
      width="16" height="16" viewBox="0 0 16 16" fill="none"
      style={{ animation: 'spin 1s linear infinite' }}
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="20 18" />
    </svg>
    Loading more…
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const EndMessage = ({ total }: { total: number }) => (
  <div style={{ textAlign: 'center', padding: '16px 0', color: 'var(--tokis-text-tertiary)', fontSize: 'var(--tokis-font-size-sm)', borderTop: '1px solid var(--tokis-color-border)' }}>
    All {total} items loaded
  </div>
);

export function InfiniteScrollPage() {
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => {
        const next = makeItems(prev.length + 1, 20);
        const merged = [...prev, ...next];
        if (merged.length >= 100) {
          setHasMore(false);
        }
        return merged;
      });
      setLoading(false);
    }, 1000);
  }, []);

  const itemElements = useMemo(
    () =>
      items.map((item) => (
        <div
          key={item.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '10px 16px',
            borderBottom: '1px solid var(--tokis-color-border)',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: item.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 'var(--tokis-font-size-xs)',
              fontWeight: 'var(--tokis-font-weight-bold)',
              flexShrink: 0,
            }}
          >
            {item.initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 'var(--tokis-font-weight-medium)', fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-primary)' }}>
              {item.name}
            </div>
            <div style={{ fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)' }}>
              {item.role}
            </div>
          </div>
          <span style={{ fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)' }}>#{item.id}</span>
        </div>
      )),
    [items],
  );

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Performance</p>
        <h1 className="doc-page__title">Infinite Scroll</h1>
        <p className="doc-page__desc">
          Automatically loads more content as the user scrolls to the bottom of a list.
          Powered by <code className="inline-code">IntersectionObserver</code> — no scroll event
          listeners. Supports custom loading and end-of-list messages.
        </p>
      </header>

      {/* Demo */}
      <div className="doc-section">
        <h2 className="doc-section__title">Demo — 100 Items, Load 20 at a Time</h2>
        <p className="doc-section__desc">
          Scroll to the bottom of the list to trigger the next page load. Loading stops automatically
          after all 100 items are fetched.
        </p>
        <ComponentPreview
          code={`const [items, setItems] = useState(initialItems);
const [loading, setLoading] = useState(false);
const [hasMore, setHasMore] = useState(true);

function handleLoadMore() {
  setLoading(true);
  fetchNextPage().then((next) => {
    setItems((prev) => [...prev, ...next]);
    if (items.length + next.length >= total) setHasMore(false);
    setLoading(false);
  });
}

<InfiniteScroll
  hasMore={hasMore}
  loading={loading}
  onLoadMore={handleLoadMore}
  loadingComponent={<Spinner />}
  endMessage={<p>All items loaded.</p>}
>
  {items.map(item => <Row key={item.id} {...item} />)}
</InfiniteScroll>`}
          leftAlign
        >
          <div style={{ width: '100%' }}>
            <div
              style={{
                maxHeight: 400,
                overflowY: 'auto',
                border: '1px solid var(--tokis-color-border)',
                borderRadius: 'var(--tokis-radius-lg)',
                background: 'var(--tokis-color-surface)',
              }}
            >
              <InfiniteScroll
                hasMore={hasMore}
                loading={loading}
                onLoadMore={handleLoadMore}
                loadingComponent={<LoadingSpinner />}
                endMessage={<EndMessage total={items.length} />}
              >
                {itemElements}
              </InfiniteScroll>
            </div>
            <p style={{
              margin: 'var(--tokis-spacing-2) 0 0',
              fontSize: 'var(--tokis-font-size-xs)',
              color: 'var(--tokis-text-tertiary)',
              textAlign: 'right',
            }}>
              {items.length} / 100 items loaded
            </p>
          </div>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={infiniteScrollProps} />
      </div>
    </>
  );
}
