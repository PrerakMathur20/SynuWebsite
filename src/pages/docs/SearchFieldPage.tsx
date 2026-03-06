import React, { useState } from 'react';
import { SearchField } from '@tokis/react';
import { ComponentPreview } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

const searchFieldProps: PropDef[] = [
  { name: 'value', type: 'string', required: true, description: 'Controlled input value.' },
  { name: 'onChange', type: '(value: string) => void', required: true, description: 'Called on every keystroke with the current value.' },
  { name: 'onSearch', type: '(value: string) => void', description: 'Called when the user presses Enter. Pair with loading for async search.' },
  { name: 'debounce', type: 'number', default: '300', description: 'Debounce delay in ms before onSearch fires after typing stops.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows a loading spinner inside the field.' },
  { name: 'placeholder', type: 'string', description: 'Placeholder text shown when the field is empty.' },
  { name: 'label', type: 'string', description: 'Accessible label for the input (renders visually hidden if needed).' },
  { name: 'className', type: 'string', description: 'Additional class name applied to the root element.' },
];

export function SearchFieldPage() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastSearched, setLastSearched] = useState<string | null>(null);

  const [debounceValue, setDebounceValue] = useState('');

  function handleSearch(query: string) {
    if (!query.trim()) return;
    setLoading(true);
    setLastSearched(null);
    setTimeout(() => {
      setLoading(false);
      setLastSearched(query);
    }, 800);
  }

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Forms</p>
        <h1 className="doc-page__title">Search Field</h1>
        <p className="doc-page__desc">
          A text input purpose-built for search interactions. Includes a search icon, optional loading
          state, and a clear button. Supports both instant (debounced) onChange and explicit onSearch
          triggered on Enter.
        </p>
      </header>

      {/* Interactive demo */}
      <div className="doc-section">
        <h2 className="doc-section__title">Interactive Demo</h2>
        <p className="doc-section__desc">
          Press Enter to trigger an async search (simulated with a 800ms timeout).
          The field shows a spinner while loading and automatically reveals a clear button when the value is non-empty.
        </p>
        <ComponentPreview
          code={`const [value, setValue] = useState('');
const [loading, setLoading] = useState(false);

function handleSearch(query) {
  setLoading(true);
  setTimeout(() => setLoading(false), 800);
}

<SearchField
  value={value}
  onChange={setValue}
  onSearch={handleSearch}
  loading={loading}
  placeholder="Search components, docs…"
/>`}
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <SearchField
              value={value}
              onChange={setValue}
              onSearch={handleSearch}
              loading={loading}
              placeholder="Search components, docs…"
            />
            {loading && (
              <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-tertiary)' }}>
                Searching...
              </p>
            )}
            {!loading && lastSearched && (
              <p style={{ margin: 0, fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>
                Showing results for{' '}
                <strong style={{ color: 'var(--tokis-text-primary)' }}>"{lastSearched}"</strong>
              </p>
            )}
          </div>
        </ComponentPreview>
      </div>

      {/* Debounced onChange */}
      <div className="doc-section">
        <h2 className="doc-section__title">Debounced Search</h2>
        <p className="doc-section__desc">
          Set a <code className="inline-code">debounce</code> value (in ms) to fire{' '}
          <code className="inline-code">onSearch</code> automatically after the user stops typing.
          This avoids triggering a network request on every keystroke.
        </p>
        <ComponentPreview
          code={`<SearchField
  value={value}
  onChange={setValue}
  onSearch={(v) => fetchResults(v)}
  debounce={400}
  placeholder="Type to search (400ms debounce)…"
/>`}
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 400 }}>
            <SearchField
              value={debounceValue}
              onChange={setDebounceValue}
              onSearch={() => {}}
              debounce={400}
              placeholder="Type to search (400ms debounce)…"
            />
          </div>
        </ComponentPreview>
      </div>

      {/* With label */}
      <div className="doc-section">
        <h2 className="doc-section__title">With Label</h2>
        <ComponentPreview
          code={`<SearchField
  value={value}
  onChange={setValue}
  label="Search users"
  placeholder="Name or email…"
/>`}
          leftAlign
        >
          <div style={{ width: '100%', maxWidth: 400 }}>
            <SearchField
              value=""
              onChange={() => {}}
              label="Search users"
              placeholder="Name or email…"
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props</h2>
        <PropsTable props={searchFieldProps} />
      </div>
    </>
  );
}
