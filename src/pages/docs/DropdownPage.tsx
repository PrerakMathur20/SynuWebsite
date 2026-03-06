import React, { useState } from 'react';
import { Dropdown, ButtonRoot, ButtonLabel } from '@tokis/react';
import { ComponentPreview, DemoControl } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const dropdownProps: PropDef[] = [
  { name: 'trigger', type: 'ReactElement', required: true, description: 'Element that opens the dropdown on click.' },
  { name: 'children', type: 'ReactNode', required: true, description: 'Content displayed inside the dropdown panel.' },
  { name: 'placement', type: "'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'", default: "'bottom-start'", description: 'Preferred placement of the panel relative to the trigger.' },
  { name: 'open', type: 'boolean', description: 'Controlled open state. Use with onOpenChange for fully controlled behavior.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial open state for uncontrolled usage.' },
  { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Called when the open state should change.' },
  { name: 'className', type: 'string', description: 'Additional class name applied to the dropdown panel.' },
];

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
    <path d="M1.5 12.5c0-2.761 2.462-5 5.5-5s5.5 2.239 5.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.9 2.9l1.1 1.1M10 10l1.1 1.1M2.9 11.1L4 10M10 4l1.1-1.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const SignOutIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M9.5 4.5L12.5 7l-3 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.5 7H5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M5.5 2H2.5A1.5 1.5 0 0 0 1 3.5v7A1.5 1.5 0 0 0 2.5 12H5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const menuItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '8px 12px',
  fontSize: 'var(--tokis-font-size-sm)',
  color: 'var(--tokis-text-primary)',
  cursor: 'pointer',
  borderRadius: 'var(--tokis-radius-md)',
  transition: 'background 120ms',
  userSelect: 'none',
};

const separatorStyle: React.CSSProperties = {
  height: 1,
  background: 'var(--tokis-color-border)',
  margin: '4px 0',
};

const destructiveItemStyle: React.CSSProperties = {
  ...menuItemStyle,
  color: 'var(--tokis-color-error)',
};

export function DropdownPage() {
  const [placement, setPlacement] = useState<'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'>('bottom-start');

  // Filter dropdown state
  const [filterStatuses, setFilterStatuses] = useState<string[]>(['active']);

  const statuses = [
    { value: 'active', label: 'Active' },
    { value: 'draft', label: 'Draft' },
    { value: 'archived', label: 'Archived' },
    { value: 'scheduled', label: 'Scheduled' },
  ];

  function toggleStatus(value: string) {
    setFilterStatuses((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  }

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Overlay</p>
        <h1 className="doc-page__title">Dropdown</h1>
        <p className="doc-page__desc">
          A general-purpose panel anchored to a trigger element. Unlike <strong>Menu</strong> (which
          renders a list of items with keyboard navigation), Dropdown accepts arbitrary children — giving
          you full control over the panel's content. Renders into a Portal and closes on outside click.
        </p>
      </header>

      {/* Basic menu-style dropdown */}
      <div className="doc-section">
        <h2 className="doc-section__title">Basic Dropdown</h2>
        <p className="doc-section__desc">
          The trigger opens a panel containing custom content. Here it's styled to look like a menu,
          but the content can be anything — forms, date pickers, color swatches, etc.
        </p>
        <ComponentPreview
          code={`<Dropdown
  placement="${placement}"
  trigger={
    <ButtonRoot variant="outline">
      <ButtonLabel>Open Menu</ButtonLabel>
    </ButtonRoot>
  }
>
  <div style={{ padding: 4, minWidth: 180 }}>
    <div style={{ /* item */ }}>Profile</div>
    <div style={{ /* item */ }}>Settings</div>
    <div style={{ /* separator */ }} />
    <div style={{ /* destructive item */ }}>Sign out</div>
  </div>
</Dropdown>`}
          controls={
            <DemoControl
              label="Placement"
              options={['bottom-start', 'bottom-end', 'top-start', 'top-end']}
              value={placement}
              onChange={(v) => setPlacement(v as typeof placement)}
            />
          }
        >
          <div style={{ padding: 48 }}>
            <Dropdown
              placement={placement}
              trigger={
                <ButtonRoot variant="outline">
                  <ButtonLabel>Open Menu</ButtonLabel>
                </ButtonRoot>
              }
            >
              <div style={{ padding: 4, minWidth: 180 }}>
                <div
                  style={menuItemStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--tokis-color-surface-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <UserIcon />
                  Profile
                </div>
                <div
                  style={menuItemStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--tokis-color-surface-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <SettingsIcon />
                  Settings
                </div>
                <div style={separatorStyle} />
                <div
                  style={destructiveItemStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--tokis-color-surface-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <SignOutIcon />
                  Sign out
                </div>
              </div>
            </Dropdown>
          </div>
        </ComponentPreview>
      </div>

      {/* Filter dropdown */}
      <div className="doc-section">
        <h2 className="doc-section__title">Filter Dropdown</h2>
        <p className="doc-section__desc">
          Dropdowns shine when you need interactive content — like a set of filter checkboxes — anchored
          to a compact trigger. The panel stays open while the user makes selections.
        </p>
        <ComponentPreview
          code={`const [selected, setSelected] = useState(['active']);

<Dropdown
  trigger={
    <ButtonRoot variant="outline">
      <ButtonLabel>Filter by status ▾</ButtonLabel>
    </ButtonRoot>
  }
>
  <div style={{ padding: '8px 4px', minWidth: 180 }}>
    {statuses.map(({ value, label }) => (
      <label key={value} style={{ /* checkbox row */ }}>
        <input
          type="checkbox"
          checked={selected.includes(value)}
          onChange={() => toggleStatus(value)}
        />
        {label}
      </label>
    ))}
  </div>
</Dropdown>`}
        >
          <div style={{ padding: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <Dropdown
              trigger={
                <ButtonRoot variant="outline">
                  <ButtonLabel>
                    Filter by status{filterStatuses.length > 0 ? ` (${filterStatuses.length})` : ''} ▾
                  </ButtonLabel>
                </ButtonRoot>
              }
            >
              <div style={{ padding: '8px 4px', minWidth: 180 }}>
                <p style={{ margin: '0 12px 6px', fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)', fontWeight: 'var(--tokis-font-weight-medium)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Status
                </p>
                {statuses.map(({ value, label }) => (
                  <label
                    key={value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '8px 12px',
                      fontSize: 'var(--tokis-font-size-sm)',
                      color: 'var(--tokis-text-primary)',
                      cursor: 'pointer',
                      borderRadius: 'var(--tokis-radius-md)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--tokis-color-surface-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <input
                      type="checkbox"
                      checked={filterStatuses.includes(value)}
                      onChange={() => toggleStatus(value)}
                      style={{ accentColor: 'var(--tokis-color-primary)', width: 14, height: 14, flexShrink: 0 }}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </Dropdown>
            {filterStatuses.length > 0 && (
              <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)' }}>
                Active filters: {filterStatuses.join(', ')}
              </p>
            )}
          </div>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={dropdownProps} />
      </div>
    </>
  );
}
