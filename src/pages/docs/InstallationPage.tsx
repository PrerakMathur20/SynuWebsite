import React from 'react';
import { Alert, ButtonRoot, ButtonLabel, Stack, Tabs } from '@synu/react';
import { NavButton } from '../../components/NavButton';
import { CodeBlock } from '../../components/CodeBlock';

export function InstallationPage() {
  return (
    <div className="gs-page">
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Getting Started</p>
        <h1 className="doc-page__title">Installation</h1>
        <p className="doc-page__desc">
          Get Synu running in your React project in under two minutes.
          Install the packages, import the CSS, and wrap your app.
        </p>
      </header>

      <div className="gs-step">
        <div className="gs-step__num" aria-hidden="true">1</div>
        <div className="gs-step__content">
          <h2 className="gs-step__title">Install packages</h2>
          <p style={{ margin: '0 0 var(--synu-spacing-4)', color: 'var(--synu-text-secondary)', fontSize: 'var(--synu-font-size-sm)' }}>
            Install the React adapter and the default theme.
          </p>
          <Tabs
            variant="pills"
            tabs={[
              {
                value: 'npm',
                label: 'npm',
                content: (
                  <div style={{ marginTop: 'var(--synu-spacing-3)' }}>
                    <CodeBlock
                      language="bash"
                      code={`npm install @synu/react @synu/theme`}
                    />
                  </div>
                ),
              },
              {
                value: 'pnpm',
                label: 'pnpm',
                content: (
                  <div style={{ marginTop: 'var(--synu-spacing-3)' }}>
                    <CodeBlock
                      language="bash"
                      code={`pnpm add @synu/react @synu/theme`}
                    />
                  </div>
                ),
              },
              {
                value: 'yarn',
                label: 'yarn',
                content: (
                  <div style={{ marginTop: 'var(--synu-spacing-3)' }}>
                    <CodeBlock
                      language="bash"
                      code={`yarn add @synu/react @synu/theme`}
                    />
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>

      <div className="gs-step">
        <div className="gs-step__num" aria-hidden="true">2</div>
        <div className="gs-step__content">
          <h2 className="gs-step__title">Import the theme CSS</h2>
          <p style={{ margin: '0 0 var(--synu-spacing-4)', color: 'var(--synu-text-secondary)', fontSize: 'var(--synu-font-size-sm)' }}>
            Import the full theme bundle at the root of your app. This includes the CSS reset,
            design tokens, and all component styles.
          </p>
          <CodeBlock
            language="tsx"
            filename="src/main.tsx"
            code={`import '@synu/theme';  // Full bundle: reset + tokens + all components

// Or import selectively:
import '@synu/theme/base';        // Reset + variables only
import '@synu/theme/components';  // All component styles`}
          />
        </div>
      </div>

      <div className="gs-step">
        <div className="gs-step__num" aria-hidden="true">3</div>
        <div className="gs-step__content">
          <h2 className="gs-step__title">Wrap your app with ThemeProvider</h2>
          <p style={{ margin: '0 0 var(--synu-spacing-4)', color: 'var(--synu-text-secondary)', fontSize: 'var(--synu-font-size-sm)' }}>
            The <code className="inline-code">ThemeProvider</code> manages the{' '}
            <code className="inline-code">data-theme</code> attribute on{' '}
            <code className="inline-code">document.documentElement</code> and
            exposes the <code className="inline-code">useTheme()</code> hook.
          </p>
          <CodeBlock
            language="tsx"
            filename="src/main.tsx"
            code={`import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@synu/react';
import '@synu/theme';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider initialMode="light">
      <App />
    </ThemeProvider>
  </StrictMode>
);`}
          />
        </div>
      </div>

      <div className="gs-step">
        <div className="gs-step__num" aria-hidden="true">4</div>
        <div className="gs-step__content">
          <h2 className="gs-step__title">Prevent flash of unstyled content</h2>
          <p style={{ margin: '0 0 var(--synu-spacing-4)', color: 'var(--synu-text-secondary)', fontSize: 'var(--synu-font-size-sm)' }}>
            Add this inline script to your <code className="inline-code">index.html</code>{' '}
            <code className="inline-code">&lt;head&gt;</code> to apply the correct theme
            before the first paint, preventing any flash.
          </p>
          <CodeBlock
            language="html"
            filename="index.html"
            code={`<script>
  (function () {
    try {
      var stored = localStorage.getItem('synu-theme');
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var theme = stored || (prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
  })();
</script>`}
          />
        </div>
      </div>

      <div className="gs-step">
        <div className="gs-step__num" aria-hidden="true">5</div>
        <div className="gs-step__content">
          <h2 className="gs-step__title">Use your first component</h2>
          <CodeBlock
            language="tsx"
            filename="src/App.tsx"
            code={`import {
  ButtonRoot,
  ButtonLabel,
  ButtonIcon,
  useTheme,
} from '@synu/react';

export function App() {
  const { mode, toggle } = useTheme();

  return (
    <div style={{ padding: 24 }}>
      <ButtonRoot variant="primary" onClick={toggle}>
        <ButtonLabel>
          Switch to {mode === 'light' ? 'dark' : 'light'} mode
        </ButtonLabel>
      </ButtonRoot>
    </div>
  );
}`}
          />
        </div>
      </div>

      <Alert variant="success" title="You're ready to build!">
        Synu is set up. Explore components to see everything available.
      </Alert>

      <Stack direction="row" gap={3} style={{ marginTop: 'var(--synu-spacing-8)' }}>
        <NavButton to="/docs/theming" variant="primary">
          <ButtonLabel>Theming →</ButtonLabel>
        </NavButton>
        <NavButton to="/docs/button" variant="ghost">
          <ButtonLabel>Button Component</ButtonLabel>
        </NavButton>
      </Stack>
    </div>
  );
}
