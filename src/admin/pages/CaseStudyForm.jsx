import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, Send, ArrowLeft, Plus, X } from "lucide-react";
import { caseStudyService, slugify, addActivity } from "../services/adminDataService";
import ImageUploader from "../components/ImageUploader";
import TagInput from "../components/TagInput";
import { useToast } from "../context/ToastContext";

const defaultCS = {
  title: "", slug: "", subtitle: "", coverImage: "", category: "",
  projectOverview: "", problemStatement: "", goals: "", research: "",
  userPersonas: "", userFlow: "", wireframes: "", designDecisions: "",
  challenges: "", solutions: "", finalOutcome: "", results: "",
  toolsUsed: [], gallery: [], relatedProject: "", published: false,
  featured: false, seoTitle: "", seoDescription: "",
};

export default function CaseStudyForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { addToast } = useToast();
  const errorsRef = useRef({});

  const [form, setForm] = useState(defaultCS);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const cs = caseStudyService.getById(id);
      if (cs) setForm(cs);
      else { addToast("Case study not found", "error"); navigate("/admin/case-studies"); }
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
    return errs;
  };

  const handleSave = (publish = false) => {
    const errs = validate();
    errorsRef.current = errs;
    setErrors(errs);
    if (Object.keys(errs).length > 0) { addToast("Please fix validation errors", "error"); return; }
    setSaving(true);
    setTimeout(() => {
      const data = { ...form, published: publish };
      if (isEdit) {
        caseStudyService.update(id, data);
        addToast("Case study updated", "success");
        addActivity("Case study updated", `"${form.title}" was updated`);
      } else {
        caseStudyService.add(data);
        addToast("Case study created", "success");
        addActivity("Case study created", `"${form.title}" was created`);
      }
      setSaving(false);
      navigate("/admin/case-studies");
    }, 500);
  };

  const inputStyle = (field) => `admin-input ${errorsRef.current[field] ? "error" : ""}`;

  return (
    <div>
      <div className="admin-page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button onClick={() => navigate("/admin/case-studies")} className="admin-btn admin-btn-ghost admin-btn-icon">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="admin-page-title">{isEdit ? "Edit Case Study" : "Add Case Study"}</h2>
            <p className="admin-page-subtitle">{isEdit ? "Update case study details" : "Create a new case study"}</p>
          </div>
        </div>
        <div className="admin-actions">
          <button onClick={() => navigate("/admin/case-studies")} className="admin-btn admin-btn-secondary">Cancel</button>
          <button onClick={() => handleSave(false)} className="admin-btn admin-btn-secondary" disabled={saving}><Save size={16} /> {saving ? "Saving..." : "Save as Draft"}</button>
          <button onClick={() => handleSave(true)} className="admin-btn admin-btn-primary" disabled={saving}><Send size={16} /> {saving ? "Publishing..." : "Publish"}</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem" }}>
        <div className="admin-card" style={{ gridColumn: "1 / -1" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="admin-form-group" style={{ gridColumn: "1 / -1" }}>
              <label className="admin-form-label">Title <span className="required">*</span></label>
              <input className={inputStyle("title")} type="text" value={form.title} onChange={(e) => handleChange("title", e.target.value)} placeholder="Case study title" />
              {errors.title && <span className="admin-error-text">{errors.title}</span>}
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Slug <span className="required">*</span></label>
              <input className={inputStyle("slug")} type="text" value={form.slug} onChange={(e) => { handleChange("slug", e.target.value); setForm((prev) => ({ ...prev, _slugEdited: true })); }} placeholder="case-study-slug" />
              {errors.slug && <span className="admin-error-text">{errors.slug}</span>}
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Subtitle</label>
              <input className="admin-input" type="text" value={form.subtitle} onChange={(e) => handleChange("subtitle", e.target.value)} placeholder="Short subtitle" />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Category</label>
              <select className="admin-select" value={form.category} onChange={(e) => handleChange("category", e.target.value)}>
                <option value="">Select category</option>
                <option value="UI Design">UI Design</option>
                <option value="UX Research">UX Research</option>
                <option value="Frontend">Frontend</option>
                <option value="Full Stack">Full Stack</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <ImageUploader value={form.coverImage} onChange={(val) => handleChange("coverImage", val)} label="Cover Image" aspectRatio="21/9" />

        <div className="admin-card">
          <h3 className="admin-card-title" style={{ marginBottom: "1rem" }}>Status</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.625rem", cursor: "pointer", fontSize: "0.875rem" }}>
              <label className="admin-toggle">
                <input type="checkbox" checked={form.featured} onChange={() => handleChange("featured", !form.featured)} />
                <span className="admin-toggle-slider" />
              </label>
              Featured
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

        <div className="admin-card" style={{ gridColumn: "1 / -1" }}>
          <h3 className="admin-card-title" style={{ marginBottom: "1rem" }}>Content Sections</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="admin-form-group">
              <label className="admin-form-label">Project Overview</label>
              <textarea className="admin-textarea" rows={4} value={form.projectOverview} onChange={(e) => handleChange("projectOverview", e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Problem Statement</label>
              <textarea className="admin-textarea" rows={4} value={form.problemStatement} onChange={(e) => handleChange("problemStatement", e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Goals</label>
              <textarea className="admin-textarea" rows={3} value={form.goals} onChange={(e) => handleChange("goals", e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Research</label>
              <textarea className="admin-textarea" rows={3} value={form.research} onChange={(e) => handleChange("research", e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">User Personas</label>
              <textarea className="admin-textarea" rows={3} value={form.userPersonas} onChange={(e) => handleChange("userPersonas", e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">User Flow</label>
              <textarea className="admin-textarea" rows={3} value={form.userFlow} onChange={(e) => handleChange("userFlow", e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Wireframes</label>
              <textarea className="admin-textarea" rows={3} value={form.wireframes} onChange={(e) => handleChange("wireframes", e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Design Decisions</label>
              <textarea className="admin-textarea" rows={3} value={form.designDecisions} onChange={(e) => handleChange("designDecisions", e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Challenges</label>
              <textarea className="admin-textarea" rows={3} value={form.challenges} onChange={(e) => handleChange("challenges", e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Solutions</label>
              <textarea className="admin-textarea" rows={3} value={form.solutions} onChange={(e) => handleChange("solutions", e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Final Outcome</label>
              <textarea className="admin-textarea" rows={3} value={form.finalOutcome} onChange={(e) => handleChange("finalOutcome", e.target.value)} />
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">Results & Metrics</label>
              <textarea className="admin-textarea" rows={3} value={form.results} onChange={(e) => handleChange("results", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="admin-card">
          <TagInput tags={form.toolsUsed} onChange={(tags) => handleChange("toolsUsed", tags)} label="Tools Used" placeholder="Add tool..." />
        </div>

        <div className="admin-card">
          <h3 className="admin-card-title" style={{ marginBottom: "1rem" }}>Related Project</h3>
          <div className="admin-form-group">
            <input className="admin-input" type="text" value={form.relatedProject} onChange={(e) => handleChange("relatedProject", e.target.value)} placeholder="Project ID" />
          </div>
        </div>

        <div className="admin-card" style={{ gridColumn: "1 / -1" }}>
          <h3 className="admin-card-title" style={{ marginBottom: "1rem" }}>Gallery</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
            {form.gallery.map((url, i) => (
              <div key={i} style={{ position: "relative", width: 80, height: 60, borderRadius: "6px", overflow: "hidden", border: "1px solid var(--admin-border)" }}>
                <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <button onClick={() => setForm((prev) => ({ ...prev, gallery: prev.gallery.filter((_, j) => j !== i) }))}
                  style={{ position: "absolute", top: 2, right: 2, width: 20, height: 20, borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.5)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="Remove">
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input type="text" className="admin-input" placeholder="Paste image URL" id="gallery-input2" style={{ flex: 1 }} />
            <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => { const inp = document.getElementById("gallery-input2"); if (inp.value && !form.gallery.includes(inp.value)) { setForm((prev) => ({ ...prev, gallery: [...prev.gallery, inp.value] })); inp.value = ""; } }}>
              <Plus size={14} /> Add
            </button>
          </div>
        </div>

        <div className="admin-card" style={{ gridColumn: "1 / -1" }}>
          <h3 className="admin-card-title" style={{ marginBottom: "1rem" }}>SEO</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="admin-form-group">
              <label className="admin-form-label">SEO Title</label>
              <input className="admin-input" type="text" value={form.seoTitle} onChange={(e) => handleChange("seoTitle", e.target.value)} maxLength={60} />
              <div className="admin-seo-counter">{(form.seoTitle || "").length}/60</div>
            </div>
            <div className="admin-form-group">
              <label className="admin-form-label">SEO Description</label>
              <textarea className="admin-textarea" rows={3} value={form.seoDescription} onChange={(e) => handleChange("seoDescription", e.target.value)} maxLength={160} />
              <div className="admin-seo-counter">{(form.seoDescription || "").length}/160</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
