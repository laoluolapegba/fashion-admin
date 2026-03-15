"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type CSSProperties } from "react";
import { deleteCollection } from "@/app/actions/products";
import CollectionForm from "@/components/admin/CollectionForm";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import DataTable from "@/components/ui/DataTable";
import Drawer from "@/components/ui/Drawer";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import type { Tables } from "@/types/database.types";

type Collection = Tables<"collections"> & { products: { count: number }[] };

type Props = {
  collections: Collection[];
};

export default function CollectionsClient({ collections }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<Collection | null>(null);
  const [open, setOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Collection | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function closeDrawer() {
    setOpen(false);
    setSelected(null);
  }

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <PageHeader
        title="Collections"
        subtitle={`${collections.length} total collections`}
        action={{
          label: "Add Collection",
          onClick: () => {
            setSelected(null);
            setOpen(true);
          },
        }}
      />

      <DataTable
        columns={[
          { key: "name", label: "Name", width: "30%" },
          { key: "slug", label: "Slug", width: "30%" },
          { key: "products", label: "Products", width: "20%" },
          { key: "status", label: "Status", width: "20%" },
        ]}
        rows={collections}
        onEdit={(row) => {
          setSelected(row);
          setOpen(true);
        }}
        onDelete={(row) => {
          setError(null);
          setToDelete(row);
        }}
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
              No collections yet.
            </p>
            <button
              type="button"
              onClick={() => setOpen(true)}
              style={buttonStyle}
            >
              Add Collection
            </button>
          </div>
        }
        renderCell={(row, key) => {
          if (key === "products") {
            return String(row.products?.[0]?.count ?? 0);
          }
          if (key === "status") {
            return <StatusBadge status={row.is_active} />;
          }
          return String(row[key as keyof Collection] ?? "—");
        }}
      />

      {error ? (
        <p
          style={{ color: "var(--color-error)", fontFamily: "var(--font-ui)" }}
        >
          {error}
        </p>
      ) : null}

      <Drawer
        open={open}
        onClose={closeDrawer}
        title={selected ? "Edit Collection" : "Add Collection"}
      >
        <CollectionForm
          collection={selected ?? undefined}
          onSuccess={() => {
            closeDrawer();
            router.refresh();
          }}
        />
      </Drawer>

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete collection"
        message="This action cannot be undone."
        destructive
        onCancel={() => setToDelete(null)}
        onConfirm={() => {
          if (!toDelete) return;
          startTransition(async () => {
            const result = await deleteCollection(toDelete.id);
            if (!result.success) {
              setError(result.error ?? "Unable to delete collection.");
            } else {
              router.refresh();
            }
            setToDelete(null);
          });
        }}
      />

      {isPending ? (
        <p style={{ fontFamily: "var(--font-ui)", fontSize: 11 }}>Updating…</p>
      ) : null}
    </div>
  );
}

const buttonStyle: CSSProperties = {
  border: "none",
  background: "var(--color-burnt-orange)",
  color: "var(--color-cream)",
  fontFamily: "var(--font-ui)",
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  padding: "10px 14px",
};
