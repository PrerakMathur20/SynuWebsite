import React, { useState } from 'react';
import { Checkbox, Stack } from '@tokis/react';
import { ComponentPreview, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const checkboxProps: PropDef[] = [
  { name: 'label', type: 'ReactNode', description: 'Visible label. Clicking the label toggles the checkbox.' },
  { name: 'description', type: 'string', description: 'Supporting text below the label.' },
  { name: 'checked', type: 'boolean', description: 'Controlled checked state.' },
  { name: 'defaultChecked', type: 'boolean', default: 'false', description: 'Initial checked state (uncontrolled).' },
  { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Renders a dash indicator for partially-selected states.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the checkbox.' },
  { name: 'onChange', type: '(checked: boolean) => void', description: 'Called when state changes.' },
  { name: 'name', type: 'string', description: 'Form field name for native form submission.' },
  { name: 'value', type: 'string', description: 'Form field value for native form submission.' },
];

export function CheckboxPage() {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [allSelected, setAllSelected] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const options = ['Feature A', 'Feature B', 'Feature C'];
  const isIndeterminate = selected.length > 0 && selected.length < options.length;
  const isAllSelected = selected.length === options.length;

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Forms</p>
        <h1 className="doc-page__title">Checkbox</h1>
        <p className="doc-page__desc">
          Binary toggle for settings and multi-select lists. Supports indeterminate state for
          hierarchical selection. Clicking the label also toggles the checkbox.
        </p>
      </header>

      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Playground</h2>
        <ComponentPreview
          code={`<Checkbox
  label="Accept terms of service"
  description="Required to continue using the platform."
  checked={checked}
  onChange={setChecked}${indeterminate ? '\n  indeterminate' : ''}${disabled ? '\n  disabled' : ''}
/>`}
          controls={
            <>
              <DemoToggle label="Indeterminate" value={indeterminate} onChange={setIndeterminate} />
              <DemoToggle label="Disabled" value={disabled} onChange={setDisabled} />
            </>
          }
          leftAlign
        >
          <div style={{ padding: 'var(--tokis-spacing-4)', maxWidth: 420, margin: '0 auto', width: '100%' }}>
            <Checkbox
              label="Accept terms of service"
              description="Required to continue using the platform."
              checked={indeterminate ? undefined : checked}
              onChange={setChecked}
              indeterminate={indeterminate}
              disabled={disabled}
            />
          </div>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">States</h2>
        <ComponentPreview
          code={`<Stack gap={3}>
  <Checkbox label="Unchecked" />
  <Checkbox label="Checked" defaultChecked />
  <Checkbox label="Indeterminate" indeterminate />
  <Checkbox label="Disabled" disabled />
  <Checkbox label="Checked + disabled" defaultChecked disabled />
</Stack>`}
          leftAlign
        >
          <Stack gap={3} style={{ padding: 'var(--tokis-spacing-4)' }}>
            <Checkbox label="Unchecked" />
            <Checkbox label="Checked" defaultChecked />
            <Checkbox label="Indeterminate" indeterminate />
            <Checkbox label="Disabled" disabled />
            <Checkbox label="Checked + disabled" defaultChecked disabled />
          </Stack>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">With Description</h2>
        <ComponentPreview
          code={`<Stack gap={4}>
  <Checkbox
    label="Marketing emails"
    description="Receive weekly product updates and tips."
    defaultChecked
  />
  <Checkbox
    label="Security alerts"
    description="Get notified of new sign-ins and suspicious activity."
    defaultChecked
  />
</Stack>`}
          leftAlign
        >
          <Stack gap={4} style={{ padding: 'var(--tokis-spacing-4)', maxWidth: 380 }}>
            <Checkbox
              label="Marketing emails"
              description="Receive weekly product updates and tips."
              defaultChecked
            />
            <Checkbox
              label="Security alerts"
              description="Get notified of new sign-ins and suspicious activity."
              defaultChecked
            />
          </Stack>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Select All Pattern</h2>
        <p className="doc-section__desc">
          Use <code className="inline-code">indeterminate</code> to indicate partial selection in hierarchical lists.
        </p>
        <ComponentPreview
          code={`<Stack gap={2}>
  <Checkbox
    label="Select all features"
    checked={isAllSelected}
    indeterminate={isIndeterminate}
    onChange={(v) => setSelected(v ? options : [])}
  />
  <div style={{ paddingLeft: 28 }}>
    {options.map((opt) => (
      <Checkbox key={opt} label={opt}
        checked={selected.includes(opt)}
        onChange={(v) => setSelected((prev) => v ? [...prev, opt] : prev.filter((x) => x !== opt))}
      />
    ))}
  </div>
</Stack>`}
          leftAlign
        >
          <Stack gap={2} style={{ padding: 'var(--tokis-spacing-4)' }}>
            <Checkbox
              label="Select all features"
              checked={isAllSelected}
              indeterminate={isIndeterminate}
              onChange={(v) => setSelected(v ? [...options] : [])}
            />
            <div style={{ paddingLeft: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {options.map((opt) => (
                <Checkbox
                  key={opt}
                  label={opt}
                  checked={selected.includes(opt)}
                  onChange={(v) => setSelected((prev) =>
                    v ? [...prev, opt] : prev.filter((x) => x !== opt)
                  )}
                />
              ))}
            </div>
          </Stack>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={checkboxProps} />
      </div>
    </>
  );
}
