import React, { useState } from 'react';
import { EmptyState, ButtonRoot, ButtonLabel } from '@tokis/react';
import { ComponentPreview, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const emptyStateProps: PropDef[] = [
  { name: 'title', type: 'string', required: true, description: 'Primary heading shown in the empty state.' },
  { name: 'icon', type: 'ReactNode', description: 'Illustration or icon displayed above the title.' },
  { name: 'description', type: 'string', description: 'Supporting text below the title explaining the empty state.' },
  { name: 'action', type: 'ReactNode', description: 'Action element (e.g. button or link) rendered below the description.' },
  { name: 'className', type: 'string', description: 'Additional CSS class name(s) applied to the root element.' },
];

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export function EmptyStatePage() {
  const [showIcon, setShowIcon] = useState(true);
  const [showDescription, setShowDescription] = useState(true);
  const [showAction, setShowAction] = useState(true);

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Feedback</p>
        <h1 className="doc-page__title">Empty State</h1>
        <p className="doc-page__desc">
          Communicates to users that a list, search, or data set has no content to display.
          Supports an icon, descriptive text, and a call-to-action to guide next steps.
        </p>
      </header>

      {/* Interactive demo */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive</h2>
        <ComponentPreview
          code={`<EmptyState${showIcon ? `
  icon={<SearchIcon />}` : ''}
  title="No results found"${showDescription ? `
  description="Try adjusting your search or filters to find what you're looking for."` : ''}${showAction ? `
  action={
    <ButtonRoot variant="primary" size="sm">
      <ButtonLabel>Clear filters</ButtonLabel>
    </ButtonRoot>
  }` : ''}
/>`}
          controls={
            <>
              <DemoToggle label="Icon" value={showIcon} onChange={setShowIcon} />
              <DemoToggle label="Description" value={showDescription} onChange={setShowDescription} />
              <DemoToggle label="Action" value={showAction} onChange={setShowAction} />
            </>
          }
        >
          <EmptyState
            icon={showIcon ? <SearchIcon /> : undefined}
            title="No results found"
            description={
              showDescription
                ? "Try adjusting your search or filters to find what you're looking for."
                : undefined
            }
            action={
              showAction ? (
                <ButtonRoot variant="primary" size="sm">
                  <ButtonLabel>Clear filters</ButtonLabel>
                </ButtonRoot>
              ) : undefined
            }
          />
        </ComponentPreview>
      </div>

      {/* Inbox zero example */}
      <div className="doc-section">
        <h2 className="doc-section__title">Inbox Zero</h2>
        <p className="doc-section__desc">
          Use different icons and copy to match the specific empty context.
        </p>
        <ComponentPreview
          code={`<EmptyState
  icon={
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-6l-2 3H10l-2-3H2" />
      <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
    </svg>
  }
  title="All caught up"
  description="You have no new notifications. Check back later."
/>`}
        >
          <EmptyState
            icon={
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 12h-6l-2 3H10l-2-3H2" />
                <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
              </svg>
            }
            title="All caught up"
            description="You have no new notifications. Check back later."
          />
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — EmptyState</h2>
        <PropsTable props={emptyStateProps} />
      </div>
    </>
  );
}
