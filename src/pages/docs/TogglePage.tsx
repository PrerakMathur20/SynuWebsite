import React, { useState } from 'react';
import { ToggleButton, ToggleGroup } from '@tokis/react';
import { ComponentPreview, DemoControl, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const toggleButtonProps: PropDef[] = [
  { name: 'pressed', type: 'boolean', required: true, description: 'Controlled pressed state.' },
  { name: 'onChange', type: '(pressed: boolean) => void', required: true, description: 'Called when the pressed state changes.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size variant controlling height and padding.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the toggle.' },
  { name: 'children', type: 'ReactNode', required: true, description: 'Content of the toggle button (label, icon, or both).' },
  { name: 'className', type: 'string', description: 'Additional class name applied to the button.' },
];

const toggleGroupProps: PropDef[] = [
  { name: 'options', type: 'ToggleOption[]', required: true, description: 'Array of options. Each has value, label, and optional disabled.' },
  { name: 'value', type: 'string | string[]', description: 'Controlled selected value(s). Pass an array when multiple is true.' },
  { name: 'onChange', type: '(value: string | string[]) => void', description: 'Called when selection changes.' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Allows multiple options to be selected simultaneously.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size variant applied to all buttons in the group.' },
  { name: 'className', type: 'string', description: 'Additional class name applied to the group container.' },
];

const AlignLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M1 3h12M1 7h8M1 11h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const AlignCenterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M1 3h12M3 7h8M2 11h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const AlignRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M1 3h12M5 7h8M3 11h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const AlignJustifyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M1 3h12M1 7h12M1 11h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export function TogglePage() {
  // ToggleButton state: bold, italic, underline
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

  // ToggleGroup state: alignment
  const [alignment, setAlignment] = useState<string>('left');
  const [multipleSize, setMultipleSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [multipleEnabled, setMultipleEnabled] = useState(false);
  const [multipleAlignment, setMultipleAlignment] = useState<string[]>(['left']);

  const alignmentOptions = [
    { value: 'left', label: <AlignLeftIcon /> },
    { value: 'center', label: <AlignCenterIcon /> },
    { value: 'right', label: <AlignRightIcon /> },
    { value: 'justify', label: <AlignJustifyIcon /> },
  ];

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Forms</p>
        <h1 className="doc-page__title">Toggle</h1>
        <p className="doc-page__desc">
          A two-state button that can be on or off. Use <strong>ToggleButton</strong> for a standalone
          press/release control, and <strong>ToggleGroup</strong> for mutually exclusive (or multi-select)
          option sets. Both follow WAI-ARIA Button and Toolbar patterns.
        </p>
      </header>

      {/* ToggleButton: text formatting */}
      <div className="doc-section">
        <h2 className="doc-section__title">ToggleButton — Text Formatting</h2>
        <p className="doc-section__desc">
          Each button manages its own independent pressed state. Useful for toolbar-style formatting
          controls where options are not mutually exclusive.
        </p>
        <ComponentPreview
          code={`const [bold, setBold] = useState(false);
const [italic, setItalic] = useState(false);
const [underline, setUnderline] = useState(false);

<div style={{ display: 'flex', gap: 4 }}>
  <ToggleButton pressed={bold} onChange={setBold}>
    <strong>B</strong>
  </ToggleButton>
  <ToggleButton pressed={italic} onChange={setItalic}>
    <em>I</em>
  </ToggleButton>
  <ToggleButton pressed={underline} onChange={setUnderline}>
    <span style={{ textDecoration: 'underline' }}>U</span>
  </ToggleButton>
</div>`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <div style={{ display: 'flex', gap: 4 }}>
              <ToggleButton pressed={bold} onChange={setBold} aria-label="Bold">
                <strong style={{ fontSize: 'var(--tokis-font-size-sm)', fontFamily: 'var(--tokis-font-family-sans)' }}>B</strong>
              </ToggleButton>
              <ToggleButton pressed={italic} onChange={setItalic} aria-label="Italic">
                <em style={{ fontSize: 'var(--tokis-font-size-sm)', fontFamily: 'Georgia, serif' }}>I</em>
              </ToggleButton>
              <ToggleButton pressed={underline} onChange={setUnderline} aria-label="Underline">
                <span style={{ fontSize: 'var(--tokis-font-size-sm)', textDecoration: 'underline', fontFamily: 'var(--tokis-font-family-sans)' }}>U</span>
              </ToggleButton>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 'var(--tokis-font-size-sm)',
                color: 'var(--tokis-text-primary)',
                fontWeight: bold ? 700 : 400,
                fontStyle: italic ? 'italic' : 'normal',
                textDecoration: underline ? 'underline' : 'none',
                minHeight: '1.5em',
              }}
            >
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        </ComponentPreview>
      </div>

      {/* ToggleGroup: alignment */}
      <div className="doc-section">
        <h2 className="doc-section__title">ToggleGroup — Text Alignment</h2>
        <p className="doc-section__desc">
          By default <code>ToggleGroup</code> enforces single selection (like a radio group). Toggle
          "Allow multiple" to enable selecting more than one option simultaneously.
        </p>
        <ComponentPreview
          code={`<ToggleGroup
  options={[
    { value: 'left', label: <AlignLeftIcon /> },
    { value: 'center', label: <AlignCenterIcon /> },
    { value: 'right', label: <AlignRightIcon /> },
    { value: 'justify', label: <AlignJustifyIcon /> },
  ]}
  value={alignment}
  onChange={setAlignment}
  multiple={${multipleEnabled}}
  size="${multipleSize}"
/>`}
          controls={
            <>
              <DemoControl
                label="Size"
                options={['sm', 'md', 'lg']}
                value={multipleSize}
                onChange={(v) => setMultipleSize(v as typeof multipleSize)}
              />
              <DemoToggle
                label="Allow multiple"
                value={multipleEnabled}
                onChange={(val) => {
                  setMultipleEnabled(val);
                  if (val) {
                    setMultipleAlignment(typeof alignment === 'string' ? [alignment] : alignment as unknown as string[]);
                  } else {
                    const cur = multipleAlignment[0] ?? 'left';
                    setAlignment(cur);
                  }
                }}
              />
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            {multipleEnabled ? (
              <ToggleGroup
                options={alignmentOptions}
                value={multipleAlignment}
                onChange={(v) => setMultipleAlignment(v as string[])}
                multiple
                size={multipleSize}
              />
            ) : (
              <ToggleGroup
                options={alignmentOptions}
                value={alignment}
                onChange={(v) => setAlignment(v as string)}
                size={multipleSize}
              />
            )}
            <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)' }}>
              {multipleEnabled
                ? `Selected: ${multipleAlignment.length > 0 ? multipleAlignment.join(', ') : 'none'}`
                : `Selected: ${alignment}`}
            </p>
          </div>
        </ComponentPreview>
      </div>

      {/* Disabled options */}
      <div className="doc-section">
        <h2 className="doc-section__title">Disabled State</h2>
        <p className="doc-section__desc">
          Individual options in a <code>ToggleGroup</code> can be disabled via the <code>disabled</code> field
          on the option object. A standalone <code>ToggleButton</code> can be disabled via its <code>disabled</code> prop.
        </p>
        <ComponentPreview
          code={`<ToggleGroup
  options={[
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center', disabled: true },
    { value: 'right', label: 'Right' },
  ]}
  value="left"
/>

<ToggleButton pressed={false} disabled>
  Disabled
</ToggleButton>`}
        >
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <ToggleGroup
              options={[
                { value: 'left', label: 'Left' },
                { value: 'center', label: 'Center', disabled: true },
                { value: 'right', label: 'Right' },
              ]}
              value="left"
              onChange={() => {}}
            />
            <ToggleButton pressed={false} onChange={() => {}} disabled>
              Disabled
            </ToggleButton>
          </div>
        </ComponentPreview>
      </div>

      {/* Props — ToggleButton */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — ToggleButton</h2>
        <PropsTable props={toggleButtonProps} />
      </div>

      {/* Props — ToggleGroup */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — ToggleGroup</h2>
        <PropsTable props={toggleGroupProps} />
      </div>
    </>
  );
}
