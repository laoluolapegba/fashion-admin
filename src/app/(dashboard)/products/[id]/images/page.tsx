import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/admin";
import ImageManagerClient from "./ImageManagerClient";

export default async function ProductImagesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: product, error } = await supabaseAdmin
    .from("products")
    .select("id, name, images")
    .eq("id", id)
    .single();

  if (error || !product) {
    return <div>Product not found.</div>;
  }

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <Link
        href="/products"
        style={{
          color: "var(--color-burnt-orange)",
          fontFamily: "var(--font-ui)",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          textDecoration: "none",
        }}
      >
        ← Back to Products
      </Link>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 32,
          fontWeight: 300,
        }}
      >
        {product.name}
      </h1>
      <p
        style={{
          fontFamily: "var(--font-ui)",
          fontSize: 12,
          color: "var(--color-smoke)",
        }}
      >
        Drag to reorder — first image is the cover photo
      </p>
      <ImageManagerClient
        productId={product.id}
        existingImages={product.images ?? []}
      />
    </div>
  );
}
