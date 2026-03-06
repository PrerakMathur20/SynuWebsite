import React, { useState } from 'react';
import { useSnackbar, SnackbarContainer, ButtonRoot, ButtonLabel, Stack } from '@tokis/react';
import { ComponentPreview } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';
import { CodeBlock } from '../../components/CodeBlock';

const snackbarProps: PropDef[] = [
  { name: 'position', type: "'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right' | 'top-center'", default: "'bottom-right'", description: 'Position of the snackbar container on screen.' },
  { name: 'items', type: 'SnackbarItem[]', required: true, description: 'Array of snackbar items to display.' },
  { name: 'onDismiss', type: '(id: string) => void', required: true, description: 'Called when a snackbar is dismissed.' },
];

function SnackbarDemo() {
  const { items, add, dismiss } = useSnackbar();
  const [variant, setVariant] = useState<'default' | 'success' | 'warning' | 'error'>('success');
  const [position, setPosition] = useState<'bottom-right' | 'bottom-center' | 'top-right' | 'top-center'>('bottom-right');

  const messages = {
    default: 'Your action was completed.',
    success: 'Changes saved successfully!',
    warning: 'This action may take a moment.',
    error: 'Something went wrong. Please retry.',
  };

  const actionMessages: Record<typeof variant, { message: string; title: string; action: string }> = {
    default: { message: 'Item was updated successfully.', title: 'Updated', action: 'View details' },
    success: { message: 'File uploaded successfully.', title: 'Upload complete', action: 'View file' },
    warning: { message: 'Action completed with warnings.', title: 'Check required', action: 'Review' },
    error: { message: 'Action failed. Please try again.', title: 'Error occurred', action: 'Retry' },
  };

  return (
    <div>
      <Stack gap={4}>
        <Stack direction="row" gap={3}>
          <ButtonRoot
            variant="primary"
            onClick={() => add({ message: messages[variant], variant, duration: 4000 })}
          >
            <ButtonLabel>Show Snackbar</ButtonLabel>
          </ButtonRoot>
          <ButtonRoot
            variant="outline"
            onClick={() => {
              const a = actionMessages[variant];
              add({
                message: a.message,
                variant,
                title: a.title,
                duration: 5000,
                action: { label: a.action, onClick: () => {} },
              });
            }}
          >
            <ButtonLabel>With Action</ButtonLabel>
          </ButtonRoot>
        </Stack>

        <Stack direction="row" gap={3} wrap>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--tokis-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Variant</div>
            <Stack direction="row" gap={1}>
              {(['default', 'success', 'warning', 'error'] as const).map((v) => (
                <button
                  key={v}
                  className={`demo-option${variant === v ? ' demo-option--active' : ''}`}
                  onClick={() => setVariant(v)}
                  type="button"
                >
                  {v}
                </button>
              ))}
            </Stack>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--tokis-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Position</div>
            <Stack direction="row" gap={1} wrap>
              {(['bottom-right', 'bottom-center', 'top-right', 'top-center'] as const).map((p) => (
                <button
                  key={p}
                  className={`demo-option${position === p ? ' demo-option--active' : ''}`}
                  onClick={() => setPosition(p)}
                  type="button"
                >
                  {p}
                </button>
              ))}
            </Stack>
          </div>
        </Stack>
      </Stack>

      <SnackbarContainer
        items={items}
        onDismiss={dismiss}
        position={position}
      />
    </div>
  );
}

export function SnackbarPage() {
  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Feedback</p>
        <h1 className="doc-page__title">Snackbar</h1>
        <p className="doc-page__desc">
          Non-blocking toast notifications for asynchronous feedback. Uses the{' '}
          <code className="inline-code">useSnackbar()</code> hook to manage a queue
          and <code className="inline-code">SnackbarContainer</code> to render them.
        </p>
      </header>

      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Demo</h2>
        <div className="comp-preview">
          <div className="comp-preview__tabs">
            <span className="comp-preview__tab comp-preview__tab--active">Preview</span>
          </div>
          <div className="comp-preview__demo" style={{ flexDirection: 'column', alignItems: 'flex-start', minHeight: 200 }}>
            <SnackbarDemo />
          </div>
        </div>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Usage Pattern</h2>
        <p className="doc-section__desc">
          Call <code className="inline-code">add()</code> from anywhere in your component tree.
          The <code className="inline-code">SnackbarContainer</code> is typically placed at the root of your app.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { useSnackbar, SnackbarContainer } from '@tokis/react';

// App root
function App() {
  const { items, dismiss } = useSnackbar();
  return (
    <>
      <YourApp />
      <SnackbarContainer
        items={items}
        onDismiss={dismiss}
        position="bottom-right"
      />
    </>
  );
}

// Anywhere in the tree
function UploadButton() {
  const { add } = useSnackbar();

  const handleUpload = async () => {
    await uploadFile();
    add({
      message: 'File uploaded.',
      variant: 'success',
      title: 'Upload complete',
      duration: 4000,
      action: { label: 'View', onClick: () => navigate('/files') },
    });
  };

  return <button onClick={handleUpload}>Upload</button>;
}`}
        />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Props — SnackbarContainer</h2>
        <PropsTable props={snackbarProps} />
      </div>
    </>
  );
}
