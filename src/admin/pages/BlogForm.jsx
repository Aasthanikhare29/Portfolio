import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, Send, ArrowLeft, Eye } from "lucide-react";
import { blogService, slugify, addActivity } from "../services/adminDataService";
import ImageUploader from "../components/ImageUploader";
import TagInput from "../components/TagInput";
import { useToast } from "../context/ToastContext";

const defaultBlog = {
  title: "", slug: "", excerpt: "", content: "", coverImage: "", category: "",
  tags: [], author: "", publishDate: "", readingTime: "", featured: false,
  published: false, seoTitle: "", seoDescription: "",
};

export default function BlogForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { addToast } = useToast();
  const errorsRef = useRef({});

  const [form, setForm] = useState(defaultBlog);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [contentTab, setContentTab] = useState("write");

  useEffect(() => {
    if (isEdit) {
      const blog = blogService.getById(id);
      if (blog) setForm(blog);
      else { addToast("Blog post not found", "error"); navigate("/admin/blogs"); }
    }
  }, [id, isEdit, navigate, addToast]);

  const handleChange = useCallback((field, value) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title" && (!prev.slug || prev.slug === slugify(prev.title) || !prev._slugEdited)) {
        next.slug = slugify(value);
        next._slugEdited = false;
      }
      return next;
    });
    if (errorsRef.current[field]) {
      const next = { ...errorsRef.current, [field]: "" };
      errorsRef.current = next;
      setErrors(next);
    }
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.slug.trim()) errs.slug = "Slug is required";
    if (!form.content.trim()) errs.content = "Content is required";
    if (!form.category) errs.category = "Category is required";
    return errs;
  };

  const handleSave = (publish = false) => {
    const errs = validate();
    errorsRef.current = errs;
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      addToast("Please fix validation errors", "error");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      const data = { ...form, published: publish };
      if (isEdit) {
        blogService.update(id, data);
        addToast("Blog post updated successfully", "success");
        addActivity("Blog updated", `"${form.title}" was updated`);
      } else {
        blogService.add(data);
        addToast("Blog post created successfully", "success");
        addActivity("Blog created", `"${form.title}" was created`);
      }
      setSaving(false);
      navigate("/admin/blogs");
    }, 500);
  };

  const inputStyle = (field) => `admin-input ${errorsRef.current[field] ? "error" : ""}`;

  return (
    <div>
      <div className="admin-page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button onClick={() => navigate("/admin/blogs")} className="admin-btn admin-btn-ghost admin-btn-icon">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="admin-page-title">{isEdit ? "Edit Blog Post" : "Add Blog Post"}</h2>
            <p className="admin-page-subtitle">{isEdit ? "Update blog post details" : "Write a new blog post"}</p>
          </div>
        </div>
        <div className="admin-actions">
          <button onClick={() => navigate("/admin/blogs")} className="admin-btn admin-btn-secondary">Cancel</button>
          <button onClick={() => handleSave(false)} className="admin-btn admin-btn-secondary" disabled={saving}>
            <Save size={16} /> {saving ? "Saving..." : "Save as Draft"}
          </button>
          <button onClick={() => handleSave(true)} className="admin-btn admin-btn-primary" disabled={saving}>
            <Send size={16} /> {saving ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
        <div className="admin-card" style={{ gridColumn: "1 / -1" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="admin-form-group" style={{ gridColumn: "1 / -1" }}>
              <label className="admin-form-label">Blog Title <span className="required">*</span></label>
              <input className={inputStyle("title")} type="text" value={form.title} onChange={(e) => handleChange("title", e.target.value)} placeholder="Enter blog post title" />
              {errors.title && <span className="admin-error-text">{errors.title}</span>}
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Slug <span className="required">*</span></label>
              <input className={inputStyle("slug")} type="text" value={form.slug} onChange={(e) => { handleChange("slug", e.target.value); setForm((prev) => ({ ...prev, _slugEdited: true })); }} placeholder="blog-post-slug" />
              {errors.slug && <span className="admin-error-text">{errors.slug}</span>}
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Category <span className="required">*</span></label>
              <select className={`admin-select ${errors.category ? "error" : ""}`} value={form.category} onChange={(e) => handleChange("category", e.target.value)}>
                <option value="">Select category</option>
                <option value="UI Design">UI Design</option>
                <option value="Frontend Development">Frontend Development</option>
                <option value="UX Research">UX Research</option>
                <option value="Design Systems">Design Systems</option>
                <option value="Career">Career</option>
                <option value="Tutorial">Tutorial</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && <span className="admin-error-text">{errors.category}</span>}
            </div>
            <div className="admin-form-group" style={{ gridColumn: "1 / -1" }}>
              <label className="admin-form-label">Excerpt</label>
              <textarea className="admin-textarea" rows={3} value={form.excerpt} onChange={(e) => handleChange("excerpt", e.target.value)} placeholder="Brief summary of the blog post..." style={{ resize: "vertical" }} />
            </div>
          </div>
        </div>

        <div className="admin-card" style={{ gridColumn: "1 / -1" }}>
          <h3 className="admin-card-title" style={{ marginBottom: "1rem" }}>Content <span className="required">*</span></h3>
          <div style={{ marginBottom: "0.75rem", display: "flex", gap: "0.5rem" }}>
            <button
              className={`admin-btn admin-btn-sm ${contentTab === "write" ? "admin-btn-primary" : "admin-btn-ghost"}`}
              onClick={() => setContentTab("write")}
            >
              Write
            </button>
            <button
              className={`admin-btn admin-btn-sm ${contentTab === "preview" ? "admin-btn-primary" : "admin-btn-ghost"}`}
              onClick={() => setContentTab("preview")}
            >
              <Eye size={14} /> Preview
            </button>
          </div>
          {contentTab === "write" ? (
            <div className="admin-form-group">
              <textarea
                className={`admin-textarea ${errors.content ? "error" : ""}`}
                rows={18}
                value={form.content}
                onChange={(e) => handleChange("content", e.target.value)}
                placeholder="Write your blog content here... (plain text with markdown supported)"
                style={{ resize: "vertical", fontFamily: "monospace", lineHeight: 1.6 }}
              />
              {errors.content && <span className="admin-error-text">{errors.content}</span>}
            </div>
          ) : (
            <div style={{
              minHeight: 300, padding: "1rem", background: "var(--admin-bg)",
              borderRadius: "var(--radius-sm)", whiteSpace: "pre-wrap",
              fontSize: "0.875rem", lineHeight: 1.7, color: "var(--admin-text)",
            }}>
              {form.content || "Nothing to preview yet."}
            </div>
          )}
        </div>

        <div className="admin-card">
          <h3 className="admin-card-title" style={{ marginBottom: "1rem" }}>Metadata</h3>
          <div>
            <div className="admin-form-group">
              <label className="admin-form-label">Author</label>
              <input className="admin-input" type="text" value={form.author} onChange={(e) => handleChange("author", e.target.value)} placeholder="Author name" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Publish Date</label>
              <input className="admin-input" type="date" value={form.publishDate ? form.publishDate.slice(0, 10) : ""} onChange={(e) => handleChange("publishDate", e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Reading Time</label>
              <input className="admin-input" type="text" value={form.readingTime} onChange={(e) => handleChange("readingTime", e.target.value)} placeholder="e.g., 5 min read" />
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h3 className="admin-card-title" style={{ marginBottom: "1rem" }}>Tags</h3>
          <TagInput tags={form.tags} onChange={(tags) => handleChange("tags", tags)} placeholder="Add tag..." />
        </div>

        <div className="admin-card" style={{ gridColumn: "1 / -1" }}>
          <h3 className="admin-card-title" style={{ marginBottom: "1rem" }}>Cover Image</h3>
          <ImageUploader value={form.coverImage} onChange={(val) => handleChange("coverImage", val)} label="Cover Image" aspectRatio="2/1" />
        </div>

        <div className="admin-card" style={{ gridColumn: "1 / -1" }}>
          <h3 className="admin-card-title" style={{ marginBottom: "1rem" }}>SEO</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="admin-form-group">
              <label className="admin-form-label">SEO Title</label>
              <input className="admin-input" type="text" value={form.seoTitle} onChange={(e) => handleChange("seoTitle", e.target.value)} placeholder="SEO title" maxLength={60} />
              <div className="admin-seo-counter">{(form.seoTitle || "").length}/60</div>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">SEO Description</label>
              <textarea className="admin-textarea" rows={3} value={form.seoDescription} onChange={(e) => handleChange("seoDescription", e.target.value)} placeholder="SEO description" maxLength={160} />
              <div className="admin-seo-counter">{(form.seoDescription || "").length}/160</div>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h3 className="admin-card-title" style={{ marginBottom: "1rem" }}>Status</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.625rem", cursor: "pointer", fontSize: "0.875rem" }}>
              <label className="admin-toggle">
                <input type="checkbox" checked={form.featured} onChange={() => handleChange("featured", !form.featured)} />
                <span className="admin-toggle-slider" />
              </label>
              Featured Post
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "0.625rem", cursor: "pointer", fontSize: "0.875rem" }}>
              <label className="admin-toggle">
                <input type="checkbox" checked={form.published} onChange={() => handleChange("published", !form.published)} />
                <span className="admin-toggle-slider" />
              </label>
              Published
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}