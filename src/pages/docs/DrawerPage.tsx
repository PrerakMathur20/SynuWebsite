import React, { useState } from 'react';
import {
  Drawer,
  ButtonRoot, ButtonLabel,
  Stack,
  TextField,
  Select,
  Badge,
  Checkbox,
} from '@tokis/react';
import { ComponentPreview, DemoControl } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const drawerProps: PropDef[] = [
  { name: 'open', type: 'boolean', required: true, description: 'Controls visibility. Manages aria-modal and body scroll locking.' },
  { name: 'onClose', type: '() => void', required: true, description: 'Called when the drawer should close.' },
  { name: 'side', type: "'left' | 'right' | 'top' | 'bottom'", default: "'right'", description: 'Which edge the drawer slides in from.' },
  { name: 'title', type: 'ReactNode', description: 'Drawer heading. Connected to aria-labelledby.' },
  { name: 'description', type: 'ReactNode', description: 'Subtitle below the title.' },
  { name: 'footer', type: 'ReactNode', description: 'Footer area, typically for action buttons.' },
  { name: 'closeOnBackdrop', type: 'boolean', default: 'true', description: 'Close when clicking the backdrop.' },
  { name: 'closeOnEsc', type: 'boolean', default: 'true', description: 'Close when pressing Escape.' },
];

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
];

const statuses = [
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'archived', label: 'Archived' },
];

export function DrawerPage() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [side, setSide] = useState<'left' | 'right' | 'top' | 'bottom'>('right');
  const [sideOpen, setSideOpen] = useState(false);
  const [framework, setFramework] = useState('react');
  const [status, setStatus] = useState('active');
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSlack, setNotifSlack] = useState(false);

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Overlay</p>
        <h1 className="doc-page__title">Drawer</h1>
        <p className="doc-page__desc">
          A panel that slides in from any edge of the screen. Shares the same accessibility
          features as Dialog — focus trapping, scroll locking, Escape to dismiss, and ARIA modal role.
        </p>
      </header>

      {/* Basic drawer */}
      <div className="doc-section">
        <h2 className="doc-section__title">Basic Drawer</h2>
        <p className="doc-section__desc">
          Slides in from the right by default. Focus is trapped and returned on close.
        </p>
        <ComponentPreview
          code={`const [open, setOpen] = useState(false);

<ButtonRoot variant="secondary" onClick={() => setOpen(true)}>
  <ButtonLabel>Open Drawer</ButtonLabel>
</ButtonRoot>

<Drawer
  open={open}
  onClose={() => setOpen(false)}
  title="Notifications"
  description="Manage your notification preferences."
  footer={
    <Stack direction="row" gap={2}>
      <ButtonRoot variant="ghost" fullWidth onClick={() => setOpen(false)}>
        <ButtonLabel>Cancel</ButtonLabel>
      </ButtonRoot>
      <ButtonRoot variant="primary" fullWidth onClick={() => setOpen(false)}>
        <ButtonLabel>Save</ButtonLabel>
      </ButtonRoot>
    </Stack>
  }
>
  {/* drawer content */}
</Drawer>`}
        >
          <ButtonRoot variant="secondary" onClick={() => setBasicOpen(true)}>
            <ButtonLabel>Open Drawer</ButtonLabel>
          </ButtonRoot>
          <Drawer
            open={basicOpen}
            onClose={() => setBasicOpen(false)}
            title="Notifications"
            description="Manage your notification preferences."
            footer={
              <Stack direction="row" gap={2}>
                <ButtonRoot variant="ghost" fullWidth onClick={() => setBasicOpen(false)}>
                  <ButtonLabel>Cancel</ButtonLabel>
                </ButtonRoot>
                <ButtonRoot variant="primary" fullWidth onClick={() => setBasicOpen(false)}>
                  <ButtonLabel>Save changes</ButtonLabel>
                </ButtonRoot>
              </Stack>
            }
          >
            <Stack gap={4}>
              <Checkbox
                label="Email notifications"
                description="Receive updates and alerts via email."
                checked={notifEmail}
                onChange={setNotifEmail}
              />
              <Checkbox
                label="Slack notifications"
                description="Send notifications to your Slack workspace."
                checked={notifSlack}
                onChange={setNotifSlack}
              />
            </Stack>
          </Drawer>
        </ComponentPreview>
      </div>

      {/* Filter drawer */}
      <div className="doc-section">
        <h2 className="doc-section__title">Filter Drawer</h2>
        <p className="doc-section__desc">A common pattern — a right-side drawer for filter controls.</p>
        <ComponentPreview
          code={`<Drawer
  open={open}
  onClose={() => setOpen(false)}
  side="right"
  title="Filter results"
  footer={
    <Stack direction="row" gap={2}>
      <ButtonRoot variant="ghost" fullWidth>
        <ButtonLabel>Reset all</ButtonLabel>
      </ButtonRoot>
      <ButtonRoot variant="primary" fullWidth>
        <ButtonLabel>Apply filters</ButtonLabel>
      </ButtonRoot>
    </Stack>
  }
>
  <Stack gap={4}>
    <Select label="Framework" options={frameworks} />
    <Select label="Status" options={statuses} />
    <TextField label="Search" placeholder="Filter by name…" />
  </Stack>
</Drawer>`}
        >
          <ButtonRoot variant="outline" onClick={() => setFiltersOpen(true)}>
            <ButtonLabel>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Filters
              </span>
            </ButtonLabel>
          </ButtonRoot>
          <Drawer
            open={filtersOpen}
            onClose={() => setFiltersOpen(false)}
            side="right"
            title="Filter results"
            description="Narrow down the results using the filters below."
            footer={
              <Stack direction="row" gap={2}>
                <ButtonRoot variant="ghost" fullWidth onClick={() => setFiltersOpen(false)}>
                  <ButtonLabel>Reset all</ButtonLabel>
                </ButtonRoot>
                <ButtonRoot variant="primary" fullWidth onClick={() => setFiltersOpen(false)}>
                  <ButtonLabel>Apply filters</ButtonLabel>
                </ButtonRoot>
              </Stack>
            }
          >
            <Stack gap={4}>
              <Select label="Framework" value={framework} onChange={setFramework} options={frameworks} />
              <Select label="Status" value={status} onChange={setStatus} options={statuses} />
              <TextField label="Search" placeholder="Filter by name…" />
            </Stack>
          </Drawer>
        </ComponentPreview>
      </div>

      {/* Placement */}
      <div className="doc-section">
        <h2 className="doc-section__title">Placement</h2>
        <p className="doc-section__desc">
          Drawers can slide in from any of the four edges of the viewport.
        </p>
        <ComponentPreview
          code={`<Drawer side="right" ... />   // slides from right (default)
<Drawer side="left" ... />    // slides from left
<Drawer side="top" ... />     // drops from top
<Drawer side="bottom" ... />  // rises from bottom`}
          controls={
            <DemoControl
              label="Side"
              options={['right', 'left', 'top', 'bottom']}
              value={side}
              onChange={(v) => setSide(v as typeof side)}
            />
          }
        >
          <Stack direction="row" gap={3} align="center">
            <ButtonRoot variant="secondary" onClick={() => setSideOpen(true)}>
              <ButtonLabel>Open {side} Drawer</ButtonLabel>
            </ButtonRoot>
            <Badge variant="default">{side}</Badge>
          </Stack>
          <Drawer
            open={sideOpen}
            onClose={() => setSideOpen(false)}
            side={side}
            title={`${side.charAt(0).toUpperCase() + side.slice(1)} Drawer`}
            footer={
              <ButtonRoot variant="primary" fullWidth onClick={() => setSideOpen(false)}>
                <ButtonLabel>Close</ButtonLabel>
              </ButtonRoot>
            }
          >
            <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)', lineHeight: 1.6 }}>
              This drawer slides in from the <strong>{side}</strong> edge. You can dismiss it by clicking the
              backdrop, pressing Escape, or using the close button.
            </p>
          </Drawer>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={drawerProps} />
      </div>
    </>
  );
}
