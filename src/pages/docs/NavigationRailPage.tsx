import React, { useState } from 'react';
import { NavigationRail, Stack } from '@tokis/react';
import { ComponentPreview, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const navRailProps: PropDef[] = [
  { name: 'items', type: 'NavRailItem[]', required: true, description: 'Array of navigation item definitions.' },
  { name: 'value', type: 'string', required: true, description: 'The value of the currently selected item.' },
  { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called when the user selects a different item.' },
  { name: 'header', type: 'React.ReactNode', description: 'Content rendered at the top of the rail, above navigation items.' },
  { name: 'footer', type: 'React.ReactNode', description: 'Content rendered at the bottom of the rail, below navigation items.' },
  { name: 'className', type: 'string', description: 'Additional CSS class name(s) applied to the root element.' },
];

const navRailItemProps: PropDef[] = [
  { name: 'value', type: 'string', required: true, description: 'Unique identifier for the item.' },
  { name: 'label', type: 'string', required: true, description: 'Text label displayed below the icon.' },
  { name: 'icon', type: 'React.ReactNode', required: true, description: 'Icon element rendered above the label.' },
  { name: 'badge', type: 'number | string', description: 'Badge value shown on the icon.' },
];

const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const ProjectsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M2 5.5C2 4.119 3.119 3 4.5 3H9L11 5H15.5C16.881 5 18 6.119 18 7.5V14.5C18 15.881 16.881 17 15.5 17H4.5C3.119 17 2 15.881 2 14.5V5.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const TeamIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="7" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="14" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M1 17C1 13.686 3.686 11 7 11C10.314 11 13 13.686 13 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 11C16.209 11 18 12.791 18 15V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 2V4M10 16V18M2 10H4M16 10H18M4.222 4.222L5.636 5.636M14.364 14.364L15.778 15.778M15.778 4.222L14.364 5.636M5.636 14.364L4.222 15.778" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const HelpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 7C7 5.895 7.895 5 9 5C10.105 5 11 5.895 11 7C11 8.105 10.105 9 9 9V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9" cy="13" r="0.75" fill="currentColor" />
  </svg>
);

const railItems = [
  { value: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { value: 'projects', label: 'Projects', icon: <ProjectsIcon />, badge: 4 },
  { value: 'team', label: 'Team', icon: <TeamIcon /> },
  { value: 'settings', label: 'Settings', icon: <SettingsIcon /> },
];

const LogoPlaceholder = () => (
  <div
    style={{
      width: 36,
      height: 36,
      borderRadius: 'var(--tokis-radius-md)',
      background: 'var(--tokis-color-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--tokis-text-on-primary)',
      fontWeight: 700,
      fontSize: 'var(--tokis-font-size-sm)',
      letterSpacing: '-0.02em',
    }}
  >
    S
  </div>
);

const railContentPanels: Record<string, React.ReactNode> = {
  dashboard: (
    <div style={{ padding: 'var(--tokis-spacing-5)', display: 'flex', flexDirection: 'column', gap: 'var(--tokis-spacing-4)' }}>
      <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-sm)', fontWeight: 600, color: 'var(--tokis-text-primary)' }}>Dashboard</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--tokis-spacing-3)' }}>
        {[{ label: 'Deployments', value: '142' }, { label: 'Uptime', value: '99.9%' }, { label: 'Errors', value: '3' }, { label: 'Users', value: '2.4k' }].map(({ label, value }) => (
          <div key={label} style={{ background: 'var(--tokis-color-background)', border: '1px solid var(--tokis-color-border)', borderRadius: 'var(--tokis-radius-md)', padding: 'var(--tokis-spacing-3)' }}>
            <div style={{ fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)', marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 'var(--tokis-font-size-lg)', fontWeight: 700, color: 'var(--tokis-text-primary)' }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  ),
  projects: (
    <div style={{ padding: 'var(--tokis-spacing-5)', display: 'flex', flexDirection: 'column', gap: 'var(--tokis-spacing-2)' }}>
      <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-sm)', fontWeight: 600, color: 'var(--tokis-text-primary)', marginBottom: 8 }}>Projects</p>
      {['web-app', 'api-service', 'mobile-client', 'design-system'].map((name) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--tokis-spacing-2)', padding: '6px 0', fontSize: 'var(--tokis-font-size-xs)', borderBottom: '1px solid var(--tokis-color-border)' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--tokis-color-success)', flexShrink: 0 }} />
          <span style={{ flex: 1, color: 'var(--tokis-text-primary)', fontFamily: 'monospace' }}>{name}</span>
          <span style={{ color: 'var(--tokis-text-tertiary)' }}>Active</span>
        </div>
      ))}
    </div>
  ),
  team: (
    <div style={{ padding: 'var(--tokis-spacing-5)', display: 'flex', flexDirection: 'column', gap: 'var(--tokis-spacing-4)' }}>
      <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-sm)', fontWeight: 600, color: 'var(--tokis-text-primary)' }}>Team</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--tokis-spacing-3)' }}>
        {[{ name: 'Alex', role: 'Lead' }, { name: 'Blake', role: 'Dev' }, { name: 'Casey', role: 'Design' }, { name: 'Dana', role: 'QA' }].map(({ name, role }) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--tokis-color-primary-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--tokis-font-size-sm)', fontWeight: 700, color: 'var(--tokis-color-primary)' }}>{name[0]}</div>
            <span style={{ fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-primary)' }}>{name}</span>
            <span style={{ fontSize: 10, color: 'var(--tokis-text-tertiary)' }}>{role}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  settings: (
    <div style={{ padding: 'var(--tokis-spacing-5)', display: 'flex', flexDirection: 'column', gap: 'var(--tokis-spacing-3)' }}>
      <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-sm)', fontWeight: 600, color: 'var(--tokis-text-primary)' }}>Settings</p>
      {['Notifications', 'Billing', 'API Keys', 'Team permissions'].map((item) => (
        <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid var(--tokis-color-border)', fontSize: 'var(--tokis-font-size-xs)' }}>
          <span style={{ color: 'var(--tokis-text-primary)' }}>{item}</span>
          <span style={{ color: 'var(--tokis-color-primary)', cursor: 'pointer' }}>Edit →</span>
        </div>
      ))}
    </div>
  ),
};

export function NavigationRailPage() {
  const [value, setValue] = useState('dashboard');
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(false);

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Navigation</p>
        <h1 className="doc-page__title">Navigation Rail</h1>
        <p className="doc-page__desc">
          A compact vertical rail for app-level navigation, ideal for tablet and desktop
          layouts. Sits beside the main content area and supports optional header and footer
          slots for logos, actions, or help links.
        </p>
      </header>

      {/* Interactive Demo */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Demo</h2>
        <ComponentPreview
          code={`<NavigationRail
  items={[
    { value: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { value: 'projects', label: 'Projects', icon: <ProjectsIcon />, badge: 4 },
    { value: 'team', label: 'Team', icon: <TeamIcon /> },
    { value: 'settings', label: 'Settings', icon: <SettingsIcon /> },
  ]}
  value={value}
  onChange={setValue}${showHeader ? `\n  header={<LogoPlaceholder />}` : ''}${showFooter ? `\n  footer={<HelpButton />}` : ''}
/>`}
          controls={
            <>
              <DemoToggle label="Show Header" value={showHeader} onChange={setShowHeader} />
              <DemoToggle label="Show Footer" value={showFooter} onChange={setShowFooter} />
            </>
          }
          leftAlign
        >
          <div
            style={{
              height: 400,
              border: '1px solid var(--tokis-color-border)',
              borderRadius: 'var(--tokis-radius-lg)',
              overflow: 'hidden',
              display: 'flex',
            }}
          >
            <NavigationRail
              items={railItems}
              value={value}
              onChange={setValue}
              header={showHeader ? <LogoPlaceholder /> : undefined}
              footer={
                showFooter ? (
                  <button
                    type="button"
                    aria-label="Help"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 36,
                      height: 36,
                      border: '1px solid var(--tokis-color-border)',
                      borderRadius: 'var(--tokis-radius-md)',
                      background: 'transparent',
                      color: 'var(--tokis-text-secondary)',
                      cursor: 'pointer',
                    }}
                  >
                    <HelpIcon />
                  </button>
                ) : undefined
              }
            />
            <div
              style={{
                flex: 1,
                background: 'var(--tokis-color-surface)',
                overflow: 'auto',
              }}
            >
              {railContentPanels[value]}
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* With Header and Footer */}
      <div className="doc-section">
        <h2 className="doc-section__title">Header and Footer Slots</h2>
        <p className="doc-section__desc">
          Use the <code className="inline-code">header</code> slot for a logo or app icon,
          and the <code className="inline-code">footer</code> slot for secondary actions like
          help or account settings.
        </p>
        <ComponentPreview
          code={`<NavigationRail
  items={items}
  value={value}
  onChange={setValue}
  header={
    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--tokis-color-primary)' }}>
      S
    </div>
  }
  footer={
    <button aria-label="Help">
      <HelpIcon />
    </button>
  }
/>`}
          leftAlign
        >
          <div
            style={{
              height: 400,
              width: 72,
              border: '1px solid var(--tokis-color-border)',
              borderRadius: 'var(--tokis-radius-lg)',
              overflow: 'hidden',
            }}
          >
            <NavigationRail
              items={railItems}
              value={value}
              onChange={setValue}
              header={<LogoPlaceholder />}
              footer={
                <button
                  type="button"
                  aria-label="Help"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    border: '1px solid var(--tokis-color-border)',
                    borderRadius: 'var(--tokis-radius-md)',
                    background: 'transparent',
                    color: 'var(--tokis-text-secondary)',
                    cursor: 'pointer',
                  }}
                >
                  <HelpIcon />
                </button>
              }
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — NavigationRail</h2>
        <PropsTable props={navRailProps} />
      </div>
      <div className="doc-section">
        <h2 className="doc-section__title">Props — NavRailItem</h2>
        <PropsTable props={navRailItemProps} />
      </div>
    </>
  );
}
