import { useState, useEffect } from "react";
import {
  Plus, Edit, Trash2, Eye, EyeOff, ChevronUp, ChevronDown, Link, Globe,
} from "lucide-react";
import { portfolioStorageService, addActivity } from "../services/adminDataService";
import ConfirmationModal from "../components/ConfirmationModal";
import { useToast } from "../context/ToastContext";

const emptyLink = { platform: "", url: "", icon: "", order: 1, visible: true };

export default function AdminSocialLinks() {
  const { addToast } = useToast();
  const [links, setLinks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(emptyLink);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLinks(portfolioStorageService.getSocialLinks());
  }, []);

  const handleOpenAdd = () => {
    const maxOrder = links.length > 0 ? Math.max(...links.map((l) => l.order)) : 0;
    setForm({ ...emptyLink, order: maxOrder + 1 });
    setEditTarget(null);
    setErrors({});
    setModalOpen(true);
  };

  const handleOpenEdit = (link) => {
    setForm({ ...link });
    setEditTarget(link);
    setErrors({});
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditTarget(null);
    setForm(emptyLink);
    setErrors({});
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.platform.trim()) errs.platform = "Platform name is required";
    if (!form.url.trim()) errs.url = "URL is required";
    else if (!/^https?:\/\/.+/.test(form.url) && !form.url.startsWith("mailto:")) errs.url = "Must be a valid URL";
    if (!form.order || form.order < 1) errs.order = "Order must be at least 1";
    return errs;
  };

  const handleSave = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSaving(true);
    setTimeout(() => {
      if (editTarget) {
        portfolioStorageService.updateSocialLink(editTarget.id, form);
        addToast("Social link updated", "success");
        addActivity("Social link updated", `"${form.platform}" was updated`);
      } else {
        portfolioStorageService.addSocialLink(form);
        addToast("Social link added", "success");
        addActivity("Social link added", `"${form.platform}" was added`);
      }
      setLinks(portfolioStorageService.getSocialLinks());
      setSaving(false);
      handleCloseModal();
    }, 500);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setDeleting(true);
    setTimeout(() => {
      portfolioStorageService.deleteSocialLink(deleteTarget.id);
      setLinks(portfolioStorageService.getSocialLinks());
      addToast("Social link deleted", "success");
      addActivity("Social link deleted", `"${deleteTarget.platform}" was deleted`);
      setDeleting(false);
      setDeleteTarget(null);
    }, 500);
  };

  const handleToggleVisibility = (link) => {
    portfolioStorageService.updateSocialLink(link.id, { visible: !link.visible });
    setLinks(portfolioStorageService.getSocialLinks());
    addToast(link.visible ? "Link hidden" : "Link visible", "success");
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const reordered = [...links];
    [reordered[index - 1], reordered[index]] = [reordered[index], reordered[index - 1]];
    reordered.forEach((l, i) => { l.order = i + 1; });
    portfolioStorageService.updateSocialLinks(reordered);
    setLinks([...reordered]);
  };

  const handleMoveDown = (index) => {
    if (index === links.length - 1) return;
    const reordered = [...links];
    [reordered[index], reordered[index + 1]] = [reordered[index + 1], reordered[index]];
    reordered.forEach((l, i) => { l.order = i + 1; });
    portfolioStorageService.updateSocialLinks(reordered);
    setLinks([...reordered]);
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Social Links</h2>
          <p className="admin-page-subtitle">Manage your social media and external links ({links.length} total)</p>
        </div>
        <button onClick={handleOpenAdd} className="admin-btn admin-btn-primary">
          <Plus size={16} /> Add Link
        </button>
      </div>

      {links.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon"><Globe size={24} /></div>
            <h3>No social links</h3>
            <p>Add your social media links to display on your portfolio.</p>
            <button onClick={handleOpenAdd} className="admin-btn admin-btn-primary" style={{ marginTop: "1rem" }}>
              <Plus size={16} /> Add Link
            </button>
          </div>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th>Platform</th>
                <th>URL</th>
                <th>Icon</th>
                <th>Order</th>
                <th>Visible</th>
                <th style={{ width: 180 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link, index) => (
                <tr key={link.id}>
                  <td style={{ color: "var(--admin-text-secondary)" }}>{index + 1}</td>
                  <td style={{ fontWeight: 500 }}>{link.platform}</td>
                  <td style={{ maxWidth: 250, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--lavender-deep)", textDecoration: "none", fontSize: "0.8125rem" }}>
                      {link.url}
                    </a>
                  </td>
                  <td style={{ fontFamily: "monospace", fontSize: "0.8125rem", color: "var(--admin-text-secondary)" }}>{link.icon || "—"}</td>
                  <td>{link.order}</td>
                  <td>
                    <label className="admin-toggle">
                      <input type="checkbox" checked={link.visible} onChange={() => handleToggleVisibility(link)} />
                      <span className="admin-toggle-slider" />
                    </label>
                  </td>
                  <td>
                    <div className="admin-actions" style={{ gap: "0.25rem" }}>
                      <button onClick={() => handleMoveUp(index)} disabled={index === 0} className="admin-btn admin-btn-ghost admin-btn-sm" title="Move up">
                        <ChevronUp size={14} />
                      </button>
                      <button onClick={() => handleMoveDown(index)} disabled={index === links.length - 1} className="admin-btn admin-btn-ghost admin-btn-sm" title="Move down">
                        <ChevronDown size={14} />
                      </button>
                      <button onClick={() => handleOpenEdit(link)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Edit">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => setDeleteTarget(link)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Delete" style={{ color: "var(--color-error)" }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) handleCloseModal(); }}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
          }}
          role="dialog" aria-modal="true" aria-label={editTarget ? "Edit Social Link" : "Add Social Link"}
        >
          <div style={{
            background: "var(--admin-card-bg)", borderRadius: "var(--radius-md)",
            padding: "1.5rem", maxWidth: "480px", width: "100%",
            boxShadow: "var(--shadow-lg)", animation: "scaleIn 0.2s ease",
          }}>
            <div className="admin-card-header">
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Link size={18} style={{ color: "var(--lavender-deep)" }} />
                <h3 className="admin-card-title">{editTarget ? "Edit Social Link" : "Add Social Link"}</h3>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Platform <span className="required">*</span></label>
              <input className={`admin-input ${errors.platform ? "error" : ""}`} type="text" value={form.platform} onChange={(e) => handleChange("platform", e.target.value)} placeholder="e.g., GitHub, LinkedIn" />
              {errors.platform && <span className="admin-error-text">{errors.platform}</span>}
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">URL <span className="required">*</span></label>
              <input className={`admin-input ${errors.url ? "error" : ""}`} type="url" value={form.url} onChange={(e) => handleChange("url", e.target.value)} placeholder="https://..." />
              {errors.url && <span className="admin-error-text">{errors.url}</span>}
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Icon Name</label>
              <input className="admin-input" type="text" value={form.icon} onChange={(e) => handleChange("icon", e.target.value)} placeholder="e.g., FiGithub, FiLinkedin" />
              <span className="admin-helper-text">Icon identifier used in your portfolio theme</span>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Display Order</label>
              <input className={`admin-input ${errors.order ? "error" : ""}`} type="number" min="1" value={form.order} onChange={(e) => handleChange("order", parseInt(e.target.value) || 1)} />
              {errors.order && <span className="admin-error-text">{errors.order}</span>}
            </div>

            <div className="admin-sticky-bar" style={{ marginTop: "1rem" }}>
              <button onClick={handleCloseModal} className="admin-btn admin-btn-secondary" disabled={saving}>Cancel</button>
              <button onClick={handleSave} className="admin-btn admin-btn-primary" disabled={saving}>
                {saving ? "Saving..." : editTarget ? "Update" : "Add Link"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Social Link"
        message={`Are you sure you want to delete the link to "${deleteTarget?.platform}"? This action cannot be undone.`}
        loading={deleting}
      />
    </div>
  );
}
