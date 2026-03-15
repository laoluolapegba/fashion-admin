import Link from "next/link";
import type { CSSProperties } from "react";

type ActionButton =
  | { label: string; onClick: () => void }
  | { label: string; href: string };

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ActionButton;
};

export default function PageHeader({
  title,
  subtitle,
  action,
}: PageHeaderProps) {
  const actionStyles: CSSProperties = {
    background: "var(--color-burnt-orange)",
    color: "var(--color-cream)",
    fontFamily: "var(--font-ui)",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    border: "none",
    padding: "10px 16px",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 16,
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 32,
            fontWeight: 300,
            color: "var(--color-espresso)",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>
        {subtitle ? (
          <p
            style={{
              marginTop: 8,
              fontFamily: "var(--font-ui)",
              fontSize: 12,
              color: "var(--color-smoke)",
            }}
          >
            {subtitle}
          </p>
        ) : null}
      </div>

      {action && "href" in action ? (
        <Link href={action.href} style={actionStyles}>
          {action.label}
        </Link>
      ) : null}
      {action && "onClick" in action ? (
        <button type="button" style={actionStyles} onClick={action.onClick}>
          {action.label}
        </button>
      ) : null}
    </div>
  );
}
