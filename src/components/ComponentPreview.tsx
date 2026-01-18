import React, { useState } from 'react';
import { CodeBlock } from './CodeBlock';

interface Tab {
  id: string;
  label: string;
}

interface ComponentPreviewProps {
  code: string;
  language?: string;
  filename?: string;
  children: React.ReactNode;
  controls?: React.ReactNode;
  padless?: boolean;
  leftAlign?: boolean;
}

export function ComponentPreview({
  code,
  language = 'tsx',
  filename,
  children,
  controls,
  padless = false,
  leftAlign = false,
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  return (
    <div className="comp-preview">
      <div className="comp-preview__tabs" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'preview'}
          className={`comp-preview__tab${activeTab === 'preview' ? ' comp-preview__tab--active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'code'}
          className={`comp-preview__tab${activeTab === 'code' ? ' comp-preview__tab--active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          Code
        </button>
      </div>

      {activeTab === 'preview' && (
        <>
          <div
            className={[
              'comp-preview__demo',
              padless && 'comp-preview__demo--padless',
              leftAlign && 'comp-preview__demo--left',
            ].filter(Boolean).join(' ')}
          >
            {children}
          </div>
          {controls && (
            <div className="demo-controls">
              {controls}
            </div>
          )}
        </>
      )}

      {activeTab === 'code' && (
        <div className="comp-preview__code">
          <CodeBlock code={code} language={language} filename={filename} />
        </div>
      )}
    </div>
  );
}

interface DemoControlProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function DemoControl({ label, options, value, onChange }: DemoControlProps) {
  return (
    <div className="demo-control">
      <div className="demo-control__label">{label}</div>
      <div className="demo-control__options">
        {options.map((opt) => (
          <button
            key={opt}
            className={`demo-option${value === opt ? ' demo-option--active' : ''}`}
            onClick={() => onChange(opt)}
            type="button"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

interface DemoToggleProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function DemoToggle({ label, value, onChange }: DemoToggleProps) {
  return (
    <div className="demo-control">
      <div className="demo-control__label">{label}</div>
      <div className="demo-control__options">
        <button
          className={`demo-option${value ? ' demo-option--active' : ''}`}
          onClick={() => onChange(true)}
          type="button"
        >
          On
        </button>
        <button
          className={`demo-option${!value ? ' demo-option--active' : ''}`}
          onClick={() => onChange(false)}
          type="button"
        >
          Off
        </button>
      </div>
    </div>
  );
}
