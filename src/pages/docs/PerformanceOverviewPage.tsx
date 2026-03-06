import React from 'react';
import { NavButton } from '../../components/NavButton';
import { ButtonLabel, Badge, Stack, Alert } from '@tokis/react';
import { CodeBlock } from '../../components/CodeBlock';

export function PerformanceOverviewPage() {
  return (
    <div className="doc-page">
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Overview</p>
        <h1 className="doc-page__title">Performance</h1>
        <p className="doc-page__desc">
          Components built for lists and data sets that would destroy rendering performance
          without virtualization. Use these when you have more than ~100 items in a list.
        </p>
      </header>

      <div className="doc-section">
        <h2 className="doc-section__title">Package</h2>
        <div className="section-pkg-row">
          <div className="section-pkg-badge-row">
            <code className="section-pkg-name">@tokis/react</code>
            <Badge variant="primary">VirtualizedList, InfiniteScroll</Badge>
          </div>
        </div>
        <CodeBlock language="tsx" code={`import { VirtualizedList, InfiniteScroll } from '@tokis/react';`} />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Why virtualization matters</h2>
        <p className="doc-section__desc">
          Rendering 10,000 DOM nodes at once is slow. VirtualizedList renders only the visible rows
          (plus a small overscan buffer). The DOM stays small regardless of data size.
        </p>
        <CodeBlock language="tsx" code={`// Without virtualization: renders all 10,000 rows at once 🐌
{items.map(item => <Row key={item.id} {...item} />)}

// With VirtualizedList: renders ~20 rows at any time ⚡
<VirtualizedList
  items={items}              // 10,000 items
  itemHeight={56}            // fixed row height in px
  containerHeight={600}      // visible area height
  renderItem={(item) => <Row key={item.id} {...item} />}
/>`} />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Infinite Scroll</h2>
        <p className="doc-section__desc">
          InfiniteScroll triggers a callback as the user approaches the bottom of a container,
          letting you load the next page without pagination controls.
        </p>
        <CodeBlock language="tsx" code={`const [page, setPage] = useState(1);
const [items, setItems] = useState(initialItems);
const [loading, setLoading] = useState(false);

async function loadMore() {
  setLoading(true);
  const next = await fetchPage(page + 1);
  setItems(prev => [...prev, ...next]);
  setPage(p => p + 1);
  setLoading(false);
}

<InfiniteScroll onLoadMore={loadMore} loading={loading} hasMore={page < totalPages}>
  {items.map(item => <Card key={item.id}>{item.name}</Card>)}
</InfiniteScroll>`} />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">All Performance Components</h2>
        <div className="section-component-list">
          {[
            { label: 'Virtualized List', path: '/docs/virtual-list', desc: 'Window-based rendering for long lists. Handles 100k+ items without jank.' },
            { label: 'Infinite Scroll', path: '/docs/infinite-scroll', desc: 'Scroll-based pagination trigger. Works with any container, not just window.' },
          ].map((c) => (
            <NavButton key={c.path} to={c.path} variant="ghost" className="section-nav-card">
              <div>
                <div className="section-nav-card__label">{c.label}</div>
                <div className="section-nav-card__desc">{c.desc}</div>
              </div>
            </NavButton>
          ))}
        </div>
      </div>

      <Stack direction="row" gap={3} style={{ marginTop: 'var(--tokis-spacing-8)' }}>
        <NavButton to="/docs/virtual-list" variant="primary"><ButtonLabel>Virtualized List →</ButtonLabel></NavButton>
        <NavButton to="/docs/infinite-scroll" variant="outline"><ButtonLabel>Infinite Scroll</ButtonLabel></NavButton>
      </Stack>
    </div>
  );
}
