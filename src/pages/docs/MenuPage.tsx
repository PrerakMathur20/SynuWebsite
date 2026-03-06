import React from 'react';
import { Menu, ButtonRoot, ButtonLabel, Stack } from '@tokis/react';
import { ComponentPreview } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const menuProps: PropDef[] = [
  { name: 'trigger', type: 'ReactElement', required: true, description: 'Element that opens the menu on click.' },
  { name: 'items', type: 'MenuItem[]', required: true, description: 'Array of menu items, separators, and labels.' },
  { name: 'placement', type: "'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'", default: "'bottom-start'", description: 'Preferred placement relative to the trigger.' },
  { name: 'className', type: 'string', description: 'Additional class name applied to the menu panel.' },
];

const menuItemProps: PropDef[] = [
  { name: 'type', type: "'item' | 'separator' | 'label'", description: 'The kind of menu entry. Defaults to item if omitted.' },
  { name: 'label', type: 'ReactNode', description: 'Display text. Required for item and label types.' },
  { name: 'onClick', type: '() => void', description: 'Handler called when the item is selected.' },
  { name: 'shortcut', type: 'string', description: 'Keyboard shortcut hint displayed on the right.' },
  { name: 'destructive', type: 'boolean', description: 'Applies destructive (red) styling.' },
  { name: 'disabled', type: 'boolean', description: 'Prevents interaction.' },
  { name: 'icon', type: 'ReactNode', description: 'Icon displayed before the label.' },
  { name: 'items', type: 'MenuItem[]', description: 'Nested sub-menu items. Renders as a submenu on hover.' },
];

const DotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <circle cx="8" cy="3" r="1.5" />
    <circle cx="8" cy="8" r="1.5" />
    <circle cx="8" cy="13" r="1.5" />
  </svg>
);

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function MenuPage() {
  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Overlay</p>
        <h1 className="doc-page__title">Menu</h1>
        <p className="doc-page__desc">
          A keyboard-navigable dropdown menu implementing the WAI-ARIA Menu Button Pattern.
          Supports grouped items, shortcuts, icons, separators, and destructive actions.
        </p>
      </header>

      {/* Basic */}
      <div className="doc-section">
        <h2 className="doc-section__title">Basic Menu</h2>
        <p className="doc-section__desc">
          Arrow keys navigate items. Enter/Space selects. Escape closes. Tab moves focus out.
        </p>
        <ComponentPreview
          code={`<Menu
  trigger={
    <ButtonRoot variant="outline">
      <ButtonLabel>Actions ▾</ButtonLabel>
    </ButtonRoot>
  }
  items={[
    { type: 'label', label: 'File' },
    { type: 'item', label: 'New file', shortcut: '⌘N', onClick: () => {} },
    { type: 'item', label: 'Open…', shortcut: '⌘O', onClick: () => {} },
    { type: 'item', label: 'Save', shortcut: '⌘S', onClick: () => {} },
    { type: 'separator' },
    { type: 'label', label: 'Danger zone' },
    { type: 'item', label: 'Delete file', destructive: true, onClick: () => {} },
  ]}
/>`}
        >
          <div style={{ padding: 40 }}>
            <Menu
              trigger={
                <ButtonRoot variant="outline">
                  <ButtonLabel>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      Actions <ChevronIcon />
                    </span>
                  </ButtonLabel>
                </ButtonRoot>
              }
              items={[
                { type: 'label', label: 'File' },
                { type: 'item', label: 'New file', shortcut: '⌘N', onClick: () => {} },
                { type: 'item', label: 'Open…', shortcut: '⌘O', onClick: () => {} },
                { type: 'item', label: 'Save', shortcut: '⌘S', onClick: () => {} },
                { type: 'separator' },
                { type: 'label', label: 'Danger zone' },
                { type: 'item', label: 'Delete file', destructive: true, onClick: () => {} },
              ]}
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Context menu (3-dot) */}
      <div className="doc-section">
        <h2 className="doc-section__title">Context Menu (Three-dot)</h2>
        <p className="doc-section__desc">
          A common pattern — a compact icon button that reveals contextual actions.
        </p>
        <ComponentPreview
          code={`<Menu
  trigger={
    <ButtonRoot variant="ghost" iconOnly aria-label="More options">
      <DotsIcon />
    </ButtonRoot>
  }
  items={[
    { type: 'item', label: 'Edit', onClick: () => {} },
    { type: 'item', label: 'Duplicate', onClick: () => {} },
    { type: 'item', label: 'Archive', onClick: () => {} },
    { type: 'separator' },
    { type: 'item', label: 'Delete', destructive: true, onClick: () => {} },
  ]}
/>`}
        >
          <Stack direction="row" gap={4} style={{ padding: 40 }}>
            {['Project Alpha', 'Project Beta', 'Project Gamma'].map((project) => (
              <div
                key={project}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 14px',
                  border: '1px solid var(--tokis-color-border)',
                  borderRadius: 'var(--tokis-radius-lg)',
                  background: 'var(--tokis-color-surface)',
                  fontSize: 'var(--tokis-font-size-sm)',
                  color: 'var(--tokis-text-primary)',
                  fontWeight: 'var(--tokis-font-weight-medium)',
                  minWidth: 160,
                }}
              >
                <span style={{ flex: 1 }}>{project}</span>
                <Menu
                  trigger={
                    <ButtonRoot variant="ghost" iconOnly aria-label={`More options for ${project}`}>
                      <DotsIcon />
                    </ButtonRoot>
                  }
                  items={[
                    { type: 'item', label: 'Edit', onClick: () => {} },
                    { type: 'item', label: 'Duplicate', onClick: () => {} },
                    { type: 'item', label: 'Archive', onClick: () => {} },
                    { type: 'separator' },
                    { type: 'item', label: 'Delete', destructive: true, onClick: () => {} },
                  ]}
                />
              </div>
            ))}
          </Stack>
        </ComponentPreview>
      </div>

      {/* Keyboard Navigation */}
      <div className="doc-section">
        <h2 className="doc-section__title">Keyboard Navigation</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--tokis-spacing-4)', fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>
          {[
            ['Enter / Space', 'Open menu, select item'],
            ['↑ / ↓', 'Navigate between items'],
            ['Home / End', 'Jump to first / last item'],
            ['Escape', 'Close menu, return focus to trigger'],
            ['Tab', 'Close menu and move to next focusable'],
            ['Type a letter', 'Jump to item starting with that letter'],
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

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — Menu</h2>
        <PropsTable props={menuProps} />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Props — MenuItem</h2>
        <PropsTable props={menuItemProps} />
      </div>
    </>
  );
}
