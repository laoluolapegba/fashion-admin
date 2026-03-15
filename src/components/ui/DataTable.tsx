import type { ReactNode } from "react";

type DataTableColumn = {
  key: string;
  label: string;
  width?: string;
};

type DataTableProps<T extends Record<string, unknown>> = {
  columns: DataTableColumn[];
  rows: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  renderCell?: (row: T, key: string) => ReactNode;
  emptyState?: ReactNode;
};

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  rows,
  onEdit,
  onDelete,
  renderCell,
  emptyState,
}: DataTableProps<T>) {
  const hasActions = Boolean(onEdit || onDelete);

  if (rows.length === 0) {
    return (
      <div
        style={{
          border: "1px solid var(--color-linen)",
          background: "var(--color-white)",
          padding: 48,
          textAlign: "center",
        }}
      >
        {emptyState ?? (
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 24,
              color: "var(--color-smoke)",
            }}
          >
            No records found.
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        border: "1px solid var(--color-linen)",
        background: "var(--color-white)",
      }}
    >
      <table
        style={{
          width: "100%",
          tableLayout: "fixed",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{
                  width: column.width,
                  textAlign: "left",
                  padding: "12px 14px",
                  fontFamily: "var(--font-ui)",
                  fontSize: 9,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "var(--color-smoke)",
                  borderBottom: "1px solid var(--color-linen)",
                }}
              >
                {column.label}
              </th>
            ))}
            {hasActions ? (
              <th
                style={{
                  textAlign: "left",
                  padding: "12px 14px",
                  fontFamily: "var(--font-ui)",
                  fontSize: 9,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: "var(--color-smoke)",
                  borderBottom: "1px solid var(--color-linen)",
                }}
              >
                Actions
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={String((row as { id?: unknown }).id ?? index)}
              className="admin-row"
              style={{ transition: "background 0.15s ease" }}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  style={{
                    padding: "12px 14px",
                    fontFamily: "var(--font-ui)",
                    fontSize: 12,
                    color: "var(--color-espresso)",
                    borderBottom: "1px solid var(--color-linen)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {renderCell
                    ? renderCell(row, column.key)
                    : String(row[column.key] ?? "—")}
                </td>
              ))}
              {hasActions ? (
                <td
                  style={{
                    padding: "12px 14px",
                    borderBottom: "1px solid var(--color-linen)",
                  }}
                >
                  <div style={{ display: "flex", gap: 12 }}>
                    {onEdit ? (
                      <button
                        type="button"
                        onClick={() => onEdit(row)}
                        style={{
                          border: "none",
                          background: "transparent",
                          color: "var(--color-burnt-orange)",
                          fontFamily: "var(--font-ui)",
                          fontSize: 9,
                          textTransform: "uppercase",
                          letterSpacing: "0.15em",
                        }}
                      >
                        Edit
                      </button>
                    ) : null}
                    {onDelete ? (
                      <button
                        type="button"
                        onClick={() => onDelete(row)}
                        style={{
                          border: "none",
                          background: "transparent",
                          color: "var(--color-smoke)",
                          fontFamily: "var(--font-ui)",
                          fontSize: 9,
                          textTransform: "uppercase",
                          letterSpacing: "0.15em",
                        }}
                      >
                        Delete
                      </button>
                    ) : null}
                  </div>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx global>{`
        .admin-row:hover {
          background: var(--color-sand);
        }
      `}</style>
    </div>
  );
}
