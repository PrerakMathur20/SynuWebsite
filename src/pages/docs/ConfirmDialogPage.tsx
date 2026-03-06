import React, { useState } from 'react';
import { ConfirmDialog, ButtonRoot, ButtonLabel, Stack } from '@tokis/react';
import { ComponentPreview, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const confirmDialogProps: PropDef[] = [
  { name: 'open', type: 'boolean', required: true, description: 'Controls the visibility of the dialog.' },
  { name: 'onClose', type: '() => void', required: true, description: 'Called when the dialog should close (cancel button, backdrop click, or Escape key).' },
  { name: 'onConfirm', type: '() => void', required: true, description: 'Called when the user clicks the confirm button.' },
  { name: 'title', type: 'string', required: true, description: 'The dialog heading.' },
  { name: 'description', type: 'string', description: 'Supporting text shown below the title.' },
  { name: 'confirmLabel', type: 'string', default: "'Confirm'", description: 'Label for the confirm button.' },
  { name: 'cancelLabel', type: 'string', default: "'Cancel'", description: 'Label for the cancel button.' },
  { name: 'destructive', type: 'boolean', default: 'false', description: 'Renders the confirm button with a destructive (error) color.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows a spinner on the confirm button and disables both actions.' },
];

export function ConfirmDialogPage() {
  const [open, setOpen] = useState(false);
  const [destructive, setDestructive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<'confirmed' | 'cancelled' | null>(null);

  function handleConfirm() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      setResult('confirmed');
    }, 2000);
  }

  function handleCancel() {
    setOpen(false);
    setResult('cancelled');
  }

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Overlay</p>
        <h1 className="doc-page__title">Confirm Dialog</h1>
        <p className="doc-page__desc">
          A focused confirmation dialog that asks users to verify their intent before
          executing an action. Supports destructive styling for irreversible actions
          and a loading state while the async operation completes.
        </p>
      </header>

      {/* Interactive Demo */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Demo</h2>
        <p className="doc-section__desc">
          Confirming shows a 2-second loading state before closing. Toggling{' '}
          <strong>Destructive</strong> changes the confirm button color.
        </p>
        <ComponentPreview
          code={`const [open, setOpen] = useState(false);
const [loading, setLoading] = useState(false);

function handleConfirm() {
  setLoading(true);
  // simulate async operation
  setTimeout(() => {
    setLoading(false);
    setOpen(false);
  }, 2000);
}

<ButtonRoot variant="${destructive ? 'destructive' : 'primary'}" onClick={() => setOpen(true)}>
  <ButtonLabel>${destructive ? 'Delete Item' : 'Open Confirm Dialog'}</ButtonLabel>
</ButtonRoot>

<ConfirmDialog
  open={open}
  onClose={() => setOpen(false)}
  title="${destructive ? 'Delete item?' : 'Confirm action'}"
  description="${destructive ? 'This will permanently delete the item and cannot be undone.' : 'Are you sure you want to proceed with this action?'}"
  confirmLabel="${destructive ? 'Delete' : 'Confirm'}"
  onConfirm={handleConfirm}${destructive ? '\n  destructive' : ''}
  loading={loading}
/>`}
          controls={
            <DemoToggle label="Destructive" value={destructive} onChange={setDestructive} />
          }
        >
          <Stack direction="row" gap={3} align="center">
            <ButtonRoot
              variant={destructive ? 'destructive' : 'primary'}
              onClick={() => { setOpen(true); setResult(null); }}
            >
              <ButtonLabel>{destructive ? 'Delete Item' : 'Open Confirm Dialog'}</ButtonLabel>
            </ButtonRoot>
            {result && (
              <span
                style={{
                  fontSize: 'var(--tokis-font-size-sm)',
                  color: result === 'confirmed' ? 'var(--tokis-color-success)' : 'var(--tokis-text-secondary)',
                }}
              >
                {result === 'confirmed' ? 'Confirmed!' : 'Cancelled'}
              </span>
            )}
          </Stack>
          <ConfirmDialog
            open={open}
            onClose={() => setOpen(false)}
            title={destructive ? 'Delete item?' : 'Confirm action'}
            description={
              destructive
                ? 'This will permanently delete the item and cannot be undone.'
                : 'Are you sure you want to proceed with this action?'
            }
            confirmLabel={destructive ? 'Delete' : 'Confirm'}
            onConfirm={handleConfirm}
            destructive={destructive}
            loading={loading}
          />
        </ComponentPreview>
      </div>

      {/* Destructive variant */}
      <div className="doc-section">
        <h2 className="doc-section__title">Destructive</h2>
        <p className="doc-section__desc">
          Set <code className="inline-code">destructive</code> to render the confirm button
          with an error/danger color, signaling that the action cannot be reversed.
        </p>
        <ComponentPreview
          code={`<ConfirmDialog
  open={open}
  onClose={() => setOpen(false)}
  title="Delete project?"
  description="This will permanently delete the project and all of its data. This action cannot be undone."
  confirmLabel="Delete project"
  onConfirm={handleDelete}
  destructive
/>`}
        >
          <ButtonRoot variant="destructive" onClick={() => setOpen(true)}>
            <ButtonLabel>Delete Project</ButtonLabel>
          </ButtonRoot>
          <ConfirmDialog
            open={open}
            onClose={() => setOpen(false)}
            title="Delete project?"
            description="This will permanently delete the project and all of its data. This action cannot be undone."
            confirmLabel="Delete project"
            onConfirm={handleConfirm}
            destructive
            loading={loading}
          />
        </ComponentPreview>
      </div>

      {/* Custom labels */}
      <div className="doc-section">
        <h2 className="doc-section__title">Custom Labels</h2>
        <p className="doc-section__desc">
          Override the default "Confirm" and "Cancel" labels with any string to match
          the specific action being confirmed.
        </p>
        <ComponentPreview
          code={`<ConfirmDialog
  open={open}
  onClose={() => setOpen(false)}
  title="Submit for review?"
  description="Your changes will be sent to a reviewer. You can still edit while it is in review."
  confirmLabel="Submit"
  cancelLabel="Keep editing"
  onConfirm={handleSubmit}
/>`}
        >
          <ButtonRoot variant="outline" onClick={() => setOpen(true)}>
            <ButtonLabel>Submit for Review</ButtonLabel>
          </ButtonRoot>
          <ConfirmDialog
            open={open}
            onClose={() => setOpen(false)}
            title="Submit for review?"
            description="Your changes will be sent to a reviewer. You can still edit while it is in review."
            confirmLabel="Submit"
            cancelLabel="Keep editing"
            onConfirm={handleConfirm}
            loading={loading}
          />
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={confirmDialogProps} />
      </div>
    </>
  );
}
