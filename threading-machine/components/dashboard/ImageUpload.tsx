"use client";

import { useState, useRef } from "react";

export type UploadedImage = {
  url: string;
  filename: string;
  size: number;
  preview?: string;
};

interface Props {
  images: UploadedImage[];
  onChange: (images: UploadedImage[] | ((prev: UploadedImage[]) => UploadedImage[])) => void;
  maxImages?: number;
}

const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function ImageUpload({ images, onChange, maxImages = 6 }: Props) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  // Use a ref (not state) for replace-index to avoid extra re-renders
  const replaceIdxRef = useRef<number | null>(null);

  async function uploadOne(file: File, replaceAt?: number) {
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
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
        credentials: "same-origin",
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors((e) => [...e, `${file.name}: ${data.error ?? "Upload failed."}`]);
        URL.revokeObjectURL(preview);
        return;
      }

      const img: UploadedImage = {
        url: data.url,
        filename: data.filename,
        size: file.size,
        preview,
      };

      if (replaceAt != null) {
        onChange((prev) => {
          const next = [...prev];
          if (next[replaceAt]?.preview) URL.revokeObjectURL(next[replaceAt].preview!);
          next[replaceAt] = img;
          return next;
        });
      } else {
        onChange((prev) => [...prev, img]);
      }
    } catch {
      setErrors((e) => [...e, `${file.name}: Network error.`]);
      URL.revokeObjectURL(preview);
    } finally {
      setUploading((u) => u.filter((n) => n !== file.name));
    }
  }

  function handleRemove(index: number) {
    const img = images[index];
    if (img.preview) URL.revokeObjectURL(img.preview);
    onChange((prev) => prev.filter((_, i) => i !== index));
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setErrors([]);
    const idx = replaceIdxRef.current;
    replaceIdxRef.current = null;

    if (idx != null) {
      const file = e.target.files?.[0];
      if (file) uploadOne(file, idx);
    } else {
      const remaining = maxImages - images.length;
      Array.from(e.target.files ?? [])
        .slice(0, remaining)
        .forEach((f) => uploadOne(f));
    }
    e.target.value = "";
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const remaining = maxImages - images.length;
    setErrors([]);
    replaceIdxRef.current = null;
    Array.from(e.dataTransfer.files)
      .slice(0, remaining)
      .forEach((f) => uploadOne(f));
  }

  const canAdd = images.length < maxImages && uploading.length === 0;

  return (
    <div>
      {/* Errors */}
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
            <p
              key={err}
              style={{ fontSize: 13, color: "#FF6B6B", fontFamily: "'SF Pro Text', sans-serif", margin: "2px 0" }}
            >
              {err}
            </p>
          ))}
        </div>
      )}

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12 }}>

        {/* Uploaded images */}
        {images.map((img, idx) => (
          <div key={img.url} style={{ position: "relative" }}>
            {/* paddingTop:100% forces a 1:1 box regardless of children positioning */}
            <div style={{ paddingTop: "100%" }} />

            {/* Image card — overflow:hidden gives it rounded corners */}
            <div
              style={{
                position: "absolute",
                inset: 0,
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
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />

              {/* Click-to-change overlay */}
              <button
                type="button"
                aria-label={`Change image ${idx + 1}`}
                onClick={() => {
                  replaceIdxRef.current = idx;
                  inputRef.current?.click();
                }}
                className="img-change-btn"
              >
                Change
              </button>

              {/* Main badge */}
              {idx === 0 && (
                <span
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
                    pointerEvents: "none",
                  }}
                >
                  Main
                </span>
              )}

              {/* File size (only for newly-uploaded files with known size) */}
              {img.size > 0 && (
                <span
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
                    pointerEvents: "none",
                  }}
                >
                  {(img.size / 1024).toFixed(0)} KB
                </span>
              )}
            </div>

            {/* Remove button — sibling of overflow:hidden div, so never clipped */}
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              aria-label={`Remove image ${idx + 1}`}
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                zIndex: 5,
                width: 28,
                height: 28,
                backgroundColor: "rgba(0,0,0,0.65)",
                border: "2px solid rgba(255,255,255,0.8)",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                padding: 0,
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ))}

        {/* Uploading spinners */}
        {uploading.map((name) => (
          <div key={name} style={{ position: "relative" }}>
            <div style={{ paddingTop: "100%" }} />
            <div
              style={{
                position: "absolute",
                inset: 0,
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
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                style={{ animation: "spin 0.8s linear infinite" }}
              >
                <circle cx="12" cy="12" r="9" stroke="#D70015" strokeWidth="2" strokeDasharray="40 20" />
              </svg>
              <span style={{ fontSize: 10, color: "#D70015", fontFamily: "'SF Pro Text', sans-serif" }}>
                Uploading…
              </span>
            </div>
          </div>
        ))}

        {/* Add button / drop zone */}
        {canAdd && (
          <div style={{ position: "relative" }}>
            <div style={{ paddingTop: "100%" }} />
            <div
              role="button"
              tabIndex={0}
              aria-label="Add image"
              onClick={() => {
                replaceIdxRef.current = null;
                inputRef.current?.click();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  replaceIdxRef.current = null;
                  inputRef.current?.click();
                }
              }}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              style={{
                position: "absolute",
                inset: 0,
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
                  <path
                    d="M9 2v10M4 7l5-5 5 5"
                    stroke={dragging ? "#FFFFFF" : "#86868B"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M2 14h14" stroke={dragging ? "#FFFFFF" : "#86868B"} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: "#86868B",
                  fontFamily: "'SF Pro Text', sans-serif",
                  textAlign: "center",
                  lineHeight: 1.4,
                  padding: "0 8px",
                }}
              >
                {dragging ? "Drop to upload" : "Click or drop image"}
              </span>
              <span style={{ fontSize: 10, color: "#C0C0C5", fontFamily: "'SF Pro Text', sans-serif" }}>
                JPEG · PNG · WebP · max 5 MB
              </span>
            </div>
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
        onChange={handleInputChange}
      />

      <p style={{ fontSize: 12, color: "#86868B", fontFamily: "'SF Pro Text', sans-serif", marginTop: 8 }}>
        {images.length} / {maxImages} images — first image is the main product photo
      </p>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .img-change-btn {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.45);
          border: none;
          color: #FFFFFF;
          font-size: 12px;
          font-weight: 600;
          font-family: 'SF Pro Text', sans-serif;
          cursor: pointer;
          opacity: 0;
          transition: opacity 180ms ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .img-change-btn:hover { opacity: 1; }
      `}</style>
    </div>
  );
}
