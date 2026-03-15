type StatusBadgeProps = {
  status: string | boolean | null | undefined;
};

const MAP: Record<string, { label: string; bg: string; color: string }> = {
  in_stock: { label: "In Stock", bg: "#EAF3DE", color: "#27500A" },
  out_of_stock: {
    label: "Out of Stock",
    bg: "#FDECEA",
    color: "var(--color-error)",
  },
  low_stock: { label: "Low Stock", bg: "#FAEEDA", color: "#633806" },
  active: { label: "Active", bg: "#EAF3DE", color: "#27500A" },
  inactive: { label: "Inactive", bg: "#FDECEA", color: "var(--color-error)" },
  true: { label: "Active", bg: "#EAF3DE", color: "#27500A" },
  false: { label: "Inactive", bg: "#FDECEA", color: "var(--color-error)" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const key = String(status ?? "").toLowerCase();
  const value = MAP[key] ?? {
    label: key || "Unknown",
    bg: "var(--color-linen)",
    color: "var(--color-smoke)",
  };

  return (
    <span
      style={{
        display: "inline-flex",
        padding: "3px 10px",
        background: value.bg,
        color: value.color,
        fontFamily: "var(--font-ui)",
        fontSize: 9,
        textTransform: "uppercase",
        letterSpacing: "0.15em",
      }}
    >
      {value.label}
    </span>
  );
}
