import React from 'react';
import { NavButton } from '../../components/NavButton';
import { ButtonLabel, Badge, Stack, Alert } from '@tokis/react';
import { CodeBlock } from '../../components/CodeBlock';

const components = [
  { label: 'Dialog', path: '/docs/dialog', desc: 'Modal dialog with focus trap, scroll lock, and ARIA dialog pattern.' },
  { label: 'Confirm Dialog', path: '/docs/confirm-dialog', desc: 'Destructive-action confirmation dialog with cancel and confirm actions.' },
  { label: 'Drawer', path: '/docs/drawer', desc: 'Side panel that slides in from any edge. Full focus management and backdrop dismiss.' },
  { label: 'Tooltip', path: '/docs/tooltip', desc: 'Rich tooltip triggered on hover/focus. Auto-positions to stay in viewport.' },
  { label: 'Popover', path: '/docs/popover', desc: 'Rich overlay anchored to a trigger. Supports custom content, arrows, and positioning.' },
  { label: 'Hover Card', path: '/docs/hover-card', desc: 'Card that appears on hover after a delay. Used for rich preview content.' },
  { label: 'Context Menu', path: '/docs/context-menu', desc: 'Right-click / long-press menu with submenus and keyboard support.' },
  { label: 'Dropdown', path: '/docs/dropdown', desc: 'Triggered dropdown panel. Composable with any trigger element.' },
  { label: 'Command Palette', path: '/docs/command-palette', desc: 'Full-screen fuzzy-search command menu. Keyboard-first with grouping support.' },
];

export function OverlayOverviewPage() {
  return (
    <div className="doc-page">
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Overview</p>
        <h1 className="doc-page__title">Overlay</h1>
        <p className="doc-page__desc">
          Components that render on top of the page. Each one handles the complex challenges of
          focus management, scroll locking, z-index stacking, and keyboard dismissal that
          are easy to get wrong but critical for accessibility.
        </p>
      </header>

      <div className="doc-section">
        <h2 className="doc-section__title">Package</h2>
        <div className="section-pkg-row">
          <div className="section-pkg-badge-row">
            <code className="section-pkg-name">@tokis/react</code>
            <Badge variant="primary">All overlay components</Badge>
          </div>
          <div className="section-pkg-badge-row">
            <code className="section-pkg-name">@tokis/core</code>
            <Badge variant="warning">Focus trap (Dialog, Drawer, CommandPalette)</Badge>
          </div>
        </div>
        <CodeBlock language="tsx" code={`import { Dialog, DialogHeader, DialogBody, DialogFooter, Drawer, Tooltip, Popover } from '@tokis/react';`} />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Focus Management</h2>
        <p className="doc-section__desc">
          Modal overlays (Dialog, Drawer, CommandPalette) use <code>@tokis/core</code>'s focus trap
          to implement the WAI-ARIA modal pattern:
        </p>
        <CodeBlock language="tsx" code={`// When Dialog opens:
// 1. Focus moves to the first focusable element inside
// 2. Tab key cycles only within the dialog
// 3. Shift+Tab cycles backwards
// 4. Escape closes and returns focus to the trigger element

<Dialog open={open} onClose={() => setOpen(false)}>
  <DialogHeader>Confirm deletion</DialogHeader>
  <DialogBody>This action cannot be undone.</DialogBody>
  <DialogFooter>
    <ButtonRoot variant="ghost" onClick={() => setOpen(false)}>
      <ButtonLabel>Cancel</ButtonLabel>
    </ButtonRoot>
    <ButtonRoot variant="destructive" onClick={handleDelete}>
      <ButtonLabel>Delete</ButtonLabel>
    </ButtonRoot>
  </DialogFooter>
</Dialog>`} />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">All Overlay Components</h2>
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
        <NavButton to="/docs/dialog" variant="primary"><ButtonLabel>Dialog →</ButtonLabel></NavButton>
        <NavButton to="/docs/command-palette" variant="outline"><ButtonLabel>Command Palette</ButtonLabel></NavButton>
      </Stack>
    </div>
  );
}
