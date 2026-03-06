import React, { useState } from 'react';
import { Popover, ButtonRoot, ButtonLabel, Stack, Badge, Avatar } from '@tokis/react';
import { ComponentPreview } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const popoverProps: PropDef[] = [
  { name: 'trigger', type: 'ReactElement', required: true, description: 'Element that opens the popover on click.' },
  { name: 'content', type: 'ReactNode', required: true, description: 'Content displayed inside the popover panel.' },
  { name: 'title', type: 'ReactNode', description: 'Optional title shown at the top of the popover.' },
  { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'", default: "'bottom-start'", description: 'Preferred placement relative to the trigger.' },
  { name: 'open', type: 'boolean', description: 'Controlled open state. When provided, the popover becomes fully controlled.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial open state for uncontrolled usage.' },
  { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when the popover opens or closes.' },
  { name: 'closeOnClickOutside', type: 'boolean', default: 'true', description: 'Close when clicking outside the popover.' },
  { name: 'closeOnEsc', type: 'boolean', default: 'true', description: 'Close when pressing Escape.' },
];

const SettingsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.9 2.9l1.1 1.1M10 10l1.1 1.1M2.9 11.1L4 10M10 4l1.1-1.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M1.5 12.5c0-2.761 2.462-5 5.5-5s5.5 2.239 5.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export function PopoverPage() {
  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Overlay</p>
        <h1 className="doc-page__title">Popover</h1>
        <p className="doc-page__desc">
          Rich content panels triggered on click. Unlike a Tooltip, Popovers can contain interactive
          elements like buttons, forms, and links. Renders into a Portal and closes on outside click.
        </p>
      </header>

      {/* Basic */}
      <div className="doc-section">
        <h2 className="doc-section__title">Basic Popover</h2>
        <p className="doc-section__desc">
          Click the trigger to open. Closes on outside click or Escape.
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
    <Stack gap={3}>
      <p>Choose an action to perform on the selected item.</p>
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
/>`}
        >
          <div style={{ padding: 40 }}>
            <Popover
              trigger={
                <ButtonRoot variant="outline">
                  <ButtonLabel>Open Popover</ButtonLabel>
                </ButtonRoot>
              }
              title="Quick actions"
              content={
                <Stack gap={3}>
                  <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>
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
          </div>
        </ComponentPreview>
      </div>

      {/* Settings popover */}
      <div className="doc-section">
        <h2 className="doc-section__title">Settings Popover</h2>
        <ComponentPreview
          code={`<Popover
  trigger={
    <ButtonRoot variant="ghost" iconOnly aria-label="Settings">
      <SettingsIcon />
    </ButtonRoot>
  }
  title="Preferences"
  content={...}
/>`}
        >
          <Stack direction="row" gap={4} style={{ padding: 40 }}>
            <Popover
              trigger={
                <ButtonRoot variant="ghost" iconOnly aria-label="Settings">
                  <SettingsIcon />
                </ButtonRoot>
              }
              title="Preferences"
              content={
                <Stack gap={3}>
                  <div style={{ fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>
                    Customize your workspace preferences.
                  </div>
                  <Stack gap={2}>
                    {['Compact mode', 'Show tooltips', 'Auto-save'].map((pref) => (
                      <div
                        key={pref}
                        style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                          fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-primary)',
                        }}
                      >
                        <span>{pref}</span>
                        <Badge variant="default">Off</Badge>
                      </div>
                    ))}
                  </Stack>
                </Stack>
              }
            />

            <Popover
              trigger={
                <ButtonRoot variant="ghost" iconOnly aria-label="User profile">
                  <UserIcon />
                </ButtonRoot>
              }
              title="Your profile"
              content={
                <Stack gap={3}>
                  <Stack direction="row" gap={3} align="center">
                    <Avatar name="Jordan Lee" size="md" />
                    <Stack gap={0}>
                      <div style={{ fontWeight: 'var(--tokis-font-weight-semibold)', fontSize: 'var(--tokis-font-size-sm)' }}>
                        Jordan Lee
                      </div>
                      <div style={{ fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)' }}>
                        jordan@example.com
                      </div>
                    </Stack>
                  </Stack>
                  <Stack direction="row" gap={2}>
                    <Badge variant="primary">Admin</Badge>
                    <Badge variant="success" dot>Online</Badge>
                  </Stack>
                  <ButtonRoot variant="ghost" size="sm">
                    <ButtonLabel>View profile →</ButtonLabel>
                  </ButtonRoot>
                </Stack>
              }
            />
          </Stack>
        </ComponentPreview>
      </div>

      {/* Use cases */}
      <div className="doc-section">
        <h2 className="doc-section__title">When to use Popover vs Tooltip</h2>
        <p className="doc-section__desc">
          Use <strong>Tooltip</strong> for short, non-interactive hints shown on hover.
          Use <strong>Popover</strong> when you need interactive content (buttons, forms, links),
          longer descriptions, or content shown on click.
        </p>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={popoverProps} />
      </div>
    </>
  );
}
