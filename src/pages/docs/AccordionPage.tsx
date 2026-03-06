import React, { useState } from 'react';
import { Accordion, Stack, Badge } from '@tokis/react';
import { ComponentPreview, DemoControl, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const accordionProps: PropDef[] = [
  { name: 'items', type: 'AccordionItem[]', required: true, description: 'Array of accordion items with value, trigger, and content.' },
  { name: 'type', type: "'single' | 'multiple'", default: "'single'", description: 'Single allows one panel open; multiple allows many.' },
  { name: 'collapsible', type: 'boolean', default: 'true', description: 'In single mode, allows closing the open panel by clicking again.' },
  { name: 'variant', type: "'bordered' | 'flush'", default: "'bordered'", description: 'Visual style — bordered has individual item borders, flush is minimal.' },
  { name: 'defaultValue', type: 'string | string[]', description: 'Initially open item(s).' },
  { name: 'value', type: 'string | string[]', description: 'Controlled open value.' },
  { name: 'onChange', type: '(value: string | string[]) => void', description: 'Called when open state changes.' },
];

const faqItems = [
  {
    value: 'zero-runtime',
    trigger: 'What does "zero runtime styling" mean?',
    content: (
      <p style={{ margin: 0, color: 'var(--tokis-text-secondary)', fontSize: 'var(--tokis-font-size-sm)', lineHeight: 1.6 }}>
        Zero runtime styling means that all CSS is pre-compiled during the build step — not generated in JavaScript at runtime.
        Unlike libraries that use CSS-in-JS (emotion, styled-components), Tokis's styles are static CSS that ships once.
        This eliminates style recalculation costs and makes your app faster to paint.
      </p>
    ),
  },
  {
    value: 'tokens',
    trigger: 'How does the token system work?',
    content: (
      <div>
        <p style={{ margin: '0 0 12px', color: 'var(--tokis-text-secondary)', fontSize: 'var(--tokis-font-size-sm)', lineHeight: 1.6 }}>
          Every design value — color, spacing, radius, shadow, motion — is a CSS custom property.
          Light and dark themes swap these variables using the <code style={{ fontFamily: 'monospace', fontSize: '0.8em' }}>[data-theme="dark"]</code> selector.
        </p>
        <Stack direction="row" gap={2} wrap>
          <Badge variant="primary">Colors</Badge>
          <Badge variant="info">Spacing</Badge>
          <Badge variant="success">Typography</Badge>
          <Badge variant="warning">Motion</Badge>
          <Badge variant="default">Shadows</Badge>
        </Stack>
      </div>
    ),
  },
  {
    value: 'accessible',
    trigger: 'Is Tokis accessible out of the box?',
    content: (
      <p style={{ margin: 0, color: 'var(--tokis-text-secondary)', fontSize: 'var(--tokis-font-size-sm)', lineHeight: 1.6 }}>
        Yes. Every interactive component follows WAI-ARIA patterns. Accordions implement the ARIA Accordion Pattern
        with proper roles (button, region), aria-expanded, aria-controls, and aria-labelledby.
        Keyboard navigation uses Space/Enter to toggle, Tab to move between items.
      </p>
    ),
  },
  {
    value: 'rtl',
    trigger: 'Is RTL supported?',
    content: (
      <p style={{ margin: 0, color: 'var(--tokis-text-secondary)', fontSize: 'var(--tokis-font-size-sm)', lineHeight: 1.6 }}>
        RTL support is planned for the stable release. CSS logical properties are used where possible
        to minimize the delta between LTR and RTL layouts.
      </p>
    ),
    disabled: false,
  },
];

export function AccordionPage() {
  const [type, setType] = useState<'single' | 'multiple'>('single');
  const [variant, setVariant] = useState<'bordered' | 'flush'>('bordered');
  const [collapsible, setCollapsible] = useState(true);

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Interactive</p>
        <h1 className="doc-page__title">Accordion</h1>
        <p className="doc-page__desc">
          Expandable content sections. Supports single and multiple open panels,
          full keyboard navigation, and WAI-ARIA Accordion Pattern compliance.
        </p>
      </header>

      {/* Interactive */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Playground</h2>
        <ComponentPreview
          code={`<Accordion
  type="${type}"
  variant="${variant}"${!collapsible ? '\n  collapsible={false}' : ''}
  defaultValue="zero-runtime"
  items={[
    {
      value: 'zero-runtime',
      trigger: 'What does "zero runtime styling" mean?',
      content: <p>...</p>,
    },
    {
      value: 'tokens',
      trigger: 'How does the token system work?',
      content: <p>...</p>,
    },
    // ...
  ]}
/>`}
          controls={
            <>
              <DemoControl
                label="Type"
                options={['single', 'multiple']}
                value={type}
                onChange={(v) => setType(v as 'single' | 'multiple')}
              />
              <DemoControl
                label="Variant"
                options={['bordered', 'flush']}
                value={variant}
                onChange={(v) => setVariant(v as 'bordered' | 'flush')}
              />
              <DemoToggle label="Collapsible" value={collapsible} onChange={setCollapsible} />
            </>
          }
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 580 }}>
            <Accordion
              type={type}
              variant={variant}
              collapsible={collapsible}
              defaultValue="zero-runtime"
              items={faqItems}
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Multiple mode */}
      <div className="doc-section">
        <h2 className="doc-section__title">Multiple Open Panels</h2>
        <p className="doc-section__desc">
          Use <code className="inline-code">type="multiple"</code> to allow any number of panels open simultaneously.
        </p>
        <ComponentPreview
          code={`<Accordion
  type="multiple"
  defaultValue={['a', 'c']}
  items={[
    { value: 'a', trigger: 'Panel A', content: 'Content A' },
    { value: 'b', trigger: 'Panel B', content: 'Content B' },
    { value: 'c', trigger: 'Panel C', content: 'Content C' },
  ]}
/>`}
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 480 }}>
            <Accordion
              type="multiple"
              defaultValue={['a', 'c']}
              items={[
                { value: 'a', trigger: 'Panel A', content: <p style={{ margin: 0, color: 'var(--tokis-text-secondary)' }}>Content for panel A. Multiple panels can be open at once.</p> },
                { value: 'b', trigger: 'Panel B (closed by default)', content: <p style={{ margin: 0, color: 'var(--tokis-text-secondary)' }}>Content for panel B.</p> },
                { value: 'c', trigger: 'Panel C', content: <p style={{ margin: 0, color: 'var(--tokis-text-secondary)' }}>Content for panel C. Both A and C are open by default.</p> },
              ]}
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Flush variant */}
      <div className="doc-section">
        <h2 className="doc-section__title">Flush Variant</h2>
        <p className="doc-section__desc">
          The flush variant removes individual item borders, creating a cleaner look inside cards or panels.
        </p>
        <ComponentPreview
          code={`<Accordion variant="flush" type="single" collapsible items={[...]} />`}
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 480 }}>
            <Accordion
              variant="flush"
              type="single"
              collapsible
              items={[
                { value: '1', trigger: 'Is the API stable?', content: <p style={{ margin: 0, color: 'var(--tokis-text-secondary)' }}>The library is in v0.1.0 beta. Minor breaking changes may occur before v1.0.</p> },
                { value: '2', trigger: 'Does it work with Next.js?', content: <p style={{ margin: 0, color: 'var(--tokis-text-secondary)' }}>Yes. CSS imports and ThemeProvider work with both App Router and Pages Router.</p> },
                { value: '3', trigger: 'Is server-side rendering supported?', content: <p style={{ margin: 0, color: 'var(--tokis-text-secondary)' }}>Yes. All components are SSR-safe. Use InitColorSchemeScript to prevent theme flash.</p> },
              ]}
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Disabled items */}
      <div className="doc-section">
        <h2 className="doc-section__title">Disabled Items</h2>
        <ComponentPreview
          code={`<Accordion items={[
  { value: 'active', trigger: 'Available feature', content: '...' },
  { value: 'disabled', trigger: 'Disabled feature', content: '...', disabled: true },
]} />`}
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 480 }}>
            <Accordion
              items={[
                { value: 'active', trigger: 'Available feature', content: <p style={{ margin: 0, color: 'var(--tokis-text-secondary)' }}>This panel is fully interactive.</p> },
                { value: 'disabled', trigger: 'Disabled feature (coming soon)', content: 'This panel is disabled.', disabled: true },
              ]}
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={accordionProps} />
      </div>
    </>
  );
}
