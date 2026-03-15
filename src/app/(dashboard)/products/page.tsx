import { supabaseAdmin } from "@/lib/supabase/admin";
import ProductsClient from "./ProductsClient";

export default async function ProductsPage() {
  const [
    { data: products, error: productsError },
    { data: collections, error: collectionsError },
  ] = await Promise.all([
    supabaseAdmin
      .from("products")
      .select("*, collections(name)")
      .order("created_at", { ascending: false }),
    supabaseAdmin
      .from("collections")
      .select("*")
      .order("name", { ascending: true }),
  ]);

  if (productsError || collectionsError) {
    return <div>Failed to load products.</div>;
  }

  return (
    <ProductsClient products={products ?? []} collections={collections ?? []} />
  );
}
