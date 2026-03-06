import React, { useState } from 'react';
import { ContextMenu } from '@tokis/react';
import { ComponentPreview } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const contextMenuProps: PropDef[] = [
  { name: 'items', type: 'ContextMenuItem[]', required: true, description: 'Array of menu items, separators, and labels.' },
  { name: 'children', type: 'ReactElement', required: true, description: 'The trigger area. Right-clicking this element opens the menu.' },
  { name: 'className', type: 'string', description: 'Additional class name applied to the trigger wrapper.' },
];

const contextMenuItemProps: PropDef[] = [
  { name: 'type', type: "'item' | 'separator' | 'label'", required: true, description: 'The kind of menu entry.' },
  { name: 'label', type: 'string', description: 'Display text. Required for item and label types.' },
  { name: 'icon', type: 'ReactNode', description: 'Icon element displayed before the label.' },
  { name: 'onClick', type: '() => void', description: 'Handler called when the item is selected.' },
  { name: 'disabled', type: 'boolean', description: 'Prevents interaction with this item.' },
  { name: 'destructive', type: 'boolean', description: 'Applies destructive (red) styling for dangerous actions like delete.' },
];

const CopyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M10 4V2.5A1.5 1.5 0 0 0 8.5 1h-6A1.5 1.5 0 0 0 1 2.5v6A1.5 1.5 0 0 0 2.5 10H4" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const CutIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="4" cy="11" r="1.8" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="10" cy="11" r="1.8" stroke="currentColor" strokeWidth="1.3" />
    <path d="M4 9.2L8 5M10 9.2L6 5M7 1v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const PasteIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="2" y="4" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M5 4V2.5A1.5 1.5 0 0 1 6.5 1h1A1.5 1.5 0 0 1 9 2.5V4" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const RenameIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 4h10M5 4V2h4v2M12 4l-1 8H3L2 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PropertiesIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M7 6v4M7 4.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export function ContextMenuPage() {
  const [lastAction, setLastAction] = useState<string | null>(null);

  const items = [
    { type: 'label' as const, label: 'File' },
    { type: 'item' as const, label: 'Copy', icon: <CopyIcon />, onClick: () => setLastAction('Copy') },
    { type: 'item' as const, label: 'Cut', icon: <CutIcon />, onClick: () => setLastAction('Cut') },
    { type: 'item' as const, label: 'Paste', icon: <PasteIcon />, onClick: () => setLastAction('Paste') },
    { type: 'separator' as const },
    { type: 'label' as const, label: 'Actions' },
    { type: 'item' as const, label: 'Rename', icon: <RenameIcon />, onClick: () => setLastAction('Rename') },
    { type: 'item' as const, label: 'Delete', icon: <DeleteIcon />, onClick: () => setLastAction('Delete') },
    { type: 'separator' as const },
    { type: 'item' as const, label: 'Properties', icon: <PropertiesIcon />, onClick: () => setLastAction('Properties') },
  ];

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Overlay</p>
        <h1 className="doc-page__title">Context Menu</h1>
        <p className="doc-page__desc">
          A menu that appears on right-click (or long-press on touch devices). Provides contextual
          actions relevant to the element that was interacted with. Follows WAI-ARIA Menu patterns
          and supports keyboard navigation.
        </p>
      </header>

      {/* Demo */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Demo</h2>
        <p className="doc-section__desc">
          Right-click inside the zone below to open the context menu.
        </p>
        <ComponentPreview
          code={`<ContextMenu
  items={[
    { type: 'label', label: 'File' },
    { type: 'item', label: 'Copy', icon: <CopyIcon />, onClick: () => {} },
    { type: 'item', label: 'Cut', icon: <CutIcon />, onClick: () => {} },
    { type: 'item', label: 'Paste', icon: <PasteIcon />, onClick: () => {} },
    { type: 'separator' },
    { type: 'label', label: 'Actions' },
    { type: 'item', label: 'Rename', icon: <RenameIcon />, onClick: () => {} },
    { type: 'item', label: 'Delete', icon: <DeleteIcon />, onClick: () => {} },
    { type: 'separator' },
    { type: 'item', label: 'Properties', icon: <PropertiesIcon />, onClick: () => {} },
  ]}
>
  <div className="right-click-zone">
    Right-click anywhere in this area
  </div>
</ContextMenu>`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', padding: '8px 0' }}>
            <ContextMenu items={items}>
              <div
                style={{
                  width: '100%',
                  maxWidth: 480,
                  height: 160,
                  border: '2px dashed var(--tokis-color-border)',
                  borderRadius: 'var(--tokis-radius-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  cursor: 'context-menu',
                  userSelect: 'none',
                  color: 'var(--tokis-text-tertiary)',
                  fontSize: 'var(--tokis-font-size-sm)',
                  background: 'var(--tokis-color-surface)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ opacity: 0.4 }}>
                  <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M7 10h6M10 7v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span>Right-click zone</span>
                <span style={{ fontSize: 'var(--tokis-font-size-xs)', opacity: 0.7 }}>Right-click or long-press to open the menu</span>
              </div>
            </ContextMenu>

            {lastAction && (
              <div
                style={{
                  fontSize: 'var(--tokis-font-size-sm)',
                  color: 'var(--tokis-text-secondary)',
                  padding: '6px 14px',
                  borderRadius: 'var(--tokis-radius-full)',
                  background: 'var(--tokis-color-surface)',
                  border: '1px solid var(--tokis-color-border)',
                }}
              >
                Last action: <strong style={{ color: 'var(--tokis-text-primary)' }}>{lastAction}</strong>
              </div>
            )}
          </div>
        </ComponentPreview>
      </div>

      {/* Usage */}
      <div className="doc-section">
        <h2 className="doc-section__title">Usage</h2>
        <p className="doc-section__desc">
          Wrap any element with <code>ContextMenu</code> to make it right-click-aware. The trigger area
          should have a visual affordance (like a dashed border) so users know it's interactive.
          Items follow the same shape as <code>Menu</code> items — use <code>type: 'label'</code> to
          create group headings and <code>type: 'separator'</code> for dividers.
        </p>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — ContextMenu</h2>
        <PropsTable props={contextMenuProps} />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Props — ContextMenuItem</h2>
        <PropsTable props={contextMenuItemProps} />
      </div>
    </>
  );
}
