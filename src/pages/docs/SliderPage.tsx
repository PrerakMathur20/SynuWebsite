import React, { useState } from 'react';
import { Slider, Stack } from '@tokis/react';
import { ComponentPreview, DemoControl, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const sliderProps: PropDef[] = [
  { name: 'value', type: 'number', description: 'Controlled current value.' },
  { name: 'defaultValue', type: 'number', default: '0', description: 'Initial value (uncontrolled).' },
  { name: 'min', type: 'number', default: '0', description: 'Minimum value.' },
  { name: 'max', type: 'number', default: '100', description: 'Maximum value.' },
  { name: 'step', type: 'number', default: '1', description: 'Step increment between values.' },
  { name: 'onChange', type: '(value: number) => void', description: 'Called when value changes.' },
  { name: 'label', type: 'string', description: 'Accessible label and visible label text.' },
  { name: 'showValue', type: 'boolean', default: 'false', description: 'Displays current value inline.' },
  { name: 'marks', type: 'boolean | Mark[]', description: 'Show tick marks at min/max or custom positions.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction.' },
];

export function SliderPage() {
  const [quality, setQuality] = useState(60);
  const [volume, setVolume] = useState(35);
  const [zoom, setZoom] = useState(100);
  const [range, setRange] = useState(40);

  const [showValue, setShowValue] = useState(true);
  const [showMarks, setShowMarks] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Forms</p>
        <h1 className="doc-page__title">Slider</h1>
        <p className="doc-page__desc">
          Drag or keyboard-navigate to select a value within a range. Fully accessible with
          arrow key support, min/max/step, marks, and value display.
        </p>
      </header>

      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Playground</h2>
        <ComponentPreview
          code={`<Slider
  label="Quality"
  value={${quality}}
  min={0}
  max={100}
  step={5}${showValue ? '\n  showValue' : ''}${showMarks ? '\n  marks' : ''}${disabled ? '\n  disabled' : ''}
  onChange={setValue}
/>`}
          controls={
            <>
              <DemoToggle label="Show Value" value={showValue} onChange={setShowValue} />
              <DemoToggle label="Show Marks" value={showMarks} onChange={setShowMarks} />
              <DemoToggle label="Disabled" value={disabled} onChange={setDisabled} />
            </>
          }
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 400, padding: 'var(--tokis-spacing-4)', margin: '0 auto' }}>
            <Slider
              label="Quality"
              value={quality}
              min={0}
              max={100}
              step={5}
              showValue={showValue}
              marks={showMarks}
              disabled={disabled}
              onChange={setQuality}
            />
          </div>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Audio Controls Example</h2>
        <p className="doc-section__desc">
          Multiple sliders with different ranges and steps.
        </p>
        <ComponentPreview
          code={`<Stack gap={6} style={{ width: '100%', maxWidth: 400 }}>
  <Slider label="Volume" value={volume} onChange={setVolume} showValue />
  <Slider label="Bass" min={-12} max={12} step={1} defaultValue={0} showValue />
  <Slider label="Zoom" min={50} max={200} step={10} value={zoom} onChange={setZoom} showValue />
</Stack>`}
          leftAlign
        >
          <Stack gap={6} style={{ width: '100%', maxWidth: 400, padding: 'var(--tokis-spacing-4)' }}>
            <Slider label="Volume" value={volume} onChange={setVolume} showValue min={0} max={100} />
            <Slider label="Bass" min={-12} max={12} step={1} defaultValue={0} showValue marks />
            <Slider label="Zoom" min={50} max={200} step={10} value={zoom} onChange={setZoom} showValue />
          </Stack>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">With Custom Marks</h2>
        <p className="doc-section__desc">
          Pass an array of mark objects to label specific values.
        </p>
        <ComponentPreview
          code={`<Slider
  label="Plan tier"
  min={0}
  max={3}
  step={1}
  marks={[
    { value: 0, label: 'Free' },
    { value: 1, label: 'Starter' },
    { value: 2, label: 'Pro' },
    { value: 3, label: 'Enterprise' },
  ]}
/>`}
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 400, padding: 'var(--tokis-spacing-4) var(--tokis-spacing-4) var(--tokis-spacing-8)' }}>
            <Slider
              label="Plan tier"
              min={0}
              max={3}
              step={1}
              defaultValue={1}
              marks={[
                { value: 0, label: 'Free' },
                { value: 1, label: 'Starter' },
                { value: 2, label: 'Pro' },
                { value: 3, label: 'Enterprise' },
              ]}
            />
          </div>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Keyboard Navigation</h2>
        <p className="doc-section__desc">
          The slider thumb is focusable. Use these keys to adjust the value:
        </p>
        <ul style={{ fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)', lineHeight: 2 }}>
          <li><kbd style={{ fontFamily: 'monospace', padding: '1px 6px', background: 'var(--tokis-color-surface)', border: '1px solid var(--tokis-color-border)', borderRadius: 4 }}>←</kbd> / <kbd style={{ fontFamily: 'monospace', padding: '1px 6px', background: 'var(--tokis-color-surface)', border: '1px solid var(--tokis-color-border)', borderRadius: 4 }}>↓</kbd> — decrease by step</li>
          <li><kbd style={{ fontFamily: 'monospace', padding: '1px 6px', background: 'var(--tokis-color-surface)', border: '1px solid var(--tokis-color-border)', borderRadius: 4 }}>→</kbd> / <kbd style={{ fontFamily: 'monospace', padding: '1px 6px', background: 'var(--tokis-color-surface)', border: '1px solid var(--tokis-color-border)', borderRadius: 4 }}>↑</kbd> — increase by step</li>
          <li><kbd style={{ fontFamily: 'monospace', padding: '1px 6px', background: 'var(--tokis-color-surface)', border: '1px solid var(--tokis-color-border)', borderRadius: 4 }}>Home</kbd> — jump to minimum</li>
          <li><kbd style={{ fontFamily: 'monospace', padding: '1px 6px', background: 'var(--tokis-color-surface)', border: '1px solid var(--tokis-color-border)', borderRadius: 4 }}>End</kbd> — jump to maximum</li>
          <li><kbd style={{ fontFamily: 'monospace', padding: '1px 6px', background: 'var(--tokis-color-surface)', border: '1px solid var(--tokis-color-border)', borderRadius: 4 }}>Page Up/Down</kbd> — jump by 10 × step</li>
        </ul>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={sliderProps} />
      </div>
    </>
  );
}
