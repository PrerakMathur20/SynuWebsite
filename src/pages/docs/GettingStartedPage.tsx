import React from 'react';
import { NavButton } from '../../components/NavButton';
import { ButtonLabel, Badge, Card, CardBody, Stack, Alert } from '@tokis/react';
import { CodeBlock } from '../../components/CodeBlock';

export function GettingStartedPage() {
  return (
    <div className="doc-page">
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Overview</p>
        <h1 className="doc-page__title">Getting Started</h1>
        <p className="doc-page__desc">
          Everything you need to go from zero to a working Tokis app in under five minutes.
          Install the packages, import the theme, drop in a component, and ship.
        </p>
      </header>

      <div className="doc-section">
        <h2 className="doc-section__title">Which package do I install?</h2>
        <p className="doc-section__desc">
          Tokis is a monorepo of four focused packages. For most projects, you only need two:
        </p>
        <div className="section-pkg-grid">
          {[
            {
              pkg: 'tokis',
              badge: 'Meta',
              badgeVariant: 'primary' as const,
              desc: 'Convenience wrapper. One install that re-exports everything. Perfect when you want the full design system.',
              install: 'npm i tokis',
              recommended: true,
            },
            {
              pkg: '@tokis/react',
              badge: 'Components',
              badgeVariant: 'info' as const,
              desc: 'All React components, hooks, and context providers. Use this if you want granular control over what you install.',
              install: 'npm i @tokis/react @tokis/theme',
              recommended: false,
            },
            {
              pkg: '@tokis/theme',
              badge: 'Styles',
              badgeVariant: 'default' as const,
              desc: 'Pre-compiled CSS with all component styles and design tokens as CSS variables. Required alongside @tokis/react.',
              install: 'npm i @tokis/theme',
              recommended: false,
            },
            {
              pkg: '@tokis/tokens',
              badge: 'Tokens',
              badgeVariant: 'warning' as const,
              desc: 'Design token constants as TypeScript. Use when building custom components that need access to the token values at runtime.',
              install: 'npm i @tokis/tokens',
              recommended: false,
            },
            {
              pkg: '@tokis/core',
              badge: 'Headless',
              badgeVariant: 'default' as const,
              desc: 'Framework-agnostic primitives: focus management, ARIA helpers, state machines. Used internally by @tokis/react. Only import directly for advanced use.',
              install: 'npm i @tokis/core',
              recommended: false,
            },
          ].map((p) => (
            <Card key={p.pkg} variant={p.recommended ? 'elevated' : 'default'} style={{ position: 'relative' }}>
              <CardBody>
                {p.recommended && (
                  <span className="section-pkg-recommended">Recommended</span>
                )}
                <Stack direction="row" justify="space-between" align="center" style={{ marginBottom: 'var(--tokis-spacing-2)' }}>
                  <code className="section-pkg-name">{p.pkg}</code>
                  <Badge variant={p.badgeVariant}>{p.badge}</Badge>
                </Stack>
                <p className="section-pkg-desc">{p.desc}</p>
                <CodeBlock language="bash" code={p.install} />
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Quick Start (2 minutes)</h2>
        <p className="doc-section__desc">The fastest path from zero to a rendered component:</p>

        <CodeBlock language="bash" filename="1. Install" code="npm i tokis" />
        <CodeBlock
          language="tsx"
          filename="2. Import the theme (once, in main.tsx)"
          code={`import 'tokis/theme';
// or if using individual packages:
import '@tokis/theme';`}
        />
        <CodeBlock
          language="tsx"
          filename="3. Wrap your app in ThemeProvider"
          code={`import { ThemeProvider } from '@tokis/react';

export default function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}`}
        />
        <CodeBlock
          language="tsx"
          filename="4. Use components"
          code={`import { ButtonRoot, ButtonLabel, Alert } from '@tokis/react';

export function MyPage() {
  return (
    <>
      <Alert variant="success" title="You're set up!">
        Tokis is ready to use.
      </Alert>
      <ButtonRoot variant="primary">
        <ButtonLabel>Click me</ButtonLabel>
      </ButtonRoot>
    </>
  );
}`}
        />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">In this section</h2>
        <div className="section-nav-cards">
          {[
            { label: 'Introduction', path: '/docs/introduction', desc: 'Core principles, architecture overview, and design philosophy.' },
            { label: 'Installation', path: '/docs/installation', desc: 'Full installation guide with Vite, Next.js, and CRA setup.' },
            { label: 'Theming', path: '/docs/theming', desc: 'CSS variable overrides, custom themes, dark mode setup.' },
          ].map((item) => (
            <NavButton key={item.path} to={item.path} variant="ghost" className="section-nav-card">
              <div>
                <div className="section-nav-card__label">{item.label}</div>
                <div className="section-nav-card__desc">{item.desc}</div>
              </div>
            </NavButton>
          ))}
        </div>
      </div>

      <Stack direction="row" gap={3} style={{ marginTop: 'var(--tokis-spacing-8)' }}>
        <NavButton to="/docs/introduction" variant="primary">
          <ButtonLabel>Introduction →</ButtonLabel>
        </NavButton>
        <NavButton to="/docs/installation" variant="outline">
          <ButtonLabel>Installation Guide</ButtonLabel>
        </NavButton>
      </Stack>
    </div>
  );
}
