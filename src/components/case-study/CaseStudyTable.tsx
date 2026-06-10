interface TableColumn {
  header: string;
  key: string;
  renderCell?: (value: string) => React.ReactNode;
}

interface TableRow {
  [key: string]: string;
}

interface CaseStudyTableProps {
  columns: TableColumn[];
  rows: TableRow[];
}

export default function CaseStudyTable({ columns, rows }: CaseStudyTableProps) {
  return (
    <div className="mt-6 mb-2 overflow-x-auto rounded-xl" style={{ border: '0.5px solid var(--color-surface-border)' }}>
      <table className="w-full border-collapse" style={{ fontSize: 'var(--step--1)' }}>
        <thead>
          <tr>
            {columns.map(({ header, key }) => (
              <th
                key={key}
                className="text-left font-sans font-medium uppercase tracking-[0.08em] text-muted-light px-4 py-3"
                style={{
                  background: 'var(--color-surface)',
                  borderBottom: '0.5px solid var(--color-surface-border)',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  whiteSpace: 'nowrap',
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className="transition-colors duration-150"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--color-surface)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = '';
              }}
            >
              {columns.map(({ key, renderCell }, ci) => (
                <td
                  key={key}
                  className="px-4 py-3 text-off-white leading-snug"
                  style={{
                    background: 'var(--color-surface-raised)',
                    borderBottom:
                      ri < rows.length - 1
                        ? '0.5px solid var(--color-surface-border)'
                        : 'none',
                    borderRight:
                      ci < columns.length - 1
                        ? '0.5px solid var(--color-surface-border)'
                        : 'none',
                  }}
                >
                  {renderCell ? renderCell(row[key]) : row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
