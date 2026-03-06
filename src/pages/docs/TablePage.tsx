import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell, Badge, Avatar, Stack, ButtonRoot, ButtonLabel } from '@tokis/react';
import { ComponentPreview, DemoToggle } from '../../components/ComponentPreview';
import { PropsTable, PropDef } from '../../components/PropsTable';

type SortDir = 'asc' | 'desc' | false;

const tableProps: PropDef[] = [
  { name: 'striped', type: 'boolean', default: 'false', description: 'Alternates row background for better readability.' },
  { name: 'container', type: 'boolean', default: 'true', description: 'Wraps in a scrollable container div.' },
];

const users = [
  { id: 1, name: 'Jordan Lee', email: 'jordan@example.com', role: 'Admin', status: 'Active', joined: 'Jan 12, 2025' },
  { id: 2, name: 'Alex Kim', email: 'alex@example.com', role: 'Editor', status: 'Active', joined: 'Feb 3, 2025' },
  { id: 3, name: 'Sam Park', email: 'sam@example.com', role: 'Viewer', status: 'Pending', joined: 'Feb 28, 2025' },
  { id: 4, name: 'Casey Morgan', email: 'casey@example.com', role: 'Editor', status: 'Inactive', joined: 'Mar 1, 2025' },
  { id: 5, name: 'Riley Chen', email: 'riley@example.com', role: 'Admin', status: 'Active', joined: 'Mar 4, 2025' },
];

const statusVariant = (s: string): 'success' | 'warning' | 'default' =>
  s === 'Active' ? 'success' : s === 'Pending' ? 'warning' : 'default';

export function TablePage() {
  const [striped, setStriped] = useState(false);
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(false);

  const handleSort = (col: string) => {
    if (sortCol !== col) {
      setSortCol(col);
      setSortDir('asc');
    } else if (sortDir === 'asc') {
      setSortDir('desc');
    } else {
      setSortCol(null);
      setSortDir(false);
    }
  };

  const sorted = [...users].sort((a, b) => {
    if (!sortCol || !sortDir) return 0;
    const av = (a as Record<string, string | number>)[sortCol];
    const bv = (b as Record<string, string | number>)[sortCol];
    if (av < bv) return sortDir === 'asc' ? -1 : 1;
    if (av > bv) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <>
      <header className="doc-page__header">
        <p className="doc-page__eyebrow">Interactive</p>
        <h1 className="doc-page__title">Table</h1>
        <p className="doc-page__desc">
          A semantic data table with striped rows, sortable columns, and scrollable container support.
          Composes with any Tokis components for rich cell content.
        </p>
      </header>

      {/* Interactive */}
      <div className="doc-section">
        <h2 className="doc-section__title">Sortable Table</h2>
        <p className="doc-section__desc">
          Click column headers to sort. Sortable columns announce their state to screen readers
          via <code className="inline-code">aria-sort</code>.
        </p>
        <ComponentPreview
          code={`<Table striped={striped} container>
  <TableHead>
    <TableRow>
      <TableHeaderCell sortable sorted={sortCol === 'name' ? sortDir : false} onSort={() => handleSort('name')}>
        Name
      </TableHeaderCell>
      <TableHeaderCell sortable sorted={sortCol === 'role' ? sortDir : false} onSort={() => handleSort('role')}>
        Role
      </TableHeaderCell>
      <TableHeaderCell>Status</TableHeaderCell>
      <TableHeaderCell>Actions</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {users.map(user => (
      <TableRow key={user.id}>
        <TableCell>
          <Stack direction="row" gap={2} align="center">
            <Avatar name={user.name} size="sm" />
            <span>{user.name}</span>
          </Stack>
        </TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell><Badge variant={statusVariant(user.status)}>{user.status}</Badge></TableCell>
        <TableCell>...</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`}
          controls={
            <DemoToggle label="Striped" value={striped} onChange={setStriped} />
          }
          padless
        >
          <Table striped={striped} container style={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableHeaderCell
                  sortable
                  sorted={sortCol === 'name' ? sortDir : false}
                  onSort={() => handleSort('name')}
                >
                  Name
                </TableHeaderCell>
                <TableHeaderCell
                  sortable
                  sorted={sortCol === 'email' ? sortDir : false}
                  onSort={() => handleSort('email')}
                >
                  Email
                </TableHeaderCell>
                <TableHeaderCell
                  sortable
                  sorted={sortCol === 'role' ? sortDir : false}
                  onSort={() => handleSort('role')}
                >
                  Role
                </TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Joined</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sorted.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Stack direction="row" gap={2} align="center">
                      <Avatar name={user.name} size="sm" />
                      <span style={{ fontWeight: 'var(--tokis-font-weight-medium)' }}>{user.name}</span>
                    </Stack>
                  </TableCell>
                  <TableCell style={{ color: 'var(--tokis-text-secondary)', fontSize: 'var(--tokis-font-size-sm)' }}>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(user.status)} dot>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell style={{ color: 'var(--tokis-text-secondary)', fontSize: 'var(--tokis-font-size-sm)' }}>
                    {user.joined}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" gap={1}>
                      <ButtonRoot size="sm" variant="ghost">
                        <ButtonLabel>Edit</ButtonLabel>
                      </ButtonRoot>
                      <ButtonRoot size="sm" variant="ghost" style={{ color: 'var(--tokis-color-error)' }}>
                        <ButtonLabel>Delete</ButtonLabel>
                      </ButtonRoot>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ComponentPreview>
      </div>

      {/* Simple table */}
      <div className="doc-section">
        <h2 className="doc-section__title">Simple Table</h2>
        <ComponentPreview
          code={`<Table>
  <TableHead>
    <TableRow>
      <TableHeaderCell>Token</TableHeaderCell>
      <TableHeaderCell>Value (Light)</TableHeaderCell>
      <TableHeaderCell>Value (Dark)</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>--tokis-color-primary</TableCell>
      <TableCell>#0066ff</TableCell>
      <TableCell>#3b82f6</TableCell>
    </TableRow>
    ...
  </TableBody>
</Table>`}
          padless
        >
          <Table style={{ width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Token</TableHeaderCell>
                <TableHeaderCell>Light</TableHeaderCell>
                <TableHeaderCell>Dark</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                ['--tokis-color-primary', '#0066ff', '#3b82f6'],
                ['--tokis-color-background', '#ffffff', '#0f172a'],
                ['--tokis-color-surface', '#f8f9fa', '#1e293b'],
                ['--tokis-text-primary', '#0f172a', '#f1f5f9'],
                ['--tokis-color-border', '#e2e8f0', '#334155'],
              ].map(([token, light, dark]) => (
                <TableRow key={token}>
                  <TableCell><code className="inline-code" style={{ fontSize: '0.75rem' }}>{token}</code></TableCell>
                  <TableCell style={{ fontFamily: 'monospace', fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>{light}</TableCell>
                  <TableCell style={{ fontFamily: 'monospace', fontSize: 'var(--tokis-font-size-sm)', color: 'var(--tokis-text-secondary)' }}>{dark}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="doc-section">
        <h2 className="doc-section__title">Props — Table</h2>
        <PropsTable props={tableProps} />
      </div>
    </>
  );
}
