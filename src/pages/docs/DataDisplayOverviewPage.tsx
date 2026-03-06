import React from 'react';
import { NavButton } from '../../components/NavButton';
import { ButtonLabel, Badge, Stack } from '@tokis/react';
import { CodeBlock } from '../../components/CodeBlock';

const components = [
  { label: 'Accordion', path: '/docs/accordion', desc: 'Expandable section list. Supports single or multiple open panels, animations, and custom icons.' },
  { label: 'Table', path: '/docs/table', desc: 'Data table with sorting, selection, sticky header, and pagination integration.' },
  { label: 'Pagination', path: '/docs/pagination', desc: 'Page navigation control. Supports compact mode, jump-to-page, and custom page sizes.' },
  { label: 'Timeline', path: '/docs/timeline', desc: 'Chronological event display. Vertical and horizontal layouts with custom connectors.' },
  { label: 'Tree View', path: '/docs/treeview', desc: 'Hierarchical data browser. Expand/collapse, multi-select, and async node loading.' },
  { label: 'Statistic', path: '/docs/statistic', desc: 'KPI display card with label, value, trend indicator, and prefix/suffix.' },
  { label: 'Empty State', path: '/docs/emptystate', desc: 'Placeholder when content is absent. Includes illustration slot, title, description, and action.' },
  { label: 'Result', path: '/docs/result', desc: 'Operation outcome display for success, error, warning, and info states.' },
];

export function DataDisplayOverviewPage() {
  return (
    <div className="doc-page">
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Overview</p>
        <h1 className="doc-page__title">Data Display</h1>
        <p className="doc-page__desc">
          Components that present structured information. From simple statistics to complex
          sortable tables and hierarchical tree views — built for real data with real edge cases.
        </p>
      </header>

      <div className="doc-section">
        <h2 className="doc-section__title">Package</h2>
        <div className="section-pkg-row">
          <div className="section-pkg-badge-row">
            <code className="section-pkg-name">@tokis/react</code>
            <Badge variant="primary">All data display components</Badge>
          </div>
        </div>
        <CodeBlock language="tsx" code={`import { Table, TableHead, TableBody, TableRow, TableCell, Accordion, AccordionItem, Pagination, Timeline, TreeView } from '@tokis/react';`} />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Table with Sorting</h2>
        <CodeBlock language="tsx" code={`const [sortCol, setSortCol] = useState<string | null>(null);
const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

<Table>
  <TableHead>
    <TableRow>
      <TableCell
        as="th"
        sortable
        sortDirection={sortCol === 'name' ? sortDir : undefined}
        onSort={() => {
          if (sortCol === 'name') setSortDir(d => d === 'asc' ? 'desc' : 'asc');
          else { setSortCol('name'); setSortDir('asc'); }
        }}
      >
        Name
      </TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {rows.map(row => (
      <TableRow key={row.id}>
        <TableCell>{row.name}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`} />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">All Data Display Components</h2>
        <div className="section-component-list">
          {components.map((c) => (
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
        <NavButton to="/docs/table" variant="primary"><ButtonLabel>Table →</ButtonLabel></NavButton>
        <NavButton to="/docs/accordion" variant="outline"><ButtonLabel>Accordion</ButtonLabel></NavButton>
      </Stack>
    </div>
  );
}
