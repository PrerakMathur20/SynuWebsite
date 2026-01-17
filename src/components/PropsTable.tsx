import React from 'react';

export interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  props: PropDef[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <table className="props-table" aria-label="Component props">
      <thead>
        <tr>
          <th scope="col">Prop</th>
          <th scope="col">Type</th>
          <th scope="col">Default</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        {props.map((prop) => (
          <tr key={prop.name}>
            <td>
              <span className="props-table__name">{prop.name}</span>
              {prop.required && (
                <span className="props-table__required" aria-label="required">req</span>
              )}
            </td>
            <td>
              <span className="props-table__type">{prop.type}</span>
            </td>
            <td>
              <span className="props-table__default">{prop.default ?? '—'}</span>
            </td>
            <td>{prop.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
