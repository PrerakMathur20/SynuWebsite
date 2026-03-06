import React, { useState } from 'react';
import {
  Card, CardHeader, CardBody, CardFooter, CardTitle, CardDescription,
  ButtonRoot, ButtonLabel,
  Badge,
  Avatar,
  Stack,
  Divider,
  Progress,
} from '@tokis/react';
import { ComponentPreview, DemoControl, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

type CardVariant = 'default' | 'elevated' | 'ghost';

const cardProps: PropDef[] = [
  { name: 'variant', type: "'default' | 'elevated' | 'ghost'", default: "'default'", description: 'Visual style of the card.' },
  { name: 'clickable', type: 'boolean', default: 'false', description: 'Makes the card interactive with hover and focus styles. Adds role="button".' },
];

export function CardPage() {
  const [variant, setVariant] = useState<CardVariant>('default');
  const [clickable, setClickable] = useState(false);

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Components</p>
        <h1 className="doc-page__title">Card</h1>
        <p className="doc-page__desc">
          A composable surface for grouping related content. Compose with CardHeader,
          CardBody, CardFooter, CardTitle, and CardDescription for structured layouts.
        </p>
      </header>

      {/* Interactive */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Playground</h2>
        <ComponentPreview
          code={`<Card variant="${variant}"${clickable ? ' clickable' : ''}>
  <CardHeader>
    <CardTitle>Project Alpha</CardTitle>
    <CardDescription>Last deployed 2 hours ago</CardDescription>
  </CardHeader>
  <CardBody>
    <p>Your production deployment is healthy and serving 98% of requests.</p>
  </CardBody>
  <CardFooter>
    <ButtonRoot size="sm" variant="primary">
      <ButtonLabel>View logs</ButtonLabel>
    </ButtonRoot>
  </CardFooter>
</Card>`}
          controls={
            <>
              <DemoControl
                label="Variant"
                options={['default', 'elevated', 'ghost']}
                value={variant}
                onChange={(v) => setVariant(v as CardVariant)}
              />
              <DemoToggle label="Clickable" value={clickable} onChange={setClickable} />
            </>
          }
        >
          <Card variant={variant} clickable={clickable} style={{ maxWidth: 400, width: '100%' }}>
            <CardHeader>
              <CardTitle>Project Alpha</CardTitle>
              <CardDescription>Last deployed 2 hours ago</CardDescription>
            </CardHeader>
            <CardBody>
              <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>
                Your production deployment is healthy and serving 98% of requests.
              </p>
            </CardBody>
            <CardFooter>
              <ButtonRoot size="sm" variant="primary">
                <ButtonLabel>View logs</ButtonLabel>
              </ButtonRoot>
            </CardFooter>
          </Card>
        </ComponentPreview>
      </div>

      {/* Variants */}
      <div className="doc-section">
        <h2 className="doc-section__title">Variants</h2>
        <ComponentPreview
          code={`<Stack direction="row" gap={4} align="flex-start" wrap>
  <Card variant="default">
    <CardBody><CardTitle>Default</CardTitle></CardBody>
  </Card>
  <Card variant="elevated">
    <CardBody><CardTitle>Elevated</CardTitle></CardBody>
  </Card>
  <Card variant="ghost">
    <CardBody><CardTitle>Ghost</CardTitle></CardBody>
  </Card>
</Stack>`}
        >
          <Stack direction="row" gap={4} align="flex-start" wrap>
            {(['default', 'elevated', 'ghost'] as CardVariant[]).map((v) => (
              <Card key={v} variant={v} style={{ minWidth: 160 }}>
                <CardBody>
                  <CardTitle style={{ textTransform: 'capitalize' }}>{v}</CardTitle>
                  <CardDescription>Card variant</CardDescription>
                </CardBody>
              </Card>
            ))}
          </Stack>
        </ComponentPreview>
      </div>

      {/* Composition Examples */}
      <div className="doc-section">
        <h2 className="doc-section__title">Composition Patterns</h2>
        <p className="doc-section__desc">
          Cards are building blocks. Compose them with any Tokis components.
        </p>
        <ComponentPreview
          code={`{/* User profile card */}
<Card variant="elevated" style={{ maxWidth: 360 }}>
  <CardHeader>
    <Stack direction="row" gap={3} align="center">
      <Avatar name="Jordan Lee" size="lg" />
      <div>
        <CardTitle>Jordan Lee</CardTitle>
        <CardDescription>Senior Engineer · Tokis</CardDescription>
      </div>
      <Badge variant="success" dot style={{ marginLeft: 'auto' }}>Online</Badge>
    </Stack>
  </CardHeader>
  <CardBody>
    <p>Building performance-first design systems. Open source contributor.</p>
    <Progress value={85} label="Profile complete" showValue style={{ marginTop: 12 }} />
  </CardBody>
  <Divider />
  <CardFooter style={{ justifyContent: 'flex-end' }}>
    <ButtonRoot size="sm" variant="outline"><ButtonLabel>Message</ButtonLabel></ButtonRoot>
    <ButtonRoot size="sm" variant="primary"><ButtonLabel>Follow</ButtonLabel></ButtonRoot>
  </CardFooter>
</Card>`}
        >
          <Card variant="elevated" style={{ maxWidth: 360, width: '100%' }}>
            <CardHeader>
              <Stack direction="row" gap={3} align="center">
                <Avatar name="Jordan Lee" size="lg" />
                <div>
                  <CardTitle>Jordan Lee</CardTitle>
                  <CardDescription>Senior Engineer · Tokis</CardDescription>
                </div>
                <Badge variant="success" dot style={{ marginLeft: 'auto' }}>Online</Badge>
              </Stack>
            </CardHeader>
            <CardBody>
              <p style={{ margin: '0 0 var(--tokis-spacing-3)', fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>
                Building performance-first design systems. Open source contributor.
              </p>
              <Progress value={85} label="Profile complete" showValue />
            </CardBody>
            <Divider />
            <CardFooter style={{ gap: 'var(--tokis-spacing-2)', justifyContent: 'flex-end' }}>
              <ButtonRoot size="sm" variant="outline"><ButtonLabel>Message</ButtonLabel></ButtonRoot>
              <ButtonRoot size="sm" variant="primary"><ButtonLabel>Follow</ButtonLabel></ButtonRoot>
            </CardFooter>
          </Card>
        </ComponentPreview>
      </div>

      {/* Metric cards */}
      <div className="doc-section">
        <h2 className="doc-section__title">Metric Cards</h2>
        <ComponentPreview
          code={`<Stack direction="row" gap={4} wrap>
  {metrics.map(({ label, value, change, variant }) => (
    <Card key={label} style={{ flex: 1, minWidth: 160 }}>
      <CardBody>
        <p style={{ color: 'var(--tokis-text-secondary)', fontSize: 12 }}>{label}</p>
        <p style={{ fontSize: 28, fontWeight: 700, margin: '4px 0' }}>{value}</p>
        <Badge variant={variant}>{change}</Badge>
      </CardBody>
    </Card>
  ))}
</Stack>`}
        >
          <Stack direction="row" gap={4} wrap style={{ width: '100%' }}>
            {[
              { label: 'Total Revenue', value: '$48.2k', change: '+12.4%', variant: 'success' as const },
              { label: 'Active Users', value: '3,840', change: '+6.1%', variant: 'success' as const },
              { label: 'Churn Rate', value: '1.2%', change: '-0.3%', variant: 'info' as const },
              { label: 'Uptime', value: '99.98%', change: '↑ SLA', variant: 'primary' as const },
            ].map(({ label, value, change, variant }) => (
              <Card key={label} style={{ flex: 1, minWidth: 140 }}>
                <CardBody>
                  <p style={{ color: 'var(--tokis-text-secondary)', fontSize: 11, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
                  <p style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.03em' }}>{value}</p>
                  <Badge variant={variant}>{change}</Badge>
                </CardBody>
              </Card>
            ))}
          </Stack>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={cardProps} />
      </div>
    </>
  );
}
