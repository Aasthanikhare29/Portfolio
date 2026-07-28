import { useState, useEffect, useRef } from "react";
import {
  FileText, Eye, Download, Upload, Trash2, EyeOff, ExternalLink,
} from "lucide-react";
import { portfolioStorageService, addActivity } from "../services/adminDataService";
import ConfirmationModal from "../components/ConfirmationModal";
import { useToast } from "../context/ToastContext";

export default function AdminResume() {
  const { addToast } = useToast();
  const fileInputRef = useRef(null);
  const [resume, setResume] = useState(null);
  const [removing, setRemoving] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setResume({ ...portfolioStorageService.getResume() });
  }, []);

  if (!resume) return <div className="admin-loading"><div className="admin-spinner" /></div>;

  const handleVisibilityToggle = () => {
    const updated = { ...resume, visible: !resume.visible };
    portfolioStorageService.updateResume(updated);
    setResume(updated);
    addToast(`Resume ${updated.visible ? "visible" : "hidden"}`, "success");
    addActivity("Resume visibility changed", `Resume is now ${updated.visible ? "visible" : "hidden"}`);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      addToast("Please upload a PDF file", "error");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      addToast("File must be under 5MB", "error");
      return;
    }
    setUploading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const fileUrl = ev.target.result;
      const updated = {
        ...resume,
        fileName: file.name,
        fileSize: (file.size / 1024).toFixed(0) + " KB",
        fileUrl,
        uploadDate: new Date().toISOString(),
      };
      portfolioStorageService.updateResume(updated);
      setResume(updated);
      addToast("Resume uploaded successfully", "success");
      addActivity("Resume updated", `New resume uploaded: ${file.name}`);
      setUploading(false);
    };
    reader.onerror = () => {
      addToast("Failed to read file", "error");
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    const updated = { ...resume, fileName: "", fileSize: "", fileUrl: "", uploadDate: "" };
    portfolioStorageService.updateResume(updated);
    setResume(updated);
    addToast("Resume removed", "success");
    addActivity("Resume removed", "Resume file was removed");
    setRemoving(false);
    setShowRemoveConfirm(false);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try { return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }); }
    catch { return dateStr; }
  };

  const hasFile = resume.fileUrl;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Resume</h2>
          <p className="admin-page-subtitle">Manage your downloadable resume</p>
        </div>
      </div>

      <div className="admin-card" style={{ maxWidth: "600px" }}>
        <div className="admin-card-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FileText size={18} style={{ color: "var(--lavender-deep)" }} />
            <h3 className="admin-card-title">Current Resume</h3>
          </div>
          <label className="admin-toggle" title={resume.visible ? "Visible" : "Hidden"}>
            <input type="checkbox" checked={resume.visible} onChange={handleVisibilityToggle} />
            <span className="admin-toggle-slider" />
          </label>
        </div>

        {hasFile ? (
          <div>
            <div style={{
              display: "flex", alignItems: "center", gap: "1rem",
              padding: "1rem", background: "var(--admin-bg)", borderRadius: "var(--radius-sm)",
              marginBottom: "1rem",
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: "var(--radius-sm)",
                background: "var(--lavender)", display: "flex", alignItems: "center",
                justifyContent: "center", color: "var(--lavender-deep)", flexShrink: 0,
              }}>
                <FileText size={22} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--admin-text)" }}>{resume.fileName}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--admin-text-secondary)", marginTop: "2px" }}>
                  {resume.fileSize} &middot; Uploaded {formatDate(resume.uploadDate)}
                </div>
              </div>
            </div>

            <div className="admin-actions">
              <a href={resume.fileUrl} target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn-secondary admin-btn-sm">
                <Eye size={14} /> Preview
              </a>
              <a href={resume.fileUrl} download={resume.fileName} className="admin-btn admin-btn-secondary admin-btn-sm">
                <Download size={14} /> Download
              </a>
              <button onClick={() => fileInputRef.current?.click()} className="admin-btn admin-btn-secondary admin-btn-sm" disabled={uploading}>
                <Upload size={14} /> {uploading ? "Uploading..." : "Replace"}
              </button>
              <button onClick={() => setShowRemoveConfirm(true)} className="admin-btn admin-btn-danger admin-btn-sm" style={{ marginLeft: "auto" }}>
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="admin-empty" style={{ padding: "1.5rem" }}>
              <div className="admin-empty-icon">
                <FileText size={24} />
              </div>
              <h3>No resume uploaded</h3>
              <p style={{ fontSize: "0.8125rem" }}>Upload a PDF resume to make it available for download.</p>
              <button onClick={() => fileInputRef.current?.click()} className="admin-btn admin-btn-primary" style={{ marginTop: "1rem" }}>
                <Upload size={16} /> Upload Resume
              </button>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
      </div>

      <ConfirmationModal
        isOpen={showRemoveConfirm}
        onClose={() => setShowRemoveConfirm(false)}
        onConfirm={handleRemove}
        title="Remove Resume"
        message="Are you sure you want to remove the resume? This action cannot be undone."
        confirmLabel="Remove"
        loading={removing}
      />
    </div>
  );
}
