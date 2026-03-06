import React, { useState } from 'react';
import { Tooltip, ButtonRoot, ButtonLabel, Stack } from '@tokis/react';
import { ComponentPreview, DemoControl } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const tooltipProps: PropDef[] = [
  { name: 'content', type: 'ReactNode', required: true, description: 'Tooltip text or content.' },
  { name: 'children', type: 'ReactElement', required: true, description: 'Trigger element. Must accept ref and event handlers.' },
  { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Preferred placement.' },
  { name: 'delay', type: 'number', default: '300', description: 'Delay in ms before showing the tooltip.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents the tooltip from showing.' },
];

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 4h10M5 4V2h4v2M12 4l-1 8H3L2 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <rect x="4" y="4" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M10 4V2.5A1.5 1.5 0 0 0 8.5 1h-6A1.5 1.5 0 0 0 1 2.5v6A1.5 1.5 0 0 0 2.5 10H4" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

const ShareIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="11" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="11" cy="11" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    <circle cx="3" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M4.4 6.3l5.1-2.8M4.4 7.7l5.1 2.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

export function TooltipPage() {
  const [placement, setPlacement] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  const [delay, setDelay] = useState('300');

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Overlay</p>
        <h1 className="doc-page__title">Tooltip</h1>
        <p className="doc-page__desc">
          Shows contextual hints on hover or focus. Renders into a Portal, positioned relative
          to the trigger element. Accessible — linked via <code>aria-describedby</code>.
        </p>
      </header>

      {/* Basic */}
      <div className="doc-section">
        <h2 className="doc-section__title">Basic Tooltip</h2>
        <p className="doc-section__desc">
          Appears after a configurable delay. Hides immediately on mouse leave or blur.
        </p>
        <ComponentPreview
          code={`<Tooltip content="Save your changes to continue" placement="${placement}">
  <ButtonRoot variant="primary">
    <ButtonLabel>Hover me</ButtonLabel>
  </ButtonRoot>
</Tooltip>`}
          controls={
            <>
              <DemoControl
                label="Placement"
                options={['top', 'bottom', 'left', 'right']}
                value={placement}
                onChange={(v) => setPlacement(v as typeof placement)}
              />
              <DemoControl
                label="Delay (ms)"
                options={['0', '150', '300', '600']}
                value={delay}
                onChange={setDelay}
              />
            </>
          }
        >
          <div style={{ padding: 60 }}>
            <Tooltip content="Save your changes to continue" placement={placement} delay={Number(delay)}>
              <ButtonRoot variant="primary">
                <ButtonLabel>Hover me</ButtonLabel>
              </ButtonRoot>
            </Tooltip>
          </div>
        </ComponentPreview>
      </div>

      {/* All placements */}
      <div className="doc-section">
        <h2 className="doc-section__title">All Placements</h2>
        <ComponentPreview
          code={`<Tooltip content="Top" placement="top">...</Tooltip>
<Tooltip content="Bottom" placement="bottom">...</Tooltip>
<Tooltip content="Left" placement="left">...</Tooltip>
<Tooltip content="Right" placement="right">...</Tooltip>`}
        >
          <div style={{ padding: 60 }}>
            <Stack direction="row" gap={3}>
              {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
                <Tooltip key={p} content={`Placed ${p}`} placement={p}>
                  <ButtonRoot variant="outline" size="sm">
                    <ButtonLabel>{p}</ButtonLabel>
                  </ButtonRoot>
                </Tooltip>
              ))}
            </Stack>
          </div>
        </ComponentPreview>
      </div>

      {/* Icon button tooltips */}
      <div className="doc-section">
        <h2 className="doc-section__title">Icon Tooltips</h2>
        <p className="doc-section__desc">
          Tooltips are especially useful for icon-only buttons — they provide the label that screen
          reader users hear via <code>aria-label</code>, and sighted users see on hover.
        </p>
        <ComponentPreview
          code={`<Tooltip content="Edit item">
  <ButtonRoot variant="ghost" iconOnly aria-label="Edit">
    <EditIcon />
  </ButtonRoot>
</Tooltip>

<Tooltip content="Copy to clipboard">
  <ButtonRoot variant="ghost" iconOnly aria-label="Copy">
    <CopyIcon />
  </ButtonRoot>
</Tooltip>

<Tooltip content="Delete — cannot be undone" placement="bottom">
  <ButtonRoot variant="ghost" iconOnly aria-label="Delete">
    <DeleteIcon />
  </ButtonRoot>
</Tooltip>`}
        >
          <Stack direction="row" gap={2}>
            <Tooltip content="Edit item">
              <ButtonRoot variant="ghost" iconOnly aria-label="Edit">
                <EditIcon />
              </ButtonRoot>
            </Tooltip>
            <Tooltip content="Copy to clipboard">
              <ButtonRoot variant="ghost" iconOnly aria-label="Copy">
                <CopyIcon />
              </ButtonRoot>
            </Tooltip>
            <Tooltip content="Share link">
              <ButtonRoot variant="ghost" iconOnly aria-label="Share">
                <ShareIcon />
              </ButtonRoot>
            </Tooltip>
            <Tooltip content="Delete — cannot be undone" placement="bottom">
              <ButtonRoot variant="ghost" iconOnly aria-label="Delete">
                <DeleteIcon />
              </ButtonRoot>
            </Tooltip>
          </Stack>
        </ComponentPreview>
      </div>

      {/* Disabled */}
      <div className="doc-section">
        <h2 className="doc-section__title">Disabled</h2>
        <ComponentPreview
          code={`<Tooltip content="This won't appear" disabled>
  <ButtonRoot variant="outline">
    <ButtonLabel>No tooltip</ButtonLabel>
  </ButtonRoot>
</Tooltip>`}
        >
          <Tooltip content="This tooltip is disabled" disabled>
            <ButtonRoot variant="outline">
              <ButtonLabel>No tooltip</ButtonLabel>
            </ButtonRoot>
          </Tooltip>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={tooltipProps} />
      </div>
    </>
  );
}
