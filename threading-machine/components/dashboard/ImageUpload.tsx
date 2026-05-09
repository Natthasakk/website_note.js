"use client";

import { useState, useRef, useCallback } from "react";

export type UploadedImage = {
  url: string;
  filename: string;
  size: number;
  preview?: string;
};

interface Props {
  images: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  maxImages?: number;
}

const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function ImageUpload({ images, onChange, maxImages = 6 }: Props) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState<string[]>([]); // filenames being uploaded
  const [errors, setErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      setErrors([]);

      // Client-side validation
      if (!ALLOWED_TYPES.includes(file.type)) {
        setErrors((e) => [...e, `${file.name}: Only JPEG, PNG, WebP allowed.`]);
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setErrors((e) => [...e, `${file.name}: Exceeds ${MAX_SIZE_MB} MB limit.`]);
        return;
      }

      const preview = URL.createObjectURL(file);
      setUploading((u) => [...u, file.name]);

      try {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: form, credentials: "same-origin" });
        const data = await res.json();

        if (!res.ok) {
          setErrors((e) => [...e, `${file.name}: ${data.error ?? "Upload failed."}`]);
          URL.revokeObjectURL(preview);
          return;
        }

        onChange([...images, { url: data.url, filename: data.filename, size: file.size, preview }]);
      } catch {
        setErrors((e) => [...e, `${file.name}: Network error.`]);
        URL.revokeObjectURL(preview);
      } finally {
        setUploading((u) => u.filter((n) => n !== file.name));
      }
    },
    [images, onChange]
  );

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const remaining = maxImages - images.length;
      Array.from(files)
        .slice(0, remaining)
        .forEach(uploadFile);
    },
    [images.length, maxImages, uploadFile]
  );

  function handleRemove(index: number) {
    const next = images.filter((_, i) => i !== index);
    onChange(next);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }

  const canAdd = images.length < maxImages && uploading.length === 0;

  return (
    <div>
      {/* Error messages */}
      {errors.length > 0 && (
        <div
          style={{
            backgroundColor: "rgba(215,0,21,0.08)",
            border: "1px solid rgba(215,0,21,0.2)",
            borderRadius: 10,
            padding: "10px 14px",
            marginBottom: 12,
          }}
        >
          {errors.map((err) => (
            <p key={err} style={{ fontSize: 13, color: "#FF6B6B", fontFamily: "'SF Pro Text', sans-serif", margin: "2px 0" }}>
              {err}
            </p>
          ))}
        </div>
      )}

      {/* Image grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12 }}>
        {/* Existing images */}
        {images.map((img, idx) => (
          <div
            key={img.url}
            style={{
              position: "relative",
              aspectRatio: "1",
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid #E8E8ED",
              backgroundColor: "#F5F5F7",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.preview ?? img.url}
              alt={`Product image ${idx + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* Primary badge */}
            {idx === 0 && (
              <div
                style={{
                  position: "absolute",
                  top: 6,
                  left: 6,
                  backgroundColor: "#D70015",
                  color: "#FFFFFF",
                  fontSize: 10,
                  fontWeight: 600,
                  padding: "2px 7px",
                  borderRadius: 6,
                  fontFamily: "'SF Pro Text', sans-serif",
                }}
              >
                Main
              </div>
            )}
            {/* Remove button */}
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              aria-label={`Remove image ${idx + 1}`}
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                width: 26,
                height: 26,
                backgroundColor: "rgba(0,0,0,0.6)",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 2l8 8M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            {/* Size */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(transparent, rgba(0,0,0,0.55))",
                padding: "12px 8px 6px",
                fontSize: 10,
                color: "rgba(255,255,255,0.8)",
                fontFamily: "'SF Pro Text', sans-serif",
                textAlign: "right",
              }}
            >
              {(img.size / 1024).toFixed(0)} KB
            </div>
          </div>
        ))}

        {/* Uploading placeholders */}
        {uploading.map((name) => (
          <div
            key={name}
            style={{
              aspectRatio: "1",
              borderRadius: 12,
              border: "1.5px dashed #D70015",
              backgroundColor: "rgba(215,0,21,0.04)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 0.8s linear infinite" }}>
              <circle cx="12" cy="12" r="9" stroke="#D70015" strokeWidth="2" strokeDasharray="40 20" />
            </svg>
            <span style={{ fontSize: 10, color: "#D70015", fontFamily: "'SF Pro Text', sans-serif" }}>Uploading…</span>
          </div>
        ))}

        {/* Drop zone / Add button */}
        {canAdd && (
          <div
            role="button"
            tabIndex={0}
            aria-label="Add image"
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            style={{
              aspectRatio: "1",
              borderRadius: 12,
              border: `2px dashed ${dragging ? "#D70015" : "#E8E8ED"}`,
              backgroundColor: dragging ? "rgba(215,0,21,0.05)" : "#F5F5F7",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              cursor: "pointer",
              transition: "border-color 200ms ease, background-color 200ms ease",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                backgroundColor: dragging ? "#D70015" : "#E8E8ED",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 200ms ease",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2v10M4 7l5-5 5 5" stroke={dragging ? "#FFFFFF" : "#86868B"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 14h14" stroke={dragging ? "#FFFFFF" : "#86868B"} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <span style={{ fontSize: 11, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", textAlign: "center", lineHeight: 1.4, padding: "0 8px" }}>
              {dragging ? "Drop to upload" : "Click or drop image"}
            </span>
            <span style={{ fontSize: 10, color: "#C0C0C5", fontFamily: "'SF Pro Text', sans-serif" }}>
              JPEG · PNG · WebP · max 5 MB
            </span>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        aria-hidden="true"
        style={{ display: "none" }}
        onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }}
      />

      {/* Counter */}
      <p style={{ fontSize: 12, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", marginTop: 8 }}>
        {images.length} / {maxImages} images — first image is the main product photo
      </p>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
