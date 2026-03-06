import React, { useState } from 'react';
import { TextField, Textarea, Stack } from '@tokis/react';
import { ComponentPreview, DemoControl, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const textFieldProps: PropDef[] = [
  { name: 'label', type: 'string', description: 'Visible label above the input.' },
  { name: 'helperText', type: 'string', description: 'Helper/error text below the input.' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Applies error styling and sets aria-invalid.' },
  { name: 'inputSize', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Height and font size of the input.' },
  { name: 'startAdornment', type: 'ReactNode', description: 'Content placed at the start of the input.' },
  { name: 'endAdornment', type: 'ReactNode', description: 'Content placed at the end of the input.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Marks the field as required.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the input.' },
  { name: 'type', type: 'string', description: "HTML input type. Use 'password' to auto-render a show/hide toggle." },
];

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ color: 'var(--tokis-text-tertiary)' }}>
    <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.3" />
    <path d="M9 9l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export function TextFieldPage() {
  const [textSize, setTextSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [showError, setShowError] = useState(false);
  const [showRequired, setShowRequired] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Forms</p>
        <h1 className="doc-page__title">TextField</h1>
        <p className="doc-page__desc">
          The foundational text input. Supports labels, helper text, adornments, error states,
          and a built-in password visibility toggle.
        </p>
      </header>

      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Playground</h2>
        <ComponentPreview
          code={`<TextField
  label="Email address"
  placeholder="you@example.com"
  inputSize="${textSize}"${showError ? `\n  error\n  helperText="Please enter a valid email."` : `\n  helperText="We'll never share your email."`}${showRequired ? '\n  required' : ''}${disabled ? '\n  disabled' : ''}
/>`}
          controls={
            <>
              <DemoControl
                label="Size"
                options={['sm', 'md', 'lg']}
                value={textSize}
                onChange={(v) => setTextSize(v as typeof textSize)}
              />
              <DemoToggle label="Error" value={showError} onChange={setShowError} />
              <DemoToggle label="Required" value={showRequired} onChange={setShowRequired} />
              <DemoToggle label="Disabled" value={disabled} onChange={setDisabled} />
            </>
          }
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 380, margin: '0 auto' }}>
            <TextField
              label="Email address"
              placeholder="you@example.com"
              inputSize={textSize}
              error={showError}
              helperText={showError ? 'Please enter a valid email.' : "We'll never share your email."}
              required={showRequired}
              disabled={disabled}
            />
          </div>
        </ComponentPreview>
      </div>

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
          </Stack>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Password Field</h2>
        <p className="doc-section__desc">
          Set <code className="inline-code">type="password"</code> to automatically render a show/hide toggle button.
        </p>
        <ComponentPreview
          code={`<TextField
  label="Password"
  type="password"
  placeholder="Enter your password"
  helperText="At least 8 characters."
/>`}
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 380 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="Enter your password"
              helperText="At least 8 characters, one uppercase, one symbol."
            />
          </div>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Textarea</h2>
        <p className="doc-section__desc">
          Multi-line text input with the same label and helper text support.
        </p>
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

      <div className="doc-section">
        <h2 className="doc-section__title">Props — TextField</h2>
        <PropsTable props={textFieldProps} />
      </div>
    </>
  );
}
