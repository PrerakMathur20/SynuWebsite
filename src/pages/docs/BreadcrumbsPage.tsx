import React from 'react';
import { Breadcrumbs, Stack } from '@tokis/react';
import { ComponentPreview } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const breadcrumbsProps: PropDef[] = [
  { name: 'items', type: 'BreadcrumbItem[]', required: true, description: 'Array of {label, href?}. The last item without href is the current page.' },
  { name: 'separator', type: 'ReactNode', default: "'/'", description: 'Custom separator between items.' },
  { name: 'maxItems', type: 'number', description: 'Maximum number of items to display. When the count exceeds this, intermediate items are replaced with an ellipsis.' },
  { name: 'className', type: 'string', description: 'Additional CSS class.' },
];

export function BreadcrumbsPage() {
  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Navigation</p>
        <h1 className="doc-page__title">Breadcrumbs</h1>
        <p className="doc-page__desc">
          Navigation trail showing the user's current location in the hierarchy.
          Implements WAI-ARIA breadcrumb pattern with proper <code className="inline-code">aria-label</code> and <code className="inline-code">aria-current="page"</code>.
        </p>
      </header>

      <div className="doc-section">
        <h2 className="doc-section__title">Basic</h2>
        <ComponentPreview
          code={`<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/docs/button' },
    { label: 'Breadcrumbs' },
  ]}
/>`}
          leftAlign
        >
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Components', href: '/docs/button' },
              { label: 'Breadcrumbs' },
            ]}
          />
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Custom Separator</h2>
        <p className="doc-section__desc">
          Replace the default <code className="inline-code">/</code> with any character or component.
        </p>
        <ComponentPreview
          code={`<Stack gap={4}>
  <Breadcrumbs
    separator="›"
    items={[
      { label: 'Dashboard', href: '/' },
      { label: 'Settings', href: '/' },
      { label: 'Security' },
    ]}
  />
  <Breadcrumbs
    separator="→"
    items={[
      { label: 'Projects', href: '/' },
      { label: 'Tokis Design', href: '/' },
      { label: 'Components' },
    ]}
  />
  <Breadcrumbs
    separator={<span style={{ color: 'var(--tokis-color-primary)' }}>·</span>}
    items={[
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/' },
      { label: 'Release Notes' },
    ]}
  />
</Stack>`}
          leftAlign
        >
          <Stack gap={4}>
            <Breadcrumbs
              separator="›"
              items={[
                { label: 'Dashboard', href: '/' },
                { label: 'Settings', href: '/' },
                { label: 'Security' },
              ]}
            />
            <Breadcrumbs
              separator="→"
              items={[
                { label: 'Projects', href: '/' },
                { label: 'Tokis Design', href: '/' },
                { label: 'Components' },
              ]}
            />
            <Breadcrumbs
              separator={<span style={{ color: 'var(--tokis-color-primary)' }}>·</span>}
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/' },
                { label: 'Release Notes' },
              ]}
            />
          </Stack>
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Deep Hierarchy</h2>
        <ComponentPreview
          code={`<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Org', href: '/' },
    { label: 'Workspace', href: '/' },
    { label: 'Project', href: '/' },
    { label: 'Current page' },
  ]}
/>`}
          leftAlign
        >
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Organization', href: '/' },
              { label: 'Workspace', href: '/' },
              { label: 'Project', href: '/' },
              { label: 'Current page' },
            ]}
          />
        </ComponentPreview>
      </div>

      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={breadcrumbsProps} />
      </div>
    </>
  );
}
