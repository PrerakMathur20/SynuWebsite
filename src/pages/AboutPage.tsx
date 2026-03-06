import React, { useState } from 'react';
import { Stack, Badge } from '@tokis/react';
import { NavButton } from '../components/NavButton';
import { ButtonLabel } from '@tokis/react';
import { CodeBlock } from '../components/CodeBlock';

interface ComparisonRow {
  feature: string;
  tokis: string | boolean;
  radix: string | boolean;
  shadcn: string | boolean;
  mui: string | boolean;
}

const comparisons: ComparisonRow[] = [
  { feature: 'Runtime CSS-in-JS', tokis: false, radix: false, shadcn: false, mui: true },
  { feature: 'Token-native design', tokis: true, radix: false, shadcn: false, mui: false },
  { feature: 'Zero external dependencies', tokis: true, radix: false, shadcn: false, mui: false },
  { feature: 'Built-in dark mode', tokis: true, radix: false, shadcn: true, mui: true },
  { feature: 'Headless + styled', tokis: true, radix: 'Headless only', shadcn: true, mui: false },
  { feature: 'SSR safe', tokis: true, radix: true, shadcn: true, mui: true },
  { feature: 'TypeScript first', tokis: true, radix: true, shadcn: true, mui: true },
  { feature: 'No Tailwind required', tokis: true, radix: true, shadcn: false, mui: true },
  { feature: 'Framework-agnostic core', tokis: true, radix: false, shadcn: false, mui: false },
  { feature: 'CSS variable theming', tokis: true, radix: false, shadcn: false, mui: false },
  { feature: 'No install-time codegen', tokis: true, radix: true, shadcn: false, mui: true },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <span style={{ color: 'var(--tokis-color-success)', fontWeight: 600 }}>✓</span>;
  if (value === false) return <span style={{ color: 'var(--tokis-color-error)', opacity: 0.5 }}>✗</span>;
  return <span style={{ color: 'var(--tokis-text-secondary)', fontSize: 'var(--tokis-font-size-xs)' }}>{value}</span>;
}

const principles = [
  { num: '01', title: 'Zero runtime', desc: 'All styles are precompiled CSS. No emotion, no styled-components, no runtime cost. Your CSS ships once and stays static.' },
  { num: '02', title: 'Token-native', desc: 'Every visual decision — color, spacing, radius, motion — is a CSS variable. Theming is as simple as overriding variables.' },
  { num: '03', title: 'Headless core', desc: 'Logic lives in framework-agnostic hooks and utilities. React is just one adapter. Vue and Svelte adapters are on the roadmap.' },
  { num: '04', title: 'Accessible by default', desc: 'WAI-ARIA compliance is non-negotiable. Every component ships with correct roles, keyboard navigation, and focus management.' },
  { num: '05', title: 'Composable', desc: 'The slot pattern over prop explosion. Primitives compose into complex UIs without fighting the component API.' },
  { num: '06', title: 'Enterprise scale', desc: 'Designed to power real SaaS products. 100+ component target, consistent patterns, and a CSS architecture built for teams.' },
];

const TABS = ['Overview', 'General', 'Technical'] as const;
type Tab = typeof TABS[number];

export function AboutPage() {
  const [tab, setTab] = useState<Tab>('Overview');

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero__inner">
          <Badge variant="primary">v0.1.0</Badge>
          <h1 className="about-hero__title">
            Why we built<br />
            <span className="hero__title-gradient">Tokis</span>
          </h1>
          <p className="about-hero__acronym">Tokis Only Knows Its Styles</p>
          <p className="about-hero__subtitle">
            Most UI libraries force a trade-off: flexibility or quality. You get a rigid, opinionated
            system that looks great out of the box, or a headless system that gives you full control
            but zero visual polish. Tokis refuses that trade-off.
          </p>
          <div className="about-tabs">
            {TABS.map((t) => (
              <button
                key={t}
                className={`about-tab${tab === t ? ' about-tab--active' : ''}`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── OVERVIEW TAB ── */}
      {tab === 'Overview' && (
        <>
          <section className="about-section">
            <div className="about-section__inner">
              <p className="features__eyebrow">Philosophy</p>
              <h2 className="about-section__title">Six principles we don't compromise on</h2>
              <div className="about-principles">
                {principles.map((p) => (
                  <div key={p.num} className="about-principle">
                    <span className="about-principle__num">{p.num}</span>
                    <div>
                      <h3 className="about-principle__title">{p.title}</h3>
                      <p className="about-principle__desc">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="about-section about-section--alt">
            <div className="about-section__inner">
              <p className="features__eyebrow">Architecture</p>
              <h2 className="about-section__title">Layered by design</h2>
              <p className="about-section__desc">
                The package structure enforces strict separation of concerns. Tokens inform the theme.
                The headless core is framework-free. React is one adapter on top.
              </p>
              <CodeBlock language="text" code={`@tokis/tokens    ← CSS variables as JS constants
    ↓
@tokis/theme     ← Precompiled component CSS
    ↓
@tokis/core      ← Headless logic (no React)
    ↓
@tokis/react     ← React components & hooks`} />
            </div>
          </section>

          <section className="about-section">
            <div className="about-section__inner">
              <p className="features__eyebrow">Comparison</p>
              <h2 className="about-section__title">How Tokis stacks up</h2>
              <p className="about-section__desc">An honest comparison with popular alternatives.</p>
              <div className="comparison-table-wrap">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th><span className="comparison-table__tokis">Tokis</span></th>
                      <th>Radix UI</th>
                      <th>shadcn/ui</th>
                      <th>MUI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((row) => (
                      <tr key={row.feature}>
                        <td>{row.feature}</td>
                        <td><Cell value={row.tokis} /></td>
                        <td><Cell value={row.radix} /></td>
                        <td><Cell value={row.shadcn} /></td>
                        <td><Cell value={row.mui} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="about-section about-section--alt">
            <div className="about-section__inner">
              <p className="features__eyebrow">Roadmap</p>
              <h2 className="about-section__title">What's coming</h2>
              <div className="roadmap-grid">
                {[
                  { phase: 'v0.1', label: 'Current', items: ['40+ React components', 'CSS variable theming', 'Dark mode', 'WCAG AA compliance'], done: true },
                  { phase: 'v0.2', label: 'Next', items: ['Animation primitives', 'Vue adapter', 'Figma tokens sync', 'RTL support'], done: false },
                  { phase: 'v0.3', label: 'Future', items: ['Svelte adapter', 'CLI scaffold tool', 'Theme builder UI', 'AI-assisted theming'], done: false },
                ].map((phase) => (
                  <div key={phase.phase} className={`roadmap-card${phase.done ? ' roadmap-card--done' : ''}`}>
                    <div className="roadmap-card__header">
                      <span className="roadmap-card__phase">{phase.phase}</span>
                      <Badge variant={phase.done ? 'success' : 'default'}>{phase.label}</Badge>
                    </div>
                    <ul className="roadmap-card__items">
                      {phase.items.map((item) => (
                        <li key={item} className="roadmap-card__item">
                          <span className="roadmap-card__check">{phase.done ? '✓' : '○'}</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── GENERAL TAB ── */}
      {tab === 'General' && (
        <>
          <section className="about-section">
            <div className="about-section__inner">
              <p className="features__eyebrow">Plain English</p>
              <h2 className="about-section__title">What is Tokis, really?</h2>
              <p className="about-section__desc">
                Think of building a web app like building a house. You could buy raw lumber and cut every
                plank yourself — that's writing HTML from scratch. Or you could buy pre-cut framing kits
                that fit together in standard ways — that's what a component library like Tokis gives you.
              </p>
              <p className="about-section__desc">
                Tokis is a set of ready-made, professionally designed UI building blocks for React apps.
                Instead of spending days building a dropdown menu that works correctly with keyboards and
                screen readers, you import Tokis's <code>Dropdown</code> and it just works.
              </p>
            </div>
          </section>

          <section className="about-section about-section--alt">
            <div className="about-section__inner">
              <p className="features__eyebrow">The Paint Problem</p>
              <h2 className="about-section__title">Why most UI libraries feel like a cage</h2>
              <p className="about-section__desc">
                Imagine you bought a furnished house, but every wall, floor, and ceiling was a specific
                shade of blue — and repainting required calling the manufacturer and waiting six weeks.
                That's what theming feels like in many UI libraries.
              </p>
              <p className="about-section__desc">
                Tokis solved this with what engineers call "CSS custom properties" (also called CSS variables).
                Think of them as paint swatches with names. The whole design system references named swatches,
                not raw colors. To rebrand from blue to violet, you update one swatch. Every component in
                your app updates instantly.
              </p>
              <div className="general-analogy-grid">
                {[
                  { icon: '🏠', title: 'Traditional libraries', desc: 'Colors baked in. Changing them requires understanding the library\'s internal theming system, often with JavaScript objects and provider components.' },
                  { icon: '🎨', title: 'Tokis approach', desc: 'Colors are named variables in CSS. Override them in one place and the entire app updates — no JavaScript, no provider config, no build step.' },
                ].map((item) => (
                  <div key={item.title} className="general-analogy-card">
                    <span className="general-analogy-icon">{item.icon}</span>
                    <h3 className="general-analogy-title">{item.title}</h3>
                    <p className="general-analogy-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="about-section">
            <div className="about-section__inner">
              <p className="features__eyebrow">Speed vs Quality</p>
              <h2 className="about-section__title">The tradeoff other libraries force on you</h2>
              <div className="general-comparison-grid">
                {[
                  {
                    title: 'Headless libraries (Radix UI, Headless UI)',
                    pros: ['Full visual control', 'Lightweight', 'No style opinions'],
                    cons: ['You write every CSS rule', 'No dark mode by default', 'Accessibility still your job (partially)'],
                  },
                  {
                    title: 'Full-featured libraries (MUI, Chakra)',
                    pros: ['Beautiful defaults', 'Dark mode included', 'Large component catalog'],
                    cons: ['Heavy runtime JS for styles', 'Theming requires deep API knowledge', 'Hard to override without fighting the system'],
                  },
                  {
                    title: 'Copy-paste libraries (shadcn/ui)',
                    pros: ['Your code, your files', 'No library updates to manage', 'Tailwind-native'],
                    cons: ['Requires Tailwind CSS', 'Components diverge across projects', 'No centralized updates'],
                  },
                  {
                    title: 'Tokis',
                    pros: ['Beautiful defaults AND full control', 'Zero JS for styles (pure CSS)', 'Token system = one place to change everything'],
                    cons: ['Younger ecosystem', 'Smaller community (for now)', 'Requires theme import'],
                    highlight: true,
                  },
                ].map((item) => (
                  <div key={item.title} className={`general-comparison-card${item.highlight ? ' general-comparison-card--highlight' : ''}`}>
                    {item.highlight && <span className="general-comparison-badge">Tokis</span>}
                    <h3 className="general-comparison-title">{item.title}</h3>
                    <div className="general-comparison-lists">
                      <ul className="general-comparison-pros">
                        {item.pros.map((p) => <li key={p}><span>✓</span>{p}</li>)}
                      </ul>
                      <ul className="general-comparison-cons">
                        {item.cons.map((c) => <li key={c}><span>–</span>{c}</li>)}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="about-section about-section--alt">
            <div className="about-section__inner">
              <p className="features__eyebrow">The Hidden Cost</p>
              <h2 className="about-section__title">What "performance-first" actually means</h2>
              <p className="about-section__desc">
                Many developers don't know that some popular UI libraries calculate and inject styles
                using JavaScript every time the page loads. This adds milliseconds — sometimes hundreds
                of them — to every page render.
              </p>
              <p className="about-section__desc">
                Tokis's styles are "precompiled" — they're ready to go before JavaScript even runs.
                It's the difference between a pre-packed lunch and cooking from scratch every morning.
                Users notice it. Lighthouse scores reflect it. And your DevOps team won't hate you for it.
              </p>
              <div className="general-perf-stats">
                {[
                  { label: 'Runtime style injection', tokis: '0ms', others: '50–200ms' },
                  { label: 'CSS bundle size', tokis: '~18kb gzip', others: '40–200kb gzip' },
                  { label: 'Theme change mechanism', tokis: 'CSS var swap', others: 'JS re-render' },
                  { label: 'SSR hydration mismatch risk', tokis: 'None', others: 'Common' },
                ].map((row) => (
                  <div key={row.label} className="general-perf-row">
                    <span className="general-perf-label">{row.label}</span>
                    <span className="general-perf-tokis">{row.tokis}</span>
                    <span className="general-perf-others">{row.others}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── TECHNICAL TAB ── */}
      {tab === 'Technical' && (
        <>
          <section className="about-section">
            <div className="about-section__inner">
              <p className="features__eyebrow">Architecture Deep Dive</p>
              <h2 className="about-section__title">The token system</h2>
              <p className="about-section__desc">
                <code>@tokis/tokens</code> exports every design decision as both a TypeScript constant
                and a CSS custom property. The two layers — primitive and semantic — give you a
                theming system that's both precise and maintainable.
              </p>
              <CodeBlock language="tsx" filename="@tokis/tokens — Primitive tokens" code={`// Primitive: raw values, named by scale
export const colors = {
  blue50:  '#eff6ff',
  blue500: '#0066ff',
  blue900: '#1e3a8a',
  gray50:  '#f9fafb',
  gray900: '#111827',
  // ...
};

export const spacing = {
  1: '4px',
  2: '8px',
  4: '16px',
  8: '32px',
  // ...
};`} />
              <CodeBlock language="tsx" filename="@tokis/tokens — Semantic tokens" code={`// Semantic: meaningful aliases that change per theme
export const semanticLight = {
  colorPrimary:    colors.blue500,
  colorBackground: '#ffffff',
  textPrimary:     colors.gray900,
  textSecondary:   colors.gray600,
};

export const semanticDark = {
  colorPrimary:    colors.blue400,
  colorBackground: colors.gray950,
  textPrimary:     colors.gray50,
  textSecondary:   colors.gray400,
};`} />
              <CodeBlock language="css" filename="@tokis/theme — Output CSS (simplified)" code={`:root {
  --tokis-color-primary: #0066ff;
  --tokis-color-background: #ffffff;
  --tokis-text-primary: #111827;
}

[data-theme="dark"] {
  --tokis-color-primary: #3b82f6;
  --tokis-color-background: #0a0a0a;
  --tokis-text-primary: #f9fafb;
}`} />
            </div>
          </section>

          <section className="about-section about-section--alt">
            <div className="about-section__inner">
              <p className="features__eyebrow">Composition Pattern</p>
              <h2 className="about-section__title">Slot-based components</h2>
              <p className="about-section__desc">
                Tokis uses the "slot" pattern: complex components expose named sub-components
                instead of a single monolithic component with dozens of props. This avoids
                prop explosion while keeping each part independently composable.
              </p>
              <CodeBlock language="tsx" code={`// ✅ Tokis — explicit, composable, zero prop explosion
import { ButtonRoot, ButtonIcon, ButtonLabel } from '@tokis/react';

<ButtonRoot variant="primary" size="lg" loading={isSaving}>
  <ButtonIcon aria-hidden>
    <SaveIcon />
  </ButtonIcon>
  <ButtonLabel>Save Changes</ButtonLabel>
</ButtonRoot>

// ❌ Alternative — implicit, hard to extend, fragile
<Button
  variant="primary"
  size="lg"
  loading={isSaving}
  leftIcon={<SaveIcon />}
  leftIconAriaHidden
  leftIconClassName="..."
>
  Save Changes
</Button>`} />
              <p className="about-section__desc">
                The slot pattern means you can render any sub-component anywhere inside the parent,
                wrap it with custom markup, or replace it entirely — without overriding deeply
                nested CSS selectors.
              </p>
            </div>
          </section>

          <section className="about-section">
            <div className="about-section__inner">
              <p className="features__eyebrow">Headless Core</p>
              <h2 className="about-section__title">@tokis/core — framework-agnostic logic</h2>
              <p className="about-section__desc">
                Complex UI patterns like focus traps, roving tabindex, and controllable state
                are framework-agnostic problems. <code>@tokis/core</code> implements them in
                plain TypeScript — no React, no Vue.
              </p>
              <CodeBlock language="ts" filename="@tokis/core/focus/focus-trap.ts" code={`// Pure TypeScript — no framework imports
export function trapFocus(container: HTMLElement): () => void {
  const focusable = container.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  }

  container.addEventListener('keydown', handleKeyDown);
  first?.focus();

  return () => container.removeEventListener('keydown', handleKeyDown);
}`} />
              <p className="about-section__desc">
                The React adapter in <code>@tokis/react</code> wraps this in a <code>useEffect</code>:
              </p>
              <CodeBlock language="tsx" filename="@tokis/react — useDialog hook (simplified)" code={`import { trapFocus } from '@tokis/core';

export function useDialog(ref: RefObject<HTMLElement>, open: boolean) {
  useEffect(() => {
    if (!open || !ref.current) return;
    const cleanup = trapFocus(ref.current);
    return cleanup;
  }, [open]);
}`} />
            </div>
          </section>

          <section className="about-section about-section--alt">
            <div className="about-section__inner">
              <p className="features__eyebrow">State Machines</p>
              <h2 className="about-section__title">XState for complex component state</h2>
              <p className="about-section__desc">
                Simple components (Badge, Avatar) are pure JSX. But interactive components
                with multiple states and transitions use XState state machines to make
                behavior explicit, testable, and impossible to get into undefined states.
              </p>
              <CodeBlock language="ts" filename="Button state machine (simplified)" code={`import { createMachine } from 'xstate';

const buttonMachine = createMachine({
  id: 'button',
  initial: 'idle',
  states: {
    idle: {
      on: {
        PRESS: 'pressed',
        DISABLE: 'disabled',
      },
    },
    pressed: {
      on: { RELEASE: 'idle' },
    },
    loading: {
      // aria-busy, prevents double-submit
      on: { DONE: 'idle', ERROR: 'idle' },
    },
    disabled: {
      // aria-disabled, pointer-events: none
      on: { ENABLE: 'idle' },
    },
  },
});`} />
            </div>
          </section>

          <section className="about-section">
            <div className="about-section__inner">
              <p className="features__eyebrow">Theming</p>
              <h2 className="about-section__title">Overriding tokens</h2>
              <p className="about-section__desc">
                Theming in Tokis is pure CSS. No JavaScript, no provider configuration.
                Override variables globally, per-scope, or per-component.
              </p>
              <CodeBlock language="css" filename="Global override" code={`/* your-theme.css — loaded once in main.tsx */
:root {
  /* Rebrand to violet */
  --tokis-color-primary:        #7c3aed;
  --tokis-color-primary-hover:  #6d28d9;
  --tokis-color-primary-subtle: rgba(124, 58, 237, 0.08);

  /* Custom font */
  --tokis-font-family: 'Inter Variable', system-ui, sans-serif;

  /* Sharper corners */
  --tokis-radius-sm: 2px;
  --tokis-radius-md: 4px;
  --tokis-radius-lg: 6px;
  --tokis-radius-full: 4px;
}`} />
              <CodeBlock language="css" filename="Scoped override (dark sidebar)" code={`.sidebar {
  --tokis-color-background: #1a1a2e;
  --tokis-text-primary: #e2e8f0;
  --tokis-color-border: rgba(255,255,255,0.1);
  /* All Tokis components inside .sidebar use these values */
}`} />
              <CodeBlock language="tsx" filename="Dynamic theme (JavaScript)" code={`function setThemeColor(primary: string) {
  document.documentElement.style.setProperty('--tokis-color-primary', primary);
}

// Instant theme change — no re-render, no style injection
setThemeColor('#7c3aed');`} />
            </div>
          </section>

          <section className="about-section about-section--alt">
            <div className="about-section__inner">
              <p className="features__eyebrow">TypeScript</p>
              <h2 className="about-section__title">Type safety throughout</h2>
              <p className="about-section__desc">
                Every component prop is typed, including polymorphic components that
                change their element type and carry through the correct HTML attribute types.
              </p>
              <CodeBlock language="tsx" code={`// Polymorphic ButtonRoot — typed correctly for any element
<ButtonRoot as="a" href="/pricing" variant="primary">
  {/* href is typed, variant is restricted to valid values */}
  <ButtonLabel>View Pricing</ButtonLabel>
</ButtonRoot>

// TypeScript error if you use wrong prop:
<ButtonRoot as="a" to="/pricing" variant="primary">  // ❌ 'to' doesn't exist on 'a'
  <ButtonLabel>View Pricing</ButtonLabel>
</ButtonRoot>

// Generic Select — infers value type from options
type Role = 'admin' | 'editor' | 'viewer';
const [role, setRole] = useState<Role>('viewer');

<Select<Role>
  value={role}
  onChange={setRole}
  options={[
    { value: 'admin', label: 'Admin' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' },
  ]}
/>`} />
            </div>
          </section>

          <section className="about-section">
            <div className="about-section__inner">
              <p className="features__eyebrow">Accessibility</p>
              <h2 className="about-section__title">ARIA patterns baked in</h2>
              <p className="about-section__desc">
                Accessibility isn't a feature flag — it's the baseline. Every interactive
                component implements the correct ARIA pattern from the WAI-ARIA Authoring Practices Guide.
              </p>
              <CodeBlock language="tsx" filename="What Tokis generates for Dialog" code={`// You write:
<Dialog open={open} onClose={close}>
  <DialogHeader>Delete file?</DialogHeader>
  <DialogBody>This cannot be undone.</DialogBody>
</Dialog>

// Tokis renders:
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title-1"
  tabIndex={-1}
>
  <h2 id="dialog-title-1">Delete file?</h2>
  <div>This cannot be undone.</div>
</div>
// + focus trap, scroll lock, backdrop, Escape handler`} />
              <CodeBlock language="tsx" filename="What Tokis generates for Tabs" code={`// You write:
<Tabs defaultValue="overview">
  <TabList>
    <Tab value="overview">Overview</Tab>
    <Tab value="settings">Settings</Tab>
  </TabList>
  <TabPanel value="overview">...</TabPanel>
  <TabPanel value="settings">...</TabPanel>
</Tabs>

// Tokis renders with full ARIA:
// <div role="tablist" aria-label="...">
//   <button role="tab" aria-selected="true" aria-controls="panel-overview" id="tab-overview">
//   <button role="tab" aria-selected="false" aria-controls="panel-settings" tabIndex={-1}>
// <div role="tabpanel" id="panel-overview" aria-labelledby="tab-overview">
// Arrow keys cycle tabs. Home/End jump to first/last.`} />
            </div>
          </section>
        </>
      )}

      <section className="cta-section" style={{ marginTop: 0 }}>
        <div className="cta-section__content">
          <h2 className="cta-section__title">Ready to build?</h2>
          <p className="cta-section__desc">
            Tokis is open-source and MIT licensed. Start with the docs or explore components in the playground.
          </p>
          <Stack direction="row" gap={3} justify="center" wrap>
            <NavButton to="/docs/introduction" size="lg" variant="primary">
              <ButtonLabel>Read the Docs</ButtonLabel>
            </NavButton>
            <NavButton to="/playground" size="lg" variant="outline">
              <ButtonLabel>Open Playground</ButtonLabel>
            </NavButton>
          </Stack>
        </div>
      </section>
    </div>
  );
}
