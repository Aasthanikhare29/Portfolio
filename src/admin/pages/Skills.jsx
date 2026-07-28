import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus, Search, Edit, Eye, EyeOff, Trash2, ChevronUp, ChevronDown,
  Star, X, GripVertical, Code, Layout, Monitor, Code2, FileJson,
  Paintbrush, Palette, Pen, MousePointer, Smartphone, Layers,
  GitBranch, Terminal, Zap, MessageSquare, Brain, Sparkles,
} from "lucide-react";
import { skillService, addActivity } from "../services/adminDataService";
import { skillApi } from "../../services/api";
import { useApiData } from "../hooks/useApiData";
import StatusBadge from "../components/StatusBadge";
import ConfirmationModal from "../components/ConfirmationModal";
import { useToast } from "../context/ToastContext";

const CATEGORIES = ["Frontend", "UI/UX", "Tools", "Soft Skills"];
const ICON_MAP = {
  Code, Layout, Monitor, Code2, FileJson, Paintbrush, Palette,
  Pen, MousePointer, Smartphone, Layers, GitBranch, Terminal,
  Zap, MessageSquare, Brain, Sparkles,
};
const COMMON_ICONS = ["Code", "Layout", "Monitor", "Code2", "FileJson", "Paintbrush", "Palette", "Pen", "MousePointer", "Smartphone", "Layers", "GitBranch", "Terminal", "Zap", "MessageSquare", "Brain", "Sparkles"];

const emptyForm = {
  name: "", category: "Frontend", proficiency: 80, icon: "Code",
  order: 1, featured: false, visible: true,
};

export default function AdminSkills() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [errors, setErrors] = useState({});

  const { data: skills, setData: setSkills, loading } = useApiData(skillApi.getAll, skillService.getAll);

  const grouped = useMemo(() => {
    let filtered = skills;
    if (search) {
      const q = search.toLowerCase();
      filtered = skills.filter((s) => s.name?.toLowerCase().includes(q) || s.category?.toLowerCase().includes(q));
    }
    const groups = {};
    CATEGORIES.forEach((cat) => { groups[cat] = []; });
    filtered.forEach((s) => {
      const cat = s.category || "Frontend";
      if (groups[cat]) groups[cat].push(s);
      else groups[cat] = [s];
    });
    Object.keys(groups).forEach((cat) => {
      groups[cat].sort((a, b) => (a.order || 0) - (b.order || 0));
    });
    return groups;
  }, [skills, search]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (form.proficiency < 0 || form.proficiency > 100) errs.proficiency = "Must be 0-100";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      if (editingId) {
        skillService.update(editingId, form);
        addToast("Skill updated", "success");
        addActivity("Skill updated", `"${form.name}" was updated`);
      } else {
        const maxOrder = skills
          .filter((s) => s.category === form.category)
          .reduce((max, s) => Math.max(max, s.order || 0), 0);
        skillService.add({ ...form, order: form.order || maxOrder + 1 });
        addToast("Skill added", "success");
        addActivity("Skill added", `"${form.name}" was added`);
      }
      setSkills(skillService.getAll());
      closeModal();
    } catch {
      addToast("Failed to save skill", "error");
    }
    setSaving(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
  };

  const openEdit = (skill) => {
    setEditingId(skill.id);
    setForm({ ...skill });
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      skillService.delete(deleteTarget.id);
      setSkills(skillService.getAll());
      addToast("Skill deleted", "success");
      addActivity("Skill deleted", `"${deleteTarget.name}" was deleted`);
    } catch { addToast("Failed to delete skill", "error"); }
    setDeleteTarget(null);
  };

  const handleToggleVisibility = (skill) => {
    skillService.toggleVisibility(skill.id);
    setSkills(skillService.getAll());
    addToast(skill.visible ? "Skill hidden" : "Skill shown", "success");
  };

  const handleToggleFeatured = (skill) => {
    skillService.toggleFeatured(skill.id);
    setSkills(skillService.getAll());
    addToast(skill.featured ? "Removed featured" : "Marked featured", "success");
  };

  const moveSkill = (skill, direction) => {
    const cat = skill.category || "Frontend";
    const catSkills = grouped[cat].filter((s) => s.visible !== undefined ? true : true);
    const sorted = [...catSkills].sort((a, b) => (a.order || 0) - (b.order || 0));
    const idx = sorted.findIndex((s) => s.id === skill.id);
    if (idx === -1) return;
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;
    const orders = skills.map((s) => {
      if (s.id === sorted[idx].id) return { ...s, order: sorted[swapIdx].order };
      if (s.id === sorted[swapIdx].id) return { ...s, order: sorted[idx].order };
      return s;
    });
    const orderedIds = orders.sort((a, b) => (a.order || 0) - (b.order || 0)).map((s) => s.id);
    skillService.reorder(orderedIds);
    setSkills(skillService.getAll());
  };

  const renderForm = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div className="admin-form-group">
        <label className="admin-form-label">Skill Name</label>
        <input
          className={`admin-input ${errors.name ? "error" : ""}`}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="e.g. React"
        />
        {errors.name && <span className="admin-error-text">{errors.name}</span>}
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Category</label>
        <select className="admin-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Proficiency ({form.proficiency}%)</label>
        <input
          type="range" min="0" max="100" value={form.proficiency}
          onChange={(e) => setForm({ ...form, proficiency: Number(e.target.value) })}
          style={{ width: "100%", accentColor: "var(--lavender-deep)" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--admin-text-secondary)" }}>
          <span>0</span><span>100</span>
        </div>
      </div>
      <div className="admin-form-group">
        <label className="admin-form-label">Icon</label>
        <select className="admin-select" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}>
          {COMMON_ICONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
        </select>
        <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {COMMON_ICONS.slice(0, 8).map((ic) => {
            const IconComp = ICON_MAP[ic];
            return (
              <button
                key={ic}
                type="button"
                onClick={() => setForm({ ...form, icon: ic })}
                style={{
                  padding: "0.375rem", borderRadius: "6px", border: `1.5px solid ${form.icon === ic ? "var(--lavender-deep)" : "var(--admin-border)"}`,
                  background: form.icon === ic ? "var(--lavender)" : "transparent", cursor: "pointer", display: "flex",
                  color: form.icon === ic ? "var(--lavender-deep)" : "var(--admin-text-secondary)",
                }}
                title={ic}
              >
                {IconComp ? <IconComp size={18} /> : <Code size={18} />}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <div className="admin-form-group" style={{ flex: 1 }}>
          <label className="admin-form-label">Display Order</label>
          <input type="number" className="admin-input" value={form.order} onChange={(e) => setForm({ ...form, order: Number(e.target.value) })} min="1" />
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "1.5rem", paddingBottom: "1.25rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.875rem" }}>
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            Featured
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", fontSize: "0.875rem" }}>
            <input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} />
            Visible
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Skills</h2>
          <p className="admin-page-subtitle">Manage your skills ({skills.length} total)</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => { setEditingId(null); setForm(emptyForm); setModalOpen(true); setErrors({}); }}>
          <Plus size={16} /> Add Skill
        </button>
      </div>

      <div className="admin-filters">
        <div className="admin-search">
          <Search size={14} className="search-icon" />
          <input type="text" placeholder="Search skills..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {skills.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon"><Code size={24} /></div>
            <h3>No skills yet</h3>
            <p>Add your first skill to get started.</p>
            <button className="admin-btn admin-btn-primary" style={{ marginTop: "1rem" }} onClick={() => { setEditingId(null); setForm(emptyForm); setModalOpen(true); setErrors({}); }}>
              <Plus size={16} /> Add Skill
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {CATEGORIES.map((category) => {
            const catSkills = grouped[category] || [];
            if (search && catSkills.length === 0) return null;
            return (
              <div key={category} className="admin-card">
                <div className="admin-card-header">
                  <h3 className="admin-card-title">{category} <span style={{ fontSize: "0.8125rem", color: "var(--admin-text-secondary)", fontWeight: 400 }}>({catSkills.length})</span></h3>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.75rem" }}>
                  {catSkills.map((skill) => {
                    const IconComp = ICON_MAP[skill.icon] || Code;
                    return (
                      <div
                        key={skill.id}
                        style={{
                          border: "1px solid var(--admin-border)", borderRadius: "var(--radius-sm)",
                          padding: "0.75rem", background: "var(--admin-card-bg)",
                          display: "flex", flexDirection: "column", gap: "0.5rem",
                          opacity: skill.visible === false ? 0.6 : 1,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <div style={{ width: 32, height: 32, borderRadius: "8px", background: "var(--lavender)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--lavender-deep)", flexShrink: 0 }}>
                              <IconComp size={16} />
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{skill.name}</div>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                                {skill.featured && <StatusBadge status="featured" />}
                                {skill.visible === false && <StatusBadge status="hidden" />}
                              </div>
                            </div>
                          </div>
                          <div className="admin-actions" style={{ gap: "0.125rem" }}>
                            <button onClick={() => moveSkill(skill, "up")} className="admin-btn admin-btn-ghost admin-btn-sm" title="Move up" style={{ padding: "0.25rem" }}>
                              <ChevronUp size={14} />
                            </button>
                            <button onClick={() => moveSkill(skill, "down")} className="admin-btn admin-btn-ghost admin-btn-sm" title="Move down" style={{ padding: "0.25rem" }}>
                              <ChevronDown size={14} />
                            </button>
                            <button onClick={() => handleToggleVisibility(skill)} className="admin-btn admin-btn-ghost admin-btn-sm" title={skill.visible ? "Hide" : "Show"} style={{ padding: "0.25rem" }}>
                              {skill.visible ? <EyeOff size={14} /> : <Eye size={14} />}
                            </button>
                            <button onClick={() => handleToggleFeatured(skill)} className="admin-btn admin-btn-ghost admin-btn-sm" title={skill.featured ? "Unfeature" : "Feature"} style={{ padding: "0.25rem", color: skill.featured ? "var(--lavender-deep)" : undefined }}>
                              <Star size={14} />
                            </button>
                            <button onClick={() => openEdit(skill)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Edit" style={{ padding: "0.25rem" }}>
                              <Edit size={14} />
                            </button>
                            <button onClick={() => setDeleteTarget(skill)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Delete" style={{ padding: "0.25rem", color: "var(--color-error)" }}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <div style={{ flex: 1, height: 6, borderRadius: 999, background: "var(--admin-border)", overflow: "hidden" }}>
                            <div style={{ width: `${skill.proficiency || 0}%`, height: "100%", borderRadius: 999, background: "var(--lavender-deep)", transition: "width 0.3s ease" }} />
                          </div>
                          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--admin-text-secondary)", minWidth: "2rem", textAlign: "right" }}>{skill.proficiency || 0}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {modalOpen && (
        <div
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          role="dialog" aria-modal="true" aria-label={editingId ? "Edit Skill" : "Add Skill"}
        >
          <div style={{
            background: "var(--admin-card-bg)", borderRadius: "var(--radius-md)",
            padding: "1.5rem", maxWidth: "520px", width: "100%",
            boxShadow: "var(--shadow-lg)", animation: "scaleIn 0.2s ease",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>{editingId ? "Edit Skill" : "Add Skill"}</h3>
              <button onClick={closeModal} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: "var(--admin-text-secondary)" }} aria-label="Close">
                <X size={18} />
              </button>
            </div>
            {renderForm()}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1.5rem" }}>
              <button onClick={closeModal} className="admin-btn admin-btn-secondary" disabled={saving}>Cancel</button>
              <button onClick={handleSave} className="admin-btn admin-btn-primary" disabled={saving}>
                {saving ? "Saving..." : editingId ? "Update Skill" : "Add Skill"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Skill"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
