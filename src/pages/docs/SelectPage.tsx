import React, { useState } from 'react';
import { Select, Stack } from '@tokis/react';
import { ComponentPreview, DemoControl, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const selectProps: PropDef[] = [
  { name: 'options', type: 'SelectOption[]', required: true, description: 'Array of options. Each has value, label, and optional disabled/group.' },
  { name: 'value', type: 'string', description: 'Controlled selected value.' },
  { name: 'defaultValue', type: 'string', description: 'Initial value (uncontrolled).' },
  { name: 'onChange', type: '(value: string) => void', description: 'Called when selection changes.' },
  { name: 'placeholder', type: 'string', description: 'Placeholder text shown when nothing is selected.' },
  { name: 'label', type: 'string', description: 'Visible label above the trigger.' },
  { name: 'helperText', type: 'string', description: 'Helper text below the trigger.' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Applies error styling.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Trigger height.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the select.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Marks the field as required.' },
];

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'SolidJS' },
  { value: 'angular', label: 'Angular' },
  { value: 'qwik', label: 'Qwik' },
];

export function SelectPage() {
  const [framework, setFramework] = useState('react');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [showError, setShowError] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Forms</p>
        <h1 className="doc-page__title">Select</h1>
        <p className="doc-page__desc">
          Custom dropdown with keyboard navigation, search filtering, and grouped options.
          Renders into a Portal to avoid overflow clipping. Fully accessible via keyboard.
        </p>
      </header>

      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Playground</h2>
        <ComponentPreview
          code={`<Select
  label="Framework"
  value={value}
  onChange={setValue}
  size="${size}"${showError ? '\n  error\n  helperText="Please select a framework."' : ''}${disabled ? '\n  disabled' : ''}
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'SolidJS' },
    { value: 'angular', label: 'Angular' },
  ]}
/>`}
          controls={
            <>
              <DemoControl
                label="Size"
                options={['sm', 'md', 'lg']}
                value={size}
                onChange={(v) => setSize(v as typeof size)}
              />
              <DemoToggle label="Error" value={showError} onChange={setShowError} />
              <DemoToggle label="Disabled" value={disabled} onChange={setDisabled} />
            </>
          }
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 360, margin: '0 auto' }}>
            <Select
              label="Framework"
              value={framework}
              onChange={setFramework}
              size={size}
              error={showError}
              helperText={showError ? 'Please select a framework.' : 'Select your preferred framework.'}
              disabled={disabled}
              options={frameworks}
            />
          </div>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Grouped Options</h2>
        <p className="doc-section__desc">
          Pass a <code className="inline-code">group</code> key on options to create visual groupings.
        </p>
        <ComponentPreview
          code={`<Select
  label="Category"
  options={[
    { value: 'react', label: 'React', group: 'Frontend' },
    { value: 'vue', label: 'Vue', group: 'Frontend' },
    { value: 'node', label: 'Node.js', group: 'Backend' },
    { value: 'django', label: 'Django', group: 'Backend' },
    { value: 'postgres', label: 'PostgreSQL', group: 'Database' },
  ]}
/>`}
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 360 }}>
            <Select
              label="Technology"
              placeholder="Select a technology…"
              options={[
                { value: 'react', label: 'React', group: 'Frontend' },
                { value: 'vue', label: 'Vue', group: 'Frontend' },
                { value: 'svelte', label: 'Svelte', group: 'Frontend' },
                { value: 'node', label: 'Node.js', group: 'Backend' },
                { value: 'django', label: 'Django', group: 'Backend' },
                { value: 'rails', label: 'Rails', group: 'Backend' },
                { value: 'postgres', label: 'PostgreSQL', group: 'Database' },
                { value: 'mysql', label: 'MySQL', group: 'Database' },
              ]}
            />
          </div>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={selectProps} />
      </div>
    </>
  );
}
