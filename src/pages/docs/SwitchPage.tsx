import React, { useState } from 'react';
import { Switch, Stack } from '@tokis/react';
import { ComponentPreview, DemoControl, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const switchProps: PropDef[] = [
  { name: 'label', type: 'ReactNode', description: 'Visible label to the right of the switch.' },
  { name: 'description', type: 'string', description: 'Supporting text below the label.' },
  { name: 'checked', type: 'boolean', description: 'Controlled on/off state.' },
  { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'Initial state (uncontrolled).' },
  { name: 'onChange', type: '(checked: boolean) => void', description: 'Called when the switch is toggled.' },
  { name: 'size', type: "'sm' | 'md'", default: "'md'", description: 'Size of the switch track.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction.' },
];

export function SwitchPage() {
  const [on, setOn] = useState(false);
  const [size, setSize] = useState<'sm' | 'md'>('md');
  const [disabled, setDisabled] = useState(false);

  const [settings, setSettings] = useState({
    notifications: true,
    marketing: false,
    darkMode: false,
    analytics: true,
    security: true,
  });

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Forms</p>
        <h1 className="doc-page__title">Switch</h1>
        <p className="doc-page__desc">
          Toggle between two mutually exclusive states. Best used for immediate on/off actions
          that take effect without requiring form submission.
        </p>
      </header>

      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Playground</h2>
        <ComponentPreview
          code={`<Switch
  label="Dark mode"
  checked={on}
  onChange={setOn}
  size="${size}"${disabled ? '\n  disabled' : ''}
/>`}
          controls={
            <>
              <DemoControl
                label="Size"
                options={['sm', 'md']}
                value={size}
                onChange={(v) => setSize(v as typeof size)}
              />
              <DemoToggle label="Disabled" value={disabled} onChange={setDisabled} />
            </>
          }
          leftAlign
        >
          <div style={{ padding: 'var(--tokis-spacing-4)', maxWidth: 420, margin: '0 auto', width: '100%' }}>
            <Switch
              label="Dark mode"
              checked={on}
              onChange={setOn}
              size={size}
              disabled={disabled}
            />
          </div>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Settings Panel</h2>
        <p className="doc-section__desc">
          A common use case: grouped preference toggles with descriptions.
        </p>
        <ComponentPreview
          code={`<Stack gap={4}>
  <Switch
    label="Push notifications"
    description="Receive alerts for new activity."
    checked={settings.notifications}
    onChange={(v) => setSettings({ ...settings, notifications: v })}
  />
  <Switch
    label="Marketing emails"
    description="Weekly product updates and tips."
    checked={settings.marketing}
    onChange={(v) => setSettings({ ...settings, marketing: v })}
  />
</Stack>`}
          leftAlign
        >
          <Stack gap={4} style={{ padding: 'var(--tokis-spacing-4)', maxWidth: 400 }}>
            <Switch
              label="Push notifications"
              description="Receive alerts for new activity and mentions."
              checked={settings.notifications}
              onChange={(v) => setSettings((s) => ({ ...s, notifications: v }))}
            />
            <Switch
              label="Marketing emails"
              description="Weekly product updates and tips."
              checked={settings.marketing}
              onChange={(v) => setSettings((s) => ({ ...s, marketing: v }))}
            />
            <Switch
              label="Analytics"
              description="Help us improve with anonymous usage data."
              checked={settings.analytics}
              onChange={(v) => setSettings((s) => ({ ...s, analytics: v }))}
            />
            <Switch
              label="Two-factor authentication"
              description="Require 2FA for all sign-ins."
              checked={settings.security}
              onChange={(v) => setSettings((s) => ({ ...s, security: v }))}
            />
          </Stack>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">States & Sizes</h2>
        <ComponentPreview
          code={`<Stack gap={3}>
  <Switch label="Off (default)" />
  <Switch label="On" defaultChecked />
  <Switch label="Small" size="sm" defaultChecked />
  <Switch label="Disabled" disabled />
  <Switch label="Disabled + on" disabled defaultChecked />
</Stack>`}
          leftAlign
        >
          <Stack gap={3} style={{ padding: 'var(--tokis-spacing-4)' }}>
            <Switch label="Off (default)" />
            <Switch label="On" defaultChecked />
            <Switch label="Small" size="sm" defaultChecked />
            <Switch label="Disabled" disabled />
            <Switch label="Disabled + on" disabled defaultChecked />
          </Stack>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={switchProps} />
      </div>
    </>
  );
}
