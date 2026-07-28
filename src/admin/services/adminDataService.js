import {
  projectApi, blogApi, skillApi, experienceApi, educationApi,
  testimonialApi, serviceApi, contactApi, certificateApi, settingsApi,
  caseStudyApi, profileApi, uploadApi,
} from "../../services/api";

const STORAGE_KEYS = {
  projects: 'portfolio_projects',
  blogs: 'portfolio_blogs',
  skills: 'portfolio_skills',
  experience: 'portfolio_experience',
  education: 'portfolio_education',
  testimonials: 'portfolio_testimonials',
  services: 'portfolio_services',
  messages: 'portfolio_messages',
  profile: 'portfolio_profile',
  resume: 'portfolio_resume',
  socialLinks: 'portfolio_socialLinks',
  settings: 'portfolio_settings',
  caseStudies: 'portfolio_caseStudies',
};

function generateId() {
  try { return crypto.randomUUID(); } catch { return Date.now().toString(36) + Math.random().toString(36).slice(2, 9); }
}

function getData(key) {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; } catch { return null; }
}

function setData(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data)); return true; } catch { return false; }
}

function getAll(key) { const d = getData(key); return Array.isArray(d) ? d : []; }

function getById(key, id) { return getAll(key).find(item => item.id === id) || null; }

function addItem(key, item) {
  const items = getAll(key);
  const newItem = { ...item, id: item.id || generateId(), createdAt: item.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString() };
  items.push(newItem); setData(key, items); return newItem;
}

function updateItem(key, id, updates) {
  const items = getAll(key); const idx = items.findIndex(item => item.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...updates, updatedAt: new Date().toISOString() };
  setData(key, items); return items[idx];
}

function deleteItem(key, id) {
  const items = getAll(key); const filtered = items.filter(item => item.id !== id);
  if (filtered.length === items.length) return false;
  setData(key, filtered); return true;
}

function toggleField(key, id, field) { const item = getById(key, id); return item ? updateItem(key, id, { [field]: !item[field] }) : null; }

function reorderItems(key, orderedIds) {
  const items = getAll(key); const map = {}; items.forEach(item => { map[item.id] = item; });
  const reordered = orderedIds.map(id => map[id]).filter(Boolean);
  setData(key, reordered); return reordered;
}

const defaultProfile = {
  fullName: 'Aastha Nikhare',
  professionalTitle: 'UI & Frontend Developer',
  heroHeading: 'I design thoughtful interfaces and bring them to life with code.',
  heroSubheading: 'UI and Frontend Developer who enjoys transforming ideas into colorful, responsive and easy-to-use digital experiences.',
  shortIntro: 'Hi there! I\'m Aastha — a UI and Frontend Developer who loves turning ideas into clean, colorful and responsive digital experiences.',
  aboutDescription: 'Hi there! I\'m Aastha — a UI and Frontend Developer who loves turning ideas into clean, colorful and responsive digital experiences.',
  profileImage: 'https://picsum.photos/seed/aastha-profile/400/400',
  aboutImage: 'https://picsum.photos/seed/aastha-hero/460/580',
  location: 'Nagpur, India',
  email: 'aastha@example.com',
  phone: '',
  availabilityStatus: 'Open to UI & Frontend opportunities',
  yearsOfExperience: 3,
  projectsCompleted: 10,
  resumeLink: '/resume.pdf',
  primaryCtaText: 'View My Projects',
  primaryCtaLink: '#projects',
  secondaryCtaText: 'Download Resume',
  secondaryCtaLink: '/resume.pdf',
  funFacts: ['Powered by curiosity and creativity', 'Coffee enthusiast', 'Love exploring new frontend techniques'],
  personalValues: ['Clean code', 'Thoughtful design', 'Continuous learning'],
  interests: ['UI Design', 'Frontend Development', 'Design Systems', 'Accessibility'],
  achievements: [],
};

const defaultSettings = {
  portfolioName: 'Aastha Nikhare',
  websiteTitle: 'Aastha Nikhare — UI & Frontend Developer',
  tagline: 'Designed with curiosity, coded with care',
  contactEmail: 'aastha@example.com',
  copyrightText: '© 2026 Aastha Nikhare. All rights reserved.',
  favicon: '',
  logo: '',
  defaultProfileImage: 'https://picsum.photos/seed/default-avatar/200/200',
  appearance: {
    primaryColor: '#1A1625', secondaryColor: '#BFA6E8',
    accentColors: { pink: '#FFE4EF', mint: '#E0F7EB', lavender: '#EDE4FF', blue: '#E3EEFF', yellow: '#FFF5CC' },
    backgroundColor: '#FFFFFF', headingFont: 'Sora', bodyFont: 'Inter',
    borderRadius: '12px', darkMode: false,
  },
  seo: {
    metaTitle: 'Aastha Nikhare — UI & Frontend Developer',
    metaDescription: 'Portfolio of Aastha Nikhare, a UI and Frontend Developer.',
    keywords: 'UI designer, frontend developer, React developer, portfolio, web developer',
    ogImage: '', twitterCard: '',
  },
  homepageSections: {
    hero: true, about: true, skills: true, projects: true, caseStudies: false,
    experience: true, services: false, testimonials: true, blog: true, contact: true,
  },
};

const defaultSocialLinks = [
  { id: 'soc-1', platform: 'GitHub', url: 'https://github.com/', icon: 'FiGithub', order: 1, visible: true },
  { id: 'soc-2', platform: 'LinkedIn', url: 'https://linkedin.com/', icon: 'FiLinkedin', order: 2, visible: true },
  { id: 'soc-3', platform: 'Email', url: 'mailto:aastha@example.com', icon: 'FiMail', order: 3, visible: true },
  { id: 'soc-4', platform: 'Instagram', url: 'https://instagram.com/', icon: 'FiInstagram', order: 4, visible: false },
  { id: 'soc-5', platform: 'Behance', url: 'https://behance.net/', icon: 'FiBehance', order: 5, visible: false },
  { id: 'soc-6', platform: 'Dribbble', url: 'https://dribbble.com/', icon: 'FiDribbble', order: 6, visible: false },
];

const defaultResume = {
  fileName: 'Aastha_Nikhare_Resume.pdf', fileSize: '245 KB', fileUrl: '/resume.pdf',
  uploadDate: new Date().toISOString(), visible: true,
};

function seedData() {
  if (!getData(STORAGE_KEYS.profile)) setData(STORAGE_KEYS.profile, defaultProfile);
  if (!getData(STORAGE_KEYS.settings)) setData(STORAGE_KEYS.settings, defaultSettings);
  if (!getData(STORAGE_KEYS.socialLinks)) setData(STORAGE_KEYS.socialLinks, defaultSocialLinks);
  if (!getData(STORAGE_KEYS.resume)) setData(STORAGE_KEYS.resume, defaultResume);
  if (!getData(STORAGE_KEYS.messages)) setData(STORAGE_KEYS.messages, []);
}

seedData();

/* ── Portfolio Storage (localStorage) ── */
export const portfolioStorageService = {
  getProfile: () => getData(STORAGE_KEYS.profile) || defaultProfile,
  updateProfile: (data) => setData(STORAGE_KEYS.profile, { ...getData(STORAGE_KEYS.profile), ...data, updatedAt: new Date().toISOString() }),
  getSettings: () => getData(STORAGE_KEYS.settings) || defaultSettings,
  updateSettings: (data) => setData(STORAGE_KEYS.settings, { ...getData(STORAGE_KEYS.settings), ...data, updatedAt: new Date().toISOString() }),
  getResume: () => getData(STORAGE_KEYS.resume) || defaultResume,
  updateResume: (data) => setData(STORAGE_KEYS.resume, { ...getData(STORAGE_KEYS.resume), ...data, updatedAt: new Date().toISOString() }),
  getSocialLinks: () => getAll(STORAGE_KEYS.socialLinks),
  updateSocialLinks: (links) => setData(STORAGE_KEYS.socialLinks, links),
  addSocialLink: (link) => addItem(STORAGE_KEYS.socialLinks, link),
  updateSocialLink: (id, updates) => updateItem(STORAGE_KEYS.socialLinks, id, updates),
  deleteSocialLink: (id) => deleteItem(STORAGE_KEYS.socialLinks, id),
};

/* ── API-driven Data Services ──
 * Each service attempts the API first. On failure, falls back to localStorage.
 * Admin pages call these synchronously but the API calls are fire-and-forget
 * to sync data while localStorage provides instant render.
 */

function apiFallback(apiFn, storageKey, fallback = []) {
  apiFn().then(data => { if (data) setData(storageKey, data); }).catch(() => {});
  return getAll(storageKey).length ? getAll(storageKey) : fallback;
}

function apiWrite(apiFn, storageKey, id, item) {
  apiFn().catch(() => {});
  if (id && item) updateItem(storageKey, id, item);
  else if (item) addItem(storageKey, item);
}

/* Projects */
export const projectService = {
  getAll: () => {
    projectApi.getAll().then(data => { if (Array.isArray(data)) setData(STORAGE_KEYS.projects, data); }).catch(() => {});
    return getAll(STORAGE_KEYS.projects);
  },
  getById: (id) => getById(STORAGE_KEYS.projects, id),
  add: (project) => { const p = addItem(STORAGE_KEYS.projects, project); projectApi.create(convertProject(p)).catch(() => {}); return p; },
  update: (id, updates) => { const u = updateItem(STORAGE_KEYS.projects, id, updates); if (u) projectApi.update(id, convertProject(u)).catch(() => {}); return u; },
  delete: (id) => { projectApi.delete(id).catch(() => {}); return deleteItem(STORAGE_KEYS.projects, id); },
  togglePublish: (id) => toggleField(STORAGE_KEYS.projects, id, 'published'),
  toggleFeatured: (id) => toggleField(STORAGE_KEYS.projects, id, 'featured'),
  duplicate: (id) => {
    const orig = getById(STORAGE_KEYS.projects, id);
    if (!orig) return null;
    const { id: _, createdAt, updatedAt, ...rest } = orig;
    return addItem(STORAGE_KEYS.projects, { ...rest, title: `${rest.title} (Copy)`, slug: `${rest.slug}-copy`, published: false });
  },
};

/* Blogs */
export const blogService = {
  getAll: () => {
    blogApi.getAll().then(data => { if (Array.isArray(data)) setData(STORAGE_KEYS.blogs, data); }).catch(() => {});
    return getAll(STORAGE_KEYS.blogs);
  },
  getById: (id) => getById(STORAGE_KEYS.blogs, id),
  getBySlug: (slug) => getAll(STORAGE_KEYS.blogs).find(b => b.slug === slug) || null,
  add: (blog) => { const b = addItem(STORAGE_KEYS.blogs, blog); blogApi.create(convertBlog(b)).catch(() => {}); return b; },
  update: (id, updates) => { const u = updateItem(STORAGE_KEYS.blogs, id, updates); if (u) blogApi.update(id, convertBlog(u)).catch(() => {}); return u; },
  delete: (id) => { blogApi.delete(id).catch(() => {}); return deleteItem(STORAGE_KEYS.blogs, id); },
  togglePublish: (id) => toggleField(STORAGE_KEYS.blogs, id, 'published'),
  toggleFeatured: (id) => toggleField(STORAGE_KEYS.blogs, id, 'featured'),
};

/* Skills */
export const skillService = {
  getAll: () => {
    skillApi.getAll().then(data => { if (Array.isArray(data)) setData(STORAGE_KEYS.skills, data); }).catch(() => {});
    return getAll(STORAGE_KEYS.skills);
  },
  getById: (id) => getById(STORAGE_KEYS.skills, id),
  add: (skill) => { const s = addItem(STORAGE_KEYS.skills, skill); skillApi.create(s).catch(() => {}); return s; },
  update: (id, updates) => { const u = updateItem(STORAGE_KEYS.skills, id, updates); if (u) skillApi.update(id, u).catch(() => {}); return u; },
  delete: (id) => { skillApi.delete(id).catch(() => {}); return deleteItem(STORAGE_KEYS.skills, id); },
  toggleVisibility: (id) => toggleField(STORAGE_KEYS.skills, id, 'visible'),
  toggleFeatured: (id) => toggleField(STORAGE_KEYS.skills, id, 'featured'),
  reorder: (orderedIds) => reorderItems(STORAGE_KEYS.skills, orderedIds),
};

/* Experience */
export const experienceService = {
  getAll: () => {
    experienceApi.getAll().then(data => { if (Array.isArray(data)) setData(STORAGE_KEYS.experience, data); }).catch(() => {});
    return getAll(STORAGE_KEYS.experience);
  },
  getById: (id) => getById(STORAGE_KEYS.experience, id),
  add: (exp) => { const e = addItem(STORAGE_KEYS.experience, exp); experienceApi.create(e).catch(() => {}); return e; },
  update: (id, updates) => { const u = updateItem(STORAGE_KEYS.experience, id, updates); if (u) experienceApi.update(id, u).catch(() => {}); return u; },
  delete: (id) => { experienceApi.delete(id).catch(() => {}); return deleteItem(STORAGE_KEYS.experience, id); },
  toggleVisibility: (id) => toggleField(STORAGE_KEYS.experience, id, 'visible'),
};

/* Education */
export const educationService = {
  getAll: () => {
    educationApi.getAll().then(data => { if (Array.isArray(data)) setData(STORAGE_KEYS.education, data); }).catch(() => {});
    return getAll(STORAGE_KEYS.education);
  },
  getById: (id) => getById(STORAGE_KEYS.education, id),
  add: (edu) => { const e = addItem(STORAGE_KEYS.education, edu); educationApi.create(e).catch(() => {}); return e; },
  update: (id, updates) => { const u = updateItem(STORAGE_KEYS.education, id, updates); if (u) educationApi.update(id, u).catch(() => {}); return u; },
  delete: (id) => { educationApi.delete(id).catch(() => {}); return deleteItem(STORAGE_KEYS.education, id); },
  toggleVisibility: (id) => toggleField(STORAGE_KEYS.education, id, 'visible'),
};

/* Testimonials */
export const testimonialService = {
  getAll: () => {
    testimonialApi.getAll().then(data => { if (Array.isArray(data)) setData(STORAGE_KEYS.testimonials, data); }).catch(() => {});
    return getAll(STORAGE_KEYS.testimonials);
  },
  getById: (id) => getById(STORAGE_KEYS.testimonials, id),
  add: (t) => { const item = addItem(STORAGE_KEYS.testimonials, t); testimonialApi.create(item).catch(() => {}); return item; },
  update: (id, updates) => { const u = updateItem(STORAGE_KEYS.testimonials, id, updates); if (u) testimonialApi.update(id, u).catch(() => {}); return u; },
  delete: (id) => { testimonialApi.delete(id).catch(() => {}); return deleteItem(STORAGE_KEYS.testimonials, id); },
  toggleFeatured: (id) => toggleField(STORAGE_KEYS.testimonials, id, 'featured'),
  toggleVisibility: (id) => toggleField(STORAGE_KEYS.testimonials, id, 'visible'),
  approve: (id) => updateItem(STORAGE_KEYS.testimonials, id, { approved: true }),
  reject: (id) => updateItem(STORAGE_KEYS.testimonials, id, { approved: false }),
};

/* Services */
export const serviceService = {
  getAll: () => {
    serviceApi.getAll().then(data => { if (Array.isArray(data)) setData(STORAGE_KEYS.services, data); }).catch(() => {});
    return getAll(STORAGE_KEYS.services);
  },
  getById: (id) => getById(STORAGE_KEYS.services, id),
  add: (s) => { const item = addItem(STORAGE_KEYS.services, s); serviceApi.create(item).catch(() => {}); return item; },
  update: (id, updates) => { const u = updateItem(STORAGE_KEYS.services, id, updates); if (u) serviceApi.update(id, u).catch(() => {}); return u; },
  delete: (id) => { serviceApi.delete(id).catch(() => {}); return deleteItem(STORAGE_KEYS.services, id); },
  toggleVisibility: (id) => toggleField(STORAGE_KEYS.services, id, 'visible'),
  toggleFeatured: (id) => toggleField(STORAGE_KEYS.services, id, 'featured'),
};

/* Messages */
export const messageService = {
  getAll: () => {
    contactApi
      .getAll()
      .then((data) => {
        if (Array.isArray(data)) setData(STORAGE_KEYS.messages, data);
      })
      .catch(() => {});
    return getAll(STORAGE_KEYS.messages);
  },
  getById: (id) => getById(STORAGE_KEYS.messages, id),
  add: (message) => {
    const m = addItem(STORAGE_KEYS.messages, message);
    contactApi.submit(message).catch(() => {});
    return m;
  },
  delete: (id) => {
    contactApi.delete(id).catch(() => {});
    return deleteItem(STORAGE_KEYS.messages, id);
  },
  markRead: (id) => {
    contactApi.markRead(id).catch(() => {});
    return updateItem(STORAGE_KEYS.messages, id, { read: true });
  },
  markUnread: (id) =>
    updateItem(STORAGE_KEYS.messages, id, { read: false }),
  toggleStar: (id) => toggleField(STORAGE_KEYS.messages, id, 'starred'),
  archive: (id) => updateItem(STORAGE_KEYS.messages, id, { archived: true }),
  unarchive: (id) => updateItem(STORAGE_KEYS.messages, id, { archived: false }),
};

/* Case Studies */
export const caseStudyService = {
  getAll: () => {
    caseStudyApi.getAll().then(data => { if (Array.isArray(data)) setData(STORAGE_KEYS.caseStudies, data); }).catch(() => {});
    return getAll(STORAGE_KEYS.caseStudies);
  },
  getById: (id) => getById(STORAGE_KEYS.caseStudies, id),
  add: (cs) => { const item = addItem(STORAGE_KEYS.caseStudies, cs); caseStudyApi.create(item).catch(() => {}); return item; },
  update: (id, updates) => { const u = updateItem(STORAGE_KEYS.caseStudies, id, updates); if (u) caseStudyApi.update(id, u).catch(() => {}); return u; },
  delete: (id) => { caseStudyApi.delete(id).catch(() => {}); return deleteItem(STORAGE_KEYS.caseStudies, id); },
  togglePublish: (id) => toggleField(STORAGE_KEYS.caseStudies, id, 'published'),
  toggleFeatured: (id) => toggleField(STORAGE_KEYS.caseStudies, id, 'featured'),
};

/* ── Activity Log ── */
export function getActivityLog() {
  const all = getData('portfolio_activity') || [];
  return all.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 20);
}

export function addActivity(action, details) {
  const all = getData('portfolio_activity') || [];
  all.unshift({ id: generateId(), action, details, timestamp: new Date().toISOString() });
  if (all.length > 100) all.length = 100;
  setData('portfolio_activity', all);
}

/* ── Dashboard Stats ── */
export function getDashboardStats() {
  const projects = getAll(STORAGE_KEYS.projects);
  const blogs = getAll(STORAGE_KEYS.blogs);
  const caseStudies = getAll(STORAGE_KEYS.caseStudies);
  const messages = getAll(STORAGE_KEYS.messages);
  const testimonials = getAll(STORAGE_KEYS.testimonials);
  const skills = getAll(STORAGE_KEYS.skills);
  return {
    totalProjects: projects.length, publishedProjects: projects.filter(p => p.published).length,
    draftProjects: projects.filter(p => !p.published).length, totalBlogs: blogs.length,
    publishedBlogs: blogs.filter(b => b.published).length, totalCaseStudies: caseStudies.length,
    unreadMessages: messages.filter(m => !m.read && !m.archived).length, totalMessages: messages.length,
    totalTestimonials: testimonials.length, totalSkills: skills.length,
    featuredProjects: projects.filter(p => p.featured).length, featuredBlogs: blogs.filter(b => b.featured).length,
  };
}

export function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  try { return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }); }
  catch { return dateStr; }
}

export function formatDateShort(dateStr) {
  if (!dateStr) return '';
  try { return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
  catch { return dateStr; }
}

export { STORAGE_KEYS };

/* ── Public Portfolio Data Bridge ── */
import staticProjects from "../../data/projects";
import staticTestimonials from "../../data/testimonials";
import staticExperiences from "../../data/experiences";
import { frontendSkills, designSkills, toolsSkills, softSkills } from "../../data/skills";
import staticChallenges from "../../data/challenges";

function ensureArray(arr) { return Array.isArray(arr) ? arr : []; }

function mergeWithStatic(service, staticData, idKey = "id", filterInvisible = false) {
  const stored = ensureArray(service.getAll());
  if (stored.length > 0) {
    if (filterInvisible) return stored.filter(item => item.visible !== false);
    return stored;
  }
  return ensureArray(staticData).map(item => ({
    ...item,
    published: item.published !== undefined ? item.published : true,
    visible: item.visible !== undefined ? item.visible : true,
    featured: item.featured || false,
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || new Date().toISOString(),
  }));
}

export const publicProjectService = {
  getAll: (onlyPublished = true) => {
    const projects = mergeWithStatic(projectService, staticProjects);
    return onlyPublished ? projects.filter(p => p.published !== false) : projects;
  },
  getById: (id) => {
    const projects = mergeWithStatic(projectService, staticProjects);
    return projects.find(p => p.id === id || p.slug === id) || null;
  },
  getFeatured: () => {
    const projects = mergeWithStatic(projectService, staticProjects);
    return projects.filter(p => p.published !== false && p.featured);
  },
  getHomepage: (limit = 3) => {
    const projects = mergeWithStatic(projectService, staticProjects);
    return projects.filter(p => p.published !== false).slice(0, limit);
  },
};

function normalizeTestimonial(t) {
  if (t.content && !t.quote) t.quote = t.content;
  else if (t.quote && !t.content) t.content = t.quote;
  return t;
}

export const publicTestimonialService = {
  getAll: () => {
    const stored = ensureArray(testimonialService.getAll()).map(normalizeTestimonial);
    if (stored.length > 0) return stored.filter(t => t.visible !== false && t.approved !== false);
    return ensureArray(staticTestimonials).map((t, i) => ({ ...t, visible: true, approved: true, order: i, featured: i === 0, createdAt: new Date().toISOString() }));
  },
  getFeatured: () => { const all = publicTestimonialService.getAll(); return all.filter(t => t.featured); },
};

export const publicExperienceService = {
  getAll: () => {
    const stored = ensureArray(experienceService.getAll());
    if (stored.length > 0) return stored.filter(e => e.visible !== false).sort((a, b) => (a.order || 0) - (b.order || 0));
    return ensureArray(staticExperiences).map((e, i) => ({ ...e, visible: true, order: i, current: false, responsibilities: [], employmentType: "Full-time", createdAt: new Date().toISOString() }));
  },
};

export const publicSkillService = {
  getGrouped: () => {
    const stored = ensureArray(skillService.getAll()).filter(s => s.visible !== false);
    if (stored.length > 0) {
      const groups = {}; stored.forEach(s => { const cat = s.category || "Other"; if (!groups[cat]) groups[cat] = []; groups[cat].push(s.name); });
      const order = ["Frontend", "UI/UX", "Tools", "Soft Skills", "Other"];
      const result = {}; order.forEach(cat => { if (groups[cat]) result[cat] = groups[cat]; });
      Object.keys(groups).forEach(cat => { if (!result[cat]) result[cat] = groups[cat]; });
      return result;
    }
    return { Frontend: frontendSkills, Design: designSkills, Tools: toolsSkills, "Soft Skills": softSkills };
  },
  getExpertise: () => {
    const stored = ensureArray(skillService.getAll()).filter(s => s.visible !== false);
    if (stored.length > 0) {
      const categories = [...new Set(stored.map(s => s.category))];
      return categories.map(cat => {
        const items = stored.filter(s => s.category === cat);
        return { id: cat?.toLowerCase().replace(/\s+/g, "-"), title: cat, description: `Proficient in ${items.map(s => s.name).join(", ")}`, skills: items.map(s => s.name), tools: [], accent: cat === "Frontend" ? "blue" : cat === "UI/UX" ? "pink" : cat === "Tools" ? "mint" : "lavender", icon: "Code" };
      });
    }
    return null;
  },
};

export const publicBlogService = {
  getAll: (onlyPublished = true) => {
    const stored = ensureArray(blogService.getAll());
    if (stored.length > 0) {
      const items = onlyPublished ? stored.filter(b => b.published !== false) : stored;
      return items.map(b => ({ ...b, date: b.publishDate || b.createdAt || b.date, coverImage: b.coverImage }));
    }
    return ensureArray(staticChallenges).map(c => ({
      id: c.id, slug: c.slug, title: c.title, subtitle: c.subtitle, excerpt: c.excerpt, content: c.content,
      coverImage: c.coverImage, author: c.author, authorImage: c.authorImage, date: c.date, category: c.category,
      tags: c.tags, difficulty: c.difficulty, featured: c.featured || false, published: true,
      readingTime: c.timeLimit || "30 min", createdAt: c.date ? new Date(c.date).toISOString() : new Date().toISOString(),
    }));
  },
  getBySlug: (slug) => { const blogs = publicBlogService.getAll(false); return blogs.find(b => b.slug === slug) || null; },
  getFeatured: () => { const blogs = publicBlogService.getAll(); return blogs.filter(b => b.featured); },
  getCategories: () => { const blogs = publicBlogService.getAll(false); const cats = [...new Set(blogs.map(b => b.category).filter(Boolean))]; return ["All", ...cats.sort()]; },
};

export const publicProfileService = { get: () => portfolioStorageService.getProfile() };
export const publicResumeService = { get: () => portfolioStorageService.getResume() };
export const publicSocialService = {
  getAll: () => { const links = ensureArray(getAll(STORAGE_KEYS.socialLinks)); return links.filter(l => l.visible !== false).sort((a, b) => (a.order || 0) - (b.order || 0)); },
  getByPlatform: (platform) => { const links = publicSocialService.getAll(); return links.find(l => l.platform?.toLowerCase() === platform?.toLowerCase()); },
};

/* ── Converter helpers ── */
function convertProject(p) {
  return {
    title: p.title, slug: p.slug, description: p.description, shortSummary: p.shortSummary,
    techStack: p.techStack, liveUrl: p.liveUrl, githubUrl: p.githubUrl, coverImage: p.coverImage,
    category: p.category, startDate: p.startDate, endDate: p.endDate, featured: p.featured, sortOrder: p.sortOrder,
    technologies: p.technologies?.map(t => typeof t === 'string' ? t : t.name) || [],
    features: p.features?.map(f => typeof f === 'string' ? f : f.feature) || [],
    galleryImages: p.galleryImages?.map(g => typeof g === 'string' ? g : g.url) || [],
    galleryCaptions: p.galleryImages?.map(g => g.caption)?.filter(Boolean) || [],
  };
}

function convertBlog(b) {
  return {
    title: b.title, slug: b.slug, content: b.content, excerpt: b.excerpt,
    coverImage: b.coverImage, readTime: b.readTime, published: b.published,
    tags: b.tags ? (typeof b.tags[0] === 'string' ? new Set(b.tags) : new Set(b.tags.map(t => t.name))) : new Set(),
  };
}
