import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ButtonRoot, ButtonLabel,
  Badge, Avatar, Alert, Switch,
  Stack, Chip, Progress, Spinner, Rating,
} from '@tokis/react';
import { NavButton } from '../components/NavButton';

/* ── Animated counter ─────────────────────────────────── */
function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          function tick(t: number) {
            const p = Math.min((t - t0) / duration, 1);
            setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);
  return { count, ref };
}

/* ── Marquee ──────────────────────────────────────────── */
const TAGS = [
  'React 18', 'TypeScript', 'WAI-ARIA', 'Zero Runtime', 'Dark Mode', 'Tree Shakable',
  'SSR Safe', 'WCAG AA', 'ESM + CJS', 'Design Tokens', 'Focus Management', 'MIT License',
];

function Marquee() {
  const row = [...TAGS, ...TAGS];
  return (
    <div className="lpv3-marquee">
      <div className="lpv3-marquee__row">
        {row.map((t, i) => (
          <span key={i} className="lpv3-marquee__item">
            <span className="lpv3-marquee__dot" />{t}
          </span>
        ))}
      </div>
      <div className="lpv3-marquee__row lpv3-marquee__row--rev">
        {row.map((t, i) => (
          <span key={i} className="lpv3-marquee__item">
            <span className="lpv3-marquee__dot" />{t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Hero Showcase Card ───────────────────────────────── */
function HeroShowcase() {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  const [switchOn, setSwitchOn] = useState(true);
  const [chip, setChip] = useState('design');
  const hscRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = hscRef.current;
      if (!el) return;
      const nx = (e.clientX / window.innerWidth  - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      el.style.setProperty('--fx', `${nx * 14}px`);
      el.style.setProperty('--fy', `${ny * 8}px`);
      el.style.setProperty('--rx', `${-ny * 5}deg`);
      el.style.setProperty('--ry', `${nx * 5}deg`);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const codeText = `import {
  ButtonRoot, ButtonLabel,
  Badge, Alert, Progress,
  Switch, Chip, Avatar,
  Spinner, Rating,
} from '@tokis/react';
import '@tokis/theme/dist/index.css';

// Every variant — same predictable API
<ButtonRoot variant="primary" size="lg">
  <ButtonLabel>Deploy</ButtonLabel>
</ButtonRoot>
<ButtonRoot variant="secondary" />
<ButtonRoot variant="ghost" loading />
<ButtonRoot variant="destructive" />

// Status components
<Badge variant="success">Live</Badge>
<Alert variant="warning" title="Rate limit">
  85% of monthly quota used.
</Alert>

// Form controls
<Switch checked={on} onChange={setOn}
        label="Auto-deploy" />
<Progress value={73} variant="default" />
<Rating value={4.5} readOnly />`;

  return (
    <div
      ref={hscRef}
      className="lpv3-hsc"
      style={{ transform: 'perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translate(var(--fx,0px),var(--fy,0px))' } as React.CSSProperties}
    >
      {/* Title bar */}
      <div className="lpv3-hsc__bar">
        <div className="lpv3-hsc__dots"><span /><span /><span /></div>
        <div className="lpv3-hsc__tabs">
          <button
            className={`lpv3-hsc__tab${tab === 'preview' ? ' lpv3-hsc__tab--on' : ''}`}
            onClick={() => setTab('preview')}
          >Preview</button>
          <button
            className={`lpv3-hsc__tab${tab === 'code' ? ' lpv3-hsc__tab--on' : ''}`}
            onClick={() => setTab('code')}
          >Code</button>
        </div>
        <span className="lpv3-hsc__live"><span className="lpv3-hsc__live-dot" />Live</span>
      </div>

      {/* Preview */}
      {tab === 'preview' && (
        <div className="lpv3-hsc__preview">
          <div className="lpv3-hsc__group">
            <div className="lpv3-hsc__group-label">Buttons</div>
            <Stack direction="row" gap={1} wrap>
              <ButtonRoot size="sm" variant="primary"><ButtonLabel>Primary</ButtonLabel></ButtonRoot>
              <ButtonRoot size="sm" variant="secondary"><ButtonLabel>Secondary</ButtonLabel></ButtonRoot>
              <ButtonRoot size="sm" variant="outline"><ButtonLabel>Outline</ButtonLabel></ButtonRoot>
              <ButtonRoot size="sm" variant="ghost"><ButtonLabel>Ghost</ButtonLabel></ButtonRoot>
              <ButtonRoot size="sm" variant="primary" loading><ButtonLabel>Saving…</ButtonLabel></ButtonRoot>
              <ButtonRoot size="sm" variant="destructive"><ButtonLabel>Delete</ButtonLabel></ButtonRoot>
            </Stack>
          </div>

          <div className="lpv3-hsc__group">
            <div className="lpv3-hsc__group-label">Badges</div>
            <Stack direction="row" gap={1} wrap>
              <Badge>Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
            </Stack>
          </div>

          <div className="lpv3-hsc__group">
            <div className="lpv3-hsc__group-label">Alerts</div>
            <Stack gap={2}>
              <Alert variant="success" title="Deploy successful">
                <span style={{ fontSize: 11 }}>Edge network live in 3 regions.</span>
              </Alert>
              <Alert variant="warning" title="Rate limit approaching">
                <span style={{ fontSize: 11 }}>85% of monthly quota used.</span>
              </Alert>
            </Stack>
          </div>

          <div className="lpv3-hsc__group">
            <div className="lpv3-hsc__group-label">Form Controls</div>
            <Stack gap={2}>
              <Stack direction="row" gap={2} align="center">
                <Switch checked={switchOn} onChange={setSwitchOn} label="Auto-deploy" aria-label="Toggle auto-deploy" />
                <Badge variant={switchOn ? 'success' : 'default'}>{switchOn ? 'Active' : 'Off'}</Badge>
              </Stack>
              <Stack direction="row" gap={1} wrap>
                {['design', 'dev', 'product', 'data'].map(t => (
                  <Chip key={t} selected={chip === t} onClick={() => setChip(t)}>{t}</Chip>
                ))}
              </Stack>
            </Stack>
          </div>

          <div className="lpv3-hsc__group">
            <div className="lpv3-hsc__group-label">Metrics</div>
            <Stack gap={2}>
              {([
                { l: 'Storage', v: 73, c: 'default' },
                { l: 'CPU',     v: 41, c: 'success' },
                { l: 'Memory',  v: 88, c: 'warning' },
              ] as { l: string; v: number; c: 'default' | 'success' | 'warning' }[]).map(m => (
                <Stack key={m.l} gap={1}>
                  <Stack direction="row" justify="space-between">
                    <span style={{ fontSize: 11, color: 'var(--tokis-text-secondary)' }}>{m.l}</span>
                    <span style={{ fontSize: 11, color: 'var(--tokis-text-tertiary)' }}>{m.v}%</span>
                  </Stack>
                  <Progress value={m.v} variant={m.c} />
                </Stack>
              ))}
            </Stack>
          </div>

          <div className="lpv3-hsc__group">
            <div className="lpv3-hsc__group-label">Social / Misc</div>
            <Stack direction="row" gap={4} align="center">
              <Stack gap={1}>
                <span style={{ fontSize: 10, color: 'var(--tokis-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Rating</span>
                <Rating value={4.5} readOnly size="sm" />
              </Stack>
              <Stack gap={1}>
                <span style={{ fontSize: 10, color: 'var(--tokis-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Team</span>
                <Stack direction="row" gap={0}>
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{ marginLeft: i > 1 ? -8 : 0 }}>
                      <Avatar name={`User ${i}`} size="sm" />
                    </div>
                  ))}
                </Stack>
              </Stack>
              <Stack gap={1}>
                <span style={{ fontSize: 10, color: 'var(--tokis-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Status</span>
                <Stack direction="row" gap={1} align="center">
                  <Spinner size="sm" />
                  <span style={{ fontSize: 11, color: 'var(--tokis-text-secondary)' }}>Syncing</span>
                </Stack>
              </Stack>
            </Stack>
          </div>
        </div>
      )}

      {/* Code */}
      {tab === 'code' && (
        <div className="lpv3-hsc__code-panel">
          <pre className="lpv3-hsc__pre"><code>{codeText}</code></pre>
        </div>
      )}
    </div>
  );
}

/* ── Chapter demo components (defined outside Landing so state is stable) */
function Demo0() {
  const [loading, setLoading] = useState(false);
  return (
    <Stack gap={4}>
      <Stack direction="row" gap={2} wrap>
        <ButtonRoot variant="primary" size="sm"><ButtonLabel>Primary</ButtonLabel></ButtonRoot>
        <ButtonRoot variant="secondary" size="sm"><ButtonLabel>Secondary</ButtonLabel></ButtonRoot>
        <ButtonRoot variant="outline" size="sm"><ButtonLabel>Outline</ButtonLabel></ButtonRoot>
        <ButtonRoot variant="ghost" size="sm"><ButtonLabel>Ghost</ButtonLabel></ButtonRoot>
      </Stack>
      <Stack direction="row" gap={2} align="center">
        <ButtonRoot
          variant="primary" size="sm" loading={loading}
          onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
        >
          <ButtonLabel>{loading ? 'Saving…' : 'Click me'}</ButtonLabel>
        </ButtonRoot>
        <Badge variant="success">Active</Badge>
        <Badge variant="warning">Pending</Badge>
        <Badge variant="error">Error</Badge>
      </Stack>
      <Stack gap={2}>
        {([{ l: 'Storage', v: 73, c: 'default' }, { l: 'CPU', v: 41, c: 'success' }, { l: 'Memory', v: 88, c: 'warning' }] as { l: string; v: number; c: 'default' | 'success' | 'warning' }[]).map(m => (
          <Stack key={m.l} gap={1}>
            <Stack direction="row" justify="space-between">
              <span style={{ fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-secondary)' }}>{m.l}</span>
              <span style={{ fontSize: 'var(--tokis-font-size-xs)', color: 'var(--tokis-text-tertiary)' }}>{m.v}%</span>
            </Stack>
            <Progress value={m.v} variant={m.c} />
          </Stack>
        ))}
      </Stack>
      <Alert variant="success" title="Deploy successful">
        <span style={{ fontSize: 'var(--tokis-font-size-xs)' }}>Edge network live in 3 regions.</span>
      </Alert>
    </Stack>
  );
}

function Demo1() {
  const bars = [
    { label: '@tokis/react', size: '18kb', pct: 18, color: '#7c3aed' },
    { label: 'material-ui', size: '94kb', pct: 94, color: '#ef4444' },
    { label: 'chakra-ui',   size: '72kb', pct: 72, color: '#f97316' },
    { label: 'mantine',     size: '58kb', pct: 58, color: '#eab308' },
  ];
  return (
    <Stack gap={4}>
      <span style={{ fontSize: 11, color: 'var(--tokis-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'var(--site-font-mono)' }}>
        Bundle size comparison (gzipped)
      </span>
      {bars.map(b => (
        <Stack key={b.label} gap={1}>
          <Stack direction="row" justify="space-between">
            <span style={{ fontSize: 13, fontFamily: 'var(--site-font-mono)', color: 'var(--tokis-text-primary)' }}>{b.label}</span>
            <span style={{ fontSize: 13, fontFamily: 'var(--site-font-mono)', color: b.color, fontWeight: 600 }}>{b.size}</span>
          </Stack>
          <div style={{ height: 6, borderRadius: 3, background: 'var(--tokis-color-surface)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${b.pct}%`, background: b.color, borderRadius: 3, transition: 'width 1.2s ease 0.2s' }} />
          </div>
        </Stack>
      ))}
      <Stack direction="row" gap={6} style={{ paddingTop: 'var(--tokis-spacing-2)' }}>
        {[{ v: '5×', l: 'smaller', c: '#7c3aed' }, { v: '0ms', l: 'hydration', c: '#059669' }, { v: '∞', l: 'themes', c: '#0284c7' }].map(s => (
          <Stack key={s.l} gap={0} align="center">
            <span style={{ fontSize: 28, fontWeight: 800, color: s.c, lineHeight: 1, fontFamily: 'var(--site-font-display)' }}>{s.v}</span>
            <span style={{ fontSize: 11, color: 'var(--tokis-text-tertiary)' }}>{s.l}</span>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}

function Demo2() {
  const tokens = [
    { token: '--tokis-color-primary', value: '#7c3aed', swatch: '#7c3aed' },
    { token: '--tokis-color-bg',      value: '#ffffff', swatch: '#ffffff' },
    { token: '--tokis-color-surface', value: '#f9fafb', swatch: '#f9fafb' },
    { token: '--tokis-text-primary',  value: '#09090b', swatch: '#09090b' },
    { token: '--tokis-radius-md',     value: '8px',     swatch: null },
    { token: '--tokis-spacing-4',     value: '16px',    swatch: null },
  ];
  return (
    <Stack gap={2}>
      <div style={{ fontSize: 11, fontFamily: 'var(--site-font-mono)', color: 'var(--tokis-text-tertiary)', marginBottom: 4 }}>
        variables.css — 120+ design tokens
      </div>
      {tokens.map(t => (
        <div key={t.token} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px', background: 'var(--tokis-color-surface)', borderRadius: 6, border: '1px solid var(--tokis-color-border)' }}>
          <div style={{ width: 16, height: 16, borderRadius: 3, background: t.swatch ?? 'var(--tokis-color-surface-hover)', border: '1px solid var(--tokis-color-border)', flexShrink: 0 }} />
          <span style={{ flex: 1, fontSize: 11, fontFamily: 'var(--site-font-mono)', color: 'var(--tokis-color-primary)' }}>{t.token}</span>
          <span style={{ fontSize: 11, fontFamily: 'var(--site-font-mono)', color: 'var(--tokis-text-secondary)' }}>{t.value}</span>
        </div>
      ))}
    </Stack>
  );
}

function Demo3() {
  const lines: { code: string; color: string }[] = [
    { code: "type ButtonVariant =",       color: '#a78bfa' },
    { code: "  | 'primary'",              color: '#34d399' },
    { code: "  | 'secondary'",            color: '#34d399' },
    { code: "  | 'ghost' | 'outline'",    color: '#34d399' },
    { code: "  | 'destructive';",         color: '#34d399' },
    { code: '',                           color: 'transparent' },
    { code: 'interface ButtonRootProps {', color: '#60a5fa' },
    { code: '  variant: ButtonVariant;',  color: '#e2e8f0' },
    { code: "  size?: 'sm'|'md'|'lg';",  color: '#e2e8f0' },
    { code: '  loading?: boolean;',       color: '#e2e8f0' },
    { code: '  disabled?: boolean;',      color: '#e2e8f0' },
    { code: '}',                          color: '#60a5fa' },
  ];
  return (
    <div className="lpv3-ts">
      <div className="lpv3-ts__bar">
        <div className="lpv3-ts__dots"><span /><span /><span /></div>
        <span className="lpv3-ts__file">Button.d.ts</span>
      </div>
      <pre className="lpv3-ts__body"><code>
        {lines.map((l, i) => (
          <span key={i} className="lpv3-ts__line" style={{ animationDelay: `${i * 0.07}s`, color: l.color }}>
            {l.code || '\u200B'}
          </span>
        ))}
        <span className="lpv3-ts__cursor" />
      </code></pre>
    </div>
  );
}

/* ── Chapters ─────────────────────────────────────────── */
const CHAPTERS: Array<{
  n: string;
  label: string;
  title: string;
  desc: string;
  color: string;
  features: string[];
  Demo: React.ComponentType;
}> = [
  {
    n: '01',
    label: 'Component Library',
    title: '40+ production-ready components.',
    desc: 'Buttons, forms, overlays, data display — every component is accessible, animated, and tree-shakeable from day one.',
    color: '#7c3aed',
    features: ['Accessible', 'Animated', 'Tree-shakeable', 'SSR-safe', 'Dark Mode'],
    Demo: Demo0,
  },
  {
    n: '02',
    label: 'Zero Runtime CSS',
    title: 'No CSS-in-JS tax. Ever.',
    desc: 'Pure precompiled stylesheets. No emotion, no styled-components. Styles ship once and execute instantly with zero overhead.',
    color: '#0284c7',
    features: ['5× smaller', '0ms hydration', 'No re-renders', 'ESM + CJS'],
    Demo: Demo1,
  },
  {
    n: '03',
    label: 'Token-Native Theming',
    title: 'Theme anything in one variable.',
    desc: 'Every design decision is a token — colors, spacing, radius, motion. Swap entire themes instantly, dark mode included.',
    color: '#059669',
    features: ['120+ tokens', 'CSS variables', 'Runtime switching', 'No config'],
    Demo: Demo2,
  },
  {
    n: '04',
    label: 'TypeScript First',
    title: 'Compile-time type safety.',
    desc: 'Strict prop types, discriminated unions, and full inference across all 40+ components. Catch bugs before they ship.',
    color: '#d97706',
    features: ['Strict types', 'Discriminated unions', 'Full inference', 'Zero any'],
    Demo: Demo3,
  },
];

/* ── Scroll showcase (own component = zero re-renders during scroll) ── */
function ScrollShowcase() {
  const outerRef       = useRef<HTMLDivElement>(null);
  const panelRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const pipRefs        = useRef<(HTMLDivElement | null)[]>([]);
  const counterRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const hintRef        = useRef<HTMLDivElement>(null);
  const active         = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const el = outerRef.current;
      if (!el) return;
      const scrolled = Math.max(0, -el.getBoundingClientRect().top);
      const total    = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const next = Math.min(
        CHAPTERS.length - 1,
        Math.floor(Math.max(0, Math.min(1 - 1e-9, scrolled / total)) * CHAPTERS.length),
      );
      if (next === active.current) return;
      const prev = active.current;
      active.current = next;

      // Direct DOM — no React re-render
      panelRefs.current[prev]?.classList.remove('lpv3-panel--active');
      panelRefs.current[prev]?.setAttribute('aria-hidden', 'true');
      pipRefs.current[prev]?.classList.remove('lpv3-pip--on');
      counterRefs.current[prev]?.classList.remove('lpv3-counter-item--on');

      panelRefs.current[next]?.classList.add('lpv3-panel--active');
      panelRefs.current[next]?.setAttribute('aria-hidden', 'false');
      pipRefs.current[next]?.classList.add('lpv3-pip--on');
      counterRefs.current[next]?.classList.add('lpv3-counter-item--on');

      if (next > 0) hintRef.current?.classList.add('lpv3-scroll-hint--hidden');
      else           hintRef.current?.classList.remove('lpv3-scroll-hint--hidden');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={outerRef} className="lpv3-scroll-outer" style={{ height: `${CHAPTERS.length * 100}vh` }}>
      <div className="lpv3-showcase">
        <div className="lpv3-showcase__pips" aria-hidden="true">
          {CHAPTERS.map((_, i) => (
            <div
              key={i}
              ref={(el) => { pipRefs.current[i] = el; }}
              className={`lpv3-pip${i === 0 ? ' lpv3-pip--on' : ''}`}
            />
          ))}
        </div>

        {/* Chapter counter top-center */}
        <div className="lpv3-showcase__counter" aria-hidden="true">
          {CHAPTERS.map((c, i) => (
            <div
              key={i}
              ref={(el) => { counterRefs.current[i] = el; }}
              className={`lpv3-counter-item${i === 0 ? ' lpv3-counter-item--on' : ''}`}
              style={{ '--chapter-color': c.color } as React.CSSProperties}
            >
              {c.n}
            </div>
          ))}
        </div>

        <div className="lpv3-showcase__panels">
          {CHAPTERS.map((c, i) => {
            const { Demo } = c;
            return (
              <div
                key={i}
                ref={(el) => { panelRefs.current[i] = el; }}
                className={`lpv3-panel${i === 0 ? ' lpv3-panel--active' : ''}`}
                aria-hidden={i !== 0}
              >
                <div className="lpv3-panel__text">
                  <div className="lpv3-panel__header">
                    <span className="lpv3-panel__num">{c.n} / 0{CHAPTERS.length}</span>
                    <span className="lpv3-panel__eyebrow" style={{ color: c.color }}>{c.label}</span>
                  </div>
                  <h2 className="lpv3-panel__title">{c.title}</h2>
                  <p className="lpv3-panel__desc">{c.desc}</p>
                  <div className="lpv3-panel__feats">
                    {c.features.map((f, j) => (
                      <span
                        key={j}
                        className="lpv3-panel__feat"
                        style={{ borderColor: `${c.color}44`, color: `${c.color}cc` }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                  <div className="lpv3-panel__rule" style={{ background: c.color }} />
                </div>
                <div className="lpv3-panel__demo">
                  <div className="lpv3-panel__demo-label" style={{ color: c.color }}>
                    Live preview
                  </div>
                  <div className="lpv3-panel__demo-inner" style={{ borderTopColor: c.color }}>
                    <Demo />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div ref={hintRef} className="lpv3-scroll-hint" aria-hidden="true">
          <div className="lpv3-scroll-hint__wheel" />
          <span>Scroll to explore</span>
        </div>
      </div>
    </div>
  );
}

/* ── Landing ──────────────────────────────────────────── */
export function Landing() {
  const s1 = useCountUp(40);
  const s2 = useCountUp(100);

  /* 3-D bento tilt */
  const onTilt = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    e.currentTarget.style.setProperty('--rx', `${-y * 10}deg`);
    e.currentTarget.style.setProperty('--ry', `${x * 10}deg`);
  }, []);

  const onTiltLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  }, []);

  const codeLines = [
    "import { ButtonRoot, ButtonLabel } from '@tokis/react';",
    '',
    '// Compound components — no prop explosion',
    '<ButtonRoot variant="primary" size="lg">',
    '  <ButtonLabel>Save changes</ButtonLabel>',
    '</ButtonRoot>',
    '',
    '// Every variant, same predictable API',
    '<ButtonRoot variant="secondary" />',
    '<ButtonRoot variant="ghost" />',
    '<ButtonRoot variant="destructive" />',
    '<ButtonRoot variant="outline" loading />',
  ];

  return (
    <div className="lpv3">

      {/* ───────────────── HERO ───────────────────────── */}
      <section className="lpv3-hero">
        {/* Background */}
        <div className="lpv3-hero__bg" aria-hidden="true">
          <div className="lpv3-hero__grid" />
          <div className="lpv3-hero__orb lpv3-hero__orb--1" />
          <div className="lpv3-hero__orb lpv3-hero__orb--2" />
          <div className="lpv3-hero__orb lpv3-hero__orb--3" />
        </div>

        <div className="lpv3-hero__inner">

          {/* Left: headline */}
          <div className="lpv3-hero__left">
            <a href="https://github.com/PrerakMathur20/TokisLib" className="lpv3-pill" target="_blank" rel="noopener noreferrer">
              <span className="lpv3-pill__dot" />
              Open Source · v0.1.0 · MIT
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true" style={{ marginLeft: 3, opacity: 0.45 }}>
                <path d="M1.5 7.5l6-6M3 1.5h4.5v4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <h1 className="lpv3-hero__title">
              <span className="lpv3-hero__title-plain">Design systems,</span>
              <span className="lpv3-hero__title-grad">reimagined.</span>
            </h1>

            <p className="lpv3-hero__acronym">Tokis Only Knows Its Styles</p>

            <p className="lpv3-hero__sub">
              A performance-first UI library for React teams who refuse to compromise.
              Zero runtime styling. Accessible by default. Token-native architecture.
            </p>

            <div className="lpv3-hero__actions">
              <NavButton to="/docs/introduction" size="lg" variant="primary">
                <ButtonLabel>Start Building →</ButtonLabel>
              </NavButton>
              <NavButton to="/playground" size="lg" variant="outline">
                <ButtonLabel>Open Playground</ButtonLabel>
              </NavButton>
            </div>

            <div className="lpv3-hero__proof">
              <div className="lpv3-hero__avatars">
                {[1,2,3,4,5].map(i => <Avatar key={i} name={`U${i}`} size="sm" />)}
              </div>
              <div>
                <Rating value={5} readOnly size="sm" />
                <div className="lpv3-hero__proof-label">Loved by engineers</div>
              </div>
            </div>
          </div>

          {/* Right: floating tabbed showcase */}
          <div className="lpv3-hero__right" aria-label="Component showcase">
            <HeroShowcase />
          </div>
        </div>
      </section>

      {/* ───────────────── MARQUEE ────────────────────── */}
      <div className="lpv3-marquee-strip">
        <Marquee />
      </div>

      {/* ───────────────── SCROLL SHOWCASE ───────────── */}
      <ScrollShowcase />

      {/* ───────────────── STATS ──────────────────────── */}
      <section className="lpv3-stats">
        <div ref={s1.ref} className="lpv3-stat">
          <div className="lpv3-stat__num">{s1.count}<span className="lpv3-stat__unit">+</span></div>
          <div className="lpv3-stat__label">Components</div>
        </div>
        <div className="lpv3-stat">
          <div className="lpv3-stat__num">0<span className="lpv3-stat__unit">kb</span></div>
          <div className="lpv3-stat__label">Runtime CSS</div>
        </div>
        <div ref={s2.ref} className="lpv3-stat">
          <div className="lpv3-stat__num">{s2.count}<span className="lpv3-stat__unit">%</span></div>
          <div className="lpv3-stat__label">TypeScript</div>
        </div>
        <div className="lpv3-stat">
          <div className="lpv3-stat__num">WCAG</div>
          <div className="lpv3-stat__label">AA Compliant</div>
        </div>
      </section>

      {/* ───────────────── BENTO ──────────────────────── */}
      <section className="lpv3-features">
        <div className="lpv3-features-inner">
        <div className="lpv3-features__head">
          <span className="lpv3-eyebrow">Why Tokis?</span>
          <h2 className="lpv3-section-title">
            Built for teams that{' '}
            <span className="lpv3-grad">give a damn.</span>
          </h2>
          <p className="lpv3-section-sub">
            Not another component library. An architectural decision for teams that ship
            accessible, fast, maintainable products without compromise.
          </p>
        </div>

        <div className="lpv3-bento">
          {([
            { tag: 'Performance',   icon: '⚡', title: 'Zero Runtime CSS',      desc: 'Precompiled stylesheets. No injection, no hydration overhead — styles execute instantly.', color: '#7c3aed', stat: '0ms',   statLabel: 'hydration' },
            { tag: 'Architecture',  icon: '◈',  title: 'Token-Native Design',    desc: 'Every color, spacing, and motion decision is a CSS variable you can override.', color: '#0284c7', stat: '120+', statLabel: 'design tokens' },
            { tag: 'Accessibility', icon: '◎',  title: 'Built-in A11y',          desc: 'WAI-ARIA compliant. Keyboard nav, focus traps, screen readers — core, not bolted-on.', color: '#059669', stat: 'WCAG', statLabel: 'AA compliant' },
            { tag: 'Composable',    icon: '❋',  title: 'Compound Components',    desc: 'Headless primitives with styled layers. Compose complex UIs from predictable parts.', color: '#7c3aed', stat: '40+',  statLabel: 'components' },
            { tag: 'DX',            icon: '◇',  title: 'TypeScript First',       desc: 'Strict prop types, discriminated unions, and full inference across every component.', color: '#0284c7', stat: '100%', statLabel: 'typed' },
            { tag: 'Theming',       icon: '◑',  title: 'Native Dark Mode',       desc: 'Instant switching via CSS variables. No flicker — system preference works out of the box.', color: '#d97706', stat: '2',    statLabel: 'themes built-in' },
          ] as Array<{ tag: string; icon: string; title: string; desc: string; color: string; stat: string; statLabel: string }>).map(f => (
            <div
              key={f.title}
              className="lpv3-bcard"
              style={{ '--c': f.color } as React.CSSProperties}
              onMouseMove={onTilt}
              onMouseLeave={onTiltLeave}
            >
              <div className="lpv3-bcard__glow" aria-hidden="true" />
              <div className="lpv3-bcard__header">
                <span className="lpv3-bcard__icon" style={{ color: f.color }}>{f.icon}</span>
                <span className="lpv3-bcard__tag" style={{ color: f.color }}>{f.tag}</span>
              </div>
              <h3 className="lpv3-bcard__title">{f.title}</h3>
              <p className="lpv3-bcard__desc">{f.desc}</p>
              <div className="lpv3-bcard__stat">
                <span className="lpv3-bcard__stat-num" style={{ color: f.color }}>{f.stat}</span>
                <span className="lpv3-bcard__stat-label">{f.statLabel}</span>
              </div>
            </div>
          ))}
        </div>
        </div>{/* /lpv3-features-inner */}
      </section>

      {/* ───────────────── CODE WINDOW ────────────────── */}
      <section className="lpv3-code">
        <div className="lpv3-code__inner">
          <div className="lpv3-code__text">
            <span className="lpv3-eyebrow">Developer Experience</span>
            <h2 className="lpv3-section-title" style={{ textAlign: 'left' }}>Composable by design.</h2>
            <p className="lpv3-section-sub" style={{ textAlign: 'left' }}>
              Compound component APIs that are predictable, flexible, and refactor-friendly.
              No prop explosion — just clean composition.
            </p>
            <Stack direction="row" gap={3} style={{ marginTop: 'var(--tokis-spacing-6)' }}>
              <NavButton to="/docs/button" variant="primary"><ButtonLabel>Explore →</ButtonLabel></NavButton>
              <NavButton to="/docs/installation" variant="ghost"><ButtonLabel>Install in 30s</ButtonLabel></NavButton>
            </Stack>
          </div>

          <div className="lpv3-codewin">
            <div className="lpv3-codewin__bar">
              <div className="lpv3-codewin__dots"><span /><span /><span /></div>
              <span className="lpv3-codewin__file">Button.tsx</span>
            </div>
            <pre className="lpv3-codewin__body"><code>
              {codeLines.map((line, i) => (
                <span key={i} className="code-window__line" style={{ animationDelay: `${i * 0.05}s` }}>
                  {line || '\u200B'}
                  {i === codeLines.length - 1 && <span className="code-window__cursor" />}
                </span>
              ))}
            </code></pre>
          </div>
        </div>
      </section>

      {/* ───────────────── CTA ────────────────────────── */}
      <section className="lpv3-cta">
        <div className="lpv3-cta__glow" aria-hidden="true" />
        <div className="lpv3-cta__ring lpv3-cta__ring--1" aria-hidden="true" />
        <div className="lpv3-cta__ring lpv3-cta__ring--2" aria-hidden="true" />
        <div className="lpv3-cta__ring lpv3-cta__ring--3" aria-hidden="true" />
        <div className="lpv3-cta__inner">
          <span className="lpv3-eyebrow">Ready to ship</span>
          <h2 className="lpv3-cta__title">Your design system,<br />on your terms.</h2>
          <p className="lpv3-cta__desc">
            Start building today. Production-grade components, zero external dependencies,
            one install command.
          </p>
          <div className="lpv3-cta__install">
            <code>npm install @tokis/react @tokis/theme</code>
          </div>
          <Stack direction="row" gap={3} justify="center" wrap>
            <NavButton to="/docs/introduction" size="lg" variant="primary">
              <ButtonLabel>Read the Docs →</ButtonLabel>
            </NavButton>
            <NavButton to="/playground" size="lg" variant="outline">
              <ButtonLabel>Try the Playground</ButtonLabel>
            </NavButton>
          </Stack>
        </div>
      </section>

      {/* ───────────────── FOOTER ─────────────────────── */}
      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <div className="site-navbar__logo-mark" aria-hidden="true">Sy</div>
            <span className="site-footer__copy">© 2026 Tokis — MIT License</span>
          </div>
          <nav className="site-footer__links" aria-label="Footer navigation">
            <a href="#" className="site-footer__link">GitHub</a>
            <a href="#" className="site-footer__link">npm</a>
            <Link to="/docs/introduction" className="site-footer__link">Docs</Link>
            <Link to="/playground" className="site-footer__link">Playground</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
