import { useRef, useState } from "react";
import { Upload, X, Image, Loader } from "lucide-react";
import { uploadApi } from "../../services/api";

export default function ImageUploader({ value, onChange, label, aspectRatio = "16/9", maxSizeMB = 2, uploadDir }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(value || "");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file) => {
    setError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Image must be under ${maxSizeMB}MB.`);
      return;
    }

    if (uploadDir) {
      setUploading(true);
      try {
        const result = await uploadApi.upload(file, uploadDir);
        const url = result?.url || result;
        setPreview(url);
        onChange(url);
      } catch {
        setError("Upload failed. Using local preview instead.");
        fallbackPreview(file);
      } finally {
        setUploading(false);
      }
    } else {
      fallbackPreview(file);
    }
  };

  const fallbackPreview = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      onChange(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleUrlInput = (e) => {
    const url = e.target.value;
    setPreview(url);
    onChange(url);
  };

  return (
    <div className="admin-form-group">
      {label && <label className="admin-form-label">{label}</label>}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => !uploading && inputRef.current?.click()}
        style={{
          border: `1.5px dashed ${error ? "var(--color-error)" : "var(--admin-border)"}`,
          borderRadius: "var(--radius-sm)", padding: preview ? "0.5rem" : "1.5rem",
          cursor: uploading ? "wait" : "pointer", transition: "var(--transition-fast)",
          background: "var(--admin-bg)", textAlign: "center",
          aspectRatio, display: "flex", alignItems: "center", justifyContent: "center",
          overflow: "hidden", position: "relative", opacity: uploading ? 0.7 : 1,
        }}
        onMouseEnter={(e) => { if (!preview) e.currentTarget.style.borderColor = "var(--lavender-deep)"; }}
        onMouseLeave={(e) => { if (!preview) e.currentTarget.style.borderColor = "var(--admin-border)"; }}
      >
        {uploading ? (
          <div>
            <Loader size={24} className="admin-spinner" style={{ marginBottom: "0.5rem" }} />
            <p style={{ fontSize: "0.8125rem", color: "var(--admin-text-secondary)" }}>Uploading...</p>
          </div>
        ) : preview ? (
          <>
            <img src={preview} alt="Preview" style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: "4px" }} onError={() => setError("Invalid image URL")} />
            <button onClick={(e) => { e.stopPropagation(); handleRemove(); }} style={{
              position: "absolute", top: "0.5rem", right: "0.5rem",
              width: 28, height: 28, borderRadius: "50%", border: "none",
              background: "rgba(0,0,0,0.5)", color: "white", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }} aria-label="Remove image">
              <X size={14} />
            </button>
          </>
        ) : (
          <div>
            <Upload size={24} style={{ color: "var(--admin-text-secondary)", marginBottom: "0.5rem" }} />
            <p style={{ fontSize: "0.8125rem", color: "var(--admin-text-secondary)" }}>
              Click or drag to upload
            </p>
            <p style={{ fontSize: "0.7rem", color: "var(--light-muted)", marginTop: "0.25rem" }}>
              PNG, JPG, GIF up to {maxSizeMB}MB
            </p>
          </div>
        )}
      </div>
      {error && <span className="admin-error-text">{error}</span>}
      <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} style={{ display: "none" }} />
      <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <Image size={14} style={{ color: "var(--admin-text-secondary)", flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Or paste image URL..."
          value={typeof value === "string" && value.startsWith("http") ? value : ""}
          onChange={handleUrlInput}
          style={{
            flex: 1, padding: "0.4rem 0.625rem", fontSize: "0.8125rem",
            border: "1px solid var(--admin-border)", borderRadius: "var(--radius-sm)",
            outline: "none", fontFamily: "var(--font-body)",
          }}
        />
      </div>
    </div>
  );
}
