import React, { useState } from 'react';
import { Badge, Stack } from '@tokis/react';
import { ComponentPreview, DemoControl, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const badgeProps: PropDef[] = [
  { name: 'variant', type: "'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'outline'", default: "'default'", description: 'Color variant of the badge.' },
  { name: 'dot', type: 'boolean', default: 'false', description: 'Renders as a small status dot instead of text.' },
  { name: 'children', type: 'ReactNode', description: 'Badge label text.' },
];

export function BadgePage() {
  const [variant, setVariant] = useState<'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'outline'>('success');
  const [dot, setDot] = useState(false);

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Components</p>
        <h1 className="doc-page__title">Badge</h1>
        <p className="doc-page__desc">
          Compact visual indicators for status, counts, and labels.
          Supports dot mode for minimal status indicators.
        </p>
      </header>

      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Playground</h2>
        <ComponentPreview
          code={`<Badge variant="${variant}"${dot ? ' dot' : ''}>${dot ? '' : 'Status label'}</Badge>`}
          controls={
            <>
              <DemoControl
                label="Variant"
                options={['default', 'primary', 'success', 'warning', 'error', 'info', 'outline']}
                value={variant}
                onChange={(v) => setVariant(v as typeof variant)}
              />
              <DemoToggle label="Dot Mode" value={dot} onChange={setDot} />
            </>
          }
        >
          <Badge variant={variant} dot={dot}>
            {dot ? undefined : 'Status label'}
          </Badge>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">All Variants</h2>
        <p className="doc-section__desc">
          Seven semantic variants to match any context. Use <code className="inline-code">outline</code> for a
          more subtle appearance.
        </p>
        <ComponentPreview
          code={`<Stack direction="row" gap={2} wrap>
  <Badge>Default</Badge>
  <Badge variant="primary">Primary</Badge>
  <Badge variant="success">Success</Badge>
  <Badge variant="warning">Warning</Badge>
  <Badge variant="error">Error</Badge>
  <Badge variant="info">Info</Badge>
  <Badge variant="outline">Outline</Badge>
</Stack>`}
        >
          <Stack direction="row" gap={2} wrap>
            <Badge>Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="outline">Outline</Badge>
          </Stack>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Dot Badges</h2>
        <p className="doc-section__desc">
          Minimal status indicators without text. Useful for real-time presence or connection state.
        </p>
        <ComponentPreview
          code={`<Stack direction="row" gap={3} align="center">
  <Badge dot variant="success" />
  <Badge dot variant="warning" />
  <Badge dot variant="error" />
  <Badge dot variant="info" />
  <Badge dot />
</Stack>`}
        >
          <Stack direction="row" gap={3} align="center">
            <Stack gap={1} style={{ alignItems: 'center' }}>
              <Badge dot variant="success" />
              <span style={{ fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)' }}>Online</span>
            </Stack>
            <Stack gap={1} style={{ alignItems: 'center' }}>
              <Badge dot variant="warning" />
              <span style={{ fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)' }}>Away</span>
            </Stack>
            <Stack gap={1} style={{ alignItems: 'center' }}>
              <Badge dot variant="error" />
              <span style={{ fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)' }}>Busy</span>
            </Stack>
            <Stack gap={1} style={{ alignItems: 'center' }}>
              <Badge dot />
              <span style={{ fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)' }}>Offline</span>
            </Stack>
          </Stack>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={badgeProps} />
      </div>
    </>
  );
}
