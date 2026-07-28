import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Plus, Search, Edit, Eye, EyeOff, Copy, Trash2, ChevronDown, Star, FolderOpen,
} from "lucide-react";
import { projectService, formatDate, slugify, addActivity } from "../services/adminDataService";
import { projectApi } from "../../services/api";
import { useApiData } from "../hooks/useApiData";
import StatusBadge from "../components/StatusBadge";
import Pagination from "../components/Pagination";
import ConfirmationModal from "../components/ConfirmationModal";
import { useToast } from "../context/ToastContext";

export default function AdminProjects() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { data: projects, setData: setProjects } = useApiData(projectApi.getAll, projectService.getAll);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterFeatured, setFilterFeatured] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const perPage = 10;

  const categories = useMemo(() => {
    const cats = [...new Set(projects.map((p) => p.category).filter(Boolean))];
    return ["All", ...cats];
  }, [projects]);

  const filtered = useMemo(() => {
    let result = [...projects];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.title?.toLowerCase().includes(q) || p.technologies?.some((t) => t.toLowerCase().includes(q)));
    }
    if (filterCategory !== "All") result = result.filter((p) => p.category === filterCategory);
    if (filterStatus === "Published") result = result.filter((p) => p.published);
    if (filterStatus === "Draft") result = result.filter((p) => !p.published);
    if (filterFeatured === "Featured") result = result.filter((p) => p.featured);
    if (filterFeatured === "Not Featured") result = result.filter((p) => !p.featured);
    if (sortBy === "newest") result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    else if (sortBy === "oldest") result.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
    else if (sortBy === "title") result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    return result;
  }, [projects, search, filterCategory, filterStatus, filterFeatured, sortBy]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      projectService.delete(deleteTarget.id);
      setProjects(projectService.getAll());
      addToast("Project deleted successfully", "success");
      addActivity("Project deleted", `"${deleteTarget.title}" was deleted`);
    } catch { addToast("Failed to delete project", "error"); }
    setDeleting(false);
    setDeleteTarget(null);
  };

  const handleTogglePublish = (project) => {
    projectService.togglePublish(project.id);
    setProjects(projectService.getAll());
    const newStatus = project.published ? "unpublished" : "published";
    addToast(`Project ${newStatus}`, "success");
    addActivity(`Project ${newStatus}`, `"${project.title}" was ${newStatus}`);
  };

  const handleToggleFeatured = (project) => {
    projectService.toggleFeatured(project.id);
    setProjects(projectService.getAll());
    addToast(project.featured ? "Unfeatured project" : "Featured project", "success");
  };

  const handleDuplicate = (project) => {
    projectService.duplicate(project.id);
    setProjects(projectService.getAll());
    addToast("Project duplicated", "success");
    addActivity("Project duplicated", `"${project.title}" was duplicated`);
  };

  useEffect(() => { setPage(1); }, [search, filterCategory, filterStatus, filterFeatured, sortBy]);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Projects</h2>
          <p className="admin-page-subtitle">Manage your portfolio projects ({projects.length} total)</p>
        </div>
        <Link to="/admin/projects/new" className="admin-btn admin-btn-primary">
          <Plus size={16} /> Add Project
        </Link>
      </div>

      <div className="admin-filters">
        <div className="admin-search">
          <Search size={14} className="search-icon" />
          <input type="text" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="admin-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          {categories.map((c) => <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>)}
        </select>
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
            <div className="admin-empty-icon"><FolderOpen size={24} /></div>
            <h3>No projects found</h3>
            <p>{search || filterCategory !== "All" ? "Try adjusting your filters." : "Add your first project to get started."}</p>
            {!search && filterCategory === "All" && (
              <Link to="/admin/projects/new" className="admin-btn admin-btn-primary" style={{ marginTop: "1rem" }}>
                <Plus size={16} /> Add Project
              </Link>
            )}
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
                <th>Technologies</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Created</th>
                <th style={{ width: 160 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((project) => (
                <tr key={project.id}>
                  <td>
                    <div style={{ width: 40, height: 28, borderRadius: "4px", overflow: "hidden", background: "var(--admin-bg)" }}>
                      {project.image ? <img src={project.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", background: "var(--lavender)" }} />}
                    </div>
                  </td>
                  <td style={{ fontWeight: 500 }}>{project.title || "Untitled"}</td>
                  <td style={{ color: "var(--admin-text-secondary)", fontSize: "0.8125rem" }}>{project.category || "—"}</td>
                  <td>
                    <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
                      {(project.technologies || []).slice(0, 3).map((t) => (
                        <span key={t} style={{ fontSize: "0.7rem", padding: "1px 6px", background: "var(--admin-bg)", borderRadius: 999, color: "var(--admin-text-secondary)" }}>{t}</span>
                      ))}
                      {(project.technologies?.length || 0) > 3 && <span style={{ fontSize: "0.7rem", color: "var(--light-muted)" }}>+{project.technologies.length - 3}</span>}
                    </div>
                  </td>
                  <td><StatusBadge status={project.published ? "published" : "draft"} /></td>
                  <td>{project.featured ? <StatusBadge status="featured" /> : "—"}</td>
                  <td style={{ fontSize: "0.8125rem", color: "var(--admin-text-secondary)" }}>{formatDate(project.createdAt)}</td>
                  <td>
                    <div className="admin-actions" style={{ gap: "0.25rem" }}>
                      <button onClick={() => handleTogglePublish(project)} className="admin-btn admin-btn-ghost admin-btn-sm" title={project.published ? "Unpublish" : "Publish"}>
                        {project.published ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button onClick={() => handleToggleFeatured(project)} className="admin-btn admin-btn-ghost admin-btn-sm" title={project.featured ? "Unfeature" : "Feature"}>
                        <Star size={14} />
                      </button>
                      <Link to={`/admin/projects/edit/${project.id}`} className="admin-btn admin-btn-ghost admin-btn-sm" title="Edit">
                        <Edit size={14} />
                      </Link>
                      <a href={`/projects/${project.slug || project.id}`} target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn-ghost admin-btn-sm" title="Preview">
                        <Eye size={14} />
                      </a>
                      <button onClick={() => handleDuplicate(project)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Duplicate">
                        <Copy size={14} />
                      </button>
                      <button onClick={() => setDeleteTarget(project)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Delete" style={{ color: "var(--color-error)" }}>
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
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        loading={deleting}
      />
    </div>
  );
}


