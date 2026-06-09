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
    <div className="mt-6 mb-2 overflow-x-auto rounded-xl" style={{ border: '0.5px solid rgba(255,255,255,0.06)' }}>
      <table className="w-full border-collapse" style={{ fontSize: 'var(--step--1)' }}>
        <thead>
          <tr>
            {columns.map(({ header, key }) => (
              <th
                key={key}
                className="text-left font-sans font-medium uppercase tracking-[0.08em] text-muted-light px-4 py-3"
                style={{
                  background: '#232328',
                  borderBottom: '0.5px solid rgba(255,255,255,0.06)',
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
                (e.currentTarget as HTMLElement).style.background = '#232328';
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
                    background: '#1A1A1F',
                    borderBottom:
                      ri < rows.length - 1
                        ? '0.5px solid rgba(255,255,255,0.06)'
                        : 'none',
                    borderRight:
                      ci < columns.length - 1
                        ? '0.5px solid rgba(255,255,255,0.06)'
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
