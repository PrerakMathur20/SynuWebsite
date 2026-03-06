import React, { useState } from 'react';
import { Stack, Grid, Container, Box } from '@tokis/react';
import { ComponentPreview, DemoControl } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const stackProps: PropDef[] = [
  { name: 'direction', type: "'row' | 'column'", default: "'column'", description: 'Flex direction.' },
  { name: 'gap', type: '0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16', default: '4', description: 'Gap between children using spacing tokens.' },
  { name: 'align', type: 'CSSProperties["alignItems"]', description: 'CSS alignItems value.' },
  { name: 'justify', type: 'CSSProperties["justifyContent"]', description: 'CSS justifyContent value.' },
  { name: 'wrap', type: 'boolean', default: 'false', description: 'Enables flex-wrap.' },
  { name: 'as', type: 'React.ElementType', default: "'div'", description: 'Polymorphic element.' },
];

const Cell = ({ label, color = 'var(--tokis-color-primary-subtle)' }: { label: string; color?: string }) => (
  <div style={{
    padding: '8px 12px',
    background: color,
    border: '1px solid var(--tokis-color-primary)',
    borderRadius: 'var(--tokis-radius-sm)',
    fontSize: 'var(--tokis-font-size-xs)',
    color: 'var(--tokis-color-primary)',
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'monospace',
  }}>
    {label}
  </div>
);

export function LayoutPage() {
  const [stackDir, setStackDir] = useState<'row' | 'column'>('row');
  const [gapSize, setGapSize] = useState('4');
  const [columns, setColumns] = useState('3');

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Foundations</p>
        <h1 className="doc-page__title">Layout</h1>
        <p className="doc-page__desc">
          Composable layout primitives: <code className="inline-code">Stack</code> for flex layouts,{' '}
          <code className="inline-code">Grid</code> for CSS grid, <code className="inline-code">Container</code>{' '}
          for responsive max-width wrapping, and <code className="inline-code">Box</code> for utility spacing.
        </p>
      </header>

      {/* Stack */}
      <div className="doc-section">
        <h2 className="doc-section__title">Stack</h2>
        <p className="doc-section__desc">
          A flex container that uses spacing tokens for gap. Direction defaults to column (vertical).
        </p>
        <ComponentPreview
          code={`<Stack
  direction="${stackDir}"
  gap={${gapSize}}
  align="center"
  wrap
>
  <Cell label="Item 1" />
  <Cell label="Item 2" />
  <Cell label="Item 3" />
  <Cell label="Item 4" />
</Stack>`}
          controls={
            <>
              <DemoControl
                label="Direction"
                options={['row', 'column']}
                value={stackDir}
                onChange={(v) => setStackDir(v as 'row' | 'column')}
              />
              <DemoControl
                label="Gap"
                options={['1', '2', '4', '6', '8']}
                value={gapSize}
                onChange={setGapSize}
              />
            </>
          }
        >
          <Stack
            direction={stackDir}
            gap={parseInt(gapSize) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16}
            align="center"
            wrap
          >
            {['Item 1', 'Item 2', 'Item 3', 'Item 4'].map((l) => <Cell key={l} label={l} />)}
          </Stack>
        </ComponentPreview>
      </div>

      {/* Stack patterns */}
      <div className="doc-section">
        <h2 className="doc-section__title">Common Stack Patterns</h2>
        <ComponentPreview
          code={`{/* Horizontal with space-between */}
<Stack direction="row" justify="space-between" align="center">
  <span>Label</span>
  <Badge>Active</Badge>
</Stack>

{/* Vertical centered */}
<Stack gap={2} align="center" style={{ textAlign: 'center' }}>
  <h2>Title</h2>
  <p>Subtitle</p>
</Stack>

{/* Wrapping flex */}
<Stack direction="row" gap={2} wrap>
  <Chip>Tag 1</Chip>
  <Chip>Tag 2</Chip>
  <Chip>Tag 3</Chip>
</Stack>`}
          leftAlign
        >
          <Stack gap={6} style={{ width: '100%', maxWidth: 420 }}>
            <div>
              <p style={{ fontSize: 11, color: 'var(--tokis-text-tertiary)', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>space-between</p>
              <Stack direction="row" justify="space-between" align="center" style={{ border: '1px dashed var(--tokis-color-border)', padding: 12, borderRadius: 'var(--tokis-radius-md)' }}>
                <Cell label="Left" />
                <Cell label="Right" />
              </Stack>
            </div>
            <div>
              <p style={{ fontSize: 11, color: 'var(--tokis-text-tertiary)', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>centered column</p>
              <Stack align="center" gap={2} style={{ border: '1px dashed var(--tokis-color-border)', padding: 12, borderRadius: 'var(--tokis-radius-md)' }}>
                <Cell label="Item 1" />
                <Cell label="Item 2" />
                <Cell label="Item 3" />
              </Stack>
            </div>
          </Stack>
        </ComponentPreview>
      </div>

      {/* Grid */}
      <div className="doc-section">
        <h2 className="doc-section__title">Grid</h2>
        <p className="doc-section__desc">
          CSS Grid wrapper with token-based gap. Pass a number for equal columns or a string for custom templates.
        </p>
        <ComponentPreview
          code={`<Grid columns={${columns}} gap={4}>
  <Cell label="1" />
  <Cell label="2" />
  <Cell label="3" />
  <Cell label="4" />
  <Cell label="5" />
  <Cell label="6" />
</Grid>`}
          controls={
            <DemoControl
              label="Columns"
              options={['1', '2', '3', '4']}
              value={columns}
              onChange={setColumns}
            />
          }
        >
          <Grid columns={parseInt(columns)} gap={4} style={{ width: '100%' }}>
            {[1, 2, 3, 4, 5, 6].map((i) => <Cell key={i} label={String(i)} />)}
          </Grid>
        </ComponentPreview>
      </div>

      {/* Custom Grid Template */}
      <div className="doc-section">
        <h2 className="doc-section__title">Custom Grid Templates</h2>
        <p className="doc-section__desc">
          Pass a CSS string to <code className="inline-code">columns</code> for complex layouts.
        </p>
        <ComponentPreview
          code={`{/* Sidebar + main layout */}
<Grid columns="260px 1fr" gap={6}>
  <Cell label="Sidebar" />
  <Cell label="Main content" />
</Grid>

{/* Auto-fill responsive */}
<Grid columns="repeat(auto-fill, minmax(160px, 1fr))" gap={4}>
  {items.map(i => <Card key={i} />)}
</Grid>`}
          leftAlign
        >
          <Stack gap={4} style={{ width: '100%' }}>
            <Grid columns="200px 1fr" gap={4} style={{ width: '100%' }}>
              <Cell label="Sidebar (200px)" />
              <Cell label="Main content (1fr)" />
            </Grid>
            <Grid columns="repeat(auto-fill, minmax(80px, 1fr))" gap={3} style={{ width: '100%' }}>
              {[1, 2, 3, 4, 5].map((i) => <Cell key={i} label={`Card ${i}`} />)}
            </Grid>
          </Stack>
        </ComponentPreview>
      </div>

      {/* Container */}
      <div className="doc-section">
        <h2 className="doc-section__title">Container</h2>
        <p className="doc-section__desc">
          Centers content with a responsive max-width and automatic horizontal padding.
          Use <code className="inline-code">fluid</code> to disable the max-width.
        </p>
        <ComponentPreview
          code={`<Container>
  <p>Content with max-width constraint and centered alignment.</p>
</Container>

<Container fluid>
  <p>Full-width container, padding only.</p>
</Container>`}
          leftAlign
        >
          <div style={{ width: '100%' }}>
            <div style={{ border: '2px dashed var(--tokis-color-border)', borderRadius: 'var(--tokis-radius-md)', padding: '12px' }}>
              <div style={{ background: 'var(--tokis-color-primary-subtle)', border: '1px solid var(--tokis-color-primary)', borderRadius: 4, padding: '8px 16px', maxWidth: 300, margin: '0 auto', textAlign: 'center' }}>
                <span style={{ fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-color-primary)' }}>Container (max-width centered)</span>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — Stack</h2>
        <PropsTable props={stackProps} />
      </div>
    </>
  );
}
