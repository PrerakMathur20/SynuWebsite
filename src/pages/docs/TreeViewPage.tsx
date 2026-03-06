import React, { useState } from 'react';
import { TreeView } from '@tokis/react';
import { ComponentPreview, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const treeViewProps: PropDef[] = [
  { name: 'data', type: 'TreeNode[]', required: true, description: 'The tree data to render. Each node may have nested children.' },
  { name: 'selected', type: 'string[]', description: 'Controlled array of selected node IDs.' },
  { name: 'expanded', type: 'string[]', description: 'Controlled array of expanded (open) node IDs.' },
  { name: 'onSelect', type: '(id: string) => void', description: 'Called with the node ID when a node is selected.' },
  { name: 'onExpand', type: '(id: string) => void', description: 'Called with the node ID when a node is expanded or collapsed.' },
  { name: 'multiSelect', type: 'boolean', default: 'false', description: 'When true, allows selecting multiple nodes simultaneously.' },
  { name: 'className', type: 'string', description: 'Additional CSS class name(s) applied to the root element.' },
];

const treeNodeProps: PropDef[] = [
  { name: 'id', type: 'string', required: true, description: 'Unique identifier for the node, used in selected/expanded arrays.' },
  { name: 'label', type: 'string', required: true, description: 'Text rendered as the node label.' },
  { name: 'children', type: 'TreeNode[]', description: 'Nested child nodes. Makes this node a branch (expandable).' },
  { name: 'disabled', type: 'boolean', description: 'When true, the node cannot be selected or expanded.' },
  { name: 'icon', type: 'ReactNode', description: 'Custom icon shown before the label.' },
];

const fileSystemNodes = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'components',
        label: 'components',
        children: [
          { id: 'Button.tsx', label: 'Button.tsx' },
          { id: 'Input.tsx', label: 'Input.tsx' },
          { id: 'Modal.tsx', label: 'Modal.tsx' },
        ],
      },
      {
        id: 'pages',
        label: 'pages',
        children: [
          { id: 'Home.tsx', label: 'Home.tsx' },
          { id: 'About.tsx', label: 'About.tsx' },
          { id: 'Settings.tsx', label: 'Settings.tsx' },
        ],
      },
      { id: 'index.ts', label: 'index.ts' },
    ],
  },
  {
    id: 'public',
    label: 'public',
    children: [
      { id: 'favicon.ico', label: 'favicon.ico' },
      { id: 'robots.txt', label: 'robots.txt' },
    ],
  },
  { id: 'package.json', label: 'package.json' },
  { id: 'tsconfig.json', label: 'tsconfig.json', disabled: true },
];

export function TreeViewPage() {
  const [selected, setSelected] = useState<string[]>(['Button.tsx']);
  const [expanded, setExpanded] = useState<string[]>(['src', 'components']);
  const [multiSelect, setMultiSelect] = useState(false);

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Navigation</p>
        <h1 className="doc-page__title">Tree View</h1>
        <p className="doc-page__desc">
          Displays hierarchical data as an expandable tree. Supports controlled
          selection and expansion, multi-select, disabled nodes, and custom icons.
          Keyboard navigable with arrow keys and Enter/Space.
        </p>
      </header>

      {/* File system example */}
      <div className="doc-section">
        <h2 className="doc-section__title">File System Explorer</h2>
        <ComponentPreview
          code={`const [selected, setSelected] = useState(['Button.tsx']);
const [expanded, setExpanded] = useState(['src', 'components']);

<TreeView
  data={[
    {
      id: 'src',
      label: 'src',
      children: [
        {
          id: 'components',
          label: 'components',
          children: [
            { id: 'Button.tsx', label: 'Button.tsx' },
            { id: 'Input.tsx', label: 'Input.tsx' },
            { id: 'Modal.tsx', label: 'Modal.tsx' },
          ],
        },
        {
          id: 'pages',
          label: 'pages',
          children: [
            { id: 'Home.tsx', label: 'Home.tsx' },
            { id: 'About.tsx', label: 'About.tsx' },
            { id: 'Settings.tsx', label: 'Settings.tsx' },
          ],
        },
        { id: 'index.ts', label: 'index.ts' },
      ],
    },
    {
      id: 'public',
      label: 'public',
      children: [
        { id: 'favicon.ico', label: 'favicon.ico' },
        { id: 'robots.txt', label: 'robots.txt' },
      ],
    },
    { id: 'package.json', label: 'package.json' },
    { id: 'tsconfig.json', label: 'tsconfig.json', disabled: true },
  ]}
  selected={selected}
  expanded={expanded}
  onSelect={(id) => setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])}
  onExpand={(id) => setExpanded(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id])}
  multiSelect={${multiSelect}}
/>`}
          controls={
            <DemoToggle
              label="Multi-select"
              value={multiSelect}
              onChange={(v) => {
                setMultiSelect(v);
                if (!v) setSelected((prev) => prev.slice(0, 1));
              }}
            />
          }
          leftAlign
        >
          <div style={{ maxWidth: 320, width: '100%' }}>
            <TreeView
              data={fileSystemNodes}
              selected={selected}
              expanded={expanded}
              onSelect={(id) => {
                if (multiSelect) {
                  setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
                } else {
                  setSelected([id]);
                }
              }}
              onExpand={(id) => setExpanded((prev) => prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id])}
              multiSelect={multiSelect}
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Props — TreeView */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — TreeView</h2>
        <PropsTable props={treeViewProps} />
      </div>

      {/* Props — TreeNode */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — TreeNode</h2>
        <PropsTable props={treeNodeProps} />
      </div>
    </>
  );
}
