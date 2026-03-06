import React, { useState } from 'react';
import { HoverCard, Stack } from '@tokis/react';
import { ComponentPreview, DemoControl } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const hoverCardProps: PropDef[] = [
  { name: 'trigger', type: 'ReactElement', required: true, description: 'The element that the hover card anchors to. Must accept ref and event handlers.' },
  { name: 'content', type: 'ReactNode', required: true, description: 'Content displayed inside the hover card panel.' },
  { name: 'openDelay', type: 'number', default: '300', description: 'Delay in ms before the card opens after hover.' },
  { name: 'closeDelay', type: 'number', default: '150', description: 'Delay in ms before the card closes after leaving.' },
  { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", description: 'Preferred placement of the card relative to the trigger.' },
  { name: 'className', type: 'string', description: 'Additional class name applied to the card panel.' },
];

export function HoverCardPage() {
  const [placement, setPlacement] = useState<'top' | 'bottom' | 'left' | 'right'>('bottom');
  const [openDelay, setOpenDelay] = useState('300');

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Overlay</p>
        <h1 className="doc-page__title">Hover Card</h1>
        <p className="doc-page__desc">
          Displays rich contextual information about a trigger element on hover. Similar to a Tooltip
          but supports structured content like avatars, stats, and links. Opens after a configurable
          delay to prevent accidental activation.
        </p>
      </header>

      {/* User mention demo */}
      <div className="doc-section">
        <h2 className="doc-section__title">User Mention</h2>
        <p className="doc-section__desc">
          A common use case — hovering a @mention reveals the user's profile card inline.
          Control the open delay and placement with the options below.
        </p>
        <ComponentPreview
          code={`<HoverCard
  placement="${placement}"
  openDelay={${openDelay}}
  trigger={
    <a href="#" style={{ color: 'var(--tokis-color-primary)', fontWeight: 600 }}>
      @sarah_chen
    </a>
  }
  content={
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 240 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ /* avatar */ }} />
        <div>
          <div>Sarah Chen</div>
          <div>@sarah_chen</div>
        </div>
      </div>
      <p>Product designer & open-source contributor. Building beautiful UIs one pixel at a time.</p>
      <div style={{ display: 'flex', gap: 20 }}>
        <span><strong>1.2k</strong> Followers</span>
        <span><strong>348</strong> Following</span>
      </div>
    </div>
  }
/>`}
          controls={
            <>
              <DemoControl
                label="Placement"
                options={['top', 'bottom', 'left', 'right']}
                value={placement}
                onChange={(v) => setPlacement(v as typeof placement)}
              />
              <DemoControl
                label="Open Delay (ms)"
                options={['0', '200', '500']}
                value={openDelay}
                onChange={setOpenDelay}
              />
            </>
          }
        >
          <div style={{ padding: 60 }}>
            <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>
              Mentioned{' '}
              <HoverCard
                placement={placement}
                openDelay={Number(openDelay)}
                trigger={
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      color: 'var(--tokis-color-primary)',
                      fontWeight: 'var(--tokis-font-weight-semibold)',
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    @sarah_chen
                  </a>
                }
                content={
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 240 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, var(--tokis-color-primary), #8b5cf6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontWeight: 'var(--tokis-font-weight-bold)',
                          fontSize: 'var(--tokis-font-size-md)',
                          flexShrink: 0,
                        }}
                      >
                        SC
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontWeight: 'var(--tokis-font-weight-semibold)', fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-primary)' }}>
                          Sarah Chen
                        </div>
                        <div style={{ fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)' }}>
                          @sarah_chen
                        </div>
                      </div>
                    </div>
                    <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)', lineHeight: 1.5 }}>
                      Product designer &amp; open-source contributor. Building beautiful UIs one pixel at a time.
                    </p>
                    <div style={{ display: 'flex', gap: 20, fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>
                      <span><strong style={{ color: 'var(--tokis-text-primary)', fontWeight: 'var(--tokis-font-weight-semibold)' }}>1.2k</strong>{' '}Followers</span>
                      <span><strong style={{ color: 'var(--tokis-text-primary)', fontWeight: 'var(--tokis-font-weight-semibold)' }}>348</strong>{' '}Following</span>
                    </div>
                  </div>
                }
              />
              {' '}in a recent review.
            </p>
          </div>
        </ComponentPreview>
      </div>

      {/* Usage guidance */}
      <div className="doc-section">
        <h2 className="doc-section__title">Usage Guidelines</h2>
        <p className="doc-section__desc">
          Hover Cards are best for supplemental information that isn't critical to the user's current
          task. Keep content concise — if the user needs to interact with the content (e.g., click a
          button inside it), consider using a <strong>Popover</strong> instead. Use an <code>openDelay</code> of
          at least 200ms to prevent accidental activation while the user moves the cursor across the page.
        </p>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={hoverCardProps} />
      </div>
    </>
  );
}
