import React from 'react';
import { NavButton } from '../../components/NavButton';
import { ButtonLabel, Badge, Stack } from '@tokis/react';
import { CodeBlock } from '../../components/CodeBlock';

const components = [
  { label: 'App Bar', path: '/docs/app-bar', desc: 'Top application bar with logo, actions, and optional search. Sticky and scroll-aware variants.' },
  { label: 'Breadcrumbs', path: '/docs/breadcrumbs', desc: 'Hierarchical page trail. Supports custom separators, overflow collapse, and click handlers.' },
  { label: 'Tabs', path: '/docs/tabs', desc: 'Tab strip with full keyboard navigation (arrow keys). Controlled and uncontrolled modes.' },
  { label: 'Menu', path: '/docs/menu', desc: 'Dropdown menu list with optional icons, keyboard shortcut hints, and submenu support.' },
  { label: 'Stepper', path: '/docs/stepper', desc: 'Multi-step wizard indicator. Linear and non-linear modes, horizontal and vertical layouts.' },
  { label: 'Bottom Navigation', path: '/docs/bottom-nav', desc: 'Mobile-first bottom tab bar. Touch-friendly with badge support.' },
  { label: 'Navigation Rail', path: '/docs/nav-rail', desc: 'Vertical side navigation for medium-screen layouts. Collapses to icon-only mode.' },
];

export function NavigationOverviewPage() {
  return (
    <div className="doc-page">
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Overview</p>
        <h1 className="doc-page__title">Navigation</h1>
        <p className="doc-page__desc">
          Navigation components that guide users through your application. All components implement
          the correct ARIA landmark roles and keyboard navigation patterns defined in the
          ARIA Authoring Practices Guide.
        </p>
      </header>

      <div className="doc-section">
        <h2 className="doc-section__title">Package</h2>
        <div className="section-pkg-row">
          <div className="section-pkg-badge-row">
            <code className="section-pkg-name">@tokis/react</code>
            <Badge variant="primary">All navigation components</Badge>
          </div>
          <div className="section-pkg-badge-row">
            <code className="section-pkg-name">@tokis/core</code>
            <Badge variant="default">Roving tabindex for Tabs, Menu keyboard handling</Badge>
          </div>
        </div>
        <CodeBlock language="tsx" code={`import { Tabs, TabList, Tab, TabPanel, Breadcrumbs, Menu, AppBar } from '@tokis/react';`} />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Keyboard Navigation</h2>
        <p className="doc-section__desc">
          All navigation components follow ARIA patterns for keyboard interaction:
        </p>
        <div className="section-keyboard-table">
          {[
            { component: 'Tabs', keys: 'Arrow Left/Right to switch, Home/End for first/last' },
            { component: 'Menu', keys: 'Arrow Up/Down to navigate, Enter to select, Esc to close' },
            { component: 'Breadcrumbs', keys: 'Tab to navigate links, Enter to follow' },
            { component: 'Stepper', keys: 'Tab through steps, Enter/Space to activate' },
          ].map((row) => (
            <div key={row.component} className="section-keyboard-row">
              <code>{row.component}</code>
              <span>{row.keys}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">All Navigation Components</h2>
        <div className="section-component-list">
          {components.map((c) => (
            <NavButton key={c.path} to={c.path} variant="ghost" className="section-nav-card">
              <div>
                <div className="section-nav-card__label">{c.label}</div>
                <div className="section-nav-card__desc">{c.desc}</div>
              </div>
            </NavButton>
          ))}
        </div>
      </div>

      <Stack direction="row" gap={3} style={{ marginTop: 'var(--tokis-spacing-8)' }}>
        <NavButton to="/docs/tabs" variant="primary"><ButtonLabel>Tabs →</ButtonLabel></NavButton>
        <NavButton to="/docs/app-bar" variant="outline"><ButtonLabel>App Bar</ButtonLabel></NavButton>
      </Stack>
    </div>
  );
}
