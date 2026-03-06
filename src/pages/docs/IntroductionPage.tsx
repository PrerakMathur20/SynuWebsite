import React from 'react';
import { NavButton } from '../../components/NavButton';
import {
  Alert,
  Badge,
  ButtonRoot, ButtonLabel,
  Stack,
  Card, CardBody,
} from '@synu/react';
import { CodeBlock } from '../../components/CodeBlock';

export function IntroductionPage() {
  return (
    <div className="gs-page">
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Getting Started</p>
        <h1 className="doc-page__title">Introduction</h1>
        <p className="doc-page__desc">
          Synu is a performance-first, token-native UI design system for React.
          It ships zero runtime CSS, is accessible by default, and is built for
          SaaS products and enterprise applications.
        </p>
      </header>

      <Alert variant="info" title="Early release">
        Synu v0.1.0 is in active development. APIs may change between minor versions.
      </Alert>

      <div className="doc-section" style={{ marginTop: 'var(--synu-spacing-10)' }}>
        <h2 className="doc-section__title">Core Principles</h2>
        <p className="doc-section__desc">
          Every design decision in Synu stems from these foundational ideas.
        </p>

        <Stack gap={3}>
          {[
            {
              title: 'Zero Runtime Styling',
              desc: 'No emotion, no styled-components, no CSS-in-JS overhead. Styles are precompiled static CSS that ships once and never changes at runtime.',
              badge: 'Performance',
              badgeVariant: 'primary' as const,
            },
            {
              title: 'Token-Native Architecture',
              desc: 'CSS custom properties (variables) are the foundation. Every color, spacing, shadow, and motion value is a token — making theming and customization predictable.',
              badge: 'Design',
              badgeVariant: 'info' as const,
            },
            {
              title: 'Headless Core',
              desc: 'Behavior and styling are separate concerns. The headless core handles ARIA, keyboard navigation, and state machines. The theme layer handles aesthetics.',
              badge: 'Architecture',
              badgeVariant: 'default' as const,
            },
            {
              title: 'Accessible by Default',
              desc: 'WAI-ARIA 1.2 compliance, keyboard navigation, focus management, and screen reader support are built-in — not optional bolt-ons.',
              badge: 'Accessibility',
              badgeVariant: 'success' as const,
            },
          ].map((p) => (
            <Card key={p.title} variant="default">
              <CardBody>
                <Stack direction="row" justify="space-between" align="flex-start" gap={4}>
                  <div>
                    <h3 style={{
                      margin: '0 0 var(--synu-spacing-2)',
                      fontSize: 'var(--synu-font-size-md)',
                      fontWeight: 'var(--synu-font-weight-semibold)',
                      color: 'var(--synu-text-primary)',
                    }}>
                      {p.title}
                    </h3>
                    <p style={{
                      margin: 0,
                      fontSize: 'var(--synu-font-size-sm)',
                      color: 'var(--synu-text-secondary)',
                      lineHeight: 'var(--synu-line-height-relaxed)',
                    }}>
                      {p.desc}
                    </p>
                  </div>
                  <Badge variant={p.badgeVariant} style={{ flexShrink: 0 }}>{p.badge}</Badge>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </Stack>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Package Structure</h2>
        <p className="doc-section__desc">
          Synu is organized as a monorepo with clearly separated concerns.
        </p>
        <CodeBlock
          language="bash"
          code={`@synu/react    # React components, hooks, and context
@synu/theme    # Precompiled CSS (variables, reset, component styles)
@synu/tokens   # Design token definitions (TypeScript + JSON)
@synu/core     # Headless primitives (state machines, a11y, focus)`}
        />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Design System Philosophy</h2>
        <p className="doc-section__desc">
          Synu believes in composition over configuration.
        </p>
        <CodeBlock
          language="tsx"
          filename="Preferred Pattern"
          code={`// ✅ Composition — explicit, composable, no prop explosion
<ButtonRoot variant="primary" size="lg">
  <ButtonIcon aria-hidden>
    <SaveIcon />
  </ButtonIcon>
  <ButtonLabel>Save changes</ButtonLabel>
</ButtonRoot>

// ❌ Monolithic — implicit, hard to extend, brittle
<Button
  variant="primary"
  size="lg"
  icon={<SaveIcon />}
  iconPosition="left"
  loading={false}
  fullWidth={false}
/>`}
        />
      </div>

      <Stack direction="row" gap={3} style={{ marginTop: 'var(--synu-spacing-8)' }}>
        <NavButton to="/docs/installation" variant="primary">
          <ButtonLabel>Installation →</ButtonLabel>
        </NavButton>
        <NavButton to="/docs/theming" variant="ghost">
          <ButtonLabel>Theming Guide</ButtonLabel>
        </NavButton>
      </Stack>
    </div>
  );
}
