import React from 'react';
import { NavButton } from '../../components/NavButton';
import { ButtonLabel, Badge, Card, CardBody, Stack } from '@tokis/react';
import { CodeBlock } from '../../components/CodeBlock';

export function FoundationsPage() {
  return (
    <div className="doc-page">
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Overview</p>
        <h1 className="doc-page__title">Foundations</h1>
        <p className="doc-page__desc">
          The visual and structural building blocks that every Tokis component is built on.
          Understanding these foundations lets you customise the entire system from a single source of truth.
        </p>
      </header>

      <div className="doc-section">
        <h2 className="doc-section__title">Package</h2>
        <p className="doc-section__desc">Foundations are spread across two packages:</p>
        <div className="section-pkg-row">
          <div className="section-pkg-badge-row">
            <code className="section-pkg-name">@tokis/tokens</code>
            <Badge variant="info">Token values as TypeScript constants</Badge>
          </div>
          <div className="section-pkg-badge-row">
            <code className="section-pkg-name">@tokis/theme</code>
            <Badge variant="default">CSS variables + component styles</Badge>
          </div>
        </div>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Design Tokens</h2>
        <p className="doc-section__desc">
          Every visual decision — color, spacing, radius, shadow, motion — is expressed as a CSS custom property.
          The token system has two layers:
        </p>
        <div className="section-token-layers">
          <Card variant="default">
            <CardBody>
              <h3 className="section-token-layer__title">Primitive Tokens</h3>
              <p className="section-token-layer__desc">Raw values. Colors as hex, spacing as rem multiples, radii as px.</p>
              <CodeBlock language="css" code={`--tokis-blue-500: #0066ff;
--tokis-spacing-base: 4px;
--tokis-radius-md: 8px;`} />
            </CardBody>
          </Card>
          <Card variant="default">
            <CardBody>
              <h3 className="section-token-layer__title">Semantic Tokens</h3>
              <p className="section-token-layer__desc">Meaningful aliases. These flip between light and dark mode automatically.</p>
              <CodeBlock language="css" code={`--tokis-color-primary: var(--tokis-blue-500);
--tokis-text-primary: var(--tokis-gray-900);
--tokis-color-background: #ffffff;`} />
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Spacing Scale</h2>
        <p className="doc-section__desc">
          All spacing is on a 4px base grid. <code>--tokis-spacing-N</code> equals <code>N × 4px</code>.
        </p>
        <CodeBlock language="css" code={`--tokis-spacing-1:  4px
--tokis-spacing-2:  8px
--tokis-spacing-3:  12px
--tokis-spacing-4:  16px
--tokis-spacing-6:  24px
--tokis-spacing-8:  32px
--tokis-spacing-10: 40px
--tokis-spacing-12: 48px`} />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Typography Scale</h2>
        <CodeBlock language="css" code={`--tokis-font-size-xs:   11px
--tokis-font-size-sm:   13px
--tokis-font-size-md:   15px
--tokis-font-size-lg:   18px
--tokis-font-size-xl:   22px
--tokis-font-size-2xl:  28px
--tokis-font-size-3xl:  36px
--tokis-font-size-4xl:  48px`} />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">In this section</h2>
        <div className="section-nav-cards">
          {[
            { label: 'Typography', path: '/docs/typography', desc: 'Type scale, font weights, line heights, and text components.' },
            { label: 'Layout', path: '/docs/layout', desc: 'Stack, Grid, Flex container components and responsive utilities.' },
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
        <NavButton to="/docs/typography" variant="primary"><ButtonLabel>Typography →</ButtonLabel></NavButton>
        <NavButton to="/docs/theming" variant="outline"><ButtonLabel>Theming Guide</ButtonLabel></NavButton>
      </Stack>
    </div>
  );
}
