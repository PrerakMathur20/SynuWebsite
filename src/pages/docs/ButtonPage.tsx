import React, { useState } from 'react';
import { ButtonRoot, ButtonLabel, ButtonIcon, Stack } from '@tokis/react';
import { ComponentPreview, DemoControl, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';
import { CodeBlock } from '../../components/CodeBlock';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

const SaveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M11 12H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h7l2 2v7a1 1 0 0 1-1 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    <path d="M9 12V8H5v4" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const buttonProps: PropDef[] = [
  { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive' | 'link'", default: "'primary'", description: 'Visual style of the button.' },
  { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Controls padding and font size.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows a spinner and disables the button. Sets aria-busy.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button. Sets aria-disabled on non-native elements.' },
  { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretches the button to fill its container.' },
  { name: 'iconOnly', type: 'boolean', default: 'false', description: 'Makes the button square for icon-only use cases.' },
  { name: 'as', type: 'React.ElementType', default: "'button'", description: 'Render as a different element (e.g. Link, a).' },
];

export function ButtonPage() {
  const [variant, setVariant] = useState<ButtonVariant>('primary');
  const [size, setSize] = useState<ButtonSize>('md');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [fullWidth, setFullWidth] = useState(false);

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Components</p>
        <h1 className="doc-page__title">Button</h1>
        <p className="doc-page__desc">
          Triggers an action or event. Accessible press semantics built-in.
          Polymorphic — can render as a link, router link, or any element.
        </p>
      </header>

      {/* Interactive Demo */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Playground</h2>
        <ComponentPreview
          code={`import { ButtonRoot, ButtonLabel } from '@tokis/react';

<ButtonRoot
  variant="${variant}"
  size="${size}"${loading ? '\n  loading' : ''}${disabled ? '\n  disabled' : ''}${fullWidth ? '\n  fullWidth' : ''}
>
  <ButtonLabel>Click me</ButtonLabel>
</ButtonRoot>`}
          controls={
            <>
              <DemoControl
                label="Variant"
                options={['primary', 'secondary', 'ghost', 'outline', 'destructive', 'link']}
                value={variant}
                onChange={(v) => setVariant(v as ButtonVariant)}
              />
              <DemoControl
                label="Size"
                options={['sm', 'md', 'lg', 'xl']}
                value={size}
                onChange={(v) => setSize(v as ButtonSize)}
              />
              <DemoToggle label="Loading" value={loading} onChange={setLoading} />
              <DemoToggle label="Disabled" value={disabled} onChange={setDisabled} />
              <DemoToggle label="Full Width" value={fullWidth} onChange={setFullWidth} />
            </>
          }
        >
          <ButtonRoot
            variant={variant}
            size={size}
            loading={loading}
            disabled={disabled}
            fullWidth={fullWidth}
          >
            <ButtonLabel>Click me</ButtonLabel>
          </ButtonRoot>
        </ComponentPreview>
      </div>

      {/* All Variants */}
      <div className="doc-section">
        <h2 className="doc-section__title">Variants</h2>
        <p className="doc-section__desc">
          Six semantic variants cover every use case from primary actions to destructive operations.
        </p>
        <ComponentPreview
          code={`<Stack direction="row" gap={3} wrap>
  <ButtonRoot variant="primary"><ButtonLabel>Primary</ButtonLabel></ButtonRoot>
  <ButtonRoot variant="secondary"><ButtonLabel>Secondary</ButtonLabel></ButtonRoot>
  <ButtonRoot variant="ghost"><ButtonLabel>Ghost</ButtonLabel></ButtonRoot>
  <ButtonRoot variant="outline"><ButtonLabel>Outline</ButtonLabel></ButtonRoot>
  <ButtonRoot variant="destructive"><ButtonLabel>Destructive</ButtonLabel></ButtonRoot>
  <ButtonRoot variant="link"><ButtonLabel>Link</ButtonLabel></ButtonRoot>
</Stack>`}
        >
          <Stack direction="row" gap={3} wrap>
            <ButtonRoot variant="primary"><ButtonLabel>Primary</ButtonLabel></ButtonRoot>
            <ButtonRoot variant="secondary"><ButtonLabel>Secondary</ButtonLabel></ButtonRoot>
            <ButtonRoot variant="ghost"><ButtonLabel>Ghost</ButtonLabel></ButtonRoot>
            <ButtonRoot variant="outline"><ButtonLabel>Outline</ButtonLabel></ButtonRoot>
            <ButtonRoot variant="destructive"><ButtonLabel>Destructive</ButtonLabel></ButtonRoot>
            <ButtonRoot variant="link"><ButtonLabel>Link</ButtonLabel></ButtonRoot>
          </Stack>
        </ComponentPreview>
      </div>

      {/* Sizes */}
      <div className="doc-section">
        <h2 className="doc-section__title">Sizes</h2>
        <p className="doc-section__desc">Four sizes adapt to different UI densities.</p>
        <ComponentPreview
          code={`<Stack direction="row" gap={3} align="center" wrap>
  <ButtonRoot size="sm"><ButtonLabel>Small</ButtonLabel></ButtonRoot>
  <ButtonRoot size="md"><ButtonLabel>Medium</ButtonLabel></ButtonRoot>
  <ButtonRoot size="lg"><ButtonLabel>Large</ButtonLabel></ButtonRoot>
  <ButtonRoot size="xl"><ButtonLabel>X-Large</ButtonLabel></ButtonRoot>
</Stack>`}
        >
          <Stack direction="row" gap={3} align="center" wrap>
            <ButtonRoot size="sm"><ButtonLabel>Small</ButtonLabel></ButtonRoot>
            <ButtonRoot size="md"><ButtonLabel>Medium</ButtonLabel></ButtonRoot>
            <ButtonRoot size="lg"><ButtonLabel>Large</ButtonLabel></ButtonRoot>
            <ButtonRoot size="xl"><ButtonLabel>X-Large</ButtonLabel></ButtonRoot>
          </Stack>
        </ComponentPreview>
      </div>

      {/* With Icons */}
      <div className="doc-section">
        <h2 className="doc-section__title">With Icons</h2>
        <p className="doc-section__desc">
          Compose icons using <code className="inline-code">ButtonIcon</code>. Icons are aria-hidden by default.
          Use <code className="inline-code">iconOnly</code> for square icon buttons with an accessible label.
        </p>
        <ComponentPreview
          code={`import { ButtonRoot, ButtonIcon, ButtonLabel } from '@tokis/react';

<Stack direction="row" gap={3} wrap>
  {/* Leading icon */}
  <ButtonRoot variant="primary">
    <ButtonIcon><SaveIcon /></ButtonIcon>
    <ButtonLabel>Save</ButtonLabel>
  </ButtonRoot>

  {/* Trailing icon */}
  <ButtonRoot variant="outline">
    <ButtonLabel>Add item</ButtonLabel>
    <ButtonIcon><PlusIcon /></ButtonIcon>
  </ButtonRoot>

  {/* Icon only */}
  <ButtonRoot variant="ghost" iconOnly aria-label="Add item">
    <ButtonIcon><PlusIcon /></ButtonIcon>
  </ButtonRoot>
</Stack>`}
        >
          <Stack direction="row" gap={3} wrap align="center">
            <ButtonRoot variant="primary">
              <ButtonIcon><SaveIcon /></ButtonIcon>
              <ButtonLabel>Save</ButtonLabel>
            </ButtonRoot>
            <ButtonRoot variant="outline">
              <ButtonLabel>Add item</ButtonLabel>
              <ButtonIcon><PlusIcon /></ButtonIcon>
            </ButtonRoot>
            <ButtonRoot variant="ghost" iconOnly aria-label="Add item">
              <ButtonIcon><PlusIcon /></ButtonIcon>
            </ButtonRoot>
          </Stack>
        </ComponentPreview>
      </div>

      {/* States */}
      <div className="doc-section">
        <h2 className="doc-section__title">States</h2>
        <p className="doc-section__desc">
          Loading state shows a spinner and prevents interaction.
          Disabled state is communicated to assistive technologies.
        </p>
        <ComponentPreview
          code={`<Stack direction="row" gap={3} wrap>
  <ButtonRoot variant="primary" loading>
    <ButtonLabel>Loading</ButtonLabel>
  </ButtonRoot>
  <ButtonRoot variant="secondary" disabled>
    <ButtonLabel>Disabled</ButtonLabel>
  </ButtonRoot>
  <ButtonRoot variant="outline" loading>
    <ButtonLabel>Processing…</ButtonLabel>
  </ButtonRoot>
</Stack>`}
        >
          <Stack direction="row" gap={3} wrap>
            <ButtonRoot variant="primary" loading><ButtonLabel>Loading</ButtonLabel></ButtonRoot>
            <ButtonRoot variant="secondary" disabled><ButtonLabel>Disabled</ButtonLabel></ButtonRoot>
            <ButtonRoot variant="outline" loading><ButtonLabel>Processing…</ButtonLabel></ButtonRoot>
          </Stack>
        </ComponentPreview>
      </div>

      {/* Polymorphic */}
      <div className="doc-section">
        <h2 className="doc-section__title">Polymorphic Usage</h2>
        <p className="doc-section__desc">
          Render as any element or component using the <code className="inline-code">as</code> prop.
          Perfect for React Router or Next.js links.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { Link } from 'react-router-dom';
import { ButtonRoot, ButtonLabel } from '@tokis/react';

// Renders as a React Router link — keyboard, focus, ARIA all preserved
<ButtonRoot as={Link} to="/dashboard" variant="primary">
  <ButtonLabel>Go to Dashboard</ButtonLabel>
</ButtonRoot>

// Renders as a native anchor tag
<ButtonRoot as="a" href="https://github.com" target="_blank" variant="outline">
  <ButtonLabel>View on GitHub</ButtonLabel>
</ButtonRoot>`}
        />
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — ButtonRoot</h2>
        <PropsTable props={buttonProps} />
      </div>
    </>
  );
}
