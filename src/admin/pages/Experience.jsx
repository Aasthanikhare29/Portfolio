import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus, Search, Edit, EyeOff, Eye, Trash2, X, Briefcase,
  MapPin, Calendar, ChevronUp, ChevronDown,
} from "lucide-react";
import { experienceService, addActivity, formatDate } from "../services/adminDataService";
import { experienceApi } from "../../services/api";
import { useApiData } from "../hooks/useApiData";
import StatusBadge from "../components/StatusBadge";
import ConfirmationModal from "../components/ConfirmationModal";
import TagInput from "../components/TagInput";
import { useToast } from "../context/ToastContext";

const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract", "Freelance", "Internship", "Trainee"];
const emptyForm = {
  role: "", company: "", companyLogo: "", employmentType: "Full-time",
  location: "", startDate: "", endDate: "", current: false,
  description: "", responsibilities: [], technologies: [],
  order: 1, visible: true,
};

export default function AdminExperience() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [errors, setErrors] = useState({});

  const { data: experiences, setData: setExperiences } = useApiData(experienceApi.getAll, experienceService.getAll);

  const filtered = useMemo(() => {
    let result = [...experiences];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((e) =>
        e.role?.toLowerCase().includes(q) ||
        e.company?.toLowerCase().includes(q) ||
        e.description?.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => (a.order || 0) - (b.order || 0));
    return result;
  }, [experiences, search]);

  const validate = () => {
    const errs = {};
    if (!form.role.trim()) errs.role = "Job title is required";
    if (!form.company.trim()) errs.company = "Company is required";
    if (!form.startDate) errs.startDate = "Start date is required";
    if (!form.current && !form.endDate) errs.endDate = "End date is required if not currently working";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const payload = { ...form, endDate: form.current ? "" : form.endDate };
      if (editingId) {
        experienceService.update(editingId, payload);
        addToast("Experience updated", "success");
        addActivity("Experience updated", `"${form.role}" at ${form.company} was updated`);
      } else {
        const maxOrder = experiences.reduce((max, e) => Math.max(max, e.order || 0), 0);
        experienceService.add({ ...payload, order: payload.order || maxOrder + 1 });
        addToast("Experience added", "success");
        addActivity("Experience added", `"${form.role}" at ${form.company} was added`);
      }
      setExperiences(experienceService.getAll());
      closeModal();
    } catch {
      addToast("Failed to save experience", "error");
    }
    setSaving(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
  };

  const openEdit = (exp) => {
    setEditingId(exp.id);
    setForm({ ...exp, responsibilities: exp.responsibilities || [], technologies: exp.technologies || [] });
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      experienceService.delete(deleteTarget.id);
      setExperiences(experienceService.getAll());
      addToast("Experience deleted", "success");
      addActivity("Experience deleted", `"${deleteTarget.role}" at ${deleteTarget.company} was deleted`);
    } catch { addToast("Failed to delete experience", "error"); }
    setDeleteTarget(null);
  };

  const handleToggleVisibility = (exp) => {
    experienceService.toggleVisibility(exp.id);
    setExperiences(experienceService.getAll());
    addToast(exp.visible ? "Experience hidden" : "Experience shown", "success");
  };

  const moveItem = (exp, direction) => {
    const sorted = [...filtered].sort((a, b) => (a.order || 0) - (b.order || 0));
    const idx = sorted.findIndex((e) => e.id === exp.id);
    if (idx === -1) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const updated = experiences.map((e) => {
      if (e.id === sorted[idx].id) return { ...e, order: sorted[swapIdx].order };
      if (e.id === sorted[swapIdx].id) return { ...e, order: sorted[idx].order };
      return e;
    });
    setExperiences(updated);
    const orderedIds = updated.sort((a, b) => (a.order || 0) - (b.order || 0)).map((e) => e.id);
    const { reorder } = experienceService;
    if (reorder) reorder(orderedIds);
    setExperiences(experienceService.getAll());
  };

  const handleField = (field, value) => setForm({ ...form, [field]: value });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Experience</h2>
          <p className="admin-page-subtitle">Manage your work experience ({experiences.length} entries)</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => { setEditingId(null); setForm(emptyForm); setModalOpen(true); setErrors({}); }}>
          <Plus size={16} /> Add Experience
        </button>
      </div>

      <div className="admin-filters">
        <div className="admin-search">
          <Search size={14} className="search-icon" />
          <input type="text" placeholder="Search experience..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon"><Briefcase size={24} /></div>
            <h3>No experience entries</h3>
            <p>{search ? "Try adjusting your search." : "Add your first work experience."}</p>
            {!search && (
              <button className="admin-btn admin-btn-primary" style={{ marginTop: "1rem" }} onClick={() => { setEditingId(null); setForm(emptyForm); setModalOpen(true); setErrors({}); }}>
                <Plus size={16} /> Add Experience
              </button>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {filtered.map((exp) => (
            <div key={exp.id} className="admin-card" style={{
              padding: "1rem", opacity: exp.visible === false ? 0.6 : 1,
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: "10px", background: "var(--lavender)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--lavender-deep)", flexShrink: 0, overflow: "hidden" }}>
                  {exp.companyLogo ? (
                    <img src={exp.companyLogo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <Briefcase size={20} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h4 style={{ fontSize: "0.9375rem", fontWeight: 600, margin: 0 }}>{exp.role}</h4>
                      <p style={{ fontSize: "0.8125rem", color: "var(--admin-text-secondary)", margin: "2px 0 4px" }}>{exp.company}</p>
                    </div>
                    <div className="admin-actions" style={{ gap: "0.25rem", flexShrink: 0 }}>
                      <button onClick={() => moveItem(exp, "up")} className="admin-btn admin-btn-ghost admin-btn-sm" title="Move up">
                        <ChevronUp size={14} />
                      </button>
                      <button onClick={() => moveItem(exp, "down")} className="admin-btn admin-btn-ghost admin-btn-sm" title="Move down">
                        <ChevronDown size={14} />
                      </button>
                      <button onClick={() => handleToggleVisibility(exp)} className="admin-btn admin-btn-ghost admin-btn-sm" title={exp.visible ? "Hide" : "Show"}>
                        {exp.visible ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button onClick={() => openEdit(exp)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Edit">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => setDeleteTarget(exp)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Delete" style={{ color: "var(--color-error)" }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", fontSize: "0.75rem", color: "var(--admin-text-secondary)", marginBottom: "0.5rem" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <Briefcase size={12} /> {exp.employmentType || "Full-time"}
                    </span>
                    {exp.location && (
                      <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <MapPin size={12} /> {exp.location}
                      </span>
                    )}
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      <Calendar size={12} /> {exp.startDate ? formatDate(exp.startDate) : "—"} – {exp.current ? "Present" : exp.endDate ? formatDate(exp.endDate) : "—"}
                    </span>
                    {exp.visible === false && <StatusBadge status="hidden" />}
                  </div>
                  {exp.description && (
                    <p style={{ fontSize: "0.8125rem", color: "var(--admin-text)", lineHeight: 1.5, margin: "0 0 0.5rem" }}>{exp.description}</p>
                  )}
                  {exp.responsibilities?.length > 0 && (
                    <div style={{ marginBottom: "0.375rem" }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--admin-text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Responsibilities</span>
                      <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
                        {exp.responsibilities.map((r, i) => (
                          <span key={i} style={{ fontSize: "0.7rem", padding: "1px 8px", background: "var(--lavender)", borderRadius: 999, color: "var(--lavender-deep)" }}>{r}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {exp.technologies?.length > 0 && (
                    <div>
                      <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--admin-text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Technologies</span>
                      <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap", marginTop: "0.25rem" }}>
                        {exp.technologies.map((t, i) => (
                          <span key={i} style={{ fontSize: "0.7rem", padding: "1px 8px", background: "var(--admin-bg)", borderRadius: 999, color: "var(--admin-text-secondary)" }}>{t}</span>
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
          role="dialog" aria-modal="true" aria-label={editingId ? "Edit Experience" : "Add Experience"}
        >
          <div style={{
            background: "var(--admin-card-bg)", borderRadius: "var(--radius-md)",
            padding: "1.5rem", maxWidth: "600px", width: "100%",
            boxShadow: "var(--shadow-lg)", animation: "scaleIn 0.2s ease",
            maxHeight: "90vh", overflowY: "auto",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>{editingId ? "Edit Experience" : "Add Experience"}</h3>
              <button onClick={closeModal} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: "var(--admin-text-secondary)" }} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Job Title <span className="required">*</span></label>
              <input className={`admin-input ${errors.role ? "error" : ""}`} value={form.role} onChange={(e) => handleField("role", e.target.value)} placeholder="e.g. UI Designer" />
              {errors.role && <span className="admin-error-text">{errors.role}</span>}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Company <span className="required">*</span></label>
                <input className={`admin-input ${errors.company ? "error" : ""}`} value={form.company} onChange={(e) => handleField("company", e.target.value)} placeholder="e.g. Acme Corp" />
                {errors.company && <span className="admin-error-text">{errors.company}</span>}
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Employment Type</label>
                <select className="admin-select" value={form.employmentType} onChange={(e) => handleField("employmentType", e.target.value)}>
                  {EMPLOYMENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Location</label>
                <input className="admin-input" value={form.location} onChange={(e) => handleField("location", e.target.value)} placeholder="e.g. San Francisco, CA" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Company Logo URL</label>
                <input className="admin-input" value={form.companyLogo} onChange={(e) => handleField("companyLogo", e.target.value)} placeholder="https://..." />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Start Date <span className="required">*</span></label>
                <input type="date" className={`admin-input ${errors.startDate ? "error" : ""}`} value={form.startDate} onChange={(e) => handleField("startDate", e.target.value)} />
                {errors.startDate && <span className="admin-error-text">{errors.startDate}</span>}
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">End Date</label>
                <input type="date" className={`admin-input ${errors.endDate ? "error" : ""}`} value={form.endDate} onChange={(e) => handleField("endDate", e.target.value)} disabled={form.current} />
                {errors.endDate && <span className="admin-error-text">{errors.endDate}</span>}
              </div>
              <div className="admin-form-group" style={{ display: "flex", alignItems: "flex-end", paddingBottom: "0.625rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.875rem" }}>
                  <input type="checkbox" checked={form.current} onChange={(e) => handleField("current", e.target.checked)} />
                  I currently work here
                </label>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Description</label>
              <textarea className="admin-textarea" value={form.description} onChange={(e) => handleField("description", e.target.value)} placeholder="Brief description of your role..." rows={3} />
            </div>

            <TagInput tags={form.responsibilities} onChange={(val) => handleField("responsibilities", val)} placeholder="Type a responsibility and press Enter..." label="Responsibilities" />

            <TagInput tags={form.technologies} onChange={(val) => handleField("technologies", val)} placeholder="Type a technology and press Enter..." label="Technologies" />

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
                {saving ? "Saving..." : editingId ? "Update" : "Add Experience"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Experience"
        message={`Are you sure you want to delete "${deleteTarget?.role}" at ${deleteTarget?.company}? This action cannot be undone.`}
        loading={saving}
      />
    </div>
  );
}
