import React, { useState } from 'react';
import {
  Dialog, Drawer,
  ButtonRoot, ButtonLabel,
  Stack,
  TextField,
  Alert,
  Badge,
} from '@synu/react';
import { ComponentPreview, DemoControl } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const dialogProps: PropDef[] = [
  { name: 'open', type: 'boolean', required: true, description: 'Controls visibility. Manages aria-modal and body scroll locking.' },
  { name: 'onClose', type: '() => void', required: true, description: 'Called when the dialog should close (backdrop click, Escape key, close button).' },
  { name: 'title', type: 'ReactNode', description: 'Dialog heading. Connected to aria-labelledby.' },
  { name: 'description', type: 'ReactNode', description: 'Subtitle below the title. Connected to aria-describedby.' },
  { name: 'footer', type: 'ReactNode', description: 'Footer area, typically for action buttons.' },
  { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | 'full'", default: "'md'", description: 'Maximum width of the dialog.' },
  { name: 'closeOnBackdrop', type: 'boolean', default: 'true', description: 'Close when clicking the backdrop.' },
  { name: 'closeOnEsc', type: 'boolean', default: 'true', description: 'Close when pressing Escape.' },
];

export function DialogPage() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [sizeOpen, setSizeOpen] = useState(false);
  const [drawerSide, setDrawerSide] = useState<'left' | 'right' | 'top' | 'bottom'>('right');

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Overlay</p>
        <h1 className="doc-page__title">Dialog & Drawer</h1>
        <p className="doc-page__desc">
          Accessible modal dialogs and drawers with focus trapping, scroll locking,
          keyboard dismissal, and ARIA roles. Renders into a Portal.
        </p>
      </header>

      {/* Basic dialog */}
      <div className="doc-section">
        <h2 className="doc-section__title">Basic Dialog</h2>
        <p className="doc-section__desc">
          Focus is trapped within the dialog. Pressing Escape or clicking the backdrop closes it.
          Focus returns to the trigger element on close.
        </p>
        <ComponentPreview
          code={`const [open, setOpen] = useState(false);

<ButtonRoot variant="primary" onClick={() => setOpen(true)}>
  <ButtonLabel>Open Dialog</ButtonLabel>
</ButtonRoot>

<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm action"
  description="This action cannot be undone."
  footer={
    <Stack direction="row" gap={2} justify="flex-end">
      <ButtonRoot variant="ghost" onClick={() => setOpen(false)}>
        <ButtonLabel>Cancel</ButtonLabel>
      </ButtonRoot>
      <ButtonRoot variant="primary" onClick={() => setOpen(false)}>
        <ButtonLabel>Confirm</ButtonLabel>
      </ButtonRoot>
    </Stack>
  }
>
  <p>Are you sure you want to proceed? This will permanently delete the selected items.</p>
</Dialog>`}
        >
          <ButtonRoot variant="primary" onClick={() => setBasicOpen(true)}>
            <ButtonLabel>Open Dialog</ButtonLabel>
          </ButtonRoot>
          <Dialog
            open={basicOpen}
            onClose={() => setBasicOpen(false)}
            title="Confirm action"
            description="This action cannot be undone."
            footer={
              <Stack direction="row" gap={2} justify="flex-end">
                <ButtonRoot variant="ghost" onClick={() => setBasicOpen(false)}>
                  <ButtonLabel>Cancel</ButtonLabel>
                </ButtonRoot>
                <ButtonRoot variant="primary" onClick={() => setBasicOpen(false)}>
                  <ButtonLabel>Confirm</ButtonLabel>
                </ButtonRoot>
              </Stack>
            }
          >
            <p style={{ margin: 0, color: 'var(--synu-text-secondary)', fontSize: 'var(--synu-font-size-sm)' }}>
              Are you sure you want to proceed? This will permanently delete the selected items.
            </p>
          </Dialog>
        </ComponentPreview>
      </div>

      {/* Form dialog */}
      <div className="doc-section">
        <h2 className="doc-section__title">Form Dialog</h2>
        <ComponentPreview
          code={`<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Create new project"
  description="Fill in the details below to get started."
  size="md"
  footer={
    <Stack direction="row" gap={2} justify="flex-end">
      <ButtonRoot variant="ghost" onClick={() => setOpen(false)}>
        <ButtonLabel>Cancel</ButtonLabel>
      </ButtonRoot>
      <ButtonRoot variant="primary">
        <ButtonLabel>Create project</ButtonLabel>
      </ButtonRoot>
    </Stack>
  }
>
  <Stack gap={4}>
    <TextField label="Project name" placeholder="My Awesome Project" required />
    <TextField label="Repository URL" placeholder="https://github.com/..." />
  </Stack>
</Dialog>`}
        >
          <ButtonRoot variant="outline" onClick={() => setFormOpen(true)}>
            <ButtonLabel>Form Dialog</ButtonLabel>
          </ButtonRoot>
          <Dialog
            open={formOpen}
            onClose={() => setFormOpen(false)}
            title="Create new project"
            description="Fill in the details below to get started."
            footer={
              <Stack direction="row" gap={2} justify="flex-end">
                <ButtonRoot variant="ghost" onClick={() => setFormOpen(false)}>
                  <ButtonLabel>Cancel</ButtonLabel>
                </ButtonRoot>
                <ButtonRoot variant="primary" onClick={() => setFormOpen(false)}>
                  <ButtonLabel>Create project</ButtonLabel>
                </ButtonRoot>
              </Stack>
            }
          >
            <Stack gap={4}>
              <TextField label="Project name" placeholder="My Awesome Project" required />
              <TextField label="Repository URL" placeholder="https://github.com/..." />
            </Stack>
          </Dialog>
        </ComponentPreview>
      </div>

      {/* Destructive */}
      <div className="doc-section">
        <h2 className="doc-section__title">Destructive Dialog</h2>
        <ComponentPreview
          code={`<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Delete project"
  size="sm"
  footer={
    <Stack direction="row" gap={2} justify="flex-end">
      <ButtonRoot variant="ghost" onClick={() => setOpen(false)}>
        <ButtonLabel>Cancel</ButtonLabel>
      </ButtonRoot>
      <ButtonRoot variant="destructive" onClick={() => setOpen(false)}>
        <ButtonLabel>Delete permanently</ButtonLabel>
      </ButtonRoot>
    </Stack>
  }
>
  <Alert variant="error">
    This action is irreversible. All data will be deleted.
  </Alert>
</Dialog>`}
        >
          <ButtonRoot variant="destructive" onClick={() => setDestructiveOpen(true)}>
            <ButtonLabel>Delete Project</ButtonLabel>
          </ButtonRoot>
          <Dialog
            open={destructiveOpen}
            onClose={() => setDestructiveOpen(false)}
            title="Delete project"
            size="sm"
            footer={
              <Stack direction="row" gap={2} justify="flex-end">
                <ButtonRoot variant="ghost" onClick={() => setDestructiveOpen(false)}>
                  <ButtonLabel>Cancel</ButtonLabel>
                </ButtonRoot>
                <ButtonRoot variant="destructive" onClick={() => setDestructiveOpen(false)}>
                  <ButtonLabel>Delete permanently</ButtonLabel>
                </ButtonRoot>
              </Stack>
            }
          >
            <Alert variant="error">
              This action is irreversible. All project data, settings, and history will be permanently deleted.
            </Alert>
          </Dialog>
        </ComponentPreview>
      </div>

      {/* Sizes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Sizes</h2>
        <ComponentPreview
          code={`<Dialog size="sm" ... />   // 400px max
<Dialog size="md" ... />   // 560px max
<Dialog size="lg" ... />   // 720px max
<Dialog size="xl" ... />   // 900px max
<Dialog size="full" ... /> // Full screen`}
          controls={
            <DemoControl
              label="Size"
              options={['sm', 'md', 'lg', 'xl']}
              value={size}
              onChange={(v) => setSize(v as 'sm' | 'md' | 'lg' | 'xl')}
            />
          }
        >
          <Stack direction="row" gap={3} align="center">
            <ButtonRoot variant="secondary" onClick={() => setSizeOpen(true)}>
              <ButtonLabel>Open {size} dialog</ButtonLabel>
            </ButtonRoot>
            <Badge variant="default">{size}</Badge>
          </Stack>
          <Dialog
            open={sizeOpen}
            onClose={() => setSizeOpen(false)}
            title={`Size: ${size}`}
            size={size}
            footer={
              <ButtonRoot variant="primary" onClick={() => setSizeOpen(false)}>
                <ButtonLabel>Close</ButtonLabel>
              </ButtonRoot>
            }
          >
            <p style={{ margin: 0, color: 'var(--synu-text-secondary)', fontSize: 'var(--synu-font-size-sm)' }}>
              This dialog has <strong>{size}</strong> size constraint applied. Resize your window to see how it adapts.
            </p>
          </Dialog>
        </ComponentPreview>
      </div>

      {/* Drawer */}
      <div className="doc-section">
        <h2 className="doc-section__title">Drawer</h2>
        <p className="doc-section__desc">
          A panel that slides in from any edge. Same accessibility features as Dialog.
        </p>
        <ComponentPreview
          code={`<Drawer
  open={open}
  onClose={() => setOpen(false)}
  side="right"
  title="Filters"
  footer={
    <Stack direction="row" gap={2}>
      <ButtonRoot variant="ghost" fullWidth>
        <ButtonLabel>Reset</ButtonLabel>
      </ButtonRoot>
      <ButtonRoot variant="primary" fullWidth>
        <ButtonLabel>Apply</ButtonLabel>
      </ButtonRoot>
    </Stack>
  }
>
  <Stack gap={4}>
    <TextField label="Search" placeholder="Filter by name…" />
    <Select label="Status" options={[...]} />
  </Stack>
</Drawer>`}
          controls={
            <DemoControl
              label="Side"
              options={['left', 'right', 'top', 'bottom']}
              value={drawerSide}
              onChange={(v) => setDrawerSide(v as typeof drawerSide)}
            />
          }
        >
          <ButtonRoot variant="secondary" onClick={() => setDrawerOpen(true)}>
            <ButtonLabel>Open {drawerSide} Drawer</ButtonLabel>
          </ButtonRoot>
          <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            side={drawerSide}
            title="Filters"
            footer={
              <Stack direction="row" gap={2}>
                <ButtonRoot variant="ghost" fullWidth onClick={() => setDrawerOpen(false)}>
                  <ButtonLabel>Reset</ButtonLabel>
                </ButtonRoot>
                <ButtonRoot variant="primary" fullWidth onClick={() => setDrawerOpen(false)}>
                  <ButtonLabel>Apply</ButtonLabel>
                </ButtonRoot>
              </Stack>
            }
          >
            <Stack gap={4}>
              <TextField label="Search" placeholder="Filter by name…" />
              <TextField label="Date range" placeholder="Select date…" />
            </Stack>
          </Drawer>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — Dialog</h2>
        <PropsTable props={dialogProps} />
      </div>
    </>
  );
}
