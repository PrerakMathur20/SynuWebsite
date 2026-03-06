import React, { useState } from 'react';
import { Statistic } from '@tokis/react';
import { ComponentPreview, DemoControl } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const statisticProps: PropDef[] = [
  { name: 'label', type: 'string', required: true, description: 'Descriptive label shown below or above the value.' },
  { name: 'value', type: 'string | number', required: true, description: 'The primary numeric or text value to display prominently.' },
  { name: 'prefix', type: 'string', description: 'Content rendered before the value (e.g. currency symbol).' },
  { name: 'suffix', type: 'string', description: 'Content rendered after the value (e.g. unit, percentage sign).' },
  { name: 'trend', type: "'up' | 'down' | 'neutral'", description: 'Direction of the trend indicator arrow.' },
  { name: 'trendValue', type: 'string', description: 'Text label for the trend (e.g. "+12.5%").' },
  { name: 'description', type: 'string', description: 'Secondary supporting text below the trend.' },
  { name: 'className', type: 'string', description: 'Additional CSS class name(s) applied to the root element.' },
];

export function StatisticPage() {
  const [trend, setTrend] = useState<'up' | 'down' | 'neutral'>('up');

  const trendMeta: Record<'up' | 'down' | 'neutral', { value: string; description: string }> = {
    up: { value: '+8.1%', description: 'vs. last month' },
    down: { value: '-3.4%', description: 'vs. last month' },
    neutral: { value: '0.0%', description: 'vs. last month' },
  };

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Data Display</p>
        <h1 className="doc-page__title">Statistic</h1>
        <p className="doc-page__desc">
          Highlights a single key metric with an optional prefix, suffix, trend
          direction arrow, trend value, and supporting description. Ideal for
          dashboards and summary cards.
        </p>
      </header>

      {/* Dashboard row */}
      <div className="doc-section">
        <h2 className="doc-section__title">Dashboard Row</h2>
        <ComponentPreview
          code={`<div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
  <Statistic
    label="Total Revenue"
    value="12,450"
    prefix="$"
    trend="up"
    trendValue="+12.5%"
    description="vs. last month"
  />
  <Statistic
    label="Active Users"
    value="8,241"
    trend="up"
    trendValue="+3.2%"
    description="vs. last month"
  />
  <Statistic
    label="Churn Rate"
    value="2.1"
    suffix="%"
    trend="down"
    trendValue="-0.4%"
    description="vs. last month"
  />
</div>`}
        >
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Statistic
              label="Total Revenue"
              value="12,450"
              prefix="$"
              trend="up"
              trendValue="+12.5%"
              description="vs. last month"
            />
            <Statistic
              label="Active Users"
              value="8,241"
              trend="up"
              trendValue="+3.2%"
              description="vs. last month"
            />
            <Statistic
              label="Churn Rate"
              value="2.1"
              suffix="%"
              trend="down"
              trendValue="-0.4%"
              description="vs. last month"
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Interactive trend */}
      <div className="doc-section">
        <h2 className="doc-section__title">Trend Directions</h2>
        <ComponentPreview
          code={`<Statistic
  label="Conversion Rate"
  value="4.6"
  suffix="%"
  trend="${trend}"
  trendValue="${trendMeta[trend].value}"
  description="${trendMeta[trend].description}"
/>`}
          controls={
            <DemoControl
              label="Trend"
              options={['up', 'down', 'neutral']}
              value={trend}
              onChange={(v) => setTrend(v as typeof trend)}
            />
          }
        >
          <Statistic
            label="Conversion Rate"
            value="4.6"
            suffix="%"
            trend={trend}
            trendValue={trendMeta[trend].value}
            description={trendMeta[trend].description}
          />
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — Statistic</h2>
        <PropsTable props={statisticProps} />
      </div>
    </>
  );
}
