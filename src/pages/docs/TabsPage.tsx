import React, { useState } from 'react';
import { Tabs, Badge, Stack, Alert } from '@tokis/react';
import { ComponentPreview, DemoControl, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const tabsProps: PropDef[] = [
  { name: 'tabs', type: 'TabItem[]', required: true, description: 'Array of tab items with value, label, content, disabled, and icon.' },
  { name: 'variant', type: "'line' | 'pills'", default: "'line'", description: 'Visual style of the tab list.' },
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Tab list orientation.' },
  { name: 'defaultValue', type: 'string', description: 'Initially active tab value (uncontrolled).' },
  { name: 'value', type: 'string', description: 'Controlled active value.' },
  { name: 'onChange', type: '(value: string) => void', description: 'Called when the active tab changes.' },
];

const CodeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M4 5l-3 2 3 2M10 5l3 2-3 2M8 3l-2 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DocIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 2h6l3 3v7H3V2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M9 2v3h3M5 7h4M5 9.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M7 1v2M7 11v2M1 7h2M11 7h2M3.05 3.05l1.42 1.42M9.53 9.53l1.42 1.42M9.53 4.47l1.42-1.42M3.05 10.95l1.42-1.42" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export function TabsPage() {
  const [variant, setVariant] = useState<'line' | 'pills'>('line');
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Navigation</p>
        <h1 className="doc-page__title">Tabs</h1>
        <p className="doc-page__desc">
          Organizes content into selectable panels. Implements the WAI-ARIA Tabs Pattern with
          full keyboard navigation — arrow keys move between tabs, Home/End jump to edges.
        </p>
      </header>

      {/* Interactive */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Playground</h2>
        <ComponentPreview
          code={`<Tabs
  variant="${variant}"
  orientation="${orientation}"
  tabs={[
    { value: 'overview', label: 'Overview', content: <p>Overview content</p> },
    { value: 'api', label: 'API', content: <p>API content</p> },
    { value: 'examples', label: 'Examples', content: <p>Examples content</p> },
  ]}
/>`}
          controls={
            <>
              <DemoControl
                label="Variant"
                options={['line', 'pills']}
                value={variant}
                onChange={(v) => setVariant(v as 'line' | 'pills')}
              />
              <DemoControl
                label="Orientation"
                options={['horizontal', 'vertical']}
                value={orientation}
                onChange={(v) => setOrientation(v as 'horizontal' | 'vertical')}
              />
            </>
          }
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 560 }}>
            <Tabs
              variant={variant}
              orientation={orientation}
              defaultValue="overview"
              tabs={[
                {
                  value: 'overview',
                  label: 'Overview',
                  content: (
                    <div style={{ padding: 'var(--tokis-spacing-4)', display: 'flex', flexDirection: 'column', gap: 'var(--tokis-spacing-3)' }}>
                      <p style={{ margin: 0, color: 'var(--tokis-text-secondary)', fontSize: 'var(--tokis-font-size-sm)', lineHeight: 1.6 }}>
                        Tabs organize content into selectable sections with full WAI-ARIA compliance.
                      </p>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--tokis-spacing-2)' }}>
                        {[{ label: 'Variants', value: '2' }, { label: 'Orientations', value: '2' }, { label: 'Keyboard', value: '✓' }].map(({ label, value }) => (
                          <div key={label} style={{ background: 'var(--tokis-color-background)', border: '1px solid var(--tokis-color-border)', borderRadius: 'var(--tokis-radius-md)', padding: 'var(--tokis-spacing-2)', textAlign: 'center' }}>
                            <div style={{ fontSize: 'var(--tokis-font-size-lg)', fontWeight: 700, color: 'var(--tokis-color-primary)' }}>{value}</div>
                            <div style={{ fontSize: 10, color: 'var(--tokis-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ),
                },
                {
                  value: 'api',
                  label: 'API',
                  content: (
                    <div style={{ padding: 'var(--tokis-spacing-4)', display: 'flex', flexDirection: 'column', gap: 'var(--tokis-spacing-2)' }}>
                      <p style={{ margin: '0 0 4px', color: 'var(--tokis-text-secondary)', fontSize: 'var(--tokis-font-size-sm)' }}>Key props:</p>
                      <Stack direction="row" gap={2} wrap>
                        {['tabs', 'variant', 'orientation', 'value', 'onChange', 'defaultValue'].map(p => (
                          <code key={p} className="inline-code">{p}</code>
                        ))}
                      </Stack>
                      <Badge variant="info" style={{ alignSelf: 'flex-start', marginTop: 4 }}>WAI-ARIA Tabs Pattern</Badge>
                    </div>
                  ),
                },
                {
                  value: 'examples',
                  label: 'Examples',
                  content: (
                    <div style={{ padding: 'var(--tokis-spacing-4)', display: 'flex', flexDirection: 'column', gap: 'var(--tokis-spacing-2)' }}>
                      <p style={{ margin: '0 0 4px', color: 'var(--tokis-text-secondary)', fontSize: 'var(--tokis-font-size-sm)' }}>Common patterns:</p>
                      {[{ label: 'Pills variant', code: 'variant="pills"' }, { label: 'Vertical layout', code: 'orientation="vertical"' }, { label: 'With icons', code: 'icon={<Icon />}' }].map(({ label, code }) => (
                        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--tokis-spacing-2)', fontSize: 'var(--tokis-font-size-xs)' }}>
                          <span style={{ color: 'var(--tokis-text-secondary)' }}>{label}:</span>
                          <code className="inline-code">{code}</code>
                        </div>
                      ))}
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </ComponentPreview>
      </div>

      {/* With Icons */}
      <div className="doc-section">
        <h2 className="doc-section__title">With Icons</h2>
        <p className="doc-section__desc">
          Tab items accept an <code className="inline-code">icon</code> property for visual context.
        </p>
        <ComponentPreview
          code={`<Tabs
  tabs={[
    { value: 'code', label: 'Code', icon: <CodeIcon />, content: <p>Code content</p> },
    { value: 'docs', label: 'Docs', icon: <DocIcon />, content: <p>Docs content</p> },
    { value: 'settings', label: 'Settings', icon: <SettingsIcon />, content: <p>Settings content</p> },
  ]}
/>`}
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 480 }}>
            <Tabs
              defaultValue="code"
              tabs={[
                { value: 'code', label: 'Code', icon: <CodeIcon />, content: <div style={{ padding: 'var(--tokis-spacing-4)', color: 'var(--tokis-text-secondary)', fontSize: 'var(--tokis-font-size-sm)' }}>Code editor panel content.</div> },
                { value: 'docs', label: 'Docs', icon: <DocIcon />, content: <div style={{ padding: 'var(--tokis-spacing-4)', color: 'var(--tokis-text-secondary)', fontSize: 'var(--tokis-font-size-sm)' }}>Documentation panel content.</div> },
                { value: 'settings', label: 'Settings', icon: <SettingsIcon />, content: <div style={{ padding: 'var(--tokis-spacing-4)', color: 'var(--tokis-text-secondary)', fontSize: 'var(--tokis-font-size-sm)' }}>Settings panel content.</div> },
              ]}
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Pills */}
      <div className="doc-section">
        <h2 className="doc-section__title">Pills Variant</h2>
        <p className="doc-section__desc">
          Pills-style tabs work well in compact UIs, filter bars, or secondary navigation.
        </p>
        <ComponentPreview
          code={`<Tabs
  variant="pills"
  defaultValue="all"
  tabs={[
    { value: 'all', label: 'All', content: '...' },
    { value: 'active', label: 'Active', content: '...' },
    { value: 'paused', label: 'Paused', content: '...' },
    { value: 'archived', label: 'Archived', content: '...' },
  ]}
/>`}
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 560 }}>
            <Tabs
              variant="pills"
              defaultValue="all"
              tabs={[
                { value: 'all', label: 'All', content: <div style={{ padding: 'var(--tokis-spacing-4)', color: 'var(--tokis-text-secondary)', fontSize: 'var(--tokis-font-size-sm)' }}>Showing all 48 items.</div> },
                { value: 'active', label: 'Active', content: <div style={{ padding: 'var(--tokis-spacing-4)', color: 'var(--tokis-text-secondary)', fontSize: 'var(--tokis-font-size-sm)' }}>Showing 31 active items.</div> },
                { value: 'paused', label: 'Paused', content: <div style={{ padding: 'var(--tokis-spacing-4)', color: 'var(--tokis-text-secondary)', fontSize: 'var(--tokis-font-size-sm)' }}>Showing 12 paused items.</div> },
                { value: 'archived', label: 'Archived', content: <div style={{ padding: 'var(--tokis-spacing-4)', color: 'var(--tokis-text-secondary)', fontSize: 'var(--tokis-font-size-sm)' }}>Showing 5 archived items.</div> },
              ]}
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Disabled tabs */}
      <div className="doc-section">
        <h2 className="doc-section__title">Disabled Tabs</h2>
        <ComponentPreview
          code={`<Tabs tabs={[
  { value: 'active', label: 'Active tab', content: <p>...</p> },
  { value: 'disabled', label: 'Disabled tab', content: <p>...</p>, disabled: true },
]} />`}
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 400 }}>
            <Tabs
              defaultValue="active"
              tabs={[
                { value: 'active', label: 'Active tab', content: <div style={{ padding: 'var(--tokis-spacing-4)', color: 'var(--tokis-text-secondary)', fontSize: 'var(--tokis-font-size-sm)' }}>This tab is accessible and interactive.</div> },
                { value: 'disabled', label: 'Disabled (Pro)', content: <div>...</div>, disabled: true },
              ]}
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Accessibility */}
      <div className="doc-section">
        <h2 className="doc-section__title">Accessibility</h2>
        <Alert variant="info" title="WAI-ARIA Tabs Pattern">
          Arrow keys (←→ horizontal, ↑↓ vertical) move focus between tabs.
          Space/Enter activates. Home/End jump to first/last. Tab moves to the active panel.
        </Alert>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={tabsProps} />
      </div>
    </>
  );
}
