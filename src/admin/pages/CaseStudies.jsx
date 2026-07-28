import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Plus, Search, Edit, Eye, Trash2, Star } from "lucide-react";
import { caseStudyService, formatDate, slugify, addActivity } from "../services/adminDataService";
import { caseStudyApi } from "../../services/api";
import { useApiData } from "../hooks/useApiData";
import StatusBadge from "../components/StatusBadge";
import Pagination from "../components/Pagination";
import ConfirmationModal from "../components/ConfirmationModal";
import { useToast } from "../context/ToastContext";

export default function AdminCaseStudies() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { data: studies, setData: setStudies } = useApiData(caseStudyApi.getAll, caseStudyService.getAll);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterFeatured, setFilterFeatured] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const perPage = 10;

  const filtered = useMemo(() => {
    let result = [...studies];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((s) => s.title?.toLowerCase().includes(q));
    }
    if (filterStatus === "Published") result = result.filter((s) => s.published);
    if (filterStatus === "Draft") result = result.filter((s) => !s.published);
    if (filterFeatured === "Featured") result = result.filter((s) => s.featured);
    if (filterFeatured === "Not Featured") result = result.filter((s) => !s.featured);
    if (sortBy === "newest") result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    else if (sortBy === "oldest") result.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
    else if (sortBy === "title") result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    return result;
  }, [studies, search, filterStatus, filterFeatured, sortBy]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      caseStudyService.delete(deleteTarget.id);
      setStudies(caseStudyService.getAll());
      addToast("Case study deleted", "success");
      addActivity("Case study deleted", `"${deleteTarget.title}" was deleted`);
    } catch { addToast("Failed to delete", "error"); }
    setDeleting(false);
    setDeleteTarget(null);
  };

  const handleTogglePublish = (cs) => {
    caseStudyService.togglePublish(cs.id);
    setStudies(caseStudyService.getAll());
    addToast(cs.published ? "Unpublished" : "Published", "success");
    addActivity(`Case study ${cs.published ? "unpublished" : "published"}`, `"${cs.title}"`);
  };

  const handleToggleFeatured = (cs) => {
    caseStudyService.toggleFeatured(cs.id);
    setStudies(caseStudyService.getAll());
    addToast(cs.featured ? "Unfeatured" : "Featured", "success");
  };

  useEffect(() => { setPage(1); }, [search, filterStatus, filterFeatured, sortBy]);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Case Studies</h2>
          <p className="admin-page-subtitle">Manage your case studies ({studies.length} total)</p>
        </div>
        <Link to="/admin/case-studies/new" className="admin-btn admin-btn-primary">
          <Plus size={16} /> Add Case Study
        </Link>
      </div>

      <div className="admin-filters">
        <div className="admin-search">
          <Search size={14} className="search-icon" />
          <input type="text" placeholder="Search case studies..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="admin-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Published">Published</option>
          <option value="Draft">Draft</option>
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
        </select>
      </div>

      {paginated.length === 0 ? (
        <div className="admin-card">
          <div className="admin-empty">
            <div className="admin-empty-icon"><Eye size={24} /></div>
            <h3>No case studies found</h3>
            <p>{search ? "Try adjusting your search." : "Add your first case study to get started."}</p>
          </div>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Created</th>
                <th style={{ width: 140 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((cs) => (
                <tr key={cs.id}>
                  <td>
                    <div style={{ width: 40, height: 28, borderRadius: "4px", overflow: "hidden", background: "var(--admin-bg)" }}>
                      {cs.coverImage ? <img src={cs.coverImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", background: "var(--lavender)" }} />}
                    </div>
                  </td>
                  <td style={{ fontWeight: 500 }}>{cs.title || "Untitled"}</td>
                  <td style={{ color: "var(--admin-text-secondary)", fontSize: "0.8125rem" }}>{cs.category || "—"}</td>
                  <td><StatusBadge status={cs.published ? "published" : "draft"} /></td>
                  <td>{cs.featured ? <StatusBadge status="featured" /> : "—"}</td>
                  <td style={{ fontSize: "0.8125rem", color: "var(--admin-text-secondary)" }}>{formatDate(cs.createdAt)}</td>
                  <td>
                    <div className="admin-actions" style={{ gap: "0.25rem" }}>
                      <button onClick={() => handleTogglePublish(cs)} className="admin-btn admin-btn-ghost admin-btn-sm" title={cs.published ? "Unpublish" : "Publish"}>
                        <Eye size={14} />
                      </button>
                      <button onClick={() => handleToggleFeatured(cs)} className="admin-btn admin-btn-ghost admin-btn-sm" title={cs.featured ? "Unfeature" : "Feature"}>
                        <Star size={14} />
                      </button>
                      <button onClick={() => navigate(`/admin/case-studies/edit/${cs.id}`)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Edit">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => setDeleteTarget(cs)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Delete" style={{ color: "var(--color-error)" }}>
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

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      <ConfirmationModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Case Study"
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        loading={deleting}
      />
    </div>
  );
}
