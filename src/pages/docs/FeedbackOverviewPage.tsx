import React from 'react';
import { NavButton } from '../../components/NavButton';
import { ButtonLabel, Badge, Stack } from '@tokis/react';
import { CodeBlock } from '../../components/CodeBlock';

const components = [
  { label: 'Alert', path: '/docs/alert', desc: 'Inline message for info, success, warning, or error. Dismissible with optional action buttons.' },
  { label: 'Progress', path: '/docs/progress', desc: 'Linear progress bar. Supports determinate, indeterminate, and buffer modes.' },
  { label: 'Circular Progress', path: '/docs/circular-progress', desc: 'Circular spinner for loading states. Determinate and indeterminate variants.' },
  { label: 'Snackbar', path: '/docs/snackbar', desc: 'Transient notification that auto-dismisses. Supports queuing, actions, and position.' },
];

export function FeedbackOverviewPage() {
  return (
    <div className="doc-page">
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Overview</p>
        <h1 className="doc-page__title">Feedback</h1>
        <p className="doc-page__desc">
          Components that communicate system status to users — loading states, operation results,
          and inline messages. Every feedback component includes appropriate ARIA live regions
          so screen readers announce updates automatically.
        </p>
      </header>

      <div className="doc-section">
        <h2 className="doc-section__title">Package</h2>
        <div className="section-pkg-row">
          <div className="section-pkg-badge-row">
            <code className="section-pkg-name">@tokis/react</code>
            <Badge variant="primary">All feedback components</Badge>
          </div>
        </div>
        <CodeBlock language="tsx" code={`import { Alert, Progress, CircularProgress, Snackbar } from '@tokis/react';`} />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Accessibility Note</h2>
        <p className="doc-section__desc">
          All feedback components use <code>role="status"</code> or <code>role="alert"</code> with the
          appropriate <code>aria-live</code> polite/assertive setting so assistive technologies
          announce content changes without requiring user focus.
        </p>
        <CodeBlock language="tsx" code={`// Alert uses role="alert" (assertive) for errors
<Alert variant="error" title="Payment failed">
  Your card was declined. Please check your details.
</Alert>

// Progress announces loading to screen readers
<CircularProgress aria-label="Loading user data" />`} />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">All Feedback Components</h2>
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
        <NavButton to="/docs/alert" variant="primary"><ButtonLabel>Alert →</ButtonLabel></NavButton>
        <NavButton to="/docs/snackbar" variant="outline"><ButtonLabel>Snackbar</ButtonLabel></NavButton>
      </Stack>
    </div>
  );
}
