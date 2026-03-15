"use client";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  destructive?: boolean;
};

export default function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  destructive = false,
}: ConfirmDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "var(--color-white)",
          padding: 20,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            fontWeight: 300,
            color: "var(--color-espresso)",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            marginTop: 8,
            fontFamily: "var(--font-ui)",
            fontSize: 13,
            color: "var(--color-smoke)",
          }}
        >
          {message}
        </p>

        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          <button
            type="button"
            onClick={onCancel}
            style={{
              border: "1px solid var(--color-espresso)",
              background: "transparent",
              color: "var(--color-espresso)",
              padding: "9px 12px",
              fontFamily: "var(--font-ui)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{
              border: "none",
              background: destructive
                ? "var(--color-error)"
                : "var(--color-espresso)",
              color: "var(--color-white)",
              padding: "10px 12px",
              fontFamily: "var(--font-ui)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
