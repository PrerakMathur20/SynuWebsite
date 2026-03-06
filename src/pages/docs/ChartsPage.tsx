import React, { useState } from 'react';
import { BarChart, LineChart, PieChart, Sparkline } from '@tokis/react';
import { ComponentPreview, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const barChartProps: PropDef[] = [
  { name: 'data', type: 'ChartDataPoint[]', required: true, description: 'Array of {label, value, color?} data points.' },
  { name: 'height', type: 'number', default: '200', description: 'Height of the chart canvas in pixels.' },
  { name: 'barColor', type: 'string', description: 'Default bar color. Individual points can override via color field.' },
  { name: 'horizontal', type: 'boolean', default: 'false', description: 'Renders bars horizontally instead of vertically.' },
  { name: 'animated', type: 'boolean', default: 'true', description: 'Animates bars in on mount.' },
  { name: 'className', type: 'string', description: 'Additional CSS class applied to the chart wrapper.' },
];

const lineChartProps: PropDef[] = [
  { name: 'labels', type: 'string[]', required: true, description: 'Labels for each data point along the x-axis.' },
  { name: 'datasets', type: 'LineChartDataset[]', required: true, description: 'One or more datasets rendered as lines.' },
  { name: 'height', type: 'number', default: '200', description: 'Height of the chart canvas in pixels.' },
  { name: 'smooth', type: 'boolean', default: 'true', description: 'Renders lines with cubic bezier smoothing.' },
  { name: 'animated', type: 'boolean', default: 'true', description: 'Draws the line with a path animation on mount.' },
  { name: 'className', type: 'string', description: 'Additional CSS class applied to the chart wrapper.' },
];

const lineDatasetProps: PropDef[] = [
  { name: 'label', type: 'string', required: true, description: 'Dataset name shown in the legend.' },
  { name: 'data', type: 'number[]', required: true, description: 'Array of numeric values, one per label.' },
  { name: 'color', type: 'string', description: 'Stroke color. Falls back to the theme primary color.' },
];

const pieChartProps: PropDef[] = [
  { name: 'data', type: 'ChartDataPoint[]', required: true, description: 'Array of {label, value, color?} slice objects.' },
  { name: 'donut', type: 'boolean', default: 'false', description: 'Cuts a hole in the center to render a donut chart.' },
  { name: 'size', type: 'number', default: '200', description: 'Diameter of the chart in pixels.' },
  { name: 'animated', type: 'boolean', default: 'true', description: 'Animates slices sweeping in on mount.' },
  { name: 'showLegend', type: 'boolean', default: 'true', description: 'Renders a color-coded legend below the chart.' },
  { name: 'className', type: 'string', description: 'Additional CSS class applied to the chart wrapper.' },
];

const sparklineProps: PropDef[] = [
  { name: 'data', type: 'number[]', required: true, description: 'Array of numeric values to plot.' },
  { name: 'type', type: "'line' | 'bar' | 'area'", default: "'line'", description: 'Visual style of the sparkline.' },
  { name: 'color', type: 'string', default: "'var(--tokis-color-primary)'", description: 'Stroke or fill color. Falls back to the theme primary color.' },
  { name: 'width', type: 'number', default: '80', description: 'Width of the sparkline in pixels.' },
  { name: 'height', type: 'number', default: '24', description: 'Height of the sparkline in pixels.' },
  { name: 'className', type: 'string', description: 'Additional CSS class applied to the sparkline.' },
];

const barData = [
  { label: 'Jan', value: 51000 },
  { label: 'Feb', value: 46000 },
  { label: 'Mar', value: 63000 },
  { label: 'Apr', value: 74000 },
  { label: 'May', value: 69000 },
  { label: 'Jun', value: 88000 },
];

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const lineDatasets = [
  {
    label: 'Daily Active Users',
    data: [1840, 2210, 1990, 2540, 2980, 2650, 3100],
    color: 'var(--tokis-color-primary)',
  },
];

const pieData = [
  { label: 'Direct', value: 40, color: 'var(--tokis-color-primary)' },
  { label: 'Organic', value: 30, color: '#7c3aed' },
  { label: 'Referral', value: 20, color: 'var(--tokis-color-success)' },
  { label: 'Social', value: 10, color: 'var(--tokis-color-warning)' },
];

const sparkLineData = [4, 7, 3, 9, 6, 11, 8, 14, 10, 13];
const sparkBarData = [3, 8, 5, 12, 7, 10, 6, 9, 11, 4];
const sparkAreaData = [6, 9, 5, 11, 8, 13, 10, 15, 12, 14];
const sparkNegData = [3, -2, 5, -4, 7, -1, 4, -3, 6, -5];

export function ChartsPage() {
  const [horizontal, setHorizontal] = useState(false);
  const [donut, setDonut] = useState(true);

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Data Visualization</p>
        <h1 className="doc-page__title">Charts</h1>
        <p className="doc-page__desc">
          A suite of composable chart primitives — bar, line, pie, and sparkline — built on
          SVG with theme-aware colors, entrance animations, and full responsiveness.
        </p>
      </header>

      {/* Bar Chart */}
      <div className="doc-section">
        <h2 className="doc-section__title">Bar Chart</h2>
        <p className="doc-section__desc">
          Compare values across categories with grouped or horizontal bar layouts. Each dataset
          maps to a color and appears in the legend automatically.
        </p>
        <ComponentPreview
          code={`<BarChart
  data={[
    { label: 'Jan', value: 51000 },
    { label: 'Feb', value: 46000 },
    { label: 'Mar', value: 63000 },
    { label: 'Apr', value: 74000 },
    { label: 'May', value: 69000 },
    { label: 'Jun', value: 88000 },
  ]}
  height={280}${horizontal ? '\n  horizontal' : ''}
/>`}
          controls={
            <DemoToggle label="Horizontal" value={horizontal} onChange={setHorizontal} />
          }
        >
          <BarChart
            data={barData}
            height={280}
            horizontal={horizontal}
          />
        </ComponentPreview>
      </div>

      {/* Bar Chart Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — BarChart</h2>
        <PropsTable props={barChartProps} />
      </div>

      {/* Line Chart */}
      <div className="doc-section">
        <h2 className="doc-section__title">Line Chart</h2>
        <p className="doc-section__desc">
          Track trends over time with smooth bezier curves and optional area fill. Multiple
          datasets render with distinct colors and a shared legend.
        </p>
        <ComponentPreview
          code={`<LineChart
  labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
  datasets={[
    {
      label: 'Daily Active Users',
      data: [1840, 2210, 1990, 2540, 2980, 2650, 3100],
      color: 'var(--tokis-color-primary)',
    },
  ]}
  smooth
  height={240}
/>`}
        >
          <LineChart
            labels={dayLabels}
            datasets={lineDatasets}
            height={240}
          />
        </ComponentPreview>
      </div>

      {/* Line Chart Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — LineChart</h2>
        <PropsTable props={lineChartProps} />
        <p className="doc-section__desc" style={{ marginTop: 'var(--tokis-spacing-4)' }}>
          Each entry in <code className="inline-code">datasets</code> accepts the following additional fields:
        </p>
        <PropsTable props={lineDatasetProps} />
      </div>

      {/* Pie Chart */}
      <div className="doc-section">
        <h2 className="doc-section__title">Pie / Donut Chart</h2>
        <p className="doc-section__desc">
          Show part-to-whole relationships with a pie or donut chart. Slices animate in
          sequentially on mount and display a legend with percentages.
        </p>
        <ComponentPreview
          code={`<PieChart
  data={[
    { label: 'Direct',  value: 40, color: 'var(--tokis-color-primary)' },
    { label: 'Organic', value: 30, color: '#7c3aed' },
    { label: 'Referral',value: 20, color: 'var(--tokis-color-success)' },
    { label: 'Social',  value: 10, color: 'var(--tokis-color-warning)' },
  ]}${donut ? '\n  donut' : ''}
/>`}
          controls={
            <DemoToggle label="Donut" value={donut} onChange={setDonut} />
          }
        >
          <PieChart data={pieData} donut={donut} />
        </ComponentPreview>
      </div>

      {/* Pie Chart Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — PieChart</h2>
        <PropsTable props={pieChartProps} />
      </div>

      {/* Sparkline */}
      <div className="doc-section">
        <h2 className="doc-section__title">Sparkline</h2>
        <p className="doc-section__desc">
          Inline micro-charts for embedding trend data inside stat cards, tables, or dashboards.
          Supports line, bar, and area types — including negative values.
        </p>
        <ComponentPreview
          code={`{/* line */}
<Sparkline data={[4, 7, 3, 9, 6, 11, 8, 14, 10, 13]} type="line" width={120} height={40} />

{/* bar */}
<Sparkline data={[3, 8, 5, 12, 7, 10, 6, 9, 11, 4]} type="bar" width={120} height={40} />

{/* area */}
<Sparkline data={[6, 9, 5, 11, 8, 13, 10, 15, 12, 14]} type="area" width={120} height={40} />

{/* bar with negative values */}
<Sparkline data={[3, -2, 5, -4, 7, -1, 4, -3, 6, -5]} type="bar" color="var(--tokis-color-error)" width={120} height={40} />`}
        >
          <div style={{
            display: 'flex',
            gap: 'var(--tokis-spacing-4)',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {/* Line sparkline */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--tokis-spacing-2)',
              padding: 'var(--tokis-spacing-4)',
              background: 'var(--tokis-color-surface)',
              border: '1px solid var(--tokis-color-border)',
              borderRadius: 'var(--tokis-radius-lg)',
              minWidth: 160,
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--tokis-spacing-1)' }}>
                <span style={{ fontSize: 'var(--tokis-font-size-2xl)', fontWeight: 'var(--tokis-font-weight-bold)' }}>13.2k</span>
                <span style={{ fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-color-success)' }}>+18%</span>
              </div>
              <span style={{ fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>Page Views</span>
              <Sparkline data={sparkLineData} type="line" width={120} height={40} />
            </div>

            {/* Bar sparkline */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--tokis-spacing-2)',
              padding: 'var(--tokis-spacing-4)',
              background: 'var(--tokis-color-surface)',
              border: '1px solid var(--tokis-color-border)',
              borderRadius: 'var(--tokis-radius-lg)',
              minWidth: 160,
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--tokis-spacing-1)' }}>
                <span style={{ fontSize: 'var(--tokis-font-size-2xl)', fontWeight: 'var(--tokis-font-weight-bold)' }}>4,891</span>
                <span style={{ fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-color-success)' }}>+7%</span>
              </div>
              <span style={{ fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>Sign-ups</span>
              <Sparkline data={sparkBarData} type="bar" width={120} height={40} />
            </div>

            {/* Area sparkline */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--tokis-spacing-2)',
              padding: 'var(--tokis-spacing-4)',
              background: 'var(--tokis-color-surface)',
              border: '1px solid var(--tokis-color-border)',
              borderRadius: 'var(--tokis-radius-lg)',
              minWidth: 160,
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--tokis-spacing-1)' }}>
                <span style={{ fontSize: 'var(--tokis-font-size-2xl)', fontWeight: 'var(--tokis-font-weight-bold)' }}>$92.4k</span>
                <span style={{ fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-color-success)' }}>+24%</span>
              </div>
              <span style={{ fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>Revenue</span>
              <Sparkline data={sparkAreaData} type="area" width={120} height={40} />
            </div>

            {/* Negative-values bar sparkline */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--tokis-spacing-2)',
              padding: 'var(--tokis-spacing-4)',
              background: 'var(--tokis-color-surface)',
              border: '1px solid var(--tokis-color-border)',
              borderRadius: 'var(--tokis-radius-lg)',
              minWidth: 160,
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--tokis-spacing-1)' }}>
                <span style={{ fontSize: 'var(--tokis-font-size-2xl)', fontWeight: 'var(--tokis-font-weight-bold)' }}>+3.1</span>
                <span style={{ fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-color-error)' }}>-12%</span>
              </div>
              <span style={{ fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>Net Score</span>
              <Sparkline
                data={sparkNegData}
                type="bar"
                color="var(--tokis-color-error)"
                width={120}
                height={40}
              />
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Sparkline Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — Sparkline</h2>
        <PropsTable props={sparklineProps} />
      </div>
    </>
  );
}
