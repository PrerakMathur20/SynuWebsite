import React, { useState } from 'react';
import { Stepper, Stack, ButtonRoot, ButtonLabel } from '@tokis/react';
import { ComponentPreview, DemoControl } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const stepperProps: PropDef[] = [
  { name: 'steps', type: 'Step[]', required: true, description: 'Array of step definitions to render.' },
  { name: 'current', type: 'number', required: true, description: 'Zero-based index of the active step. Auto-derives status if step.status is not set.' },
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout direction of the stepper.' },
  { name: 'className', type: 'string', description: 'Additional CSS class name(s) applied to the root element.' },
];

const stepDefProps: PropDef[] = [
  { name: 'label', type: 'string', required: true, description: 'The step label text.' },
  { name: 'description', type: 'string', description: 'Optional supporting text shown below the label.' },
  { name: 'status', type: "'completed' | 'active' | 'pending' | 'error'", description: 'Explicit status override. If omitted, status is derived from the current prop.' },
];

const steps = [
  { label: 'Account Setup', description: 'Create your account credentials' },
  { label: 'Personal Info', description: 'Tell us about yourself' },
  { label: 'Billing', description: 'Choose a plan and add payment' },
  { label: 'Review', description: 'Confirm and finish' },
];

export function StepperPage() {
  const [current, setCurrent] = useState(0);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Navigation</p>
        <h1 className="doc-page__title">Stepper</h1>
        <p className="doc-page__desc">
          Guides users through a multi-step process with a clear visual indicator of
          progress. Supports horizontal and vertical orientations, status overrides per step,
          and optional step descriptions.
        </p>
      </header>

      {/* Interactive Playground */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Playground</h2>
        <ComponentPreview
          code={`const [current, setCurrent] = useState(0);

<Stepper
  steps={[
    { label: 'Account Setup', description: 'Create your account credentials' },
    { label: 'Personal Info', description: 'Tell us about yourself' },
    { label: 'Billing', description: 'Choose a plan and add payment' },
    { label: 'Review', description: 'Confirm and finish' },
  ]}
  current={current}
  orientation="${orientation}"
/>

<Stack direction="row" gap={2}>
  <ButtonRoot variant="outline" onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0}>
    <ButtonLabel>Prev</ButtonLabel>
  </ButtonRoot>
  <ButtonRoot variant="primary" onClick={() => setCurrent(c => Math.min(3, c + 1))} disabled={current === 3}>
    <ButtonLabel>Next</ButtonLabel>
  </ButtonRoot>
</Stack>`}
          controls={
            <DemoControl
              label="Orientation"
              options={['horizontal', 'vertical']}
              value={orientation}
              onChange={(v) => setOrientation(v as 'horizontal' | 'vertical')}
            />
          }
          leftAlign
        >
          <Stack gap={6} style={{ width: '100%' }}>
            <Stepper
              steps={steps}
              current={current}
              orientation={orientation}
            />
            <Stack direction="row" gap={2}>
              <ButtonRoot
                variant="outline"
                onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                disabled={current === 0}
              >
                <ButtonLabel>Prev</ButtonLabel>
              </ButtonRoot>
              <ButtonRoot
                variant="primary"
                onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}
                disabled={current === steps.length - 1}
              >
                <ButtonLabel>Next</ButtonLabel>
              </ButtonRoot>
            </Stack>
          </Stack>
        </ComponentPreview>
      </div>

      {/* Horizontal */}
      <div className="doc-section">
        <h2 className="doc-section__title">Horizontal</h2>
        <p className="doc-section__desc">
          The default orientation. Steps are laid out left-to-right with connectors between them.
        </p>
        <ComponentPreview
          code={`<Stepper
  steps={[
    { label: 'Account Setup' },
    { label: 'Personal Info' },
    { label: 'Billing' },
    { label: 'Review' },
  ]}
  current={1}
/>`}
          leftAlign
        >
          <Stepper
            steps={steps.map(({ label }) => ({ label }))}
            current={1}
            orientation="horizontal"
          />
        </ComponentPreview>
      </div>

      {/* Vertical */}
      <div className="doc-section">
        <h2 className="doc-section__title">Vertical</h2>
        <p className="doc-section__desc">
          Use <code className="inline-code">orientation="vertical"</code> for sidebar wizards or
          when step descriptions are long.
        </p>
        <ComponentPreview
          code={`<Stepper
  steps={[
    { label: 'Account Setup', description: 'Create your account credentials' },
    { label: 'Personal Info', description: 'Tell us about yourself' },
    { label: 'Billing', description: 'Choose a plan and add payment' },
    { label: 'Review', description: 'Confirm and finish' },
  ]}
  current={2}
  orientation="vertical"
/>`}
          leftAlign
        >
          <div style={{ maxWidth: 320 }}>
            <Stepper steps={steps} current={2} orientation="vertical" />
          </div>
        </ComponentPreview>
      </div>

      {/* Status overrides */}
      <div className="doc-section">
        <h2 className="doc-section__title">Explicit Status</h2>
        <p className="doc-section__desc">
          Pass a <code className="inline-code">status</code> on individual steps to override the
          auto-derived value. Useful for showing errors mid-flow.
        </p>
        <ComponentPreview
          code={`<Stepper
  steps={[
    { label: 'Account Setup', status: 'completed' },
    { label: 'Personal Info', status: 'error', description: 'Email already in use' },
    { label: 'Billing', status: 'pending' },
    { label: 'Review', status: 'pending' },
  ]}
/>`}
          leftAlign
        >
          <Stepper
            current={1}
            steps={[
              { label: 'Account Setup', status: 'completed' },
              { label: 'Personal Info', status: 'error', description: 'Email already in use' },
              { label: 'Billing', status: 'pending' },
              { label: 'Review', status: 'pending' },
            ]}
          />
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — Stepper</h2>
        <PropsTable props={stepperProps} />
      </div>
      <div className="doc-section">
        <h2 className="doc-section__title">Props — Step</h2>
        <PropsTable props={stepDefProps} />
      </div>
    </>
  );
}
