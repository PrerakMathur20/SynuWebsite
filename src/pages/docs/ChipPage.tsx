import React, { useState } from 'react';
import { Chip, Stack } from '@tokis/react';
import { ComponentPreview, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const chipProps: PropDef[] = [
  { name: 'selected', type: 'boolean', default: 'false', description: 'Marks the chip as selected/active.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction.' },
  { name: 'onClick', type: '() => void', description: 'Makes the chip interactive (clickable).' },
  { name: 'onDelete', type: '() => void', description: 'Renders a delete button inside the chip.' },
  { name: 'icon', type: 'ReactNode', description: 'Optional leading icon rendered before the label.' },
  { name: 'children', type: 'ReactNode', required: true, description: 'Chip label text.' },
];

export function ChipPage() {
  const [selected, setSelected] = useState(false);
  const [deletable, setDeletable] = useState(false);

  const [tags, setTags] = useState(['React', 'TypeScript', 'CSS', 'Accessibility', 'Design System']);
  const [filters, setFilters] = useState<string[]>(['All']);

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Components</p>
        <h1 className="doc-page__title">Chip</h1>
        <p className="doc-page__desc">
          Compact elements for tags, filter pills, and multi-select. Support click, selection,
          and deletion interactions.
        </p>
      </header>

      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Playground</h2>
        <ComponentPreview
          code={`<Chip${selected ? ' selected' : ''}${deletable ? ' onDelete={() => {}}' : ' onClick={() => {}'}>${'React'}</Chip>`}
          controls={
            <>
              <DemoToggle label="Selected" value={selected} onChange={setSelected} />
              <DemoToggle label="Deletable" value={deletable} onChange={setDeletable} />
            </>
          }
        >
          <Chip
            selected={selected}
            onClick={!deletable ? () => setSelected((s) => !s) : undefined}
            onDelete={deletable ? () => {} : undefined}
          >
            React
          </Chip>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Variants</h2>
        <ComponentPreview
          code={`<Stack direction="row" gap={2} wrap>
  <Chip>Default</Chip>
  <Chip selected>Selected</Chip>
  <Chip onClick={() => {}}>Clickable</Chip>
  <Chip onDelete={() => {}}>Deletable</Chip>
  <Chip disabled>Disabled</Chip>
</Stack>`}
        >
          <Stack direction="row" gap={2} wrap>
            <Chip>Default</Chip>
            <Chip selected>Selected</Chip>
            <Chip onClick={() => {}}>Clickable</Chip>
            <Chip onDelete={() => {}}>Deletable</Chip>
            <Chip disabled>Disabled</Chip>
          </Stack>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Tags — Removable</h2>
        <p className="doc-section__desc">
          Use chips with <code className="inline-code">onDelete</code> to build tag inputs.
        </p>
        <ComponentPreview
          code={`const [tags, setTags] = useState(['React', 'TypeScript', 'CSS']);

<Stack direction="row" gap={2} wrap>
  {tags.map((tag) => (
    <Chip key={tag} onDelete={() => setTags(tags.filter((t) => t !== tag))}>
      {tag}
    </Chip>
  ))}
</Stack>`}
          leftAlign
        >
          <Stack direction="row" gap={2} wrap>
            {tags.map((tag) => (
              <Chip key={tag} onDelete={() => setTags((t) => t.filter((x) => x !== tag))}>
                {tag}
              </Chip>
            ))}
          </Stack>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Filter Chips</h2>
        <p className="doc-section__desc">
          Multi-select filter groups with toggle behavior.
        </p>
        <ComponentPreview
          code={`const [filters, setFilters] = useState(['All']);

<Stack direction="row" gap={2} wrap>
  {['All', 'Components', 'Forms', 'Overlay', 'Feedback'].map((f) => (
    <Chip
      key={f}
      selected={filters.includes(f)}
      onClick={() => setFilters((prev) =>
        prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
      )}
    >
      {f}
    </Chip>
  ))}
</Stack>`}
          leftAlign
        >
          <Stack direction="row" gap={2} wrap>
            {['All', 'Components', 'Forms', 'Overlay', 'Feedback'].map((f) => (
              <Chip
                key={f}
                selected={filters.includes(f)}
                onClick={() => setFilters((prev) =>
                  prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
                )}
              >
                {f}
              </Chip>
            ))}
          </Stack>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={chipProps} />
      </div>
    </>
  );
}
