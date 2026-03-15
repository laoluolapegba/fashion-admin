"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import type { TablesInsert, TablesUpdate } from "@/types/database.types";

type ActionResult<T = unknown> = {
  success: boolean;
  error?: string;
  data?: T;
};

type StockStatus = "in_stock" | "out_of_stock" | "low_stock";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseCheckbox(value: FormDataEntryValue | null): boolean {
  return value === "on" || value === "true" || value === "1";
}

function parseSizes(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(",")
    .map((size) => size.trim())
    .filter(Boolean);
}

function extractProductPayload(
  formData: FormData,
): Omit<TablesInsert<"products">, "slug" | "images"> {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "0").trim();
  const category = String(formData.get("category") ?? "").trim();
  const collectionIdRaw = String(formData.get("collection_id") ?? "").trim();
  const stockStatus = String(
    formData.get("stock_status") ?? "in_stock",
  ).trim() as StockStatus;
  const sizes = parseSizes(formData.get("sizes"));

  return {
    name,
    description: description || null,
    price: Number.parseFloat(priceRaw),
    category: category || null,
    collection_id: collectionIdRaw || null,
    is_featured: parseCheckbox(formData.get("is_featured")),
    is_active: parseCheckbox(formData.get("is_active")),
    stock_status: stockStatus,
    sizes,
  };
}

export async function createProduct(
  formData: FormData,
): Promise<ActionResult<{ id: string; slug: string }>> {
  const payload = extractProductPayload(formData);

  if (!payload.name) {
    return { success: false, error: "Product name is required." };
  }

  if (Number.isNaN(payload.price)) {
    return { success: false, error: "Price must be a valid number." };
  }

  const slug = `${generateSlug(payload.name)}-${Math.random().toString(36).slice(2, 6)}`;

  const { data, error } = await supabaseAdmin
    .from("products")
    .insert({ ...payload, slug })
    .select("id, slug")
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data };
}

export async function updateProduct(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  const payload = extractProductPayload(formData);

  if (!payload.name) {
    return { success: false, error: "Product name is required." };
  }

  if (Number.isNaN(payload.price)) {
    return { success: false, error: "Price must be a valid number." };
  }

  const updatePayload: TablesUpdate<"products"> = {
    ...payload,
  };

  const { error } = await supabaseAdmin
    .from("products")
    .update(updatePayload)
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  const { data: imageObjects, error: listError } = await supabaseAdmin.storage
    .from("product-images")
    .list(`products/${id}`);

  if (listError) {
    return { success: false, error: listError.message };
  }

  if (imageObjects.length > 0) {
    const paths = imageObjects.map((item) => `products/${id}/${item.name}`);
    const { error: removeError } = await supabaseAdmin.storage
      .from("product-images")
      .remove(paths);

    if (removeError) {
      return { success: false, error: removeError.message };
    }
  }

  const { error } = await supabaseAdmin.from("products").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function uploadProductImages(
  productId: string,
  formData: FormData,
): Promise<ActionResult<{ urls: string[] }>> {
  const files = formData
    .getAll("images")
    .filter((file): file is File => file instanceof File);

  if (files.length === 0) {
    return { success: false, error: "No images selected." };
  }

  const uploadedUrls: string[] = [];

  for (const file of files) {
    const path = `products/${productId}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabaseAdmin.storage
      .from("product-images")
      .upload(path, file);

    if (uploadError) {
      return { success: false, error: uploadError.message };
    }

    const { data } = supabaseAdmin.storage
      .from("product-images")
      .getPublicUrl(path);
    uploadedUrls.push(data.publicUrl);
  }

  const { data: product, error: productError } = await supabaseAdmin
    .from("products")
    .select("images")
    .eq("id", productId)
    .single();

  if (productError) {
    return { success: false, error: productError.message };
  }

  const mergedImages = [...(product.images ?? []), ...uploadedUrls];

  const { error: updateError } = await supabaseAdmin
    .from("products")
    .update({ images: mergedImages })
    .eq("id", productId);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  return { success: true, data: { urls: uploadedUrls } };
}

export async function deleteProductImage(
  productId: string,
  imageUrl: string,
): Promise<ActionResult> {
  const marker = "/storage/v1/object/public/product-images/";
  const markerIndex = imageUrl.indexOf(marker);

  if (markerIndex === -1) {
    return { success: false, error: "Invalid image URL." };
  }

  const path = imageUrl.slice(markerIndex + marker.length);

  const { error: removeError } = await supabaseAdmin.storage
    .from("product-images")
    .remove([path]);
  if (removeError) {
    return { success: false, error: removeError.message };
  }

  const { data: product, error: productError } = await supabaseAdmin
    .from("products")
    .select("images")
    .eq("id", productId)
    .single();

  if (productError) {
    return { success: false, error: productError.message };
  }

  const filtered = (product.images ?? []).filter(
    (url: string) => url !== imageUrl,
  );

  const { error: updateError } = await supabaseAdmin
    .from("products")
    .update({ images: filtered })
    .eq("id", productId);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  return { success: true };
}

export async function createCollection(
  formData: FormData,
): Promise<ActionResult> {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!name) {
    return { success: false, error: "Collection name is required." };
  }

  const { error } = await supabaseAdmin.from("collections").insert({
    name,
    slug: generateSlug(name),
    description: description || null,
    is_active: parseCheckbox(formData.get("is_active")),
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function updateCollection(
  id: string,
  formData: FormData,
): Promise<ActionResult> {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  if (!name) {
    return { success: false, error: "Collection name is required." };
  }

  const { error } = await supabaseAdmin
    .from("collections")
    .update({
      name,
      description: description || null,
      is_active: parseCheckbox(formData.get("is_active")),
    })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function deleteCollection(id: string): Promise<ActionResult> {
  const { count, error: countError } = await supabaseAdmin
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("collection_id", id);

  if (countError) {
    return { success: false, error: countError.message };
  }

  if ((count ?? 0) > 0) {
    return {
      success: false,
      error: "Collection has products. Reassign or delete them first.",
    };
  }

  const { error } = await supabaseAdmin
    .from("collections")
    .delete()
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function updateStockStatus(
  id: string,
  status: StockStatus,
): Promise<ActionResult> {
  const { error } = await supabaseAdmin
    .from("products")
    .update({ stock_status: status })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function toggleFeatured(
  id: string,
  value: boolean,
): Promise<ActionResult> {
  const { error } = await supabaseAdmin
    .from("products")
    .update({ is_featured: value })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
