import React, { useState } from 'react';
import { Tooltip, Popover, Menu, ButtonRoot, ButtonLabel, Stack, Badge, Card, CardBody } from '@synu/react';
import { ComponentPreview, DemoControl } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';
import { CodeBlock } from '../../components/CodeBlock';

const tooltipProps: PropDef[] = [
  { name: 'content', type: 'ReactNode', required: true, description: 'Tooltip text or content.' },
  { name: 'children', type: 'ReactElement', required: true, description: 'Trigger element. Must accept ref and event handlers.' },
  { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Preferred placement.' },
  { name: 'delay', type: 'number', default: '300', description: 'Delay in ms before showing the tooltip.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents the tooltip from showing.' },
];

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 4h10M5 4V2h4v2M12 4l-1 8H3L2 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CopyIcon2 = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M10 4V2.5A1.5 1.5 0 0 0 8.5 1h-6A1.5 1.5 0 0 0 1 2.5v6A1.5 1.5 0 0 0 2.5 10H4" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

export function TooltipPage() {
  const [placement, setPlacement] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Overlay</p>
        <h1 className="doc-page__title">Tooltip, Popover & Menu</h1>
        <p className="doc-page__desc">
          Positioned overlays rendered into a Portal. Tooltip shows contextual hints on hover,
          Popover shows rich content on click, Menu provides keyboard-navigable action lists.
        </p>
      </header>

      {/* Tooltip */}
      <div className="doc-section">
        <h2 className="doc-section__title">Tooltip</h2>
        <p className="doc-section__desc">
          Appears on hover after a configurable delay. Positions relative to the trigger and
          renders into a Portal to avoid clipping.
        </p>
        <ComponentPreview
          code={`<Tooltip content="Save your changes" placement="${placement}">
  <ButtonRoot variant="primary">
    <ButtonLabel>Hover me</ButtonLabel>
  </ButtonRoot>
</Tooltip>`}
          controls={
            <DemoControl
              label="Placement"
              options={['top', 'bottom', 'left', 'right']}
              value={placement}
              onChange={(v) => setPlacement(v as typeof placement)}
            />
          }
        >
          <div style={{ padding: 40 }}>
            <Tooltip content="Save your changes to continue" placement={placement}>
              <ButtonRoot variant="primary">
                <ButtonLabel>Hover me</ButtonLabel>
              </ButtonRoot>
            </Tooltip>
          </div>
        </ComponentPreview>
      </div>

      {/* Multiple tooltips */}
      <div className="doc-section">
        <h2 className="doc-section__title">Icon Tooltips</h2>
        <ComponentPreview
          code={`<Stack direction="row" gap={2}>
  <Tooltip content="Edit item">
    <ButtonRoot variant="ghost" iconOnly aria-label="Edit">
      <EditIcon />
    </ButtonRoot>
  </Tooltip>
  <Tooltip content="Copy to clipboard">
    <ButtonRoot variant="ghost" iconOnly aria-label="Copy">
      <CopyIcon />
    </ButtonRoot>
  </Tooltip>
  <Tooltip content="Delete — cannot be undone" placement="bottom">
    <ButtonRoot variant="ghost" iconOnly aria-label="Delete">
      <DeleteIcon />
    </ButtonRoot>
  </Tooltip>
</Stack>`}
        >
          <Stack direction="row" gap={2}>
            <Tooltip content="Edit item">
              <ButtonRoot variant="ghost" iconOnly aria-label="Edit">
                <EditIcon />
              </ButtonRoot>
            </Tooltip>
            <Tooltip content="Copy to clipboard">
              <ButtonRoot variant="ghost" iconOnly aria-label="Copy">
                <CopyIcon2 />
              </ButtonRoot>
            </Tooltip>
            <Tooltip content="Delete — cannot be undone" placement="bottom">
              <ButtonRoot variant="ghost" iconOnly aria-label="Delete">
                <DeleteIcon />
              </ButtonRoot>
            </Tooltip>
          </Stack>
        </ComponentPreview>
      </div>

      {/* Popover */}
      <div className="doc-section">
        <h2 className="doc-section__title">Popover</h2>
        <p className="doc-section__desc">
          Rich content triggered on click. Closes on outside click (configurable).
          Can show a title and custom content.
        </p>
        <ComponentPreview
          code={`<Popover
  trigger={
    <ButtonRoot variant="outline">
      <ButtonLabel>Open Popover</ButtonLabel>
    </ButtonRoot>
  }
  title="Quick actions"
  content={
    <Stack gap={2}>
      <p>Choose an action to perform on the selected item.</p>
      <Stack direction="row" gap={2}>
        <ButtonRoot size="sm" variant="primary"><ButtonLabel>Publish</ButtonLabel></ButtonRoot>
        <ButtonRoot size="sm" variant="ghost"><ButtonLabel>Draft</ButtonLabel></ButtonRoot>
      </Stack>
    </Stack>
  }
/>`}
        >
          <Popover
            trigger={
              <ButtonRoot variant="outline">
                <ButtonLabel>Open Popover</ButtonLabel>
              </ButtonRoot>
            }
            title="Quick actions"
            content={
              <Stack gap={3}>
                <p style={{ margin: 0, fontSize: 'var(--synu-font-size-sm)', color: 'var(--synu-text-secondary)' }}>
                  Choose an action to perform on the selected items.
                </p>
                <Stack direction="row" gap={2}>
                  <ButtonRoot size="sm" variant="primary">
                    <ButtonLabel>Publish</ButtonLabel>
                  </ButtonRoot>
                  <ButtonRoot size="sm" variant="ghost">
                    <ButtonLabel>Save draft</ButtonLabel>
                  </ButtonRoot>
                </Stack>
              </Stack>
            }
          />
        </ComponentPreview>
      </div>

      {/* Menu */}
      <div className="doc-section">
        <h2 className="doc-section__title">Menu</h2>
        <p className="doc-section__desc">
          A keyboard-navigable dropdown menu. Supports grouped items, shortcuts, icons, separators,
          and destructive actions. Implements the WAI-ARIA Menu Button Pattern.
        </p>
        <ComponentPreview
          code={`<Menu
  trigger={
    <ButtonRoot variant="outline">
      <ButtonLabel>Actions ▾</ButtonLabel>
    </ButtonRoot>
  }
  items={[
    { type: 'group', label: 'File' },
    { type: 'item', label: 'New file', shortcut: '⌘N' },
    { type: 'item', label: 'Open...', shortcut: '⌘O' },
    { type: 'item', label: 'Save', shortcut: '⌘S' },
    { type: 'separator' },
    { type: 'group', label: 'Danger zone' },
    { type: 'item', label: 'Delete file', destructive: true },
  ]}
/>`}
        >
          <Stack direction="row" gap={4}>
            <Menu
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
            />
            <Menu
              trigger={
                <ButtonRoot variant="ghost" iconOnly aria-label="More options">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <circle cx="8" cy="3" r="1.5" />
                    <circle cx="8" cy="8" r="1.5" />
                    <circle cx="8" cy="13" r="1.5" />
                  </svg>
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
          </Stack>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — Tooltip</h2>
        <PropsTable props={tooltipProps} />
      </div>
    </>
  );
}
