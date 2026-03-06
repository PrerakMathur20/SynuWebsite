import React, { useState } from 'react';
import { AppBar, Stack } from '@tokis/react';
import { ComponentPreview, DemoControl, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const appBarProps: PropDef[] = [
  { name: 'leading', type: 'React.ReactNode', description: 'Content rendered on the left side (e.g. menu button, back arrow, logo).' },
  { name: 'title', type: 'React.ReactNode', description: 'Center or left-aligned title content.' },
  { name: 'trailing', type: 'React.ReactNode', description: 'Content rendered on the right side (e.g. actions, avatar, search).' },
  { name: 'variant', type: "'default' | 'primary' | 'transparent'", default: "'default'", description: 'Background color variant of the app bar.' },
  { name: 'elevation', type: "'none' | 'sm' | 'md'", default: "'sm'", description: 'Shadow depth beneath the bar.' },
  { name: 'sticky', type: 'boolean', default: 'false', description: 'Fixes the app bar to the top of the viewport.' },
  { name: 'className', type: 'string', description: 'Additional CSS class name(s) applied to the root element.' },
];

const MenuIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M2 4.5H16M2 9H16M2 13.5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="7.5" cy="7.5" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 11L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const iconButtonStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  border: 'none',
  borderRadius: 'var(--tokis-radius-md)',
  background: 'transparent',
  color: 'inherit',
  cursor: 'pointer',
  padding: 0,
};

const AvatarPlaceholder = () => (
  <div
    style={{
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: 'var(--tokis-color-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--tokis-text-on-primary)',
      fontSize: 'var(--tokis-font-size-xs)',
      fontWeight: 600,
      flexShrink: 0,
    }}
  >
    JD
  </div>
);

export function AppBarPage() {
  const [variant, setVariant] = useState<'default' | 'primary' | 'transparent'>('default');
  const [elevation, setElevation] = useState<'none' | 'sm' | 'md'>('sm');
  const [sticky, setSticky] = useState(false);

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Navigation</p>
        <h1 className="doc-page__title">App Bar</h1>
        <p className="doc-page__desc">
          A top application bar for branding, navigation, and actions.
          Supports a leading slot (menu/back button), a title, and a trailing slot
          for action icons or an avatar.
        </p>
      </header>

      {/* Interactive Playground */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Playground</h2>
        <ComponentPreview
          code={`<AppBar
  variant="${variant}"
  elevation="${elevation}"${sticky ? '\n  sticky' : ''}
  leading={
    <button style={iconButtonStyle} aria-label="Open menu">
      <MenuIcon />
    </button>
  }
  title="My App"
  trailing={
    <Stack direction="row" gap={1} align="center">
      <button style={iconButtonStyle} aria-label="Search">
        <SearchIcon />
      </button>
      <AvatarPlaceholder />
    </Stack>
  }
/>`}
          controls={
            <>
              <DemoControl
                label="Variant"
                options={['default', 'primary', 'transparent']}
                value={variant}
                onChange={(v) => setVariant(v as typeof variant)}
              />
              <DemoControl
                label="Elevation"
                options={['none', 'sm', 'md']}
                value={elevation}
                onChange={(v) => setElevation(v as typeof elevation)}
              />
              <DemoToggle label="Sticky" value={sticky} onChange={setSticky} />
            </>
          }
          padless
        >
          <div
            style={{
              width: '100%',
              border: '1px solid var(--tokis-color-border)',
              borderRadius: 'var(--tokis-radius-lg)',
              overflow: 'hidden',
            }}
          >
            <AppBar
              variant={variant}
              elevation={elevation}
              leading={
                <button style={iconButtonStyle} type="button" aria-label="Open menu">
                  <MenuIcon />
                </button>
              }
              title="My App"
              trailing={
                <Stack direction="row" gap={1} align="center">
                  <button style={iconButtonStyle} type="button" aria-label="Search">
                    <SearchIcon />
                  </button>
                  <AvatarPlaceholder />
                </Stack>
              }
            />
            <div
              style={{
                height: 120,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--tokis-color-surface)',
              }}
            >
              <span style={{ fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-tertiary)' }}>
                Page content
              </span>
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Variants */}
      <div className="doc-section">
        <h2 className="doc-section__title">Variants</h2>
        <p className="doc-section__desc">
          Three background variants are available. <code className="inline-code">default</code> uses
          the surface color, <code className="inline-code">primary</code> uses the brand color, and{' '}
          <code className="inline-code">transparent</code> blends into the page background — useful
          for hero sections with backdrop blur.
        </p>
        <ComponentPreview
          code={`<AppBar variant="default" title="Default" />
<AppBar variant="primary" title="Primary" />
<AppBar variant="transparent" title="Transparent" />`}
          leftAlign
        >
          <Stack gap={2} style={{ width: '100%' }}>
            {(['default', 'primary', 'transparent'] as const).map((v) => (
              <div
                key={v}
                style={{
                  border: '1px solid var(--tokis-color-border)',
                  borderRadius: 'var(--tokis-radius-md)',
                  overflow: 'hidden',
                }}
              >
                <AppBar
                  variant={v}
                  elevation="sm"
                  leading={
                    <button style={iconButtonStyle} type="button" aria-label="Menu">
                      <MenuIcon />
                    </button>
                  }
                  title="My App"
                  trailing={
                    <Stack direction="row" gap={1} align="center">
                      <button style={iconButtonStyle} type="button" aria-label="Search">
                        <SearchIcon />
                      </button>
                      <AvatarPlaceholder />
                    </Stack>
                  }
                />
              </div>
            ))}
          </Stack>
        </ComponentPreview>
      </div>

      {/* Elevation */}
      <div className="doc-section">
        <h2 className="doc-section__title">Elevation</h2>
        <p className="doc-section__desc">
          Control the shadow depth with the <code className="inline-code">elevation</code> prop.
          Use <code className="inline-code">none</code> when you prefer a border-only separation,{' '}
          <code className="inline-code">sm</code> for a subtle lift, and{' '}
          <code className="inline-code">md</code> for a more prominent shadow.
        </p>
        <ComponentPreview
          code={`<AppBar elevation="none" title="No shadow" />
<AppBar elevation="sm" title="Small shadow (default)" />
<AppBar elevation="md" title="Medium shadow" />`}
          leftAlign
        >
          <Stack gap={4} style={{ width: '100%' }}>
            {(['none', 'sm', 'md'] as const).map((e) => (
              <div
                key={e}
                style={{
                  border: '1px solid var(--tokis-color-border)',
                  borderRadius: 'var(--tokis-radius-md)',
                  overflow: 'hidden',
                }}
              >
                <AppBar
                  elevation={e}
                  leading={
                    <button style={iconButtonStyle} type="button" aria-label="Menu">
                      <MenuIcon />
                    </button>
                  }
                  title={`elevation="${e}"`}
                  trailing={<AvatarPlaceholder />}
                />
              </div>
            ))}
          </Stack>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={appBarProps} />
      </div>
    </>
  );
}
