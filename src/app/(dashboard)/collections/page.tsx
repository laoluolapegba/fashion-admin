import { supabaseAdmin } from "@/lib/supabase/admin";
import CollectionsClient from "./CollectionsClient";

export default async function CollectionsPage() {
  const { data, error } = await supabaseAdmin
    .from("collections")
    .select("*, products(count)")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Failed to load collections.</div>;
  }

  return <CollectionsClient collections={(data as never) ?? []} />;
}
