import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus, Search, Edit, EyeOff, Eye, Trash2, X, GraduationCap,
  MapPin, Calendar, Award, ChevronUp, ChevronDown,
} from "lucide-react";
import { educationService, addActivity, formatDate } from "../services/adminDataService";
import { educationApi } from "../../services/api";
import { useApiData } from "../hooks/useApiData";
import StatusBadge from "../components/StatusBadge";
import ConfirmationModal from "../components/ConfirmationModal";
import TagInput from "../components/TagInput";
import { useToast } from "../context/ToastContext";

const emptyForm = {
  degree: "", institution: "", location: "", startYear: "", endYear: "",
  grade: "", description: "", achievements: [], institutionLogo: "",
  order: 1, visible: true,
};

export default function AdminEducation() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [errors, setErrors] = useState({});

  const { data: education, setData: setEducation } = useApiData(educationApi.getAll, educationService.getAll);

  const filtered = useMemo(() => {
    let result = [...education];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((e) =>
        e.degree?.toLowerCase().includes(q) ||
        e.institution?.toLowerCase().includes(q) ||
        e.description?.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => (a.order || 0) - (b.order || 0));
    return result;
  }, [education, search]);

  const validate = () => {
    const errs = {};
    if (!form.degree.trim()) errs.degree = "Degree is required";
    if (!form.institution.trim()) errs.institution = "Institution is required";
    if (!form.startYear) errs.startYear = "Start year is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      if (editingId) {
        educationService.update(editingId, form);
        addToast("Education updated", "success");
        addActivity("Education updated", `"${form.degree}" at ${form.institution} was updated`);
      } else {
        const maxOrder = education.reduce((max, e) => Math.max(max, e.order || 0), 0);
        educationService.add({ ...form, order: form.order || maxOrder + 1 });
        addToast("Education added", "success");
        addActivity("Education added", `"${form.degree}" at ${form.institution} was added`);
      }
      setEducation(educationService.getAll());
      closeModal();
    } catch {
      addToast("Failed to save education entry", "error");
    }
    setSaving(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
  };

  const openEdit = (edu) => {
    setEditingId(edu.id);
    setForm({ ...edu, achievements: edu.achievements || [] });
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      educationService.delete(deleteTarget.id);
      setEducation(educationService.getAll());
      addToast("Education entry deleted", "success");
      addActivity("Education deleted", `"${deleteTarget.degree}" at ${deleteTarget.institution} was deleted`);
    } catch { addToast("Failed to delete education entry", "error"); }
    setDeleteTarget(null);
  };

  const handleToggleVisibility = (edu) => {
    educationService.toggleVisibility(edu.id);
    setEducation(educationService.getAll());
    addToast(edu.visible ? "Education hidden" : "Education shown", "success");
  };

  const moveItem = (edu, direction) => {
    const sorted = [...filtered].sort((a, b) => (a.order || 0) - (b.order || 0));
    const idx = sorted.findIndex((e) => e.id === edu.id);
    if (idx === -1) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const updated = education.map((e) => {
      if (e.id === sorted[idx].id) return { ...e, order: sorted[swapIdx].order };
      if (e.id === sorted[swapIdx].id) return { ...e, order: sorted[idx].order };
      return e;
    });
    setEducation(updated);
    const orderedIds = updated.sort((a, b) => (a.order || 0) - (b.order || 0)).map((e) => e.id);
    const { reorder } = educationService;
    if (reorder) reorder(orderedIds);
    setEducation(educationService.getAll());
  };

  const handleField = (field, value) => setForm({ ...form, [field]: value });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Education</h2>
          <p className="admin-page-subtitle">Manage your education ({education.length} entries)</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => { setEditingId(null); setForm(emptyForm); setModalOpen(true); setErrors({}); }}>
          <Plus size={16} /> Add Education
        </button>
      </div>

      <div className="admin-filters">
        <div className="admin-search">
          <Search size={14} className="search-icon" />
          <input type="text" placeholder="Search education..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon"><GraduationCap size={24} /></div>
            <h3>No education entries</h3>
            <p>{search ? "Try adjusting your search." : "Add your first education entry."}</p>
            {!search && (
              <button className="admin-btn admin-btn-primary" style={{ marginTop: "1rem" }} onClick={() => { setEditingId(null); setForm(emptyForm); setModalOpen(true); setErrors({}); }}>
                <Plus size={16} /> Add Education
              </button>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {filtered.map((edu) => (
            <div key={edu.id} className="admin-card" style={{
              padding: "1rem", opacity: edu.visible === false ? 0.6 : 1,
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: "10px", background: "var(--lavender)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--lavender-deep)", flexShrink: 0, overflow: "hidden" }}>
                  {edu.institutionLogo ? (
                    <img src={edu.institutionLogo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <GraduationCap size={20} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h4 style={{ fontSize: "0.9375rem", fontWeight: 600, margin: 0 }}>{edu.degree}</h4>
                      <p style={{ fontSize: "0.8125rem", color: "var(--admin-text-secondary)", margin: "2px 0 4px" }}>{edu.institution}</p>
                    </div>
                    <div className="admin-actions" style={{ gap: "0.25rem", flexShrink: 0 }}>
                      <button onClick={() => moveItem(edu, "up")} className="admin-btn admin-btn-ghost admin-btn-sm" title="Move up">
                        <ChevronUp size={14} />
                      </button>
                      <button onClick={() => moveItem(edu, "down")} className="admin-btn admin-btn-ghost admin-btn-sm" title="Move down">
                        <ChevronDown size={14} />
                      </button>
                      <button onClick={() => handleToggleVisibility(edu)} className="admin-btn admin-btn-ghost admin-btn-sm" title={edu.visible ? "Hide" : "Show"}>
                        {edu.visible ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button onClick={() => openEdit(edu)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Edit">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => setDeleteTarget(edu)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Delete" style={{ color: "var(--color-error)" }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", fontSize: "0.75rem", color: "var(--admin-text-secondary)", marginBottom: "0.5rem" }}>
                    {edu.location && (
                      <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <MapPin size={12} /> {edu.location}
                      </span>
                    )}
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <Calendar size={12} /> {edu.startYear || "?"} – {edu.endYear || "Present"}
                    </span>
                    {edu.grade && (
                      <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <Award size={12} /> {edu.grade}
                      </span>
                    )}
                    {edu.visible === false && <StatusBadge status="hidden" />}
                  </div>
                  {edu.description && (
                    <p style={{ fontSize: "0.8125rem", color: "var(--admin-text)", lineHeight: 1.5, margin: "0 0 0.5rem" }}>{edu.description}</p>
                  )}
                  {edu.achievements?.length > 0 && (
                    <div>
                      <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--admin-text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Achievements</span>
                      <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
                        {edu.achievements.map((a, i) => (
                          <span key={i} style={{ fontSize: "0.7rem", padding: "1px 8px", background: "var(--lavender)", borderRadius: 999, color: "var(--lavender-deep)" }}>{a}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          role="dialog" aria-modal="true" aria-label={editingId ? "Edit Education" : "Add Education"}
        >
          <div style={{
            background: "var(--admin-card-bg)", borderRadius: "var(--radius-md)",
            padding: "1.5rem", maxWidth: "600px", width: "100%",
            boxShadow: "var(--shadow-lg)", animation: "scaleIn 0.2s ease",
            maxHeight: "90vh", overflowY: "auto",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>{editingId ? "Edit Education" : "Add Education"}</h3>
              <button onClick={closeModal} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: "var(--admin-text-secondary)" }} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Degree <span className="required">*</span></label>
              <input className={`admin-input ${errors.degree ? "error" : ""}`} value={form.degree} onChange={(e) => handleField("degree", e.target.value)} placeholder="e.g. B.Tech in Computer Science" />
              {errors.degree && <span className="admin-error-text">{errors.degree}</span>}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Institution <span className="required">*</span></label>
                <input className={`admin-input ${errors.institution ? "error" : ""}`} value={form.institution} onChange={(e) => handleField("institution", e.target.value)} placeholder="e.g. MIT" />
                {errors.institution && <span className="admin-error-text">{errors.institution}</span>}
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Location</label>
                <input className="admin-input" value={form.location} onChange={(e) => handleField("location", e.target.value)} placeholder="e.g. Cambridge, MA" />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Start Year <span className="required">*</span></label>
                <input type="text" className={`admin-input ${errors.startYear ? "error" : ""}`} value={form.startYear} onChange={(e) => handleField("startYear", e.target.value)} placeholder="e.g. 2019" />
                {errors.startYear && <span className="admin-error-text">{errors.startYear}</span>}
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">End Year</label>
                <input type="text" className="admin-input" value={form.endYear} onChange={(e) => handleField("endYear", e.target.value)} placeholder="e.g. 2023" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Grade</label>
                <input className="admin-input" value={form.grade} onChange={(e) => handleField("grade", e.target.value)} placeholder="e.g. 8.5 CGPA" />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Description</label>
              <textarea className="admin-textarea" value={form.description} onChange={(e) => handleField("description", e.target.value)} placeholder="Brief description of your studies..." rows={3} />
            </div>

            <TagInput tags={form.achievements} onChange={(val) => handleField("achievements", val)} placeholder="Type an achievement and press Enter..." label="Achievements" />

            <div className="admin-form-group">
              <label className="admin-form-label">Institution Logo URL</label>
              <input className="admin-input" value={form.institutionLogo} onChange={(e) => handleField("institutionLogo", e.target.value)} placeholder="https://..." />
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
              <div className="admin-form-group" style={{ flex: 1 }}>
                <label className="admin-form-label">Display Order</label>
                <input type="number" className="admin-input" value={form.order} onChange={(e) => handleField("order", Number(e.target.value))} min="1" />
              </div>
              <div className="admin-form-group" style={{ paddingBottom: "0.625rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.875rem" }}>
                  <input type="checkbox" checked={form.visible} onChange={(e) => handleField("visible", e.target.checked)} />
                  Visible
                </label>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
              <button onClick={closeModal} className="admin-btn admin-btn-secondary" disabled={saving}>Cancel</button>
              <button onClick={handleSave} className="admin-btn admin-btn-primary" disabled={saving}>
                {saving ? "Saving..." : editingId ? "Update" : "Add Education"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Education"
        message={`Are you sure you want to delete "${deleteTarget?.degree}" at ${deleteTarget?.institution}? This action cannot be undone.`}
        loading={saving}
      />
    </div>
  );
}
