import { useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, confirmLabel = "Delete", cancelLabel = "Cancel", variant = "danger", loading = false }) {
  const overlayRef = useRef(null);
  const confirmBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    setTimeout(() => confirmBtnRef.current?.focus(), 100);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
      }}
      role="dialog" aria-modal="true" aria-label={title}
    >
      <div style={{
        background: "var(--admin-card-bg)", borderRadius: "var(--radius-md)",
        padding: "1.5rem", maxWidth: "420px", width: "100%",
        boxShadow: "var(--shadow-lg)", animation: "scaleIn 0.2s ease",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: variant === "danger" ? "var(--color-error-light)" : "var(--lavender)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: variant === "danger" ? "var(--color-error)" : "var(--lavender-deep)",
            }}>
              <AlertTriangle size={20} />
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>{title || "Confirm Action"}</h3>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: "var(--admin-text-secondary)" }} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <p style={{ fontSize: "0.875rem", color: "var(--admin-text-secondary)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
          {message || "Are you sure you want to proceed? This action cannot be undone."}
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
          <button onClick={onClose} className="admin-btn admin-btn-secondary" disabled={loading}>{cancelLabel}</button>
          <button
            ref={confirmBtnRef}
            onClick={onConfirm}
            className={`admin-btn ${variant === "danger" ? "admin-btn-danger" : "admin-btn-primary"}`}
            disabled={loading}
          >
            {loading ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
