import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, Send, ArrowLeft, Plus, X } from "lucide-react";
import { projectService, slugify, addActivity } from "../services/adminDataService";
import ImageUploader from "../components/ImageUploader";
import TagInput from "../components/TagInput";
import { useToast } from "../context/ToastContext";

const defaultProject = {
  title: "", slug: "", description: "", fullDescription: "", category: "",
  clientName: "", role: "", projectDate: "", duration: "", published: false,
  technologies: [], githubUrl: "", liveUrl: "", figmaUrl: "",
  image: "", gallery: [], keyFeatures: [], challenges: "", solutions: "",
  results: "", lessonsLearned: "", featured: false,
  seoTitle: "", seoDescription: "", caseStudyUrl: "",
};

export default function ProjectForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { addToast } = useToast();
  const errorsRef = useRef({});
  const formRef = useRef(defaultProject);

  const [, setTick] = useState(0);
  const [form, setForm] = useState(defaultProject);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const project = projectService.getById(id);
      if (project) { setForm(project); formRef.current = project; }
      else { addToast("Project not found", "error"); navigate("/admin/projects"); }
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
    if (form.liveUrl && !/^https?:\/\/.+/.test(form.liveUrl)) errs.liveUrl = "Must be a valid URL (https://...)";
    if (form.githubUrl && !/^https?:\/\/.+/.test(form.githubUrl)) errs.githubUrl = "Must be a valid URL";
    if (form.figmaUrl && !/^https?:\/\/.+/.test(form.figmaUrl)) errs.figmaUrl = "Must be a valid URL";
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
        projectService.update(id, data);
        addToast("Project updated successfully", "success");
        addActivity("Project updated", `"${form.title}" was updated`);
      } else {
        projectService.add(data);
        addToast("Project created successfully", "success");
        addActivity("Project created", `"${form.title}" was created`);
      }
      setSaving(false);
      navigate("/admin/projects");
    }, 500);
  };

  const handleAddGallery = (url) => {
    if (url && !form.gallery.includes(url)) {
      setForm((prev) => ({ ...prev, gallery: [...prev.gallery, url] }));
      setTick((n) => n + 1);
    }
  };

  const handleRemoveGallery = (index) => {
    setForm((prev) => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== index) }));
    setTick((n) => n + 1);
  };

  const inputStyle = (field) => `admin-input ${errorsRef.current[field] ? "error" : ""}`;

  return (
    <div>
      <div className="admin-page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button onClick={() => navigate("/admin/projects")} className="admin-btn admin-btn-ghost admin-btn-icon">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="admin-page-title">{isEdit ? "Edit Project" : "Add Project"}</h2>
            <p className="admin-page-subtitle">{isEdit ? "Update project details" : "Create a new portfolio project"}</p>
          </div>
        </div>
        <div className="admin-actions">
          <button onClick={() => navigate("/admin/projects")} className="admin-btn admin-btn-secondary">Cancel</button>
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
              <label className="admin-form-label">Project Title <span className="required">*</span></label>
              <input className={inputStyle("title")} type="text" value={form.title} onChange={(e) => handleChange("title", e.target.value)} placeholder="Enter project title" />
              {errors.title && <span className="admin-error-text">{errors.title}</span>}
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Slug <span className="required">*</span></label>
              <input className={inputStyle("slug")} type="text" value={form.slug} onChange={(e) => { handleChange("slug", e.target.value); setForm((prev) => ({ ...prev, _slugEdited: true })); }} placeholder="project-slug" />
              {errors.slug && <span className="admin-error-text">{errors.slug}</span>}
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Category</label>
              <select className="admin-select" value={form.category} onChange={(e) => handleChange("category", e.target.value)}>
                <option value="">Select category</option>
                <option value="Booking Platform UI">Booking Platform UI</option>
                <option value="Founder Community Platform">Founder Community Platform</option>
                <option value="Architecture Website">Architecture Website</option>
                <option value="Product Workflow">Product Workflow</option>
                <option value="Web App">Web App</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Portfolio">Portfolio</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="admin-form-group" style={{ gridColumn: "1 / -1" }}>
              <label className="admin-form-label">Short Description</label>
              <textarea className="admin-textarea" rows={3} value={form.description} onChange={(e) => handleChange("description", e.target.value)} placeholder="Brief description of the project" style={{ resize: "vertical" }} />
            </div>
            <div className="admin-form-group" style={{ gridColumn: "1 / -1" }}>
              <label className="admin-form-label">Full Description</label>
              <textarea className="admin-textarea" rows={6} value={form.fullDescription} onChange={(e) => handleChange("fullDescription", e.target.value)} placeholder="Detailed project description..." style={{ resize: "vertical" }} />
            </div>
          </div>
        </div>

        <div className="admin-card" style={{ gridColumn: "1 / -1" }}>
          <h3 className="admin-card-title" style={{ marginBottom: "1rem" }}>Project Details</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Client Name</label>
              <input className="admin-input" type="text" value={form.clientName} onChange={(e) => handleChange("clientName", e.target.value)} placeholder="Client name" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Role</label>
              <input className="admin-input" type="text" value={form.role} onChange={(e) => handleChange("role", e.target.value)} placeholder="Your role" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Duration</label>
              <input className="admin-input" type="text" value={form.duration} onChange={(e) => handleChange("duration", e.target.value)} placeholder="e.g., 3 weeks" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Project Date</label>
              <input className="admin-input" type="text" value={form.projectDate} onChange={(e) => handleChange("projectDate", e.target.value)} placeholder="e.g., 2024" />
            </div>
          </div>
        </div>

        <div className="admin-card" style={{ gridColumn: "1 / -1" }}>
          <h3 className="admin-card-title" style={{ marginBottom: "1rem" }}>Links</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Live URL</label>
              <input className={inputStyle("liveUrl")} type="url" value={form.liveUrl} onChange={(e) => handleChange("liveUrl", e.target.value)} placeholder="https://..." />
              {errors.liveUrl && <span className="admin-error-text">{errors.liveUrl}</span>}
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">GitHub URL</label>
              <input className={inputStyle("githubUrl")} type="url" value={form.githubUrl} onChange={(e) => handleChange("githubUrl", e.target.value)} placeholder="https://..." />
              {errors.githubUrl && <span className="admin-error-text">{errors.githubUrl}</span>}
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Figma URL</label>
              <input className={inputStyle("figmaUrl")} type="url" value={form.figmaUrl} onChange={(e) => handleChange("figmaUrl", e.target.value)} placeholder="https://..." />
              {errors.figmaUrl && <span className="admin-error-text">{errors.figmaUrl}</span>}
            </div>
          </div>
        </div>

        <div className="admin-card">
          <h3 className="admin-card-title" style={{ marginBottom: "1rem" }}>Technologies</h3>
          <TagInput tags={form.technologies} onChange={(tags) => handleChange("technologies", tags)} placeholder="Add technology..." />
        </div>

        <div className="admin-card">
          <h3 className="admin-card-title" style={{ marginBottom: "1rem" }}>Key Features</h3>
          <TagInput tags={form.keyFeatures} onChange={(tags) => handleChange("keyFeatures", tags)} placeholder="Add feature..." />
        </div>

        <div className="admin-card" style={{ gridColumn: "1 / -1" }}>
          <h3 className="admin-card-title" style={{ marginBottom: "1rem" }}>Detailed Content</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Challenges</label>
              <textarea className="admin-textarea" rows={5} value={form.challenges} onChange={(e) => handleChange("challenges", e.target.value)} placeholder="What challenges did you face?" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Solutions</label>
              <textarea className="admin-textarea" rows={5} value={form.solutions} onChange={(e) => handleChange("solutions", e.target.value)} placeholder="How did you solve them?" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Results</label>
              <textarea className="admin-textarea" rows={4} value={form.results} onChange={(e) => handleChange("results", e.target.value)} placeholder="What results were achieved?" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Lessons Learned</label>
              <textarea className="admin-textarea" rows={4} value={form.lessonsLearned} onChange={(e) => handleChange("lessonsLearned", e.target.value)} placeholder="What did you learn?" />
            </div>
          </div>
        </div>

        <div className="admin-card" style={{ gridColumn: "1 / -1" }}>
          <h3 className="admin-card-title" style={{ marginBottom: "1rem" }}>Media</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <ImageUploader value={form.image} onChange={(val) => handleChange("image", val)} label="Main Thumbnail" aspectRatio="16/9" />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label className="admin-form-label">Project Gallery</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
              {form.gallery.map((url, i) => (
                <div key={i} style={{ position: "relative", width: 80, height: 60, borderRadius: "6px", overflow: "hidden", border: "1px solid var(--admin-border)" }}>
                  <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <button onClick={() => handleRemoveGallery(i)} style={{ position: "absolute", top: 2, right: 2, width: 20, height: 20, borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.5)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="Remove">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input type="text" className="admin-input" placeholder="Paste image URL and click Add" id="gallery-input" style={{ flex: 1 }} />
              <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => { const input = document.getElementById("gallery-input"); handleAddGallery(input.value); input.value = ""; }}>
                <Plus size={14} /> Add
              </button>
            </div>
          </div>
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
              Featured Project
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
