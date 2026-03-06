import React, { useState } from 'react';
import { Result, ButtonRoot, ButtonLabel } from '@tokis/react';
import { ComponentPreview, DemoControl } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const resultProps: PropDef[] = [
  { name: 'status', type: "'success' | 'error' | 'warning' | 'info' | 'loading'", required: true, description: 'Determines the icon, color scheme, and semantic meaning of the result.' },
  { name: 'title', type: 'string', required: true, description: 'Primary heading displayed below the status icon.' },
  { name: 'description', type: 'string', description: 'Supporting text below the title explaining the result in more detail.' },
  { name: 'extra', type: 'ReactNode', description: 'Additional content (e.g. action buttons) rendered below the description.' },
  { name: 'className', type: 'string', description: 'Additional CSS class name(s) applied to the root element.' },
];

type ResultStatus = 'success' | 'error' | 'warning' | 'info' | 'loading';

interface StatusMeta {
  title: string;
  description: string;
}

const statusMeta: Record<ResultStatus, StatusMeta> = {
  success: {
    title: 'Payment successful',
    description: 'Your subscription has been activated. A receipt has been sent to your email address.',
  },
  error: {
    title: 'Deployment failed',
    description: 'The build process exited with code 1. Check the logs for details and try again.',
  },
  warning: {
    title: 'Account action required',
    description: 'Your free trial expires in 3 days. Add a payment method to avoid service interruption.',
  },
  info: {
    title: 'Review in progress',
    description: 'Your submission is being reviewed by our team. This usually takes 1–2 business days.',
  },
  loading: {
    title: 'Processing your request',
    description: 'Please wait while we set up your workspace. This may take a moment.',
  },
};

export function ResultPage() {
  const [status, setStatus] = useState<ResultStatus>('success');

  const meta = statusMeta[status];

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Feedback</p>
        <h1 className="doc-page__title">Result</h1>
        <p className="doc-page__desc">
          Communicates the outcome of an operation — success, error, warning, info,
          or a loading state. Renders a large status icon, title, and optional
          description with space for follow-up actions.
        </p>
      </header>

      {/* Interactive demo */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive</h2>
        <ComponentPreview
          code={`<Result
  status="${status}"
  title="${meta.title}"
  description="${meta.description}"${status === 'success' ? `
  extra={
    <ButtonRoot variant="primary">
      <ButtonLabel>Go to dashboard</ButtonLabel>
    </ButtonRoot>
  }` : status === 'error' ? `
  extra={
    <ButtonRoot variant="outline">
      <ButtonLabel>View logs</ButtonLabel>
    </ButtonRoot>
  }` : status === 'warning' ? `
  extra={
    <ButtonRoot variant="primary">
      <ButtonLabel>Add payment method</ButtonLabel>
    </ButtonRoot>
  }` : ''}
/>`}
          controls={
            <DemoControl
              label="Status"
              options={['success', 'error', 'warning', 'info', 'loading']}
              value={status}
              onChange={(v) => setStatus(v as ResultStatus)}
            />
          }
        >
          <Result
            status={status}
            title={meta.title}
            description={meta.description}
            extra={
              status === 'success' ? (
                <ButtonRoot variant="primary">
                  <ButtonLabel>Go to dashboard</ButtonLabel>
                </ButtonRoot>
              ) : status === 'error' ? (
                <ButtonRoot variant="outline">
                  <ButtonLabel>View logs</ButtonLabel>
                </ButtonRoot>
              ) : status === 'warning' ? (
                <ButtonRoot variant="primary">
                  <ButtonLabel>Add payment method</ButtonLabel>
                </ButtonRoot>
              ) : undefined
            }
          />
        </ComponentPreview>
      </div>

      {/* All statuses */}
      <div className="doc-section">
        <h2 className="doc-section__title">All Statuses</h2>
        <p className="doc-section__desc">
          Each status value maps to a distinct icon and color. Use{' '}
          <code className="inline-code">loading</code> for in-progress operations where
          you want to present more context than a spinner alone provides.
        </p>
        <ComponentPreview
          code={`<Result status="success" title="Payment successful" description="Receipt sent to your email." />
<Result status="error" title="Deployment failed" description="Build exited with code 1." />
<Result status="warning" title="Action required" description="Trial expires in 3 days." />
<Result status="info" title="Review in progress" description="Usually takes 1–2 business days." />
<Result status="loading" title="Processing" description="Setting up your workspace..." />`}
          leftAlign
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--tokis-spacing-4)', width: '100%' }}>
            {(['success', 'error', 'warning', 'info', 'loading'] as ResultStatus[]).map((s) => (
              <Result
                key={s}
                status={s}
                title={statusMeta[s].title}
                description={statusMeta[s].description}
              />
            ))}
          </div>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — Result</h2>
        <PropsTable props={resultProps} />
      </div>
    </>
  );
}
