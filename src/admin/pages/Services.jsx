import { useState, useEffect, useMemo } from "react";
import {
  Plus, Search, Star, Edit, Trash2, Eye, EyeOff, Wrench, ChevronDown,
} from "lucide-react";
import { serviceService, formatDate, addActivity } from "../services/adminDataService";
import { serviceApi } from "../../services/api";
import { useApiData } from "../hooks/useApiData";
import { useToast } from "../context/ToastContext";
import StatusBadge from "../components/StatusBadge";
import Pagination from "../components/Pagination";
import ConfirmationModal from "../components/ConfirmationModal";
import TagInput from "../components/TagInput";

const defaultForm = {
  title: "", shortDescription: "", fullDescription: "", icon: "Wrench",
  startingPrice: "", features: [], ctaLabel: "", ctaLink: "",
  order: 0, featured: false, visible: true,
};

export default function AdminServices() {
  const { addToast } = useToast();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterFeatured, setFilterFeatured] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const perPage = 10;

  const { data: services, setData: setServices } = useApiData(serviceApi.getAll, serviceService.getAll);

  const filtered = useMemo(() => {
    let result = [...services];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((s) =>
        s.title?.toLowerCase().includes(q) ||
        s.shortDescription?.toLowerCase().includes(q)
      );
    }
    if (filterStatus === "Visible") result = result.filter((s) => s.visible);
    if (filterStatus === "Hidden") result = result.filter((s) => !s.visible);
    if (filterFeatured === "Featured") result = result.filter((s) => s.featured);
    if (filterFeatured === "Not Featured") result = result.filter((s) => !s.featured);
    if (sortBy === "newest") result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    else if (sortBy === "oldest") result.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
    else if (sortBy === "title") result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    else if (sortBy === "price") result.sort((a, b) => (a.startingPrice || 0) - (b.startingPrice || 0));
    return result;
  }, [services, search, filterStatus, filterFeatured, sortBy]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => { setPage(1); }, [search, filterStatus, filterFeatured, sortBy]);

  const openAdd = () => {
    setEditing(null);
    setForm(defaultForm);
    setModalOpen(true);
  };

  const openEdit = (service) => {
    setEditing(service);
    setForm({ ...service });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title) {
      addToast("Service title is required", "error");
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        serviceService.update(editing.id, form);
        addToast("Service updated successfully", "success");
        addActivity("Service updated", `"${form.title}" was updated`);
      } else {
        serviceService.add({ ...form, order: services.length + 1 });
        addToast("Service added successfully", "success");
        addActivity("Service added", `"${form.title}" was added`);
      }
      setServices(serviceService.getAll());
      setModalOpen(false);
    } catch {
      addToast("Failed to save service", "error");
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      serviceService.delete(deleteTarget.id);
      setServices(serviceService.getAll());
      addToast("Service deleted successfully", "success");
      addActivity("Service deleted", `"${deleteTarget.title}" was deleted`);
    } catch {
      addToast("Failed to delete service", "error");
    }
    setDeleting(false);
    setDeleteTarget(null);
  };

  const handleToggleFeatured = (s) => {
    serviceService.toggleFeatured(s.id);
    setServices(serviceService.getAll());
    addToast(s.featured ? "Unfeatured service" : "Featured service", "success");
    addActivity("Service feature toggled", `"${s.title}" was ${s.featured ? "unfeatured" : "featured"}`);
  };

  const handleToggleVisibility = (s) => {
    serviceService.toggleVisibility(s.id);
    setServices(serviceService.getAll());
    addToast(s.visible ? "Service hidden" : "Service shown", "success");
    addActivity("Service visibility toggled", `"${s.title}" was ${s.visible ? "hidden" : "shown"}`);
  };

  const iconDisplay = (iconName) => {
    return iconName || "Wrench";
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Services</h2>
          <p className="admin-page-subtitle">Manage your service offerings ({services.length} total)</p>
        </div>
        <button onClick={openAdd} className="admin-btn admin-btn-primary">
          <Plus size={16} /> Add Service
        </button>
      </div>

      <div className="admin-filters">
        <div className="admin-search">
          <Search size={14} className="search-icon" />
          <input type="text" placeholder="Search services..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="admin-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All Visibility</option>
          <option value="Visible">Visible</option>
          <option value="Hidden">Hidden</option>
        </select>
        <select className="admin-select" value={filterFeatured} onChange={(e) => setFilterFeatured(e.target.value)}>
          <option value="All">All Featured</option>
          <option value="Featured">Featured</option>
          <option value="Not Featured">Not Featured</option>
        </select>
        <select className="admin-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title">By Title</option>
          <option value="price">By Price</option>
        </select>
      </div>

      {paginated.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon"><Wrench size={24} /></div>
            <h3>No services found</h3>
            <p>{search || filterStatus !== "All" ? "Try adjusting your filters." : "Add your first service to get started."}</p>
            {!search && filterStatus === "All" && (
              <button onClick={openAdd} className="admin-btn admin-btn-primary" style={{ marginTop: "1rem" }}>
                <Plus size={16} /> Add Service
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="admin-grid admin-grid-3" style={{ marginBottom: "1.25rem" }}>
            {paginated.map((s) => (
              <div key={s.id} className="admin-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: "var(--radius-sm)",
                    background: "var(--lavender)", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    color: "var(--lavender-deep)", flexShrink: 0,
                  }}>
                    <Wrench size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--admin-text)" }}>{s.title || "Untitled"}</div>
                    <div style={{ fontSize: "0.7rem", color: "var(--light-muted)" }}>Icon: {iconDisplay(s.icon)}</div>
                  </div>
                </div>
                <p style={{ fontSize: "0.8125rem", color: "var(--admin-text-secondary)", lineHeight: 1.5, flex: 1, marginBottom: "0.75rem" }}>
                  {s.shortDescription || "No description"}
                </p>
                {s.features && s.features.length > 0 && (
                  <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                    {s.features.slice(0, 3).map((f, i) => (
                      <span key={i} style={{ fontSize: "0.7rem", padding: "1px 6px", background: "var(--admin-bg)", borderRadius: 999, color: "var(--admin-text-secondary)" }}>{f}</span>
                    ))}
                    {s.features.length > 3 && <span style={{ fontSize: "0.7rem", color: "var(--light-muted)" }}>+{s.features.length - 3}</span>}
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--lavender-deep)" }}>₹{s.startingPrice || 0}</span>
                  <span style={{ fontSize: "0.7rem", color: "var(--light-muted)" }}>starting</span>
                </div>
                <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                  {s.featured && <StatusBadge status="featured" />}
                  <StatusBadge status={s.visible ? "visible" : "hidden"} />
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--light-muted)", marginBottom: "0.5rem" }}>
                  Order: {s.order ?? "—"} &middot; {formatDate(s.createdAt)}
                </div>
                <div className="admin-actions" style={{ gap: "0.25rem", borderTop: "1px solid var(--admin-border)", paddingTop: "0.75rem" }}>
                  <button onClick={() => handleToggleFeatured(s)} className="admin-btn admin-btn-ghost admin-btn-sm" title={s.featured ? "Unfeature" : "Feature"}>
                    <Star size={14} fill={s.featured ? "var(--yellow-deep)" : "none"} color={s.featured ? "var(--yellow-deep)" : undefined} />
                  </button>
                  <button onClick={() => handleToggleVisibility(s)} className="admin-btn admin-btn-ghost admin-btn-sm" title={s.visible ? "Hide" : "Show"}>
                    {s.visible ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button onClick={() => openEdit(s)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Edit">
                    <Edit size={14} />
                  </button>
                  <button onClick={() => setDeleteTarget(s)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Delete" style={{ color: "var(--color-error)" }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}

      {modalOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
          overflow: "auto",
        }} onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div style={{
            background: "var(--admin-card-bg)", borderRadius: "var(--radius-md)",
            padding: "1.5rem", maxWidth: "640px", width: "100%",
            boxShadow: "var(--shadow-lg)", animation: "scaleIn 0.2s ease",
            maxHeight: "90vh", overflow: "auto",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 600 }}>{editing ? "Edit Service" : "Add Service"}</h3>
              <button onClick={() => setModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: "var(--admin-text-secondary)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Service Title <span className="required">*</span></label>
              <input className="admin-input" type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Web Development" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Short Description</label>
              <textarea className="admin-textarea" rows={2} value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} placeholder="Brief overview of the service" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Full Description</label>
              <textarea className="admin-textarea" rows={4} value={form.fullDescription} onChange={(e) => setForm({ ...form, fullDescription: e.target.value })} placeholder="Detailed description of the service" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Icon Name</label>
                <input className="admin-input" type="text" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} placeholder="e.g. Code, Palette, Wrench" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Starting Price (₹)</label>
                <input className="admin-input" type="number" value={form.startingPrice} onChange={(e) => setForm({ ...form, startingPrice: e.target.value })} placeholder="e.g. 5000" />
              </div>
            </div>
            <TagInput
              tags={form.features || []}
              onChange={(tags) => setForm({ ...form, features: tags })}
              placeholder="Add a feature..."
              label="Features Included"
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">CTA Label</label>
                <input className="admin-input" type="text" value={form.ctaLabel} onChange={(e) => setForm({ ...form, ctaLabel: e.target.value })} placeholder="e.g. Get Started" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">CTA Link</label>
                <input className="admin-input" type="text" value={form.ctaLink} onChange={(e) => setForm({ ...form, ctaLink: e.target.value })} placeholder="e.g. /contact" />
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Display Order</label>
              <input className="admin-input" type="number" value={form.order ?? 0} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
            </div>
            <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.25rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", cursor: "pointer" }}>
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                Featured
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", cursor: "pointer" }}>
                <input type="checkbox" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })} />
                Visible
              </label>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", borderTop: "1px solid var(--admin-border)", paddingTop: "1rem" }}>
              <button onClick={() => setModalOpen(false)} className="admin-btn admin-btn-secondary" disabled={saving}>Cancel</button>
              <button onClick={handleSave} className="admin-btn admin-btn-primary" disabled={saving}>
                {saving ? "Saving..." : editing ? "Update Service" : "Add Service"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Service"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        loading={deleting}
      />
    </div>
  );
}
