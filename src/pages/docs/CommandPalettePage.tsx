import React, { useState, useEffect } from 'react';
import { CommandPalette, ButtonRoot, ButtonLabel } from '@tokis/react';
import { ComponentPreview } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const commandPaletteProps: PropDef[] = [
  { name: 'open', type: 'boolean', required: true, description: 'Whether the command palette is currently open.' },
  { name: 'onClose', type: '() => void', required: true, description: 'Called when the palette should close (Escape, backdrop click, or item selection).' },
  { name: 'items', type: 'CommandItem[]', required: true, description: 'Array of command items available in the palette.' },
  { name: 'placeholder', type: 'string', description: 'Placeholder text shown in the search input.' },
  { name: 'className', type: 'string', description: 'Additional class name applied to the palette container.' },
];

const commandItemProps: PropDef[] = [
  { name: 'id', type: 'string', required: true, description: 'Unique identifier for the item.' },
  { name: 'label', type: 'string', required: true, description: 'Display name shown in the list.' },
  { name: 'description', type: 'string', description: 'Optional secondary text shown below the label.' },
  { name: 'shortcut', type: 'string[]', description: 'Array of key strings displayed as a keyboard shortcut hint.' },
  { name: 'category', type: 'string', description: 'Category name. Items with the same category are listed together under a heading.' },
  { name: 'icon', type: 'ReactNode', description: 'Icon element displayed before the label.' },
  { name: 'onSelect', type: '() => void', required: true, description: 'Called when this item is selected by click or keyboard Enter.' },
];

const DashboardIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
    <rect x="8" y="1" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
    <rect x="1" y="8" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
    <rect x="8" y="8" width="5" height="5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.9 2.9l1.1 1.1M10 10l1.1 1.1M2.9 11.1L4 10M10 4l1.1-1.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const DocsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 1.5h8A1.5 1.5 0 0 1 12.5 3v8A1.5 1.5 0 0 1 11 12.5H3A1.5 1.5 0 0 1 1.5 11V3A1.5 1.5 0 0 1 3 1.5z" stroke="currentColor" strokeWidth="1.3" />
    <path d="M4 5h6M4 7.5h6M4 10h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const DeployIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 1l1.8 4.5H13l-3.9 2.8 1.5 4.7L7 10.3 3.4 13l1.5-4.7L1 5.5h4.2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

const LinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M5.5 7a3.5 3.5 0 0 0 5 0l1.5-1.5a3.5 3.5 0 0 0-5-5L5.5 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M8.5 7a3.5 3.5 0 0 0-5 0L2 8.5a3.5 3.5 0 0 0 5 5L8.5 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const SignOutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M9.5 4.5L12.5 7l-3 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.5 7H5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M5.5 2H2.5A1.5 1.5 0 0 0 1 3.5v7A1.5 1.5 0 0 0 2.5 12H5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const KbdIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 3l5 4.5L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 7.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export function CommandPalettePage() {
  const [open, setOpen] = useState(false);
  const [lastCommand, setLastCommand] = useState<string | null>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  function handleSelect(label: string) {
    setLastCommand(label);
    setOpen(false);
  }

  const items = [
    // Navigation group
    {
      id: 'nav-dashboard',
      label: 'Go to Dashboard',
      description: 'Open the main dashboard overview',
      category: 'Navigation',
      icon: <DashboardIcon />,
      shortcut: ['G', 'D'],
      onSelect: () => handleSelect('Go to Dashboard'),
    },
    {
      id: 'nav-settings',
      label: 'Go to Settings',
      description: 'Manage your account and workspace settings',
      category: 'Navigation',
      icon: <SettingsIcon />,
      shortcut: ['G', 'S'],
      onSelect: () => handleSelect('Go to Settings'),
    },
    {
      id: 'nav-docs',
      label: 'Go to Docs',
      description: 'Browse the component documentation',
      category: 'Navigation',
      icon: <DocsIcon />,
      shortcut: ['G', 'D', 'C'],
      onSelect: () => handleSelect('Go to Docs'),
    },
    // Actions group
    {
      id: 'action-new-project',
      label: 'New Project',
      description: 'Create a new workspace project',
      category: 'Actions',
      icon: <PlusIcon />,
      shortcut: ['⌘', 'N'],
      onSelect: () => handleSelect('New Project'),
    },
    {
      id: 'action-deploy',
      label: 'Deploy',
      description: 'Deploy the current project to production',
      category: 'Actions',
      icon: <DeployIcon />,
      shortcut: ['⌘', 'D'],
      onSelect: () => handleSelect('Deploy'),
    },
    {
      id: 'action-copy-link',
      label: 'Copy Link',
      description: 'Copy the current page URL to clipboard',
      category: 'Actions',
      icon: <LinkIcon />,
      shortcut: ['⌘', 'Shift', 'C'],
      onSelect: () => handleSelect('Copy Link'),
    },
    {
      id: 'action-sign-out',
      label: 'Sign Out',
      description: 'Sign out of your account',
      category: 'Actions',
      icon: <SignOutIcon />,
      onSelect: () => handleSelect('Sign Out'),
    },
  ];

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Overlay</p>
        <h1 className="doc-page__title">Command Palette</h1>
        <p className="doc-page__desc">
          A searchable overlay for quickly accessing commands, navigation, and actions. Inspired by
          VS Code and Linear's command palette. Supports grouped items, keyboard shortcuts, icons,
          and fuzzy filtering. Typically opened with <kbd>⌘K</kbd>.
        </p>
      </header>

      {/* Main demo */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Demo</h2>
        <p className="doc-section__desc">
          Click the button or press <kbd>⌘K</kbd> to open the palette. Type to filter commands.
          Use arrow keys to navigate and Enter to select.
        </p>
        <ComponentPreview
          code={`const [open, setOpen] = useState(false);
const [lastCommand, setLastCommand] = useState(null);

// Open on ⌘K
useEffect(() => {
  function onKeyDown(e) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setOpen(true);
    }
  }
  window.addEventListener('keydown', onKeyDown);
  return () => window.removeEventListener('keydown', onKeyDown);
}, []);

<ButtonRoot variant="outline" onClick={() => setOpen(true)}>
  <ButtonLabel>Open Command Palette (⌘K)</ButtonLabel>
</ButtonRoot>

<CommandPalette
  open={open}
  onClose={() => setOpen(false)}
  placeholder="Type a command or search…"
  items={[
    {
      id: 'nav-dashboard',
      label: 'Go to Dashboard',
      category: 'Navigation',
      icon: <DashboardIcon />,
      shortcut: ['G', 'D'],
      onSelect: () => { setLastCommand('Go to Dashboard'); setOpen(false); },
    },
    // … more items
  ]}
/>`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '8px 0' }}>
            <ButtonRoot variant="outline" onClick={() => setOpen(true)}>
              <ButtonLabel>
                Open Command Palette{' '}
                <span style={{ marginLeft: 8, display: 'inline-flex', gap: 2 }}>
                  {['⌘', 'K'].map((k) => (
                    <kbd
                      key={k}
                      style={{
                        fontFamily: 'var(--tokis-font-family-mono)',
                        fontSize: 'var(--tokis-font-size-xs)',
                        background: 'var(--tokis-color-surface)',
                        border: '1px solid var(--tokis-color-border)',
                        borderRadius: 'var(--tokis-radius-sm)',
                        padding: '1px 5px',
                        color: 'var(--tokis-text-secondary)',
                      }}
                    >
                      {k}
                    </kbd>
                  ))}
                </span>
              </ButtonLabel>
            </ButtonRoot>

            {lastCommand && (
              <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>
                Last command:{' '}
                <strong style={{ color: 'var(--tokis-text-primary)' }}>{lastCommand}</strong>
              </p>
            )}

            <CommandPalette
              open={open}
              onClose={() => setOpen(false)}
              placeholder="Type a command or search…"
              items={items}
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Keyboard navigation */}
      <div className="doc-section">
        <h2 className="doc-section__title">Keyboard Navigation</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--tokis-spacing-4)', fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>
          {[
            ['⌘K / Ctrl+K', 'Open the palette'],
            ['Type', 'Filter commands'],
            ['↑ / ↓', 'Navigate items'],
            ['Enter', 'Select the focused item'],
            ['Escape', 'Close the palette'],
            ['Tab', 'Move focus without selecting'],
          ].map(([key, desc]) => (
            <div key={key} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <code style={{
                fontFamily: 'var(--tokis-font-family-mono)',
                fontSize: 'var(--tokis-font-size-xs)',
                background: 'var(--tokis-color-surface)',
                border: '1px solid var(--tokis-color-border)',
                borderRadius: 'var(--tokis-radius-sm)',
                padding: '2px 6px',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                color: 'var(--tokis-text-primary)',
              }}>
                {key}
              </code>
              <span>{desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Props — CommandPalette */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — CommandPalette</h2>
        <PropsTable props={commandPaletteProps} />
      </div>

      {/* Props — CommandItem */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — CommandItem</h2>
        <PropsTable props={commandItemProps} />
      </div>
    </>
  );
}
