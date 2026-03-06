import React, { useState } from 'react';
import { CircularProgress, Stack } from '@tokis/react';
import { ComponentPreview, DemoControl, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const circularProgressProps: PropDef[] = [
  { name: 'value', type: 'number', description: 'Progress value 0–100. Omit for indeterminate spinning state.' },
  { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Diameter of the ring. sm=32px md=48px lg=64px xl=80px.' },
  { name: 'variant', type: "'default' | 'success' | 'warning' | 'error'", default: "'default'", description: 'Color variant for semantic meaning.' },
  { name: 'strokeWidth', type: 'number', description: 'Override the default stroke width for the ring.' },
  { name: 'label', type: 'ReactNode', description: 'Content rendered in the center of the ring (e.g. percentage text).' },
  { name: 'className', type: 'string', description: 'Additional CSS class applied to the root element.' },
];

export function CircularProgressPage() {
  const [progress, setProgress] = useState(65);
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [variant, setVariant] = useState<'default' | 'success' | 'warning' | 'error'>('default');
  const [indeterminate, setIndeterminate] = useState(false);

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Feedback</p>
        <h1 className="doc-page__title">Circular Progress</h1>
        <p className="doc-page__desc">
          An SVG ring indicator for progress feedback. Supports determinate (explicit value) and
          indeterminate (continuous spinning) modes, with semantic color variants and an optional
          center label.
        </p>
      </header>

      {/* Interactive demo */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Demo</h2>
        <ComponentPreview
          code={`<CircularProgress
  ${indeterminate ? '' : `value={${progress}}\n  `}size="${size}"
  variant="${variant}"
  label="${indeterminate ? 'Loading' : `${progress}%`}"
/>`}
          controls={
            <>
              <DemoControl
                label="Size"
                options={['sm', 'md', 'lg', 'xl']}
                value={size}
                onChange={(v) => setSize(v as typeof size)}
              />
              <DemoControl
                label="Variant"
                options={['default', 'success', 'warning', 'error']}
                value={variant}
                onChange={(v) => setVariant(v as typeof variant)}
              />
              <DemoToggle label="Indeterminate" value={indeterminate} onChange={setIndeterminate} />
              {!indeterminate && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={() => setProgress((p) => Math.max(0, p - 10))}
                    style={{ padding: '4px 8px', cursor: 'pointer', borderRadius: 4, border: '1px solid var(--tokis-color-border)', background: 'var(--tokis-color-surface)', color: 'var(--tokis-text-primary)' }}
                  >-10</button>
                  <span style={{ minWidth: 48, textAlign: 'center', fontSize: 'var(--tokis-font-size-sm)' }}>{progress}%</span>
                  <button
                    onClick={() => setProgress((p) => Math.min(100, p + 10))}
                    style={{ padding: '4px 8px', cursor: 'pointer', borderRadius: 4, border: '1px solid var(--tokis-color-border)', background: 'var(--tokis-color-surface)', color: 'var(--tokis-text-primary)' }}
                  >+10</button>
                </div>
              )}
            </>
          }
        >
          <CircularProgress
            value={indeterminate ? undefined : progress}
            size={size}
            variant={variant}
            label={indeterminate ? 'Loading' : `${progress}%`}
          />
        </ComponentPreview>
      </div>

      {/* All sizes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Sizes</h2>
        <ComponentPreview
          code={`<Stack direction="row" gap={6} align="center">
  <CircularProgress value={70} size="sm" label="70%" />
  <CircularProgress value={70} size="md" label="70%" />
  <CircularProgress value={70} size="lg" label="70%" />
  <CircularProgress value={70} size="xl" label="70%" />
</Stack>`}
        >
          <Stack direction="row" gap={6} align="center">
            <CircularProgress value={70} size="sm" label="70%" />
            <CircularProgress value={70} size="md" label="70%" />
            <CircularProgress value={70} size="lg" label="70%" />
            <CircularProgress value={70} size="xl" label="70%" />
          </Stack>
        </ComponentPreview>
      </div>

      {/* Variants */}
      <div className="doc-section">
        <h2 className="doc-section__title">Variants</h2>
        <ComponentPreview
          code={`<Stack direction="row" gap={6} align="center">
  <CircularProgress value={80} variant="default" size="lg" label="80%" />
  <CircularProgress value={80} variant="success" size="lg" label="80%" />
  <CircularProgress value={80} variant="warning" size="lg" label="80%" />
  <CircularProgress value={80} variant="error" size="lg" label="80%" />
</Stack>`}
        >
          <Stack direction="row" gap={6} align="center">
            <CircularProgress value={80} variant="default" size="lg" label="80%" />
            <CircularProgress value={80} variant="success" size="lg" label="80%" />
            <CircularProgress value={80} variant="warning" size="lg" label="80%" />
            <CircularProgress value={80} variant="error" size="lg" label="80%" />
          </Stack>
        </ComponentPreview>
      </div>

      {/* Indeterminate */}
      <div className="doc-section">
        <h2 className="doc-section__title">Indeterminate</h2>
        <p className="doc-section__desc">
          Omit the <code className="inline-code">value</code> prop to render a spinning
          indeterminate indicator — useful when the total progress is unknown.
        </p>
        <ComponentPreview
          code={`<Stack direction="row" gap={6} align="center">
  <CircularProgress label="Loading" size="sm" />
  <CircularProgress label="Loading" size="md" />
  <CircularProgress label="Loading" size="lg" variant="success" />
  <CircularProgress label="Loading" size="xl" variant="warning" />
</Stack>`}
        >
          <Stack direction="row" gap={6} align="center">
            <CircularProgress label="Loading" size="sm" />
            <CircularProgress label="Loading" size="md" />
            <CircularProgress label="Loading" size="lg" variant="success" />
            <CircularProgress label="Loading" size="xl" variant="warning" />
          </Stack>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={circularProgressProps} />
      </div>
    </>
  );
}
