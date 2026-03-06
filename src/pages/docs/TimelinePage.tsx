import React from 'react';
import { Timeline } from '@tokis/react';
import { ComponentPreview } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const timelineProps: PropDef[] = [
  { name: 'items', type: 'TimelineItem[]', required: true, description: 'Array of timeline entries to render in order.' },
  { name: 'className', type: 'string', description: 'Additional CSS class name(s) applied to the root element.' },
];

const timelineItemProps: PropDef[] = [
  { name: 'id', type: 'string', required: true, description: 'Unique identifier used as the React key for each item.' },
  { name: 'title', type: 'string', required: true, description: 'Primary label for the event.' },
  { name: 'description', type: 'ReactNode', description: 'Supporting text shown below the title.' },
  { name: 'date', type: 'string', description: 'Timestamp or date string displayed alongside the item.' },
  { name: 'icon', type: 'ReactNode', description: 'Custom icon node rendered inside the timeline dot.' },
  { name: 'variant', type: "'default' | 'success' | 'error' | 'warning' | 'info'", default: "'default'", description: 'Controls the color of the timeline dot and icon.' },
];

const deploymentItems = [
  {
    id: '1',
    title: 'Production deploy v2.4.0',
    description: 'All health checks passed. Zero downtime rollout to 12 regions.',
    date: 'Today, 14:32',
    variant: 'success' as const,
  },
  {
    id: '2',
    title: 'Canary release v2.4.0-rc.2',
    description: 'Canary slice at 5% traffic. Monitoring error rates.',
    date: 'Today, 12:05',
    variant: 'info' as const,
  },
  {
    id: '3',
    title: 'Build warnings detected',
    description: 'Deprecated API usage found in payment module. Non-blocking.',
    date: 'Today, 11:47',
    variant: 'warning' as const,
  },
  {
    id: '4',
    title: 'Staging deploy failed',
    description: 'Database migration timed out. Rolled back automatically.',
    date: 'Yesterday, 18:20',
    variant: 'error' as const,
  },
];

const variantItems = [
  { id: 'v1', title: 'Default step', variant: 'default' as const, description: 'No special semantic meaning.' },
  { id: 'v2', title: 'Success step', variant: 'success' as const, description: 'Task completed without errors.' },
  { id: 'v3', title: 'Info step', variant: 'info' as const, description: 'Informational event logged.' },
  { id: 'v4', title: 'Warning step', variant: 'warning' as const, description: 'Completed with caveats.' },
  { id: 'v5', title: 'Error step', variant: 'error' as const, description: 'Step failed and was rolled back.' },
];

export function TimelinePage() {
  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Data Display</p>
        <h1 className="doc-page__title">Timeline</h1>
        <p className="doc-page__desc">
          Presents a chronological sequence of events with visual connectors.
          Each item supports a title, description, date, custom icon, and a semantic
          variant that colors the timeline dot accordingly.
        </p>
      </header>

      {/* Deployment history */}
      <div className="doc-section">
        <h2 className="doc-section__title">Deployment History</h2>
        <ComponentPreview
          code={`<Timeline
  items={[
    {
      id: '1',
      title: 'Production deploy v2.4.0',
      description: 'All health checks passed. Zero downtime rollout to 12 regions.',
      date: 'Today, 14:32',
      variant: 'success',
    },
    {
      id: '2',
      title: 'Canary release v2.4.0-rc.2',
      description: 'Canary slice at 5% traffic. Monitoring error rates.',
      date: 'Today, 12:05',
      variant: 'info',
    },
    {
      id: '3',
      title: 'Build warnings detected',
      description: 'Deprecated API usage found in payment module. Non-blocking.',
      date: 'Today, 11:47',
      variant: 'warning',
    },
    {
      id: '4',
      title: 'Staging deploy failed',
      description: 'Database migration timed out. Rolled back automatically.',
      date: 'Yesterday, 18:20',
      variant: 'error',
    },
  ]}
/>`}
          leftAlign
        >
          <div style={{ maxWidth: 520, width: '100%' }}>
            <Timeline items={deploymentItems} />
          </div>
        </ComponentPreview>
      </div>

      {/* All variants */}
      <div className="doc-section">
        <h2 className="doc-section__title">Variants</h2>
        <p className="doc-section__desc">
          The <code className="inline-code">variant</code> prop on each item controls the
          color of the connecting dot: <code className="inline-code">default</code>,{' '}
          <code className="inline-code">success</code>, <code className="inline-code">info</code>,{' '}
          <code className="inline-code">warning</code>, and <code className="inline-code">error</code>.
        </p>
        <ComponentPreview
          code={`<Timeline
  items={[
    { id: 'v1', title: 'Default step', variant: 'default', description: 'No special semantic meaning.' },
    { id: 'v2', title: 'Success step', variant: 'success', description: 'Task completed without errors.' },
    { id: 'v3', title: 'Info step', variant: 'info', description: 'Informational event logged.' },
    { id: 'v4', title: 'Warning step', variant: 'warning', description: 'Completed with caveats.' },
    { id: 'v5', title: 'Error step', variant: 'error', description: 'Step failed and was rolled back.' },
  ]}
/>`}
          leftAlign
        >
          <div style={{ maxWidth: 520, width: '100%' }}>
            <Timeline items={variantItems} />
          </div>
        </ComponentPreview>
      </div>

      {/* Props — TimelineProps */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — Timeline</h2>
        <PropsTable props={timelineProps} />
      </div>

      {/* Props — TimelineItem */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — TimelineItem</h2>
        <PropsTable props={timelineItemProps} />
      </div>
    </>
  );
}
