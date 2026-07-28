import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Plus, Search, Edit, Eye, EyeOff, Trash2, Star, FolderOpen, Clock,
} from "lucide-react";
import { blogService, formatDate, addActivity } from "../services/adminDataService";
import { blogApi } from "../../services/api";
import { useApiData } from "../hooks/useApiData";
import StatusBadge from "../components/StatusBadge";
import Pagination from "../components/Pagination";
import ConfirmationModal from "../components/ConfirmationModal";
import { useToast } from "../context/ToastContext";

export default function AdminBlogs() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { data: blogs, setData: setBlogs } = useApiData(blogApi.getAll, blogService.getAll);
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
    const cats = [...new Set(blogs.map((b) => b.category).filter(Boolean))];
    return ["All", ...cats];
  }, [blogs]);

  const filtered = useMemo(() => {
    let result = [...blogs];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((b) => b.title?.toLowerCase().includes(q) || b.tags?.some((t) => t.toLowerCase().includes(q)));
    }
    if (filterCategory !== "All") result = result.filter((b) => b.category === filterCategory);
    if (filterStatus === "Published") result = result.filter((b) => b.published);
    if (filterStatus === "Draft") result = result.filter((b) => !b.published);
    if (filterFeatured === "Featured") result = result.filter((b) => b.featured);
    if (filterFeatured === "Not Featured") result = result.filter((b) => !b.featured);
    if (sortBy === "newest") result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    else if (sortBy === "oldest") result.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
    else if (sortBy === "title") result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    return result;
  }, [blogs, search, filterCategory, filterStatus, filterFeatured, sortBy]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      blogService.delete(deleteTarget.id);
      setBlogs(blogService.getAll());
      addToast("Blog post deleted successfully", "success");
      addActivity("Blog deleted", `"${deleteTarget.title}" was deleted`);
    } catch { addToast("Failed to delete blog post", "error"); }
    setDeleting(false);
    setDeleteTarget(null);
  };

  const handleTogglePublish = (blog) => {
    blogService.togglePublish(blog.id);
    setBlogs(blogService.getAll());
    const newStatus = blog.published ? "unpublished" : "published";
    addToast(`Blog post ${newStatus}`, "success");
    addActivity(`Blog ${newStatus}`, `"${blog.title}" was ${newStatus}`);
  };

  const handleToggleFeatured = (blog) => {
    blogService.toggleFeatured(blog.id);
    setBlogs(blogService.getAll());
    addToast(blog.featured ? "Unfeatured blog post" : "Featured blog post", "success");
  };

  useEffect(() => { setPage(1); }, [search, filterCategory, filterStatus, filterFeatured, sortBy]);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Blog Posts</h2>
          <p className="admin-page-subtitle">Manage your blog posts ({blogs.length} total)</p>
        </div>
        <Link to="/admin/blogs/new" className="admin-btn admin-btn-primary">
          <Plus size={16} /> Add Blog Post
        </Link>
      </div>

      <div className="admin-filters">
        <div className="admin-search">
          <Search size={14} className="search-icon" />
          <input type="text" placeholder="Search blog posts..." value={search} onChange={(e) => setSearch(e.target.value)} />
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
            <h3>No blog posts found</h3>
            <p>{search || filterCategory !== "All" ? "Try adjusting your filters." : "Write your first blog post to get started."}</p>
            {!search && filterCategory === "All" && (
              <Link to="/admin/blogs/new" className="admin-btn admin-btn-primary" style={{ marginTop: "1rem" }}>
                <Plus size={16} /> Add Blog Post
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
                <th>Status</th>
                <th>Featured</th>
                <th>Published</th>
                <th>Read Time</th>
                <th style={{ width: 160 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <div style={{ width: 40, height: 28, borderRadius: "4px", overflow: "hidden", background: "var(--admin-bg)" }}>
                      {blog.coverImage ? <img src={blog.coverImage} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <div style={{ width: "100%", height: "100%", background: "var(--lavender)" }} />}
                    </div>
                  </td>
                  <td style={{ fontWeight: 500 }}>{blog.title || "Untitled"}</td>
                  <td style={{ color: "var(--admin-text-secondary)", fontSize: "0.8125rem" }}>{blog.category || "—"}</td>
                  <td><StatusBadge status={blog.published ? "published" : "draft"} /></td>
                  <td>{blog.featured ? <StatusBadge status="featured" /> : "—"}</td>
                  <td style={{ fontSize: "0.8125rem", color: "var(--admin-text-secondary)" }}>{formatDate(blog.publishDate || blog.createdAt)}</td>
                  <td style={{ fontSize: "0.8125rem", color: "var(--admin-text-secondary)" }}>
                    {blog.readingTime ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                        <Clock size={12} /> {blog.readingTime}
                      </span>
                    ) : "—"}
                  </td>
                  <td>
                    <div className="admin-actions" style={{ gap: "0.25rem" }}>
                      <button onClick={() => handleTogglePublish(blog)} className="admin-btn admin-btn-ghost admin-btn-sm" title={blog.published ? "Unpublish" : "Publish"}>
                        {blog.published ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button onClick={() => handleToggleFeatured(blog)} className="admin-btn admin-btn-ghost admin-btn-sm" title={blog.featured ? "Unfeature" : "Feature"}>
                        <Star size={14} />
                      </button>
                      <Link to={`/admin/blogs/edit/${blog.id}`} className="admin-btn admin-btn-ghost admin-btn-sm" title="Edit">
                        <Edit size={14} />
                      </Link>
                      <a href={`/blog/${blog.slug || blog.id}`} target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn-ghost admin-btn-sm" title="Preview">
                        <Eye size={14} />
                      </a>
                      <button onClick={() => setDeleteTarget(blog)} className="admin-btn admin-btn-ghost admin-btn-sm" title="Delete" style={{ color: "var(--color-error)" }}>
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
        title="Delete Blog Post"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        loading={deleting}
      />
    </div>
  );
}