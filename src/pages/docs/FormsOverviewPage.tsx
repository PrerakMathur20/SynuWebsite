import React from 'react';
import { NavButton } from '../../components/NavButton';
import { ButtonLabel, Badge, Stack, Alert } from '@tokis/react';
import { CodeBlock } from '../../components/CodeBlock';

const components = [
  { label: 'TextField', path: '/docs/input', desc: 'Single and multiline text input with label, helper text, error state, and icon slots.' },
  { label: 'Checkbox', path: '/docs/checkbox', desc: 'Controlled and uncontrolled checkbox with indeterminate support and custom label.' },
  { label: 'Radio', path: '/docs/radio', desc: 'Radio group for single-choice selection. Keyboard navigable with roving tabindex.' },
  { label: 'Select', path: '/docs/select', desc: 'Accessible dropdown select. Supports grouped options, search, and async loading.' },
  { label: 'Slider', path: '/docs/slider', desc: 'Range slider with min/max, step, marks, and value display. ARIA-compliant.' },
  { label: 'Switch', path: '/docs/switch', desc: 'Toggle switch for boolean settings. Maps to the HTML checkbox role="switch" pattern.' },
  { label: 'Search Field', path: '/docs/search-field', desc: 'Search input with clear button, loading state, and keyboard shortcut support.' },
  { label: 'Toggle Button', path: '/docs/toggle', desc: 'Pressable button that maintains on/off state. Can be grouped for single or multi-select.' },
];

export function FormsOverviewPage() {
  return (
    <div className="doc-page">
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Overview</p>
        <h1 className="doc-page__title">Forms</h1>
        <p className="doc-page__desc">
          Form controls built for accessibility and composability. All inputs support
          controlled and uncontrolled patterns, error states, and full keyboard navigation
          out of the box.
        </p>
      </header>

      <div className="doc-section">
        <h2 className="doc-section__title">Package</h2>
        <div className="section-pkg-row">
          <div className="section-pkg-badge-row">
            <code className="section-pkg-name">@tokis/react</code>
            <Badge variant="primary">All form components</Badge>
          </div>
          <div className="section-pkg-badge-row">
            <code className="section-pkg-name">@tokis/core</code>
            <Badge variant="default">Roving tabindex (Radio), controllable state utilities</Badge>
          </div>
        </div>
        <CodeBlock language="tsx" code={`import { TextField, Checkbox, Radio, RadioGroup, Select, Slider, Switch } from '@tokis/react';`} />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Controlled vs Uncontrolled</h2>
        <p className="doc-section__desc">Every form component follows React's standard controlled/uncontrolled pattern:</p>
        <CodeBlock
          language="tsx"
          code={`// Uncontrolled — React manages internal state
<TextField defaultValue="hello" />

// Controlled — you own the state
const [value, setValue] = useState('');
<TextField value={value} onChange={(e) => setValue(e.target.value)} />`}
        />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Error States</h2>
        <CodeBlock
          language="tsx"
          code={`<TextField
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={!isValidEmail(email)}
  helperText={!isValidEmail(email) ? 'Enter a valid email address' : ''}
/>`}
        />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">All Form Components</h2>
        <div className="section-component-list">
          {components.map((c) => (
            <NavButton key={c.path} to={c.path} variant="ghost" className="section-nav-card">
              <div>
                <div className="section-nav-card__label">{c.label}</div>
                <div className="section-nav-card__desc">{c.desc}</div>
              </div>
            </NavButton>
          ))}
        </div>
      </div>

      <Stack direction="row" gap={3} style={{ marginTop: 'var(--tokis-spacing-8)' }}>
        <NavButton to="/docs/input" variant="primary"><ButtonLabel>TextField →</ButtonLabel></NavButton>
        <NavButton to="/docs/select" variant="outline"><ButtonLabel>Select</ButtonLabel></NavButton>
      </Stack>
    </div>
  );
}
