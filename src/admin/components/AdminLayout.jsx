import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

const pageTitles = {
  "/admin": "Dashboard",
  "/admin/projects": "Projects",
  "/admin/projects/new": "Add Project",
  "/admin/case-studies": "Case Studies",
  "/admin/case-studies/new": "Add Case Study",
  "/admin/blogs": "Blogs",
  "/admin/blogs/new": "New Blog Post",
  "/admin/skills": "Skills",
  "/admin/experience": "Experience",
  "/admin/education": "Education",
  "/admin/testimonials": "Testimonials",
  "/admin/services": "Services",
  "/admin/messages": "Messages",
  "/admin/profile": "Profile",
  "/admin/resume": "Resume",
  "/admin/settings": "Settings",
};

export default function AdminLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    try { return localStorage.getItem("admin_sidebar_collapsed") === "true"; }
    catch { return false; }
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    try { localStorage.setItem("admin_sidebar_collapsed", sidebarCollapsed); }
    catch {}
  }, [sidebarCollapsed]);

  useEffect(() => {
    document.body.classList.add("admin-body");
    return () => document.body.classList.remove("admin-body");
  }, []);

  const basePath = "/" + location.pathname.split("/").slice(1, 3).join("/");
  const title = pageTitles[location.pathname] || pageTitles[basePath] || "Admin";

  return (
    <div className="admin-layout">
      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          .admin-view-portfolio { display: none !important; }
          .admin-profile-name { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .admin-view-portfolio { display: inline-flex !important; }
          .admin-profile-name { display: block !important; }
        }
      `}</style>
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className={`admin-main ${sidebarCollapsed ? "collapsed" : ""}`}>
        <AdminHeader
          title={title}
          onMenuToggle={() => setMobileOpen(true)}
          collapsed={sidebarCollapsed}
        />
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
