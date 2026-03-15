"use client";

import { useRef, useState, useTransition, type CSSProperties } from "react";
import { createProduct, updateProduct } from "@/app/actions/products";
import type { Tables } from "@/types/database.types";

type Product = Tables<"products">;
type Collection = Tables<"collections">;

type ProductFormProps = {
  product?: Product;
  collections: Collection[];
  onSuccess: () => void;
};

const CATEGORIES = [
  "Luxury Kaftans",
  "Statement Dresses",
  "Elegant Two-Piece Sets",
  "Occasion Wear",
  "Limited Collection Pieces",
  "Aso-Ebi",
];

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

export default function ProductForm({
  product,
  collections,
  onSuccess,
}: ProductFormProps) {
  const [sizes, setSizes] = useState<string[]>(product?.sizes ?? []);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);

  function toggleSize(size: string) {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size],
    );
  }

  function handleSubmit() {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    startTransition(async () => {
      const formData = new FormData();
      const fields = container.querySelectorAll<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
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

      formData.set("sizes", sizes.join(","));

      const result = product
        ? await updateProduct(product.id, formData)
        : await createProduct(formData);

      if (!result.success) {
        setError(result.error ?? "Unable to save product.");
        return;
      }

      setError(null);
      onSuccess();
    });
  }

  return (
    <div ref={containerRef} style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <label>
          <span style={labelStyle}>Name</span>
          <input name="name" required defaultValue={product?.name ?? ""} />
        </label>
        <label>
          <span style={labelStyle}>Price</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={labelStyle}>₦</span>
            <input
              name="price"
              required
              type="number"
              min={0}
              step={1000}
              defaultValue={product?.price ?? 0}
            />
          </div>
        </label>
      </div>

      <label>
        <span style={labelStyle}>Description</span>
        <textarea
          name="description"
          rows={4}
          defaultValue={product?.description ?? ""}
        />
      </label>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <label>
          <span style={labelStyle}>Category</span>
          <select
            name="category"
            defaultValue={product?.category ?? CATEGORIES[0]}
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span style={labelStyle}>Collection</span>
          <select
            name="collection_id"
            defaultValue={product?.collection_id ?? ""}
          >
            <option value="">No Collection</option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <span style={labelStyle}>Sizes</span>
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}
        >
          {SIZE_OPTIONS.map((size) => (
            <label
              key={size}
              style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              <input
                type="checkbox"
                checked={sizes.includes(size)}
                onChange={() => toggleSize(size)}
              />
              <span style={{ fontFamily: "var(--font-ui)", fontSize: 12 }}>
                {size}
              </span>
            </label>
          ))}
        </div>
      </div>

      <label>
        <span style={labelStyle}>Stock Status</span>
        <select
          name="stock_status"
          defaultValue={product?.stock_status ?? "in_stock"}
        >
          <option value="in_stock">In Stock</option>
          <option value="out_of_stock">Out of Stock</option>
          <option value="low_stock">Low Stock</option>
        </select>
      </label>

      <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        <input
          name="is_featured"
          type="checkbox"
          defaultChecked={Boolean(product?.is_featured)}
        />
        <span style={labelStyle}>Is Featured</span>
      </label>

      <label style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        <input
          name="is_active"
          type="checkbox"
          defaultChecked={product?.is_active ?? true}
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
        {isPending ? "Saving…" : "Save Product"}
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
