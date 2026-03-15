"use client";

import { useRef, useState, useTransition, type CSSProperties } from "react";
import { createCollection, updateCollection } from "@/app/actions/products";
import type { Tables } from "@/types/database.types";

type Collection = Tables<"collections">;

type CollectionFormProps = {
  collection?: Collection;
  onSuccess: () => void;
};

export default function CollectionForm({
  collection,
  onSuccess,
}: CollectionFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);

  function handleSubmit() {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      const fields = container.querySelectorAll<
        HTMLInputElement | HTMLTextAreaElement
      >("[name]");

      fields.forEach((field) => {
        if (field instanceof HTMLInputElement && field.type === "checkbox") {
          if (field.checked) {
            formData.append(field.name, "on");
          }
          return;
        }

        formData.append(field.name, field.value);
      });

      const result = collection
        ? await updateCollection(collection.id, formData)
        : await createCollection(formData);

      if (!result.success) {
        setError(result.error ?? "Unable to save collection.");
        return;
      }

      setError(null);
      onSuccess();
    });
  }

  return (
    <div ref={containerRef} style={{ display: "grid", gap: 14 }}>
      <label>
        <span style={labelStyle}>Name</span>
        <input name="name" required defaultValue={collection?.name ?? ""} />
      </label>

      <label>
        <span style={labelStyle}>Description</span>
        <textarea
          name="description"
          rows={4}
          defaultValue={collection?.description ?? ""}
        />
      </label>

      <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        <input
          name="is_active"
          type="checkbox"
          defaultChecked={collection?.is_active ?? true}
        />
        <span style={labelStyle}>Is Active</span>
      </label>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isPending}
        style={{
          border: "none",
          background: "var(--color-espresso)",
          color: "var(--color-white)",
          width: "100%",
          padding: "12px 14px",
          fontFamily: "var(--font-ui)",
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        {isPending ? "Saving…" : "Save Collection"}
      </button>

      {error ? (
        <p
          style={{
            color: "var(--color-error)",
            fontFamily: "var(--font-ui)",
            fontSize: 12,
          }}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

const labelStyle: CSSProperties = {
  display: "block",
  marginBottom: 6,
  fontFamily: "var(--font-ui)",
  fontSize: 9,
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  color: "var(--color-smoke)",
};
