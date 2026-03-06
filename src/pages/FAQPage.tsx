import React, { useState } from 'react';
import { NavButton } from '../components/NavButton';
import { ButtonLabel, Stack, Badge } from '@tokis/react';
import { CodeBlock } from '../components/CodeBlock';

interface FAQItem {
  q: string;
  a: React.ReactNode;
  category: string;
}

const faqs: FAQItem[] = [
  // General
  {
    category: 'General',
    q: 'What is Tokis?',
    a: 'Tokis is an open-source React component library and design system. It ships 40+ production-ready components — buttons, forms, modals, tables, charts — all styled with CSS custom properties (variables) so they\'re easy to theme. It\'s designed for SaaS products and enterprise apps where accessibility, performance, and maintainability matter.',
  },
  {
    category: 'General',
    q: 'Is Tokis free to use?',
    a: 'Yes. Tokis is MIT licensed. Use it in personal projects, commercial SaaS, and enterprise applications with no restrictions or fees.',
  },
  {
    category: 'General',
    q: 'How is Tokis different from MUI or shadcn/ui?',
    a: (
      <>
        <p>Three key differences:</p>
        <ul>
          <li><strong>No runtime CSS overhead.</strong> Unlike MUI which uses CSS-in-JS (Emotion), Tokis ships pre-compiled static CSS. No style injection at runtime, no hydration issues.</li>
          <li><strong>Token-native from the ground up.</strong> Every visual property is a CSS variable. Theming means overriding variables — no theme object configs, no provider nesting.</li>
          <li><strong>Framework-agnostic core.</strong> The headless logic lives in <code>@tokis/core</code>, separate from React. shadcn/ui is React-only; Tokis is designed for future Vue and Svelte adapters.</li>
        </ul>
      </>
    ),
  },
  {
    category: 'General',
    q: 'Is Tokis production-ready?',
    a: 'Tokis v0.1.0 is an early release. Core components are stable, tested, and used in active projects. APIs may change between minor versions until v1.0. We recommend pinning to a specific version in production.',
  },
  {
    category: 'General',
    q: 'What browsers does Tokis support?',
    a: 'Tokis supports all modern browsers: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+. It uses CSS custom properties, IntersectionObserver, and ResizeObserver — all widely supported. No IE11 support.',
  },
  // Installation
  {
    category: 'Installation',
    q: 'What\'s the simplest way to install Tokis?',
    a: (
      <CodeBlock language="bash" code={`npm i tokis\n# Then in your main entry file:\nimport 'tokis/theme';`} />
    ),
  },
  {
    category: 'Installation',
    q: 'Can I install only the packages I need?',
    a: (
      <>
        <p>Yes. The monorepo has four focused packages:</p>
        <CodeBlock language="bash" code={`npm i @tokis/react @tokis/theme   # React components + styles (most common)
npm i @tokis/tokens               # Just the design tokens (TypeScript constants)
npm i @tokis/core                 # Just the headless primitives`} />
      </>
    ),
  },
  {
    category: 'Installation',
    q: 'Does Tokis work with Next.js?',
    a: (
      <>
        <p>Yes. Import the theme CSS in your root layout:</p>
        <CodeBlock language="tsx" filename="app/layout.tsx" code={`import 'tokis/theme'; // or '@tokis/theme'
import { ThemeProvider } from '@tokis/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}`} />
      </>
    ),
  },
  {
    category: 'Installation',
    q: 'Does Tokis support Server-Side Rendering (SSR)?',
    a: 'Yes. Tokis uses CSS custom properties for theming, which work on the server without any flash of unstyled content. There is no CSS-in-JS hydration step. ThemeProvider reads a data-theme attribute on the <html> element, which you can set server-side.',
  },
  // Theming
  {
    category: 'Theming',
    q: 'How do I change the primary color?',
    a: (
      <CodeBlock language="css" filename="your-theme.css" code={`:root {
  --tokis-color-primary: #7c3aed;       /* violet */
  --tokis-color-primary-hover: #6d28d9;
  --tokis-color-primary-subtle: rgba(124, 58, 237, 0.08);
}`} />
    ),
  },
  {
    category: 'Theming',
    q: 'How does dark mode work?',
    a: (
      <>
        <p>Tokis ships a built-in dark theme. Wrap your app in <code>ThemeProvider</code> and use the <code>useTheme</code> hook to toggle:</p>
        <CodeBlock language="tsx" code={`import { ThemeProvider, useTheme } from '@tokis/react';

function ThemeToggle() {
  const { mode, toggle } = useTheme();
  return <button onClick={toggle}>{mode === 'light' ? '🌙' : '☀️'}</button>;
}`} />
        <p>Internally, <code>ThemeProvider</code> sets <code>data-theme="dark"</code> on the <code>&lt;html&gt;</code> element, and <code>@tokis/theme</code> has a full dark-mode token set under <code>[data-theme="dark"]</code>.</p>
      </>
    ),
  },
  {
    category: 'Theming',
    q: 'Can I build a completely custom theme?',
    a: (
      <>
        <p>Yes. Every visual token is a CSS variable. Override as many or as few as you like:</p>
        <CodeBlock language="css" code={`:root {
  /* Colors */
  --tokis-color-primary: #0ea5e9;
  --tokis-color-background: #f8fafc;

  /* Typography */
  --tokis-font-family: 'Inter', sans-serif;
  --tokis-font-size-base: 14px;

  /* Radius */
  --tokis-radius-md: 4px;   /* square corners */
  --tokis-radius-full: 4px;
}`} />
      </>
    ),
  },
  // Accessibility
  {
    category: 'Accessibility',
    q: 'Is Tokis WCAG compliant?',
    a: 'Tokis targets WCAG 2.1 AA compliance. Every component ships with correct ARIA roles, keyboard navigation, focus management, and sufficient color contrast ratios in both light and dark modes. We test with screen readers (NVDA, VoiceOver) on every component.',
  },
  {
    category: 'Accessibility',
    q: 'Does Tokis handle focus management for modals?',
    a: (
      <>
        <p>Yes. Dialog, Drawer, and CommandPalette use the focus trap from <code>@tokis/core</code> which implements the WAI-ARIA modal pattern:</p>
        <ul>
          <li>Focus moves to the first focusable element when opened</li>
          <li>Tab/Shift+Tab cycle only within the modal</li>
          <li>Escape closes the modal and returns focus to the trigger</li>
          <li>Background content has <code>aria-hidden="true"</code> applied</li>
        </ul>
      </>
    ),
  },
  // TypeScript
  {
    category: 'TypeScript',
    q: 'Is Tokis TypeScript-first?',
    a: 'Yes. Tokis is written entirely in TypeScript. Every component exports its prop types. Generic components like Select and VirtualizedList are fully typed with proper inference.',
  },
  {
    category: 'TypeScript',
    q: 'How do I get type safety with the Button\'s polymorphic "as" prop?',
    a: (
      <CodeBlock language="tsx" code={`// ButtonRoot accepts an "as" prop to change the rendered element
// Type inference works for links, router links, etc.

import { ButtonRoot, ButtonLabel } from '@tokis/react';
import { Link } from 'react-router-dom';

// Renders as <a> with correct href types
<ButtonRoot as="a" href="/pricing" variant="primary">
  <ButtonLabel>View Pricing</ButtonLabel>
</ButtonRoot>

// Renders as React Router Link
<ButtonRoot as={Link} to="/dashboard" variant="primary">
  <ButtonLabel>Dashboard</ButtonLabel>
</ButtonRoot>`} />
    ),
  },
  // Contributing
  {
    category: 'Contributing',
    q: 'How can I contribute?',
    a: (
      <>
        <p>Contributions are welcome! The best ways to help:</p>
        <ul>
          <li>Report bugs via <a href="https://github.com/PrerakMathur20/TokisLib/issues" target="_blank" rel="noopener noreferrer">GitHub Issues</a></li>
          <li>Suggest new components or API improvements</li>
          <li>Submit PRs for bug fixes or documentation improvements</li>
          <li>Help test accessibility with assistive technologies</li>
        </ul>
      </>
    ),
  },
];

const categories = Array.from(new Set(faqs.map((f) => f.category)));

export function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const toggle = (idx: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const filtered = activeCategory === 'All' ? faqs : faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <div className="faq-hero__inner">
          <Badge variant="default">FAQ</Badge>
          <h1 className="faq-hero__title">Frequently Asked Questions</h1>
          <p className="faq-hero__subtitle">
            Everything you wanted to know about Tokis but were afraid to ask.
            Can't find your answer? Open an issue on GitHub.
          </p>
        </div>
      </section>

      <div className="faq-body">
        <div className="faq-categories">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              className={`faq-category-btn${activeCategory === cat ? ' faq-category-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="faq-list">
          {filtered.map((item, i) => {
            const globalIdx = faqs.indexOf(item);
            const isOpen = openItems.has(globalIdx);
            return (
              <div key={globalIdx} className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
                <button
                  className="faq-item__trigger"
                  onClick={() => toggle(globalIdx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-item__q">{item.q}</span>
                  <span className="faq-item__icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="faq-item__answer">
                    {typeof item.a === 'string' ? <p>{item.a}</p> : item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <section className="cta-section">
        <div className="cta-section__content">
          <h2 className="cta-section__title">Still have questions?</h2>
          <p className="cta-section__desc">
            Browse the docs, explore components in the playground, or open an issue on GitHub.
          </p>
          <Stack direction="row" gap={3} justify="center" wrap>
            <NavButton to="/docs/introduction" size="lg" variant="primary">
              <ButtonLabel>Browse Docs</ButtonLabel>
            </NavButton>
            <NavButton to="/playground" size="lg" variant="outline">
              <ButtonLabel>Playground</ButtonLabel>
            </NavButton>
          </Stack>
        </div>
      </section>
    </div>
  );
}
