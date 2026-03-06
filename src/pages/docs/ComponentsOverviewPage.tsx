import React from 'react';
import { NavButton } from '../../components/NavButton';
import { ButtonLabel, Badge, Stack } from '@tokis/react';
import { CodeBlock } from '../../components/CodeBlock';

const components = [
  { label: 'Button', path: '/docs/button', desc: 'Polymorphic trigger for any action. Supports variants, loading state, icons, and any HTML element.', complexity: 'Core' },
  { label: 'Avatar', path: '/docs/avatar', desc: 'User profile image with fallback initials. Supports sizes, groups, and status indicators.', complexity: 'Simple' },
  { label: 'Badge', path: '/docs/badge', desc: 'Status label or count indicator. Semantic variants map to color tokens automatically.', complexity: 'Simple' },
  { label: 'Card', path: '/docs/card', desc: 'Content container with optional header, body, footer, and media slots.', complexity: 'Simple' },
  { label: 'Chip', path: '/docs/chip', desc: 'Compact, interactive label for tags, filters, and selections with optional dismiss.', complexity: 'Simple' },
];

export function ComponentsOverviewPage() {
  return (
    <div className="doc-page">
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Overview</p>
        <h1 className="doc-page__title">Components</h1>
        <p className="doc-page__desc">
          Core display components. These are building blocks you'll use in nearly every view:
          buttons for actions, cards for content, badges for status, avatars for identity.
        </p>
      </header>

      <div className="doc-section">
        <h2 className="doc-section__title">Package</h2>
        <div className="section-pkg-row">
          <div className="section-pkg-badge-row">
            <code className="section-pkg-name">@tokis/react</code>
            <Badge variant="primary">All component logic and JSX</Badge>
          </div>
          <div className="section-pkg-badge-row">
            <code className="section-pkg-name">@tokis/theme</code>
            <Badge variant="default">Component CSS (imported once)</Badge>
          </div>
        </div>
        <CodeBlock language="tsx" code={`import { ButtonRoot, ButtonLabel, Badge, Card, CardBody, Avatar, Chip } from '@tokis/react';`} />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Composition Pattern</h2>
        <p className="doc-section__desc">
          Tokis uses slot-based composition instead of prop explosion. This keeps each part independently stylable and predictable:
        </p>
        <CodeBlock
          language="tsx"
          code={`// ✅ Tokis — explicit slots
<ButtonRoot variant="primary" size="lg">
  <ButtonIcon aria-hidden><SaveIcon /></ButtonIcon>
  <ButtonLabel>Save changes</ButtonLabel>
</ButtonRoot>

// ❌ Other libraries — monolithic props
<Button variant="primary" size="lg" leftIcon={<SaveIcon />} iconAriaHidden>
  Save changes
</Button>`}
        />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">All Components</h2>
        <div className="section-component-list">
          {components.map((c) => (
            <NavButton key={c.path} to={c.path} variant="ghost" className="section-nav-card">
              <Stack direction="row" justify="space-between" align="flex-start" style={{ width: '100%' }}>
                <div>
                  <div className="section-nav-card__label">{c.label}</div>
                  <div className="section-nav-card__desc">{c.desc}</div>
                </div>
                <Badge variant="default" style={{ flexShrink: 0, marginTop: 2 }}>{c.complexity}</Badge>
              </Stack>
            </NavButton>
          ))}
        </div>
      </div>

      <Stack direction="row" gap={3} style={{ marginTop: 'var(--tokis-spacing-8)' }}>
        <NavButton to="/docs/button" variant="primary"><ButtonLabel>Button →</ButtonLabel></NavButton>
        <NavButton to="/docs/card" variant="outline"><ButtonLabel>Card</ButtonLabel></NavButton>
      </Stack>
    </div>
  );
}
