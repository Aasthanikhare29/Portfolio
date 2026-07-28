import { useState, useEffect } from "react";
import {
  Save, User, Camera, BookOpen, BarChart3, List,
} from "lucide-react";
import {
  portfolioStorageService,
  addActivity,
} from "../services/adminDataService";
import { profileApi } from "../../services/api";
import ImageUploader from "../components/ImageUploader";
import TagInput from "../components/TagInput";
import { useToast } from "../context/ToastContext";

function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className="admin-card" style={{ marginBottom: "1.5rem" }}>
      <div className="admin-card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {Icon && <Icon size={18} style={{ color: "var(--lavender-deep)" }} />}
          <h3 className="admin-card-title">{title}</h3>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function AdminProfile() {
  const { addToast } = useToast();
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({ ...portfolioStorageService.getProfile() });
  }, []);

  if (!form) return <div className="admin-loading"><div className="admin-spinner" /></div>;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.fullName?.trim()) errs.fullName = "Full name is required";
    if (!form.professionalTitle?.trim()) errs.professionalTitle = "Professional title is required";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email format";
    return errs;
  };

  const handleSave = async () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      addToast("Please fix validation errors", "error");
      return;
    }
    setSaving(true);
    try {
      // Map form fields to API request format
      const apiData = {
        name: form.fullName,
        title: form.professionalTitle,
        subtitle: form.heroSubheading,
        bio: form.shortIntro,
        about: form.aboutDescription,
        profilePicture: form.profileImage,
        resumeUrl: form.resumeLink,
        email: form.email,
        phone: form.phone,
        location: form.location,
        availableForHire: form.availabilityStatus === 'Open to opportunities',
        greeting: form.heroHeading,
      };
      
      // Update localStorage immediately for instant UI feedback
      portfolioStorageService.updateProfile(form);
      
      // Notify other tabs/components of profile change
      window.dispatchEvent(new Event('profileUpdated'));
      
      // Sync with backend API
      await profileApi.update(apiData);
      
      addToast("Profile updated successfully", "success");
      addActivity("Profile updated", "Profile information was updated");
    } catch (error) {
      console.error("Failed to update profile:", error);
      addToast("Failed to sync with server", "error");
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = (field) => `admin-input ${errors[field] ? "error" : ""}`;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Profile</h2>
          <p className="admin-page-subtitle">Manage your personal information and about section</p>
        </div>
        <button onClick={handleSave} className="admin-btn admin-btn-primary" disabled={saving}>
          <Save size={16} /> {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>

      <SectionCard title="Personal Info" icon={User}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="admin-form-group">
            <label className="admin-form-label">Full Name <span className="required">*</span></label>
            <input className={inputStyle("fullName")} type="text" value={form.fullName} onChange={(e) => handleChange("fullName", e.target.value)} placeholder="Your full name" />
            {errors.fullName && <span className="admin-error-text">{errors.fullName}</span>}
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Professional Title <span className="required">*</span></label>
            <input className={inputStyle("professionalTitle")} type="text" value={form.professionalTitle} onChange={(e) => handleChange("professionalTitle", e.target.value)} placeholder="e.g., UI & Frontend Developer" />
            {errors.professionalTitle && <span className="admin-error-text">{errors.professionalTitle}</span>}
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Location</label>
            <input className="admin-input" type="text" value={form.location} onChange={(e) => handleChange("location", e.target.value)} placeholder="City, Country" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Email</label>
            <input className={inputStyle("email")} type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="email@example.com" />
            {errors.email && <span className="admin-error-text">{errors.email}</span>}
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Phone</label>
            <input className="admin-input" type="text" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} placeholder="+1 555 000 0000" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Availability Status</label>
            <input className="admin-input" type="text" value={form.availabilityStatus} onChange={(e) => handleChange("availabilityStatus", e.target.value)} placeholder="e.g., Open to opportunities" />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Hero Section" icon={Camera}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="admin-form-group" style={{ gridColumn: "1 / -1" }}>
            <label className="admin-form-label">Hero Heading</label>
            <input className="admin-input" type="text" value={form.heroHeading} onChange={(e) => handleChange("heroHeading", e.target.value)} placeholder="Main headline" />
          </div>
          <div className="admin-form-group" style={{ gridColumn: "1 / -1" }}>
            <label className="admin-form-label">Hero Subheading</label>
            <textarea className="admin-textarea" rows={3} value={form.heroSubheading} onChange={(e) => handleChange("heroSubheading", e.target.value)} placeholder="Supporting text" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Primary CTA Text</label>
            <input className="admin-input" type="text" value={form.primaryCtaText} onChange={(e) => handleChange("primaryCtaText", e.target.value)} placeholder="e.g., View My Work" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Primary CTA Link</label>
            <input className="admin-input" type="text" value={form.primaryCtaLink} onChange={(e) => handleChange("primaryCtaLink", e.target.value)} placeholder="e.g., /projects" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Secondary CTA Text</label>
            <input className="admin-input" type="text" value={form.secondaryCtaText} onChange={(e) => handleChange("secondaryCtaText", e.target.value)} placeholder="e.g., Download Resume" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Secondary CTA Link</label>
            <input className="admin-input" type="text" value={form.secondaryCtaLink} onChange={(e) => handleChange("secondaryCtaLink", e.target.value)} placeholder="e.g., /resume.pdf" />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="About Section" icon={BookOpen}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="admin-form-group" style={{ gridColumn: "1 / -1" }}>
            <label className="admin-form-label">Short Intro</label>
            <textarea className="admin-textarea" rows={3} value={form.shortIntro} onChange={(e) => handleChange("shortIntro", e.target.value)} placeholder="Brief introduction" />
          </div>
          <div className="admin-form-group" style={{ gridColumn: "1 / -1" }}>
            <label className="admin-form-label">Full About Description</label>
            <textarea className="admin-textarea" rows={6} value={form.aboutDescription} onChange={(e) => handleChange("aboutDescription", e.target.value)} placeholder="Detailed about description" />
          </div>
          <ImageUploader value={form.profileImage} onChange={(val) => handleChange("profileImage", val)} label="Profile Image" aspectRatio="1/1" />
          <ImageUploader value={form.aboutImage} onChange={(val) => handleChange("aboutImage", val)} label="About Image" aspectRatio="4/5" />
        </div>
      </SectionCard>

      <SectionCard title="Stats" icon={BarChart3}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
          <div className="admin-form-group">
            <label className="admin-form-label">Years of Experience</label>
            <input className="admin-input" type="number" min="0" value={form.yearsOfExperience} onChange={(e) => handleChange("yearsOfExperience", parseInt(e.target.value) || 0)} />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Projects Completed</label>
            <input className="admin-input" type="number" min="0" value={form.projectsCompleted} onChange={(e) => handleChange("projectsCompleted", parseInt(e.target.value) || 0)} />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Resume Link</label>
            <input className="admin-input" type="text" value={form.resumeLink} onChange={(e) => handleChange("resumeLink", e.target.value)} placeholder="/resume.pdf" />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Lists" icon={List}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <TagInput tags={form.funFacts || []} onChange={(tags) => handleChange("funFacts", tags)} label="Fun Facts" placeholder="Add fun fact..." />
          <TagInput tags={form.personalValues || []} onChange={(tags) => handleChange("personalValues", tags)} label="Personal Values" placeholder="Add value..." />
          <TagInput tags={form.interests || []} onChange={(tags) => handleChange("interests", tags)} label="Interests" placeholder="Add interest..." />
          <TagInput tags={form.achievements || []} onChange={(tags) => handleChange("achievements", tags)} label="Achievements" placeholder="Add achievement..." />
        </div>
      </SectionCard>
    </div>
  );
}
