"use client";

import { useRouter } from "next/navigation";
import ImageUploader from "@/components/ui/ImageUploader";

type Props = {
  productId: string;
  existingImages: string[];
};

export default function ImageManagerClient({
  productId,
  existingImages,
}: Props) {
  const router = useRouter();

  return (
    <ImageUploader
      productId={productId}
      existingImages={existingImages}
      onUploadComplete={() => router.refresh()}
    />
  );
}
