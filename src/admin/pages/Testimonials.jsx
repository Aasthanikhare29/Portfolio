import { useState, useEffect, useMemo } from "react";
import {
  Plus, Search, Star, Edit, Trash2, Eye, EyeOff, CheckCircle, XCircle,
  MessageSquareQuote, ChevronDown, Filter,
} from "lucide-react";
import { testimonialService, formatDate, addActivity } from "../services/adminDataService";
import { testimonialApi } from "../../services/api";
import { useApiData } from "../hooks/useApiData";
import { useToast } from "../context/ToastContext";
import StatusBadge from "../components/StatusBadge";
import Pagination from "../components/Pagination";
import ConfirmationModal from "../components/ConfirmationModal";
import ImageUploader from "../components/ImageUploader";

const defaultForm = {
  name: "", role: "", company: "", avatar: "", content: "",
  rating: 5, featured: false, approved: false, order: 0, visible: true,
};

export default function AdminTestimonials() {
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

  const { data: testimonials, setData: setTestimonials } = useApiData(testimonialApi.getAll, testimonialService.getAll);

  const filtered = useMemo(() => {
    let result = [...testimonials];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((t) =>
        t.name?.toLowerCase().includes(q) ||
        t.company?.toLowerCase().includes(q) ||
        t.content?.toLowerCase().includes(q)
      );
    }
    if (filterStatus === "Approved") result = result.filter((t) => t.approved);
    if (filterStatus === "Pending") result = result.filter((t) => !t.approved);
    if (filterFeatured === "Featured") result = result.filter((t) => t.featured);
    if (filterFeatured === "Not Featured") result = result.filter((t) => !t.featured);
    if (sortBy === "newest") result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    else if (sortBy === "oldest") result.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
    else if (sortBy === "name") result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    else if (sortBy === "rating") result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return result;
  }, [testimonials, search, filterStatus, filterFeatured, sortBy]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  useEffect(() => { setPage(1); }, [search, filterStatus, filterFeatured, sortBy]);

  const openAdd = () => {
    setEditing(null);
    setForm(defaultForm);
    setModalOpen(true);
  };

  const openEdit = (testimonial) => {
    setEditing(testimonial);
    setForm({ ...testimonial });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.content) {
      addToast("Name and testimonial content are required", "error");
      return;
    }
    setSaving(true);
    try {
      if (editing) {
        testimonialService.update(editing.id, form);
        addToast("Testimonial updated successfully", "success");
        addActivity("Testimonial updated", `"${form.name}" was updated`);
      } else {
        testimonialService.add({ ...form, order: testimonials.length + 1 });
        addToast("Testimonial added successfully", "success");
        addActivity("Testimonial added", `"${form.name}" was added`);
      }
      setTestimonials(testimonialService.getAll());
      setModalOpen(false);
    } catch {
      addToast("Failed to save testimonial", "error");
    }
    setSaving(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      testimonialService.delete(deleteTarget.id);
      setTestimonials(testimonialService.getAll());
      addToast("Testimonial deleted successfully", "success");
      addActivity("Testimonial deleted", `"${deleteTarget.name}" was deleted`);
    } catch {
      addToast("Failed to delete testimonial", "error");
    }
    setDeleting(false);
    setDeleteTarget(null);
  };

  const handleToggleFeatured = (t) => {
    testimonialService.toggleFeatured(t.id);
    setTestimonials(testimonialService.getAll());
    addToast(t.featured ? "Unfeatured testimonial" : "Featured testimonial", "success");
    addActivity("Testimonial feature toggled", `"${t.name}" was ${t.featured ? "unfeatured" : "featured"}`);
  };

  const handleToggleVisibility = (t) => {
    testimonialService.toggleVisibility(t.id);
    setTestimonials(testimonialService.getAll());
    addToast(t.visible ? "Testimonial hidden" : "Testimonial shown", "success");
    addActivity("Testimonial visibility toggled", `"${t.name}" was ${t.visible ? "hidden" : "shown"}`);
  };

  const handleApprove = (t) => {
    testimonialService.approve(t.id);
    setTestimonials(testimonialService.getAll());
    addToast("Testimonial approved", "success");
    addActivity("Testimonial approved", `"${t.name}" was approved`);
  };

  const handleReject = (t) => {
    testimonialService.reject(t.id);
    setTestimonials(testimonialService.getAll());
    addToast("Testimonial rejected", "success");
    addActivity("Testimonial rejected", `"${t.name}" was rejected`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={12} fill={i < rating ? "var(--yellow-deep)" : "none"} color={i < rating ? "var(--yellow-deep)" : "var(--admin-border)"} />
    ));
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Testimonials</h2>
          <p className="admin-page-subtitle">Manage client testimonials ({testimonials.length} total)</p>
        </div>
        <button onClick={openAdd} className="admin-btn admin-btn-primary">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      <div className="admin-filters">
        <div className="admin-search">
          <Search size={14} className="search-icon" />
          <input type="text" placeholder="Search testimonials..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="admin-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
        </select>
        <select className="admin-select" value={filterFeatured} onChange={(e) => setFilterFeatured(e.target.value)}>
          <option value="All">All Featured</option>
          <option value="Featured">Featured</option>
          <option value="Not Featured">Not Featured</option>
        </select>
        <select className="admin-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name">By Name</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {paginated.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon"><MessageSquareQuote size={24} /></div>
            <h3>No testimonials found</h3>
            <p>{search || filterStatus !== "All" ? "Try adjusting your filters." : "Add your first testimonial to get started."}</p>
            {!search && filterStatus === "All" && (
              <button onClick={openAdd} className="admin-btn admin-btn-primary" style={{ marginTop: "1rem" }}>
                <Plus size={16} /> Add Testimonial
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="admin-grid admin-grid-3" style={{ marginBottom: "1.25rem" }}>
            {paginated.map((t) => (
              <div key={t.id} className="admin-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%", overflow: "hidden",
                    background: "var(--admin-bg)", flexShrink: 0,
                  }}>
                    {t.avatar ? (
                      <img src={t.avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--lavender)", color: "var(--lavender-deep)", fontWeight: 600, fontSize: "1rem" }}>
                        {t.name?.charAt(0) || "?"}
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--admin-text)" }}>{t.name || "Unknown"}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--admin-text-secondary)" }}>
                      {[t.role, t.company].filter(Boolean).join(" at ") || "—"}
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: "0.5rem" }}>{renderStars(t.rating || 0)}</div>
                <p style={{ fontSize: "0.8125rem", color: "var(--admin-text-secondary)", lineHeight: 1.5, flex: 1, marginBottom: "0.75rem" }}>
                  {(t.content || "").length > 120 ? t.content.slice(0, 120) + "..." : t.content || "No content"}
                </p>
                <div style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                  <StatusBadge status={t.approved ? "approved" : "pending"} />
                  {t.featured && <StatusBadge status="featured" />}
                  <StatusBadge status={t.visible ? "visible" : "hidden"} />
                </div>
                <div style={{ fontSize: "0.7rem", color: "var(--light-muted)", marginBottom: "0.5rem" }}>
                  Order: {t.order ?? "—"} &middot; {formatDate(t.createdAt)}
                </div>
                <div className="admin-actions" style={{ gap: "0.25rem", borderTop: "1px solid var(--admin-border)", paddingTop: "0.75rem" }}>
                  {!t.approved ? (
                    <button onClick={() => handleApprove(t)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Approve" style={{ color: "var(--mint-deep)" }}>
                      <CheckCircle size={14} />
                    </button>
                  ) : (
                    <button onClick={() => handleReject(t)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Reject" style={{ color: "var(--color-error)" }}>
                      <XCircle size={14} />
                    </button>
                  )}
                  <button onClick={() => handleToggleFeatured(t)} className="admin-btn admin-btn-ghost admin-btn-sm" title={t.featured ? "Unfeature" : "Feature"}>
                    <Star size={14} fill={t.featured ? "var(--yellow-deep)" : "none"} color={t.featured ? "var(--yellow-deep)" : undefined} />
                  </button>
                  <button onClick={() => handleToggleVisibility(t)} className="admin-btn admin-btn-ghost admin-btn-sm" title={t.visible ? "Hide" : "Show"}>
                    {t.visible ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button onClick={() => openEdit(t)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Edit">
                    <Edit size={14} />
                  </button>
                  <button onClick={() => setDeleteTarget(t)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Delete" style={{ color: "var(--color-error)" }}>
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
            padding: "1.5rem", maxWidth: "600px", width: "100%",
            boxShadow: "var(--shadow-lg)", animation: "scaleIn 0.2s ease",
            maxHeight: "90vh", overflow: "auto",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 600 }}>{editing ? "Edit Testimonial" : "Add Testimonial"}</h3>
              <button onClick={() => setModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: "var(--admin-text-secondary)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <ImageUploader value={form.avatar} onChange={(v) => setForm({ ...form, avatar: v })} label="Profile Image" aspectRatio="1/1" />
            <div className="admin-form-group">
              <label className="admin-form-label">Person Name <span className="required">*</span></label>
              <input className="admin-input" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. John Doe" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Designation</label>
                <input className="admin-input" type="text" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="e.g. CEO" />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Company</label>
                <input className="admin-input" type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="e.g. Acme Inc." />
              </div>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Testimonial Content <span className="required">*</span></label>
              <textarea className="admin-textarea" rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="What did the client say?" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Rating</label>
              <select className="admin-select" value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}>
                {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>)}
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Display Order</label>
                <input className="admin-input" type="number" value={form.order ?? 0} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })} />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Approval Status</label>
                <select className="admin-select" value={form.approved ? "approved" : "pending"} onChange={(e) => setForm({ ...form, approved: e.target.value === "approved" })}>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                </select>
              </div>
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
                {saving ? "Saving..." : editing ? "Update Testimonial" : "Add Testimonial"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Testimonial"
        message={`Are you sure you want to delete the testimonial from "${deleteTarget?.name}"? This action cannot be undone.`}
        loading={deleting}
      />
    </div>
  );
}
