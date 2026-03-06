import React, { useState } from 'react';
import { Alert, Stack, ButtonRoot, ButtonLabel } from '@tokis/react';
import { ComponentPreview, DemoControl, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const alertProps: PropDef[] = [
  { name: 'variant', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: 'Controls color and icon.' },
  { name: 'title', type: 'ReactNode', description: 'Bold heading text above the message.' },
  { name: 'onClose', type: '() => void', description: 'When provided, shows a dismiss button.' },
  { name: 'icon', type: 'ReactNode', description: 'Override the default icon.' },
  { name: 'action', type: 'ReactNode', description: 'Action element (e.g., button) rendered below the message.' },
];

export function AlertPage() {
  const [variant, setVariant] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  const [showTitle, setShowTitle] = useState(true);
  const [showClose, setShowClose] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Feedback</p>
        <h1 className="doc-page__title">Alert</h1>
        <p className="doc-page__desc">
          Communicates important status messages — info, success, warning, or error.
          Supports titles, dismiss actions, and custom action elements.
          Uses <code className="inline-code">role="alert"</code> for screen reader announcements.
        </p>
      </header>

      {/* Alert Interactive */}
      <div className="doc-section">
        <h2 className="doc-section__title">Alert — Interactive</h2>
        <ComponentPreview
          code={`<Alert
  variant="${variant}"${showTitle ? '\n  title="Deployment complete"' : ''}${showClose ? '\n  onClose={() => setDismissed(true)}' : ''}
>
  Your application has been deployed to the edge network.
</Alert>`}
          controls={
            <>
              <DemoControl
                label="Variant"
                options={['info', 'success', 'warning', 'error']}
                value={variant}
                onChange={(v) => setVariant(v as typeof variant)}
              />
              <DemoToggle label="Title" value={showTitle} onChange={setShowTitle} />
              <DemoToggle label="Closable" value={showClose} onChange={setShowClose} />
            </>
          }
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 480 }}>
            {dismissed ? (
              <ButtonRoot variant="outline" size="sm" onClick={() => setDismissed(false)}>
                <ButtonLabel>Restore Alert</ButtonLabel>
              </ButtonRoot>
            ) : (
              <Alert
                variant={variant}
                title={showTitle ? 'Deployment complete' : undefined}
                onClose={showClose ? () => setDismissed(true) : undefined}
              >
                Your application has been deployed to the edge network and is now serving traffic.
              </Alert>
            )}
          </div>
        </ComponentPreview>
      </div>

      {/* All variants */}
      <div className="doc-section">
        <h2 className="doc-section__title">All Variants</h2>
        <ComponentPreview
          code={`<Stack gap={3}>
  <Alert variant="info" title="Info">New components available in v0.2.0.</Alert>
  <Alert variant="success" title="Success">Your changes have been saved.</Alert>
  <Alert variant="warning" title="Warning">API rate limit at 80%.</Alert>
  <Alert variant="error" title="Error">Failed to deploy. Check your config.</Alert>
</Stack>`}
          leftAlign
        >
          <Stack gap={3} style={{ width: '100%', maxWidth: 500 }}>
            <Alert variant="info" title="Info">New components available in v0.2.0.</Alert>
            <Alert variant="success" title="Success">Your changes have been saved successfully.</Alert>
            <Alert variant="warning" title="Warning">API rate limit at 80%. Consider upgrading your plan.</Alert>
            <Alert variant="error" title="Error">Failed to deploy. Check your configuration.</Alert>
          </Stack>
        </ComponentPreview>
      </div>

      {/* With Action */}
      <div className="doc-section">
        <h2 className="doc-section__title">With Action</h2>
        <ComponentPreview
          code={`<Alert
  variant="warning"
  title="API limit approaching"
  action={
    <ButtonRoot size="sm" variant="outline">
      <ButtonLabel>Upgrade plan</ButtonLabel>
    </ButtonRoot>
  }
>
  You've used 87% of your monthly API allowance.
</Alert>`}
          leftAlign
        >
          <div style={{ maxWidth: 500, width: '100%' }}>
            <Alert
              variant="warning"
              title="API limit approaching"
              action={
                <ButtonRoot size="sm" variant="outline">
                  <ButtonLabel>Upgrade plan</ButtonLabel>
                </ButtonRoot>
              }
            >
              You've used 87% of your monthly API allowance.
            </Alert>
          </div>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — Alert</h2>
        <PropsTable props={alertProps} />
      </div>
    </>
  );
}
