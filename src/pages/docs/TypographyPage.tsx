import React from 'react';
import { Typography, Stack, Divider } from '@tokis/react';
import { ComponentPreview } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';
import { CodeBlock } from '../../components/CodeBlock';

const typographyProps: PropDef[] = [
  { name: 'variant', type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'label' | 'code' | 'overline'", default: "'body1'", description: 'Semantic variant controlling element and visual style.' },
  { name: 'color', type: "'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'warning' | 'inherit'", default: 'undefined', description: 'Text color using semantic tokens.' },
  { name: 'weight', type: "'regular' | 'medium' | 'semibold' | 'bold'", default: 'undefined', description: 'Font weight override.' },
  { name: 'align', type: "'left' | 'center' | 'right'", default: 'undefined', description: 'Text alignment.' },
  { name: 'truncate', type: 'boolean', default: 'false', description: 'Truncates text with an ellipsis on overflow.' },
  { name: 'as', type: 'React.ElementType', default: 'variant-based', description: 'Override the rendered element (polymorphic).' },
];

export function TypographyPage() {
  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Foundations</p>
        <h1 className="doc-page__title">Typography</h1>
        <p className="doc-page__desc">
          A semantic typography system with 12 variants. Each variant maps to a semantic HTML element
          and uses Tokis's type scale — ensuring consistent rhythm throughout your UI.
        </p>
      </header>

      {/* Type Scale */}
      <div className="doc-section">
        <h2 className="doc-section__title">Type Scale</h2>
        <p className="doc-section__desc">
          Headings and body text rendered at their default sizes.
        </p>
        <ComponentPreview
          code={`import { Typography } from '@tokis/react';

<Typography variant="h1">Heading 1</Typography>
<Typography variant="h2">Heading 2</Typography>
<Typography variant="h3">Heading 3</Typography>
<Typography variant="h4">Heading 4</Typography>
<Typography variant="h5">Heading 5</Typography>
<Typography variant="h6">Heading 6</Typography>
<Typography variant="body1">Body 1 — Primary text. Used for main content, descriptions, and readable paragraphs.</Typography>
<Typography variant="body2">Body 2 — Smaller body text for secondary content.</Typography>
<Typography variant="caption">Caption — Fine print, metadata, timestamps.</Typography>
<Typography variant="overline">OVERLINE — Section labels, eyebrows.</Typography>`}
          leftAlign
        >
          <Stack gap={3} style={{ width: '100%', padding: 'var(--tokis-spacing-4)' }}>
            <Typography variant="h1">Heading 1</Typography>
            <Typography variant="h2">Heading 2</Typography>
            <Typography variant="h3">Heading 3</Typography>
            <Typography variant="h4">Heading 4</Typography>
            <Typography variant="h5">Heading 5</Typography>
            <Typography variant="h6">Heading 6</Typography>
            <Divider />
            <Typography variant="body1">Body 1 — Primary text. Used for main content, descriptions, and readable paragraphs.</Typography>
            <Typography variant="body2">Body 2 — Smaller body text for secondary content.</Typography>
            <Typography variant="caption">Caption — Fine print, metadata, timestamps.</Typography>
            <Typography variant="overline">OVERLINE — Section labels, eyebrows.</Typography>
          </Stack>
        </ComponentPreview>
      </div>

      {/* Colors */}
      <div className="doc-section">
        <h2 className="doc-section__title">Color</h2>
        <p className="doc-section__desc">
          Semantic color tokens adapt automatically to light and dark mode.
        </p>
        <ComponentPreview
          code={`<Typography color="primary">Primary — main text color</Typography>
<Typography color="secondary">Secondary — supporting text</Typography>
<Typography color="tertiary">Tertiary — de-emphasized</Typography>
<Typography color="error">Error — validation errors</Typography>
<Typography color="success">Success — confirmations</Typography>
<Typography color="warning">Warning — caution states</Typography>`}
          leftAlign
        >
          <Stack gap={2} style={{ padding: 'var(--tokis-spacing-4)' }}>
            <Typography color="primary">Primary — main text color</Typography>
            <Typography color="secondary">Secondary — supporting text</Typography>
            <Typography color="tertiary">Tertiary — de-emphasized</Typography>
            <Typography color="error">Error — validation errors</Typography>
            <Typography color="success">Success — confirmations</Typography>
            <Typography color="warning">Warning — caution states</Typography>
          </Stack>
        </ComponentPreview>
      </div>

      {/* Weight */}
      <div className="doc-section">
        <h2 className="doc-section__title">Weight</h2>
        <ComponentPreview
          code={`<Typography weight="regular">Regular 400 — default body weight</Typography>
<Typography weight="medium">Medium 500 — slightly emphasized</Typography>
<Typography weight="semibold">Semibold 600 — labels and headings</Typography>
<Typography weight="bold">Bold 700 — strong emphasis</Typography>`}
          leftAlign
        >
          <Stack gap={2} style={{ padding: 'var(--tokis-spacing-4)' }}>
            <Typography weight="regular">Regular 400 — default body weight</Typography>
            <Typography weight="medium">Medium 500 — slightly emphasized</Typography>
            <Typography weight="semibold">Semibold 600 — labels and headings</Typography>
            <Typography weight="bold">Bold 700 — strong emphasis</Typography>
          </Stack>
        </ComponentPreview>
      </div>

      {/* Code variant */}
      <div className="doc-section">
        <h2 className="doc-section__title">Code</h2>
        <p className="doc-section__desc">
          Inline code uses the monospace font stack and a subtle background.
        </p>
        <ComponentPreview
          code={`<p>
  Use the <Typography variant="code">useTheme()</Typography> hook
  to access the current <Typography variant="code">mode</Typography>.
</p>`}
          leftAlign
        >
          <div style={{ padding: 'var(--tokis-spacing-4)' }}>
            <Typography variant="body1">
              Use the <Typography variant="code" as="code">useTheme()</Typography> hook
              to access the current <Typography variant="code" as="code">mode</Typography>.
            </Typography>
          </div>
        </ComponentPreview>
      </div>

      {/* Truncation */}
      <div className="doc-section">
        <h2 className="doc-section__title">Truncation</h2>
        <ComponentPreview
          code={`<div style={{ width: 240 }}>
  <Typography truncate>
    This is a very long text that will be truncated with an ellipsis
    when it overflows its container width.
  </Typography>
</div>`}
        >
          <div style={{ width: 240 }}>
            <Typography truncate>
              This is a very long text that will be truncated with an ellipsis
              when it overflows its container width.
            </Typography>
          </div>
        </ComponentPreview>
      </div>

      {/* Polymorphic */}
      <div className="doc-section">
        <h2 className="doc-section__title">Polymorphic</h2>
        <p className="doc-section__desc">
          The <code className="inline-code">as</code> prop overrides the rendered element while keeping styles.
          Useful for semantic correctness.
        </p>
        <CodeBlock
          language="tsx"
          code={`// h3 styles but renders as a <p> (no heading in the document outline)
<Typography variant="h3" as="p">Styled as h3, renders as p</Typography>

// Body text that renders as a <span>
<Typography variant="body2" as="span" color="secondary">
  Inline secondary text
</Typography>`}
        />
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={typographyProps} />
      </div>
    </>
  );
}
