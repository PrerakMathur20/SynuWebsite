import React from 'react';
import { Alert, Badge, ButtonRoot, ButtonLabel, Stack, Card, CardBody, CardTitle, CardDescription, Switch, useTheme } from '@synu/react';
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
          Synu uses CSS custom properties (variables) for all theming. Light and dark mode
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
          filename="@synu/theme variables.css (simplified)"
          code={`:root {
  --synu-color-primary: #0066ff;
  --synu-color-background: #ffffff;
  --synu-color-surface: #f8f9fa;
  --synu-text-primary: #0f172a;
  --synu-text-secondary: #475569;
}

[data-theme="dark"] {
  --synu-color-primary: #3b82f6;
  --synu-color-background: #0f172a;
  --synu-color-surface: #1e293b;
  --synu-text-primary: #f1f5f9;
  --synu-text-secondary: #94a3b8;
}`}
        />
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Theme Toggle</h2>
        <p className="doc-section__desc">
          Use the <code className="inline-code">useTheme()</code> hook to read and change the theme.
        </p>
        <ComponentPreview
          code={`import { useTheme, Switch, Badge, Stack } from '@synu/react';

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
          code={`/* Brand override — must come AFTER @synu/theme import */
:root {
  /* Change primary color to your brand color */
  --synu-color-primary: #7c3aed;
  --synu-color-primary-hover: #6d28d9;
  --synu-color-primary-active: #5b21b6;
  --synu-color-primary-subtle: #ede9fe;

  /* Round everything up */
  --synu-radius-sm: 6px;
  --synu-radius-md: 8px;
  --synu-radius-lg: 12px;
  --synu-radius-xl: 16px;

  /* Custom font */
  --synu-font-family: 'Inter', system-ui, sans-serif;
}

[data-theme="dark"] {
  --synu-color-primary: #a78bfa;
  --synu-color-primary-subtle: #2e1065;
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
                '--synu-color-primary',
                '--synu-color-secondary',
                '--synu-color-background',
                '--synu-color-surface',
                '--synu-color-surface-raised',
                '--synu-color-border',
                '--synu-color-error',
                '--synu-color-warning',
                '--synu-color-success',
                '--synu-color-info',
              ],
            },
            {
              category: 'Text',
              tokens: [
                '--synu-text-primary',
                '--synu-text-secondary',
                '--synu-text-tertiary',
                '--synu-text-disabled',
                '--synu-text-inverse',
                '--synu-text-link',
                '--synu-text-error',
              ],
            },
            {
              category: 'Spacing',
              tokens: [
                '--synu-spacing-1 (4px)',
                '--synu-spacing-2 (8px)',
                '--synu-spacing-3 (12px)',
                '--synu-spacing-4 (16px)',
                '--synu-spacing-6 (24px)',
                '--synu-spacing-8 (32px)',
                '--synu-spacing-12 (48px)',
              ],
            },
            {
              category: 'Border Radius',
              tokens: [
                '--synu-radius-sm (4px)',
                '--synu-radius-md (6px)',
                '--synu-radius-lg (8px)',
                '--synu-radius-xl (12px)',
                '--synu-radius-2xl (16px)',
                '--synu-radius-full (9999px)',
              ],
            },
          ].map((group) => (
            <Card key={group.category}>
              <CardBody>
                <CardTitle style={{ marginBottom: 'var(--synu-spacing-3)' }}>
                  {group.category}
                </CardTitle>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--synu-spacing-2)',
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
