import React, { useState } from 'react';
import {
  Dialog,
  ButtonRoot, ButtonLabel,
  Stack,
  TextField,
  Alert,
  Badge,
} from '@tokis/react';
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
  const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [sizeOpen, setSizeOpen] = useState(false);

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Overlay</p>
        <h1 className="doc-page__title">Dialog</h1>
        <p className="doc-page__desc">
          Accessible modal dialogs with focus trapping, scroll locking, keyboard dismissal,
          and ARIA roles. Renders into a Portal above all other content.
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
  <p>Are you sure you want to proceed?</p>
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
            <p style={{ margin: 0, color: 'var(--tokis-text-secondary)', fontSize: 'var(--tokis-font-size-sm)' }}>
              Are you sure you want to proceed? This will permanently delete the selected items.
            </p>
          </Dialog>
        </ComponentPreview>
      </div>

      {/* Form dialog */}
      <div className="doc-section">
        <h2 className="doc-section__title">Form Dialog</h2>
        <p className="doc-section__desc">
          Use a Dialog to collect input in context, keeping users focused on the task.
        </p>
        <ComponentPreview
          code={`<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Create new project"
  description="Fill in the details below to get started."
  size="md"
  footer={...}
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
              <TextField label="Repository URL" placeholder="https://github.com/…" />
            </Stack>
          </Dialog>
        </ComponentPreview>
      </div>

      {/* Destructive */}
      <div className="doc-section">
        <h2 className="doc-section__title">Destructive Dialog</h2>
        <p className="doc-section__desc">
          For irreversible actions, use an error Alert inside the dialog body and a destructive primary action.
        </p>
        <ComponentPreview
          code={`<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Delete project"
  size="sm"
  footer={
    <Stack direction="row" gap={2} justify="flex-end">
      <ButtonRoot variant="ghost">
        <ButtonLabel>Cancel</ButtonLabel>
      </ButtonRoot>
      <ButtonRoot variant="destructive">
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
          code={`<Dialog size="sm" />   // 400px max
<Dialog size="md" />   // 560px max  (default)
<Dialog size="lg" />   // 720px max
<Dialog size="xl" />   // 900px max
<Dialog size="full" /> // Full screen`}
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
            <p style={{ margin: 0, color: 'var(--tokis-text-secondary)', fontSize: 'var(--tokis-font-size-sm)' }}>
              This dialog has the <strong>{size}</strong> size applied. Resize your window to see how it adapts on smaller viewports.
            </p>
          </Dialog>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={dialogProps} />
      </div>
    </>
  );
}
