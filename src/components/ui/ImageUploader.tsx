"use client";

import Image from "next/image";
import { useMemo, useRef, useState, useTransition } from "react";
import {
  deleteProductImage,
  uploadProductImages,
} from "@/app/actions/products";

type ImageUploaderProps = {
  productId: string;
  existingImages: string[];
  onUploadComplete: () => void;
};

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;
const MAX_FILES = 10;

export default function ImageUploader({
  productId,
  existingImages,
  onUploadComplete,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const previews = useMemo(
    () =>
      selectedFiles.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [selectedFiles],
  );

  function validate(files: FileList | File[]): File[] {
    const array = Array.from(files);

    if (array.length > MAX_FILES) {
      setError("You can upload a maximum of 10 images at a time.");
      return [];
    }

    const invalid = array.find(
      (file) => !ACCEPTED_TYPES.includes(file.type) || file.size > MAX_SIZE,
    );
    if (invalid) {
      setError("Only JPG, PNG, WEBP images up to 5MB are allowed.");
      return [];
    }

    setError(null);
    return array;
  }

  function onChooseFiles(files: FileList | null) {
    if (!files) {
      return;
    }
    setSelectedFiles(validate(files));
  }

  function removeLocal(index: number) {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function handleUpload() {
    if (selectedFiles.length === 0) {
      setError("Select at least one image to upload.");
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      selectedFiles.forEach((file) => formData.append("images", file));
      const result = await uploadProductImages(productId, formData);

      if (!result.success) {
        setError(result.error ?? "Upload failed.");
        return;
      }

      setSelectedFiles([]);
      setError(null);
      onUploadComplete();
    });
  }

  function handleDeleteExisting(url: string) {
    startTransition(async () => {
      const result = await deleteProductImage(productId, url);
      if (!result.success) {
        setError(result.error ?? "Failed to delete image.");
        return;
      }
      onUploadComplete();
    });
  }

  return (
    <div style={{ marginTop: 24 }}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            inputRef.current?.click();
          }
        }}
        onDrop={(event) => {
          event.preventDefault();
          onChooseFiles(event.dataTransfer.files);
        }}
        onDragOver={(event) => event.preventDefault()}
        style={{
          border: "1px dashed var(--color-linen)",
          background: "var(--color-sand)",
          padding: 20,
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "var(--color-smoke)",
          }}
        >
          Drop images here or click to upload
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => onChooseFiles(event.target.files)}
        />
      </div>

      {previews.length > 0 ? (
        <div
          style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}
        >
          {previews.map((preview, index) => (
            <div key={preview.url} style={{ position: "relative" }}>
              <Image
                src={preview.url}
                alt={preview.file.name}
                width={80}
                height={80}
                style={{ objectFit: "cover" }}
              />
              <button
                type="button"
                onClick={() => removeLocal(index)}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  border: "none",
                  background: "var(--color-espresso)",
                  color: "var(--color-white)",
                  width: 20,
                  height: 20,
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <button
        type="button"
        onClick={handleUpload}
        disabled={isPending}
        style={{
          marginTop: 12,
          border: "none",
          background: "var(--color-espresso)",
          color: "var(--color-white)",
          fontFamily: "var(--font-ui)",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          padding: "10px 14px",
        }}
      >
        {isPending ? "Uploading…" : "Upload Images"}
      </button>

      <div
        style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}
      >
        {existingImages.map((url) => (
          <div key={url} style={{ position: "relative" }}>
            <Image
              src={url}
              alt="Existing product image"
              width={80}
              height={80}
              style={{ objectFit: "cover" }}
            />
            <button
              type="button"
              onClick={() => handleDeleteExisting(url)}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                border: "none",
                background: "var(--color-error)",
                color: "var(--color-white)",
                width: 20,
                height: 20,
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {error ? (
        <p
          style={{
            marginTop: 10,
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
