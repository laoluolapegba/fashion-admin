"use client";

import type { ReactNode } from "react";

type DrawerProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export default function Drawer({
  open,
  title,
  onClose,
  children,
}: DrawerProps) {
  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Close drawer"
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(26,18,8,0.4)",
            border: "none",
            zIndex: 70,
          }}
        />
      ) : null}
      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: 560,
          maxWidth: "100%",
          background: "var(--color-white)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.25s ease",
          zIndex: 80,
          borderLeft: "1px solid var(--color-linen)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 18,
            borderBottom: "1px solid var(--color-linen)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              fontWeight: 300,
            }}
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: 24,
              color: "var(--color-smoke)",
            }}
          >
            ×
          </button>
        </div>
        <div style={{ overflowY: "auto", padding: 18 }}>{children}</div>
      </aside>
    </>
  );
}
