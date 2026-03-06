import React, { useState } from 'react';
import { Radio, RadioGroup, Stack } from '@tokis/react';
import { ComponentPreview, DemoControl } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const radioGroupProps: PropDef[] = [
  { name: 'value', type: 'string', description: 'Controlled selected value.' },
  { name: 'defaultValue', type: 'string', description: 'Initial selected value (uncontrolled).' },
  { name: 'onChange', type: '(value: string) => void', description: 'Called when selection changes.' },
  { name: 'name', type: 'string', description: 'HTML name attribute — shared across all radios in the group.' },
  { name: 'orientation', type: "'vertical' | 'horizontal'", default: "'vertical'", description: 'Layout direction.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all radios in the group.' },
  { name: 'label', type: 'string', description: 'Accessible group label connected via aria-labelledby.' },
];

const radioProps: PropDef[] = [
  { name: 'value', type: 'string', required: true, description: 'Value submitted when this radio is selected.' },
  { name: 'label', type: 'ReactNode', description: 'Visible label. Clicking toggles this radio.' },
  { name: 'description', type: 'string', description: 'Supporting text below the label.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables this specific radio.' },
];

export function RadioPage() {
  const [notification, setNotification] = useState('mentions');
  const [plan, setPlan] = useState('pro');
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical');

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Forms</p>
        <h1 className="doc-page__title">Radio</h1>
        <p className="doc-page__desc">
          Single-selection from a list of mutually exclusive options.
          Use <code className="inline-code">RadioGroup</code> to manage state and keyboard navigation.
          Clicking labels also toggles the selection.
        </p>
      </header>

      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Playground</h2>
        <ComponentPreview
          code={`<RadioGroup
  label="Notification preference"
  name="notifications"
  value={value}
  onChange={setValue}
  orientation="${orientation}"
>
  <Radio value="all" label="All notifications" description="Every event, in real-time." />
  <Radio value="mentions" label="Mentions only" description="Only when you're mentioned." />
  <Radio value="none" label="None" description="No notifications." />
</RadioGroup>`}
          controls={
            <DemoControl
              label="Orientation"
              options={['vertical', 'horizontal']}
              value={orientation}
              onChange={(v) => setOrientation(v as typeof orientation)}
            />
          }
          leftAlign
        >
          <div style={{ padding: 'var(--tokis-spacing-4)', maxWidth: 420, margin: '0 auto', width: '100%' }}>
            <RadioGroup
              label="Notification preference"
              name="notifications"
              value={notification}
              onChange={setNotification}
              orientation={orientation}
            >
              <Radio value="all" label="All notifications" description="Every event, in real-time." />
              <Radio value="mentions" label="Mentions only" description="Only when you're mentioned." />
              <Radio value="none" label="None" description="No notifications." />
            </RadioGroup>
          </div>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Pricing Cards Example</h2>
        <p className="doc-section__desc">
          Radio inside cards for rich, visually distinct option groups.
        </p>
        <ComponentPreview
          code={`<RadioGroup name="plan" value={plan} onChange={setPlan}>
  <Stack gap={3}>
    {plans.map(({ id, name, price, desc }) => (
      <label key={id} style={{ display: 'flex', ... }}>
        <Radio value={id} />
        <div>
          <strong>{name}</strong> — {price}
          <p>{desc}</p>
        </div>
      </label>
    ))}
  </Stack>
</RadioGroup>`}
          leftAlign
        >
          <div style={{ padding: 'var(--tokis-spacing-4)', maxWidth: 400 }}>
            <RadioGroup name="plan" value={plan} onChange={setPlan}>
              <Stack gap={3}>
                {[
                  { id: 'free', name: 'Free', price: '$0/mo', desc: 'Up to 3 projects, 1 user.' },
                  { id: 'pro', name: 'Pro', price: '$12/mo', desc: 'Unlimited projects, 10 users.' },
                  { id: 'team', name: 'Team', price: '$49/mo', desc: 'Unlimited everything + SSO.' },
                ].map(({ id, name, price, desc }) => (
                  <div
                    key={id}
                    style={{
                      display: 'flex',
                      gap: 'var(--tokis-spacing-3)',
                      padding: 'var(--tokis-spacing-3)',
                      border: `1px solid ${plan === id ? 'var(--tokis-color-primary)' : 'var(--tokis-color-border)'}`,
                      borderRadius: 'var(--tokis-radius-lg)',
                      background: plan === id ? 'var(--tokis-color-primary-subtle)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 150ms',
                    }}
                    onClick={() => setPlan(id)}
                  >
                    <Radio value={id} checked={plan === id} onChange={setPlan} />
                    <div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                        <strong style={{ fontSize: 'var(--tokis-font-size-sm)' }}>{name}</strong>
                        <span style={{ fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-secondary)' }}>{price}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </Stack>
            </RadioGroup>
          </div>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">States</h2>
        <ComponentPreview
          code={`<RadioGroup name="states" defaultValue="selected">
  <Radio value="default" label="Default" />
  <Radio value="selected" label="Selected" />
  <Radio value="disabled" label="Disabled" disabled />
  <Radio value="disabled-checked" label="Disabled + selected" checked disabled />
</RadioGroup>`}
          leftAlign
        >
          <div style={{ padding: 'var(--tokis-spacing-4)' }}>
            <RadioGroup name="states" defaultValue="selected">
              <Radio value="default" label="Default" />
              <Radio value="selected" label="Selected" />
              <Radio value="disabled" label="Disabled" disabled />
            </RadioGroup>
          </div>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Props — RadioGroup</h2>
        <PropsTable props={radioGroupProps} />
      </div>
      <div className="doc-section">
        <h2 className="doc-section__title">Props — Radio</h2>
        <PropsTable props={radioProps} />
      </div>
    </>
  );
}
