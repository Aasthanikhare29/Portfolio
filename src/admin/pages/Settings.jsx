import { useState, useEffect } from "react";
import {
  Settings as SettingsIcon, Palette, Search, Layout, Save,
} from "lucide-react";
import { portfolioStorageService, addActivity } from "../services/adminDataService";
import ImageUploader from "../components/ImageUploader";
import TagInput from "../components/TagInput";
import { useToast } from "../context/ToastContext";

const sections = [
  { id: "general", label: "General", icon: SettingsIcon },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "seo", label: "SEO", icon: Search },
  { id: "homepage", label: "Homepage Sections", icon: Layout },
];

const allHomepageSections = [
  "hero", "about", "skills", "projects", "caseStudies",
  "experience", "services", "testimonials", "blog", "contact",
];

export default function AdminSettings() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setSettings(JSON.parse(JSON.stringify(portfolioStorageService.getSettings())));
  }, []);

  if (!settings) return <div className="admin-loading"><div className="admin-spinner" /></div>;

  const handleChange = (section, field, value) => {
    setSettings((prev) => {
      const next = { ...prev };
      if (section === "general") next[field] = value;
      else if (section === "appearance") next.appearance = { ...next.appearance, [field]: value };
      else if (section === "seo") next.seo = { ...next.seo, [field]: value };
      else if (section === "homepage") next.homepageSections = { ...next.homepageSections, [field]: value };
      return next;
    });
  };

  const handleSaveSection = (section) => {
    setSaving(true);
    setTimeout(() => {
      portfolioStorageService.updateSettings(settings);
      addToast(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved`, "success");
      addActivity("Settings updated", `${section} settings were updated`);
      setSaving(false);
    }, 500);
  };

  const tabContent = {
    general: (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="admin-form-group">
            <label className="admin-form-label">Portfolio Name</label>
            <input className="admin-input" type="text" value={settings.portfolioName} onChange={(e) => handleChange("general", "portfolioName", e.target.value)} placeholder="Your name" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Website Title</label>
            <input className="admin-input" type="text" value={settings.websiteTitle} onChange={(e) => handleChange("general", "websiteTitle", e.target.value)} placeholder="Website title" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Tagline</label>
            <input className="admin-input" type="text" value={settings.tagline} onChange={(e) => handleChange("general", "tagline", e.target.value)} placeholder="Your tagline" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Contact Email</label>
            <input className="admin-input" type="email" value={settings.contactEmail} onChange={(e) => handleChange("general", "contactEmail", e.target.value)} placeholder="email@example.com" />
          </div>
          <div className="admin-form-group" style={{ gridColumn: "1 / -1" }}>
            <label className="admin-form-label">Copyright Text</label>
            <input className="admin-input" type="text" value={settings.copyrightText} onChange={(e) => handleChange("general", "copyrightText", e.target.value)} placeholder="© 2026 Your Name. All rights reserved." />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <ImageUploader value={settings.favicon} onChange={(val) => handleChange("general", "favicon", val)} label="Favicon" aspectRatio="1/1" maxSizeMB={1} />
          <ImageUploader value={settings.logo} onChange={(val) => handleChange("general", "logo", val)} label="Logo" aspectRatio="2/1" />
        </div>
      </div>
    ),
    appearance: (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="admin-form-group">
            <label className="admin-form-label">Primary Color</label>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <input type="color" value={settings.appearance.primaryColor} onChange={(e) => handleChange("appearance", "primaryColor", e.target.value)} style={{ width: 40, height: 40, border: "1px solid var(--admin-border)", borderRadius: "var(--radius-sm)", cursor: "pointer", padding: 0, background: "none" }} />
              <input className="admin-input" type="text" value={settings.appearance.primaryColor} onChange={(e) => handleChange("appearance", "primaryColor", e.target.value)} placeholder="#1A1625" style={{ flex: 1 }} />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Secondary Color</label>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <input type="color" value={settings.appearance.secondaryColor} onChange={(e) => handleChange("appearance", "secondaryColor", e.target.value)} style={{ width: 40, height: 40, border: "1px solid var(--admin-border)", borderRadius: "var(--radius-sm)", cursor: "pointer", padding: 0, background: "none" }} />
              <input className="admin-input" type="text" value={settings.appearance.secondaryColor} onChange={(e) => handleChange("appearance", "secondaryColor", e.target.value)} placeholder="#BFA6E8" style={{ flex: 1 }} />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Background Color</label>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <input type="color" value={settings.appearance.backgroundColor} onChange={(e) => handleChange("appearance", "backgroundColor", e.target.value)} style={{ width: 40, height: 40, border: "1px solid var(--admin-border)", borderRadius: "var(--radius-sm)", cursor: "pointer", padding: 0, background: "none" }} />
              <input className="admin-input" type="text" value={settings.appearance.backgroundColor} onChange={(e) => handleChange("appearance", "backgroundColor", e.target.value)} placeholder="#FFFFFF" style={{ flex: 1 }} />
            </div>
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Heading Font</label>
            <input className="admin-input" type="text" value={settings.appearance.headingFont} onChange={(e) => handleChange("appearance", "headingFont", e.target.value)} placeholder="Sora" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Body Font</label>
            <input className="admin-input" type="text" value={settings.appearance.bodyFont} onChange={(e) => handleChange("appearance", "bodyFont", e.target.value)} placeholder="Inter" />
          </div>
          <div className="admin-form-group">
            <label className="admin-form-label">Border Radius</label>
            <input className="admin-input" type="text" value={settings.appearance.borderRadius} onChange={(e) => handleChange("appearance", "borderRadius", e.target.value)} placeholder="12px" />
          </div>
        </div>
        <div className="admin-form-group">
          <label style={{ display: "flex", alignItems: "center", gap: "0.625rem", cursor: "pointer", fontSize: "0.875rem" }}>
            <label className="admin-toggle">
              <input type="checkbox" checked={settings.appearance.darkMode} onChange={() => handleChange("appearance", "darkMode", !settings.appearance.darkMode)} />
              <span className="admin-toggle-slider" />
            </label>
            Dark Mode
          </label>
        </div>
      </div>
    ),
    seo: (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div className="admin-form-group" style={{ gridColumn: "1 / -1" }}>
            <label className="admin-form-label">Meta Title</label>
            <input className="admin-input" type="text" value={settings.seo.metaTitle} onChange={(e) => handleChange("seo", "metaTitle", e.target.value)} placeholder="Meta title" maxLength={60} />
            <div className="admin-seo-counter">{(settings.seo.metaTitle || "").length}/60</div>
          </div>
          <div className="admin-form-group" style={{ gridColumn: "1 / -1" }}>
            <label className="admin-form-label">Meta Description</label>
            <textarea className="admin-textarea" rows={3} value={settings.seo.metaDescription} onChange={(e) => handleChange("seo", "metaDescription", e.target.value)} placeholder="Meta description" maxLength={160} />
            <div className="admin-seo-counter">{(settings.seo.metaDescription || "").length}/160</div>
          </div>
        </div>
        <TagInput tags={settings.seo.keywords || []} onChange={(tags) => handleChange("seo", "keywords", tags)} label="Keywords" placeholder="Add keyword..." />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}>
          <ImageUploader value={settings.seo.ogImage} onChange={(val) => handleChange("seo", "ogImage", val)} label="OG Image" aspectRatio="1.91/1" />
          <ImageUploader value={settings.seo.twitterCard} onChange={(val) => handleChange("seo", "twitterCard", val)} label="Twitter Card Image" aspectRatio="2/1" />
        </div>
      </div>
    ),
    homepage: (
      <div>
        <p style={{ fontSize: "0.8125rem", color: "var(--admin-text-secondary)", marginBottom: "1rem" }}>
          Toggle which sections appear on your portfolio homepage.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          {allHomepageSections.map((section) => (
            <label key={section} style={{
              display: "flex", alignItems: "center", gap: "0.625rem",
              padding: "0.75rem 1rem", border: "1px solid var(--admin-border)",
              borderRadius: "var(--radius-sm)", cursor: "pointer",
              background: settings.homepageSections[section] ? "var(--admin-bg)" : "transparent",
              transition: "var(--transition-fast)",
            }}>
              <label className="admin-toggle">
                <input type="checkbox" checked={!!settings.homepageSections[section]} onChange={() => handleChange("homepage", section, !settings.homepageSections[section])} />
                <span className="admin-toggle-slider" />
              </label>
              <span style={{ fontSize: "0.875rem", fontWeight: 500, textTransform: "capitalize" }}>{section.replace(/([A-Z])/g, " $1").trim()}</span>
            </label>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Settings</h2>
          <p className="admin-page-subtitle">Configure your portfolio website</p>
        </div>
        <button onClick={() => handleSaveSection(activeTab)} className="admin-btn admin-btn-primary" disabled={saving}>
          <Save size={16} /> {saving ? "Saving..." : `Save ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
        </button>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveTab(s.id)}
            className={`admin-btn ${activeTab === s.id ? "admin-btn-primary" : "admin-btn-secondary"}`}
            style={{ minHeight: 36 }}
          >
            <s.icon size={16} />
            {s.label}
          </button>
        ))}
      </div>

      <div className="admin-card">
        {tabContent[activeTab]}
      </div>
    </div>
  );
}
