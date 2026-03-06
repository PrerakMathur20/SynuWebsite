import React, { useState } from 'react';
import { Pagination } from '@tokis/react';
import { ComponentPreview, DemoControl } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const paginationProps: PropDef[] = [
  { name: 'page', type: 'number', required: true, description: 'The currently active page (1-based).' },
  { name: 'totalPages', type: 'number', required: true, description: 'Total number of pages.' },
  { name: 'onChange', type: '(page: number) => void', required: true, description: 'Callback fired when the user navigates to a new page.' },
  { name: 'siblingCount', type: 'number', default: '1', description: 'Number of page buttons to show on each side of the current page.' },
  { name: 'className', type: 'string', description: 'Additional CSS class name(s) applied to the root element.' },
];

export function PaginationPage() {
  const [page, setPage] = useState(1);
  const [siblingCount, setSiblingCount] = useState('1');

  const [manyPage, setManyPage] = useState(42);

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Navigation</p>
        <h1 className="doc-page__title">Pagination</h1>
        <p className="doc-page__desc">
          Allows users to navigate through large datasets split across multiple pages.
          Renders numbered page buttons, previous/next arrows, and ellipsis truncation
          when the page range is large. Fully keyboard accessible.
        </p>
      </header>

      {/* Interactive demo */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive</h2>
        <ComponentPreview
          code={`const [page, setPage] = useState(1);

<Pagination
  page={page}
  totalPages={10}
  siblingCount={${siblingCount}}
  onChange={setPage}
/>`}
          controls={
            <DemoControl
              label="Sibling Count"
              options={['0', '1', '2']}
              value={siblingCount}
              onChange={setSiblingCount}
            />
          }
        >
          <Pagination
            page={page}
            totalPages={10}
            siblingCount={Number(siblingCount)}
            onChange={setPage}
          />
        </ComponentPreview>
      </div>

      {/* Many pages */}
      <div className="doc-section">
        <h2 className="doc-section__title">Many Pages</h2>
        <p className="doc-section__desc">
          With a large <code className="inline-code">totalPages</code> value, ellipsis segments
          automatically appear to keep the control compact.
        </p>
        <ComponentPreview
          code={`const [page, setPage] = useState(42);

<Pagination
  page={page}
  totalPages={100}
  siblingCount={1}
  onChange={setPage}
/>`}
        >
          <Pagination
            page={manyPage}
            totalPages={100}
            siblingCount={1}
            onChange={setManyPage}
          />
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — Pagination</h2>
        <PropsTable props={paginationProps} />
      </div>
    </>
  );
}
