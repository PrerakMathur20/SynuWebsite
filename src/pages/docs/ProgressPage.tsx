import React, { useState, useEffect } from 'react';
import { Progress, Spinner, Skeleton, Stack } from '@tokis/react';
import { ComponentPreview, DemoControl, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';
import { CodeBlock } from '../../components/CodeBlock';

const progressProps: PropDef[] = [
  { name: 'value', type: 'number', description: '0–100. Omit for indeterminate mode.' },
  { name: 'max', type: 'number', default: '100', description: 'The maximum value.' },
  { name: 'label', type: 'string', description: 'Accessible label and optional visible text.' },
  { name: 'showValue', type: 'boolean', default: 'false', description: 'Show the percentage value.' },
  { name: 'variant', type: "'default' | 'success' | 'warning' | 'error'", default: "'default'", description: 'Color variant.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Track height.' },
];

const spinnerProps: PropDef[] = [
  { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Spinner size.' },
  { name: 'variant', type: "'default' | 'white'", default: "'default'", description: 'Color variant — use white on dark/colored backgrounds.' },
  { name: 'label', type: 'string', default: "'Loading…'", description: 'Accessible aria-label for screen readers.' },
];

function AnimatedDemo() {
  const [value, setValue] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    if (value >= 100) {
      const reset = setTimeout(() => setValue(0), 800);
      return () => clearTimeout(reset);
    }
    const t = setTimeout(() => setValue((v) => Math.min(100, v + Math.floor(Math.random() * 8) + 2)), 120);
    return () => clearTimeout(t);
  }, [value, running]);

  return (
    <Stack gap={4} style={{ width: '100%', maxWidth: 480 }}>
      <Stack gap={2}>
        <Stack direction="row" justify="space-between" align="center">
          <span style={{ fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>Upload progress</span>
          <span style={{ fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)', fontFamily: 'var(--tokis-font-family-mono)' }}>{value}%</span>
        </Stack>
        <Progress value={value} label="Upload progress" />
      </Stack>
      <button
        onClick={() => { setRunning((r) => !r); if (!running) setValue(0); }}
        style={{
          alignSelf: 'flex-start',
          padding: '6px 14px',
          fontSize: 'var(--tokis-font-size-sm)',
          borderRadius: 'var(--tokis-radius-md)',
          border: '1px solid var(--tokis-color-border)',
          background: 'transparent',
          color: 'var(--tokis-text-primary)',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        {running ? 'Pause' : 'Restart'}
      </button>
    </Stack>
  );
}

export function ProgressPage() {
  const [variant, setVariant] = useState<'default' | 'success' | 'warning' | 'error'>('default');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [showValue, setShowValue] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Feedback</p>
        <h1 className="doc-page__title">Progress</h1>
        <p className="doc-page__desc">
          Loading indicators for async operations.{' '}
          <code className="inline-code">Progress</code> for determinate/indeterminate bars,{' '}
          <code className="inline-code">Spinner</code> for circular loaders,{' '}
          <code className="inline-code">Skeleton</code> for content placeholders.
        </p>
      </header>

      {/* Interactive Demo */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Playground</h2>
        <ComponentPreview
          code={`<Progress
  ${indeterminate ? '' : 'value={64}\n  '}variant="${variant}"
  size="${size}"${showValue && !indeterminate ? '\n  showValue' : ''}
  label="Loading"
/>`}
          controls={
            <>
              <DemoControl
                label="Variant"
                options={['default', 'success', 'warning', 'error']}
                value={variant}
                onChange={(v) => setVariant(v as typeof variant)}
              />
              <DemoControl
                label="Size"
                options={['sm', 'md', 'lg']}
                value={size}
                onChange={(v) => setSize(v as typeof size)}
              />
              <DemoToggle label="Show Value" value={showValue} onChange={setShowValue} />
              <DemoToggle label="Indeterminate" value={indeterminate} onChange={setIndeterminate} />
            </>
          }
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 480 }}>
            <Progress
              value={indeterminate ? undefined : 64}
              variant={variant}
              size={size}
              showValue={showValue && !indeterminate}
              label="Loading"
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Animated example */}
      <div className="doc-section">
        <h2 className="doc-section__title">Animated Example</h2>
        <p className="doc-section__desc">
          Controlled progress updates in real time.
        </p>
        <div className="comp-preview">
          <div className="comp-preview__tabs">
            <span className="comp-preview__tab comp-preview__tab--active">Preview</span>
          </div>
          <div className="comp-preview__demo" style={{ alignItems: 'flex-start', padding: 'var(--tokis-spacing-8)' }}>
            <AnimatedDemo />
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="doc-section">
        <h2 className="doc-section__title">Variants</h2>
        <ComponentPreview
          code={`<Stack gap={4}>
  <Progress value={60} label="Default" showValue />
  <Progress value={80} variant="success" label="Success" showValue />
  <Progress value={75} variant="warning" label="Warning" showValue />
  <Progress value={40} variant="error" label="Error" showValue />
  <Progress label="Indeterminate" />
</Stack>`}
          leftAlign
        >
          <Stack gap={4} style={{ width: '100%', maxWidth: 480 }}>
            <Progress value={60} label="Default" showValue />
            <Progress value={80} variant="success" label="Success" showValue />
            <Progress value={75} variant="warning" label="Warning" showValue />
            <Progress value={40} variant="error" label="Error" showValue />
            <Progress label="Indeterminate" />
          </Stack>
        </ComponentPreview>
      </div>

      {/* Spinner */}
      <div className="doc-section">
        <h2 className="doc-section__title">Spinner</h2>
        <p className="doc-section__desc">
          Circular loading indicator. Uses <code className="inline-code">role="status"</code> and{' '}
          <code className="inline-code">aria-label</code> for accessibility.
        </p>
        <ComponentPreview
          code={`<Stack direction="row" gap={4} align="center">
  <Spinner size="sm" />
  <Spinner size="md" />
  <Spinner size="lg" />
  <Spinner size="xl" />
</Stack>`}
        >
          <Stack direction="row" gap={4} align="center">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" />
          </Stack>
        </ComponentPreview>
      </div>

      {/* Spinner on dark bg */}
      <div className="doc-section">
        <h2 className="doc-section__title">Spinner — White Variant</h2>
        <p className="doc-section__desc">
          Use <code className="inline-code">variant="white"</code> on dark or colored backgrounds.
        </p>
        <ComponentPreview
          code={`<div style={{ background: 'var(--tokis-color-primary)', padding: 24, borderRadius: 12, display: 'flex', gap: 16 }}>
  <Spinner size="sm" variant="white" />
  <Spinner size="md" variant="white" />
  <Spinner size="lg" variant="white" />
</div>`}
        >
          <div style={{ background: 'var(--tokis-color-primary)', padding: 24, borderRadius: 'var(--tokis-radius-lg)', display: 'flex', gap: 16, alignItems: 'center' }}>
            <Spinner size="sm" variant="white" />
            <Spinner size="md" variant="white" />
            <Spinner size="lg" variant="white" />
          </div>
        </ComponentPreview>
      </div>

      {/* Skeleton */}
      <div className="doc-section">
        <h2 className="doc-section__title">Skeleton</h2>
        <p className="doc-section__desc">
          Placeholder shapes that mimic the layout of content while it loads.
          Reduces perceived wait time compared to a spinner.
        </p>
        <ComponentPreview
          code={`<Stack gap={3} style={{ maxWidth: 360 }}>
  <Stack direction="row" gap={3} align="center">
    <Skeleton variant="circular" width={48} height={48} />
    <Stack gap={1} style={{ flex: 1 }}>
      <Skeleton variant="text" width="70%" height={14} />
      <Skeleton variant="text" width="50%" height={12} />
    </Stack>
  </Stack>
  <Skeleton variant="rectangular" height={120} />
  <Skeleton variant="text" lines={3} />
</Stack>`}
          leftAlign
        >
          <Stack gap={3} style={{ maxWidth: 360, width: '100%' }}>
            <Stack direction="row" gap={3} align="center">
              <Skeleton variant="circular" width={48} height={48} />
              <Stack gap={1} style={{ flex: 1 }}>
                <Skeleton variant="text" width="70%" height={14} />
                <Skeleton variant="text" width="50%" height={12} />
              </Stack>
            </Stack>
            <Skeleton variant="rectangular" height={120} />
            <Skeleton variant="text" lines={3} />
          </Stack>
        </ComponentPreview>
      </div>

      {/* Usage */}
      <div className="doc-section">
        <h2 className="doc-section__title">Usage</h2>
        <CodeBlock
          language="tsx"
          code={`import { Progress, Spinner, Skeleton } from '@tokis/react';

// Determinate progress
<Progress value={progress} variant="success" showValue label="Uploading" />

// Indeterminate (omit value)
<Progress label="Loading data…" />

// Inline spinner
<Spinner size="sm" label="Saving changes…" />

// Content skeleton while loading
{isLoading ? (
  <Skeleton variant="rectangular" height={200} />
) : (
  <MyContent />
)}`}
        />
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — Progress</h2>
        <PropsTable props={progressProps} />
      </div>
      <div className="doc-section">
        <h2 className="doc-section__title">Props — Spinner</h2>
        <PropsTable props={spinnerProps} />
      </div>
    </>
  );
}
