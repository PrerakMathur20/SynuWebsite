import React, { useMemo } from 'react';
import { VirtualizedList } from '@tokis/react';
import { ComponentPreview } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

interface UserItem {
  id: number;
  name: string;
  email: string;
  department: string;
}

const virtualizedListProps: PropDef[] = [
  { name: 'items', type: 'T[]', required: true, description: 'The full array of items to virtualize.' },
  { name: 'itemHeight', type: 'number', required: true, description: 'Fixed height in pixels for every row. All rows must share the same height.' },
  { name: 'renderItem', type: '(item: T, index: number) => React.ReactNode', required: true, description: 'Render function called only for visible rows plus overscan.' },
  { name: 'height', type: 'number', required: true, description: 'Visible viewport height of the list container in pixels.' },
  { name: 'overscan', type: 'number', default: '3', description: 'Number of extra rows to render above and below the visible window to reduce flicker during fast scrolling.' },
  { name: 'getItemKey', type: '(item: T, index: number) => string | number', description: 'Custom key extractor for list items. Falls back to index if not provided.' },
  { name: 'className', type: 'string', description: 'Additional CSS class applied to the outer container.' },
];

const DEPARTMENTS = [
  'Engineering',
  'Design',
  'Product',
  'Marketing',
  'Sales',
  'Support',
  'Finance',
  'Legal',
];

const FIRST_NAMES = [
  'Alex', 'Jordan', 'Morgan', 'Taylor', 'Casey', 'Riley', 'Avery',
  'Quinn', 'Skyler', 'Drew', 'Jamie', 'Sam', 'Blake', 'Reese', 'Finley',
];

const LAST_NAMES = [
  'Chen', 'Park', 'Kim', 'Lee', 'Smith', 'Johnson', 'Williams', 'Brown',
  'Jones', 'Garcia', 'Martinez', 'Davis', 'Wilson', 'Anderson', 'Taylor',
];

const departmentColors: Record<string, string> = {
  Engineering: 'var(--tokis-color-primary)',
  Design: 'var(--tokis-color-secondary)',
  Product: 'var(--tokis-color-success)',
  Marketing: 'var(--tokis-color-warning)',
  Sales: '#8b5cf6',
  Support: '#06b6d4',
  Finance: '#f59e0b',
  Legal: '#ef4444',
};

function getInitials(name: string): string {
  const parts = name.split(' ');
  return parts.length >= 2
    ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    : name.slice(0, 2).toUpperCase();
}

export function VirtualizedListPage() {
  const items = useMemo<UserItem[]>(() => {
    return Array.from({ length: 10000 }, (_, i) => {
      const first = FIRST_NAMES[i % FIRST_NAMES.length];
      const last = LAST_NAMES[Math.floor(i / FIRST_NAMES.length) % LAST_NAMES.length];
      const name = `${first} ${last}`;
      const dept = DEPARTMENTS[i % DEPARTMENTS.length];
      return {
        id: i + 1,
        name,
        email: `${first.toLowerCase()}.${last.toLowerCase()}${i > 0 ? i : ''}@company.dev`,
        department: dept,
      };
    });
  }, []);

  const renderItem = (item: UserItem, index: number) => {
    const initials = getInitials(item.name);
    const color = departmentColors[item.department] ?? 'var(--tokis-color-primary)';
    return (
      <div
        key={item.id}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--tokis-spacing-3)',
          height: 60,
          padding: '0 var(--tokis-spacing-4)',
          borderBottom: '1px solid var(--tokis-color-border)',
          background: index % 2 === 0 ? 'transparent' : 'var(--tokis-color-surface)',
        }}
      >
        {/* Avatar circle */}
        <div
          aria-hidden="true"
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: color,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'var(--tokis-font-size-xs)',
            fontWeight: 'var(--tokis-font-weight-semibold)',
            flexShrink: 0,
          }}
        >
          {initials}
        </div>

        {/* Name + email */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontWeight: 'var(--tokis-font-weight-medium)',
            fontSize: 'var(--tokis-font-size-sm)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {item.name}
          </div>
          <div style={{
            fontSize: 'var(--tokis-font-size-xs)',
            color: 'var(--tokis-text-secondary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {item.email}
          </div>
        </div>

        {/* Department badge */}
        <span style={{
          flexShrink: 0,
          fontSize: 'var(--tokis-font-size-xs)',
          fontWeight: 'var(--tokis-font-weight-medium)',
          padding: '2px 8px',
          borderRadius: 'var(--tokis-radius-full)',
          background: `color-mix(in srgb, ${color} 15%, transparent)`,
          color,
          border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
        }}>
          {item.department}
        </span>
      </div>
    );
  };

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Performance</p>
        <h1 className="doc-page__title">Virtualized List</h1>
        <p className="doc-page__desc">
          Render massive lists without a performance hit. Only the rows currently visible in
          the viewport (plus a small overscan buffer) are mounted in the DOM at any time.
        </p>
      </header>

      {/* Main demo */}
      <div className="doc-section">
        <h2 className="doc-section__title">10,000-Row List</h2>
        <p className="doc-section__desc">
          Rendering 10,000 rows — only visible rows mounted. Scroll at any speed and the DOM
          node count stays constant.
        </p>
        <ComponentPreview
          code={`const items = useMemo(() =>
  Array.from({ length: 10_000 }, (_, i) => ({
    id: i + 1,
    name: \`User \${i + 1}\`,
    email: \`user\${i + 1}@company.dev\`,
    department: DEPARTMENTS[i % DEPARTMENTS.length],
  })),
[]);

<VirtualizedList
  items={items}
  itemHeight={60}
  height={400}
  overscan={3}
  renderItem={(item, index) => (
    <div key={item.id} style={{ height: 60, display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--tokis-color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {item.name.slice(0, 2).toUpperCase()}
      </div>
      <div>
        <div>{item.name}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--tokis-text-secondary)' }}>{item.email}</div>
      </div>
      <span style={{ marginLeft: 'auto' }}>{item.department}</span>
    </div>
  )}
/>`}
          padless
        >
          <div style={{
            width: '100%',
            border: '1px solid var(--tokis-color-border)',
            borderRadius: 'var(--tokis-radius-lg)',
            overflow: 'hidden',
          }}>
            {/* Header row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--tokis-spacing-3)',
              padding: '0 var(--tokis-spacing-4)',
              height: 44,
              background: 'var(--tokis-color-surface)',
              borderBottom: '1px solid var(--tokis-color-border)',
            }}>
              <div style={{ width: 36, flexShrink: 0 }} />
              <div style={{ flex: 1, fontSize: 'var(--tokis-font-size-xs)', fontWeight: 'var(--tokis-font-weight-semibold)', color: 'var(--tokis-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Name / Email
              </div>
              <div style={{ fontSize: 'var(--tokis-font-size-xs)', fontWeight: 'var(--tokis-font-weight-semibold)', color: 'var(--tokis-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Department
              </div>
            </div>
            <VirtualizedList
              items={items}
              itemHeight={60}
              height={400}
              overscan={3}
              renderItem={renderItem}
            />
          </div>
        </ComponentPreview>
      </div>

      {/* How it works */}
      <div className="doc-section">
        <h2 className="doc-section__title">How it works</h2>
        <p className="doc-section__desc">
          VirtualizedList tracks the scroll position of its container. On each scroll event it
          calculates a <em>start index</em> and <em>end index</em> based on <code className="inline-code">itemHeight</code> and the
          current <code className="inline-code">scrollTop</code>. Only indices within that window — plus{' '}
          <code className="inline-code">overscan</code> rows on either side — are passed to{' '}
          <code className="inline-code">renderItem</code>. The total scrollable height is set via a
          spacer element so the scrollbar behaves correctly for the full dataset.
        </p>
        <ul style={{ fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)', lineHeight: 2, paddingLeft: 'var(--tokis-spacing-5)' }}>
          <li>DOM nodes mounted at any time: ~(viewport height / itemHeight) + 2 × overscan</li>
          <li>No IntersectionObserver or requestAnimationFrame polling — pure scroll events</li>
          <li>All items must share the same fixed <code className="inline-code">itemHeight</code></li>
          <li>For variable-height rows, use a windowing library such as react-virtual</li>
        </ul>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={virtualizedListProps} />
      </div>
    </>
  );
}
