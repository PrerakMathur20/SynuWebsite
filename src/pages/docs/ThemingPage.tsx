import React from 'react';
import { Alert, Badge, ButtonRoot, ButtonLabel, Stack, Card, CardBody, CardTitle, CardDescription, Switch, useTheme } from '@tokis/react';
import { CodeBlock } from '../../components/CodeBlock';
import { ComponentPreview } from '../../components/ComponentPreview';

function ThemeToggleDemo() {
  const { mode, toggle } = useTheme();
  return (
    <Stack direction="row" gap={4} align="center">
      <Switch checked={mode === 'dark'} onChange={() => toggle()} label={`Theme: ${mode}`} />
      <Badge variant={mode === 'dark' ? 'primary' : 'warning'}>
        {mode === 'dark' ? 'Dark' : 'Light'}
      </Badge>
    </Stack>
  );
}

export function ThemingPage() {
  return (
    <div className="gs-page">
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Getting Started</p>
        <h1 className="doc-page__title">Theming</h1>
        <p className="doc-page__desc">
          Tokis uses CSS custom properties (variables) for all theming. Light and dark mode
          are built-in. You can override any token to match your brand.
        </p>
      </header>

      <div className="doc-section">
        <h2 className="doc-section__title">How It Works</h2>
        <p className="doc-section__desc">
          The theme system uses two CSS selectors: <code className="inline-code">:root</code> for
          light mode defaults, and <code className="inline-code">[data-theme="dark"]</code> for
          dark mode overrides. The <code className="inline-code">ThemeProvider</code> sets the
          attribute on <code className="inline-code">document.documentElement</code>.
        </p>
        <CodeBlock
          language="css"
          filename="@tokis/theme variables.css (simplified)"
          code={`:root {
  --tokis-color-primary: #0066ff;
  --tokis-color-background: #ffffff;
  --tokis-color-surface: #f8f9fa;
  --tokis-text-primary: #0f172a;
  --tokis-text-secondary: #475569;
}

[data-theme="dark"] {
  --tokis-color-primary: #3b82f6;
  --tokis-color-background: #0f172a;
  --tokis-color-surface: #1e293b;
  --tokis-text-primary: #f1f5f9;
  --tokis-text-secondary: #94a3b8;
}`}
        />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Theme Toggle</h2>
        <p className="doc-section__desc">
          Use the <code className="inline-code">useTheme()</code> hook to read and change the theme.
        </p>
        <ComponentPreview
          code={`import { useTheme, Switch, Badge, Stack } from '@tokis/react';

function ThemeToggle() {
  const { mode, toggle, setMode } = useTheme();

  return (
    <Stack direction="row" gap={4} align="center">
      <Switch
        checked={mode === 'dark'}
        onChange={() => toggle()}
        label={\`Theme: \${mode}\`}
      />
      <Badge variant={mode === 'dark' ? 'primary' : 'warning'}>
        {mode === 'dark' ? 'Dark' : 'Light'}
      </Badge>
    </Stack>
  );
}`}
        >
          <ThemeToggleDemo />
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Overriding Tokens</h2>
        <p className="doc-section__desc">
          Override any CSS variable in your own stylesheet to customize the theme.
          All component styles automatically pick up your overrides.
        </p>
        <CodeBlock
          language="css"
          filename="src/styles/brand.css"
          code={`/* Brand override — must come AFTER @tokis/theme import */
:root {
  /* Change primary color to your brand color */
  --tokis-color-primary: #7c3aed;
  --tokis-color-primary-hover: #6d28d9;
  --tokis-color-primary-active: #5b21b6;
  --tokis-color-primary-subtle: #ede9fe;

  /* Round everything up */
  --tokis-radius-sm: 6px;
  --tokis-radius-md: 8px;
  --tokis-radius-lg: 12px;
  --tokis-radius-xl: 16px;

  /* Custom font */
  --tokis-font-family: 'Inter', system-ui, sans-serif;
}

[data-theme="dark"] {
  --tokis-color-primary: #a78bfa;
  --tokis-color-primary-subtle: #2e1065;
}`}
        />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Token Reference</h2>
        <p className="doc-section__desc">All available CSS custom properties.</p>

        <Stack gap={4}>
          {[
            {
              category: 'Colors',
              tokens: [
                '--tokis-color-primary',
                '--tokis-color-secondary',
                '--tokis-color-background',
                '--tokis-color-surface',
                '--tokis-color-surface-raised',
                '--tokis-color-border',
                '--tokis-color-error',
                '--tokis-color-warning',
                '--tokis-color-success',
                '--tokis-color-info',
              ],
            },
            {
              category: 'Text',
              tokens: [
                '--tokis-text-primary',
                '--tokis-text-secondary',
                '--tokis-text-tertiary',
                '--tokis-text-disabled',
                '--tokis-text-inverse',
                '--tokis-text-link',
                '--tokis-text-error',
              ],
            },
            {
              category: 'Spacing',
              tokens: [
                '--tokis-spacing-1 (4px)',
                '--tokis-spacing-2 (8px)',
                '--tokis-spacing-3 (12px)',
                '--tokis-spacing-4 (16px)',
                '--tokis-spacing-6 (24px)',
                '--tokis-spacing-8 (32px)',
                '--tokis-spacing-12 (48px)',
              ],
            },
            {
              category: 'Border Radius',
              tokens: [
                '--tokis-radius-sm (4px)',
                '--tokis-radius-md (6px)',
                '--tokis-radius-lg (8px)',
                '--tokis-radius-xl (12px)',
                '--tokis-radius-2xl (16px)',
                '--tokis-radius-full (9999px)',
              ],
            },
          ].map((group) => (
            <Card key={group.category}>
              <CardBody>
                <CardTitle style={{ marginBottom: 'var(--tokis-spacing-3)' }}>
                  {group.category}
                </CardTitle>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--tokis-spacing-2)',
                }}>
                  {group.tokens.map((t) => (
                    <code key={t} className="inline-code" style={{ fontSize: '0.75rem' }}>
                      {t}
                    </code>
                  ))}
                </div>
              </CardBody>
            </Card>
          ))}
        </Stack>
      </div>
    </div>
  );
}
