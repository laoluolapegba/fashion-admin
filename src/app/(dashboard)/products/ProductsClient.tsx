"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition, type CSSProperties } from "react";
import {
  deleteProduct,
  toggleFeatured,
  updateStockStatus,
} from "@/app/actions/products";
import ProductForm from "@/components/admin/ProductForm";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import DataTable from "@/components/ui/DataTable";
import Drawer from "@/components/ui/Drawer";
import ImageUploader from "@/components/ui/ImageUploader";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Tables } from "@/types/database.types";

type Product = Tables<"products"> & { collections: { name: string } | null };
type Collection = Tables<"collections">;

type Props = {
  products: Product[];
  collections: Collection[];
};

export default function ProductsClient({ products, collections }: Props) {
  const router = useRouter();
  const [drawerMode, setDrawerMode] = useState<"create" | "edit" | null>(null);
  const [selected, setSelected] = useState<Product | null>(null);
  const [toDelete, setToDelete] = useState<Product | null>(null);
  const [isPending, startTransition] = useTransition();

  const metrics = useMemo(() => {
    const total = products.length;
    const active = products.filter((item) => item.is_active).length;
    const featured = products.filter((item) => item.is_featured).length;
    const outOfStock = products.filter(
      (item) => item.stock_status === "out_of_stock",
    ).length;
    return { total, active, featured, outOfStock };
  }, [products]);

  function onSuccess() {
    setDrawerMode(null);
    setSelected(null);
    router.refresh();
  }

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <PageHeader
        title="Products"
        subtitle={`${products.length} total products`}
        action={{
          label: "Add Product",
          onClick: () => setDrawerMode("create"),
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0,1fr))",
          gap: 12,
        }}
      >
        <MetricCard label="Total" value={metrics.total} />
        <MetricCard label="Active" value={metrics.active} />
        <MetricCard label="Featured" value={metrics.featured} />
        <MetricCard label="Out of Stock" value={metrics.outOfStock} />
      </div>

      <DataTable
        columns={[
          { key: "image", label: "Image", width: "90px" },
          { key: "name", label: "Name", width: "22%" },
          { key: "category", label: "Category", width: "18%" },
          { key: "price", label: "Price", width: "14%" },
          { key: "stock", label: "Stock", width: "14%" },
          { key: "featured", label: "Featured", width: "10%" },
          { key: "active", label: "Active", width: "12%" },
        ]}
        rows={products}
        onEdit={(row) => {
          setSelected(row);
          setDrawerMode("edit");
        }}
        onDelete={(row) => setToDelete(row)}
        emptyState={
          <div style={{ display: "grid", gap: 14, justifyItems: "center" }}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 24,
                color: "var(--color-smoke)",
              }}
            >
              No products yet.
            </p>
            <button
              type="button"
              onClick={() => setDrawerMode("create")}
              style={primaryButton}
            >
              Add Product
            </button>
          </div>
        }
        renderCell={(row, key) => {
          if (key === "image") {
            const url = row.images?.[0];
            return url ? (
              <Image
                src={url}
                alt={row.name}
                width={48}
                height={48}
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: "var(--color-sand)",
                }}
              />
            );
          }
          if (key === "price") {
            return `₦${row.price.toLocaleString("en-NG")}`;
          }
          if (key === "stock") {
            return (
              <select
                aria-label="Stock status"
                value={row.stock_status ?? "in_stock"}
                onChange={(event) => {
                  const value = event.target.value as
                    | "in_stock"
                    | "out_of_stock"
                    | "low_stock";
                  startTransition(async () => {
                    await updateStockStatus(row.id, value);
                    router.refresh();
                  });
                }}
              >
                <option value="in_stock">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="low_stock">Low Stock</option>
              </select>
            );
          }
          if (key === "featured") {
            return (
              <button
                type="button"
                onClick={() => {
                  startTransition(async () => {
                    await toggleFeatured(row.id, !row.is_featured);
                    router.refresh();
                  });
                }}
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: 20,
                  color: "var(--color-burnt-orange)",
                }}
              >
                {row.is_featured ? "★" : "☆"}
              </button>
            );
          }
          if (key === "active") {
            return <StatusBadge status={row.is_active} />;
          }

          return String(row[key as keyof Product] ?? "—");
        }}
      />

      <Drawer
        open={drawerMode !== null}
        onClose={() => {
          setDrawerMode(null);
          setSelected(null);
        }}
        title={drawerMode === "edit" ? "Edit Product" : "Add Product"}
      >
        <ProductForm
          product={selected ?? undefined}
          collections={collections}
          onSuccess={onSuccess}
        />
        {selected ? (
          <ImageUploader
            productId={selected.id}
            existingImages={selected.images ?? []}
            onUploadComplete={() => router.refresh()}
          />
        ) : null}
      </Drawer>

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete product"
        message="This action cannot be undone."
        destructive
        onCancel={() => setToDelete(null)}
        onConfirm={() => {
          if (!toDelete) return;
          startTransition(async () => {
            await deleteProduct(toDelete.id);
            setToDelete(null);
            router.refresh();
          });
        }}
      />

      {isPending ? (
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          }}
        >
          Updating…
        </p>
      ) : null}
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        background: "var(--color-white)",
        border: "1px solid var(--color-linen)",
        padding: 14,
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 9,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "var(--color-smoke)",
        }}
      >
        {label}
      </p>
      <p
        style={{
          marginTop: 8,
          fontFamily: "var(--font-display)",
          fontSize: 28,
          fontWeight: 300,
          color: "var(--color-espresso)",
        }}
      >
        {value}
      </p>
    </div>
  );
}

const primaryButton: CSSProperties = {
  border: "none",
  background: "var(--color-burnt-orange)",
  color: "var(--color-cream)",
  fontFamily: "var(--font-ui)",
  fontSize: 10,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  padding: "10px 14px",
};
