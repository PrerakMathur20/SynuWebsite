import React, { useState } from 'react';
import {
  TextField, Textarea, Checkbox, RadioGroup, Radio,
  Switch, Select, Slider,
  Stack,
} from '@tokis/react';
import { ComponentPreview, DemoControl, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';
import { CodeBlock } from '../../components/CodeBlock';

const textFieldProps: PropDef[] = [
  { name: 'label', type: 'string', description: 'Visible label above the input.' },
  { name: 'helperText', type: 'string', description: 'Helper/error text below the input.' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Applies error styling and sets aria-invalid.' },
  { name: 'inputSize', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the input field.' },
  { name: 'startAdornment', type: 'ReactNode', description: 'Content placed at the start of the input.' },
  { name: 'endAdornment', type: 'ReactNode', description: 'Content placed at the end of the input.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Marks the field as required with a visual indicator.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
];

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ color: 'var(--tokis-text-tertiary)' }}>
    <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.3" />
    <path d="M9 9l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const EyeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ color: 'var(--tokis-text-tertiary)' }}>
    <path d="M1 7s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4z" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="7" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

export function InputPage() {
  const [textSize, setTextSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [showError, setShowError] = useState(false);
  const [showRequired, setShowRequired] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [sliderValue, setSliderValue] = useState(40);
  const [selectValue, setSelectValue] = useState('react');
  const [switchOn, setSwitchOn] = useState(false);
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option-a');

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Forms</p>
        <h1 className="doc-page__title">Form Controls</h1>
        <p className="doc-page__desc">
          A complete suite of accessible form controls. All support controlled and uncontrolled usage,
          ARIA labels, error states, and keyboard navigation.
        </p>
      </header>

      {/* TextField */}
      <div className="doc-section">
        <h2 className="doc-section__title">TextField</h2>
        <p className="doc-section__desc">
          The foundational text input. Supports labels, helper text, adornments, and error states.
        </p>
        <ComponentPreview
          code={`<TextField
  label="Email address"
  placeholder="you@example.com"
  inputSize="${textSize}"${showError ? `
  error
  helperText="Please enter a valid email address."` : `
  helperText="We'll never share your email."`}${showRequired ? '\n  required' : ''}
/>`}
          controls={
            <>
              <DemoControl
                label="Size"
                options={['sm', 'md', 'lg']}
                value={textSize}
                onChange={(v) => setTextSize(v as 'sm' | 'md' | 'lg')}
              />
              <DemoToggle label="Error" value={showError} onChange={setShowError} />
              <DemoToggle label="Required" value={showRequired} onChange={setShowRequired} />
            </>
          }
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 380 }}>
            <TextField
              label="Email address"
              placeholder="you@example.com"
              inputSize={textSize}
              error={showError}
              helperText={showError ? 'Please enter a valid email address.' : "We'll never share your email."}
              required={showRequired}
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Adornments */}
      <div className="doc-section">
        <h2 className="doc-section__title">Adornments</h2>
        <p className="doc-section__desc">
          Add icons, text, or interactive elements at the start or end of an input.
        </p>
        <ComponentPreview
          code={`<Stack gap={4}>
  <TextField
    label="Search"
    placeholder="Search components…"
    startAdornment={<SearchIcon />}
  />
  <TextField
    label="Amount"
    placeholder="0.00"
    startAdornment={<span>$</span>}
    endAdornment={<span>USD</span>}
    type="number"
  />
  <TextField
    label="Password"
    type="password"
    endAdornment={<EyeIcon />}
  />
</Stack>`}
          leftAlign
        >
          <Stack gap={4} style={{ width: '100%', maxWidth: 380 }}>
            <TextField
              label="Search"
              placeholder="Search components…"
              startAdornment={<SearchIcon />}
            />
            <TextField
              label="Amount"
              placeholder="0.00"
              startAdornment={<span style={{ color: 'var(--tokis-text-tertiary)', fontSize: 'var(--tokis-font-size-sm)' }}>$</span>}
              endAdornment={<span style={{ color: 'var(--tokis-text-tertiary)', fontSize: 'var(--tokis-font-size-sm)' }}>USD</span>}
              type="number"
            />
            <TextField
              label="Password"
              type="password"
              endAdornment={<EyeIcon />}
            />
          </Stack>
        </ComponentPreview>
      </div>

      {/* Textarea */}
      <div className="doc-section">
        <h2 className="doc-section__title">Textarea</h2>
        <ComponentPreview
          code={`<Textarea
  label="Description"
  placeholder="Tell us about your project…"
  rows={4}
  helperText="Max 500 characters."
/>`}
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 400 }}>
            <Textarea
              label="Description"
              placeholder="Tell us about your project…"
              rows={4}
              helperText="Max 500 characters."
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Select */}
      <div className="doc-section">
        <h2 className="doc-section__title">Select</h2>
        <p className="doc-section__desc">
          A custom dropdown with keyboard navigation, search, and groups.
          Renders into a Portal to avoid overflow clipping.
        </p>
        <ComponentPreview
          code={`<Select
  label="Framework"
  value={value}
  onChange={setValue}
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'solid', label: 'Solid' },
  ]}
  helperText="Select your preferred framework."
/>`}
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 360 }}>
            <Select
              label="Framework"
              value={selectValue}
              onChange={setSelectValue}
              options={[
                { value: 'react', label: 'React' },
                { value: 'vue', label: 'Vue' },
                { value: 'svelte', label: 'Svelte' },
                { value: 'solid', label: 'SolidJS' },
                { value: 'angular', label: 'Angular' },
              ]}
              helperText="Select your preferred framework."
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Checkbox */}
      <div className="doc-section">
        <h2 className="doc-section__title">Checkbox</h2>
        <ComponentPreview
          code={`<Stack gap={3}>
  <Checkbox label="Accept terms of service" description="Required to continue." />
  <Checkbox label="Subscribe to newsletter" defaultChecked />
  <Checkbox label="Feature flag (disabled)" disabled />
  <Checkbox label="Indeterminate example" indeterminate />
</Stack>`}
          leftAlign
        >
          <Stack gap={3} style={{ padding: 'var(--tokis-spacing-4)' }}>
            <Checkbox
              checked={checked}
              onChange={(c) => setChecked(c)}
              label="Accept terms of service"
              description="Required to continue using the platform."
            />
            <Checkbox label="Subscribe to newsletter" defaultChecked />
            <Checkbox label="Feature flag (disabled)" disabled />
            <Checkbox label="Indeterminate example" indeterminate />
          </Stack>
        </ComponentPreview>
      </div>

      {/* Radio */}
      <div className="doc-section">
        <h2 className="doc-section__title">Radio Group</h2>
        <ComponentPreview
          code={`<RadioGroup
  label="Notification preference"
  name="notifications"
  value={value}
  onChange={setValue}
>
  <Radio value="all" label="All notifications" description="Every event, in real-time." />
  <Radio value="mentions" label="Mentions only" description="Only when you're mentioned." />
  <Radio value="none" label="None" description="No notifications." />
</RadioGroup>`}
          leftAlign
        >
          <div style={{ padding: 'var(--tokis-spacing-4)' }}>
            <RadioGroup
              label="Notification preference"
              name="notifications"
              value={radioValue}
              onChange={setRadioValue}
            >
              <Radio value="all" label="All notifications" description="Every event, in real-time." />
              <Radio value="mentions" label="Mentions only" description="Only when you're mentioned." />
              <Radio value="none" label="None" description="No notifications." />
            </RadioGroup>
          </div>
        </ComponentPreview>
      </div>

      {/* Switch */}
      <div className="doc-section">
        <h2 className="doc-section__title">Switch</h2>
        <ComponentPreview
          code={`<Stack gap={3}>
  <Switch label="Dark mode" checked={on} onChange={setOn} />
  <Switch label="Analytics" size="sm" defaultChecked />
  <Switch label="Disabled feature" disabled />
</Stack>`}
          leftAlign
        >
          <Stack gap={3} style={{ padding: 'var(--tokis-spacing-4)' }}>
            <Switch label="Dark mode" checked={switchOn} onChange={setSwitchOn} />
            <Switch label="Analytics tracking" size="sm" defaultChecked />
            <Switch label="Disabled feature" disabled />
          </Stack>
        </ComponentPreview>
      </div>

      {/* Slider */}
      <div className="doc-section">
        <h2 className="doc-section__title">Slider</h2>
        <ComponentPreview
          code={`<Slider
  label="Quality"
  value={40}
  min={0}
  max={100}
  step={5}
  showValue
  onChange={setValue}
/>`}
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 400, padding: 'var(--tokis-spacing-4)' }}>
            <Slider
              label="Quality"
              value={sliderValue}
              min={0}
              max={100}
              step={5}
              showValue
              onChange={setSliderValue}
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — TextField</h2>
        <PropsTable props={textFieldProps} />
      </div>
    </>
  );
}
