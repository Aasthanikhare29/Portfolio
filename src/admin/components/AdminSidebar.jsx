import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, FolderOpen, BookOpen, PenLine, Wrench,
  Briefcase, GraduationCap, MessageSquare, Star, Settings,
  User, FileText, ExternalLink, LogOut, ChevronLeft, ChevronRight,
  Menu, X, Layers, Link as LinkIcon,
} from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";

const menuItems = [
  { section: "Content", items: [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/projects", label: "Projects", icon: FolderOpen },
    { path: "/admin/case-studies", label: "Case Studies", icon: Layers },
    { path: "/admin/blogs", label: "Blogs", icon: BookOpen },
    { path: "/admin/skills", label: "Skills", icon: Wrench },
    { path: "/admin/experience", label: "Experience", icon: Briefcase },
    { path: "/admin/education", label: "Education", icon: GraduationCap },
    { path: "/admin/testimonials", label: "Testimonials", icon: Star },
    { path: "/admin/services", label: "Services", icon: PenLine },
    { path: "/admin/messages", label: "Messages", icon: MessageSquare },
  ]},
  { section: "Settings", items: [
    { path: "/admin/profile", label: "Profile", icon: User },
    { path: "/admin/resume", label: "Resume", icon: FileText },
    { path: "/admin/social-links", label: "Social Links", icon: LinkIcon },
    { path: "/admin/settings", label: "Settings", icon: Settings },
  ]},
];

export default function AdminSidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAdminAuth();

  const isActive = (path) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const sidebarContent = (
    <div style={{
      display: "flex", flexDirection: "column", height: "100%",
    }}>
      <div style={{
        padding: collapsed ? "1rem 0" : "1rem 1.25rem",
        display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        {!collapsed && (
          <Link to="/admin" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.625rem" }}>
            <div style={{
              width: 32, height: 32, borderRadius: "var(--radius-sm)",
              background: "var(--lavender-deep)", display: "flex",
              alignItems: "center", justifyContent: "center",
              color: "white", fontWeight: 700, fontSize: "0.875rem",
              fontFamily: "var(--font-heading)",
            }}>AN</div>
            <div>
              <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "white", fontFamily: "var(--font-heading)", lineHeight: 1.2 }}>Aastha</div>
              <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>Admin Panel</div>
            </div>
          </Link>
        )}
        {collapsed && (
          <Link to="/admin" aria-label="Dashboard">
            <div style={{
              width: 32, height: 32, borderRadius: "var(--radius-sm)",
              background: "var(--lavender-deep)", display: "flex",
              alignItems: "center", justifyContent: "center",
              color: "white", fontWeight: 700, fontSize: "0.875rem",
              fontFamily: "var(--font-heading)",
            }}>AN</div>
          </Link>
        )}
        {!collapsed && (
          <button onClick={onToggle} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", padding: "4px", display: "flex" }} aria-label="Collapse sidebar">
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      <nav style={{ flex: 1, overflow: "auto", padding: collapsed ? "0.5rem 0" : "0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {menuItems.map((group) => (
          <div key={group.section}>
            {!collapsed && (
              <div style={{
                padding: "0.75rem 0.75rem 0.375rem", fontSize: "0.65rem",
                fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.25)",
              }}>{group.section}</div>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => mobileOpen && onMobileClose()}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    padding: collapsed ? "0.625rem 0" : "0.5rem 0.75rem",
                    margin: "1px 0",
                    borderRadius: "var(--radius-sm)",
                    textDecoration: "none",
                    color: active ? "white" : "rgba(255,255,255,0.55)",
                    background: active ? "rgba(191, 166, 232, 0.15)" : "transparent",
                    transition: "all 0.15s ease",
                    justifyContent: collapsed ? "center" : "flex-start",
                    position: "relative",
                  }}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={18} strokeWidth={active ? 2 : 1.5} style={{ flexShrink: 0 }} />
                  {!collapsed && <span style={{ fontSize: "0.8125rem", fontWeight: active ? 600 : 400 }}>{item.label}</span>}
                  {active && !collapsed && (
                    <div style={{
                      position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
                      width: 3, height: 20, borderRadius: "0 2px 2px 0",
                      background: "var(--lavender-deep)",
                    }} />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.08)", padding: collapsed ? "0.5rem 0" : "0.75rem",
        display: "flex", flexDirection: "column", gap: "2px",
      }}>
        <a href="/" target="_blank" rel="noopener noreferrer" style={{
          display: "flex", alignItems: "center", gap: "0.75rem",
          padding: collapsed ? "0.5rem 0" : "0.5rem 0.75rem",
          borderRadius: "var(--radius-sm)", textDecoration: "none",
          color: "rgba(255,255,255,0.45)", justifyContent: collapsed ? "center" : "flex-start",
          transition: "all 0.15s ease", fontSize: "0.8125rem",
        }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          title={collapsed ? "View Portfolio" : undefined}
        >
          <ExternalLink size={16} />
          {!collapsed && <span>View Portfolio</span>}
        </a>
        <button onClick={handleLogout} style={{
          display: "flex", alignItems: "center", gap: "0.75rem",
          padding: collapsed ? "0.5rem 0" : "0.5rem 0.75rem",
          borderRadius: "var(--radius-sm)", textDecoration: "none",
          color: "rgba(255,255,255,0.45)", justifyContent: collapsed ? "center" : "flex-start",
          transition: "all 0.15s ease", fontSize: "0.8125rem",
          background: "none", border: "none", cursor: "pointer", width: "100%", fontFamily: "var(--font-body)",
        }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut size={16} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside style={{
        position: "fixed", top: 0, left: 0, height: "100vh",
        width: collapsed ? "var(--admin-sidebar-collapsed)" : "var(--admin-sidebar-w)",
        background: "var(--admin-sidebar-bg)", zIndex: 100,
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
      }}>
        {sidebarContent}
      </aside>

      {collapsed && (
        <button onClick={onToggle} style={{
          position: "fixed", left: "var(--admin-sidebar-collapsed)", top: "18px",
          transform: "translateX(-50%)",
          width: "24px", height: "24px", borderRadius: "50%",
          background: "var(--admin-sidebar-bg)", border: "none",
          cursor: "pointer", zIndex: 101,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "rgba(255,255,255,0.5)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
        }} aria-label="Expand sidebar">
          <ChevronRight size={14} />
        </button>
      )}

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200,
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, bottom: 0, width: "280px",
            background: "var(--admin-sidebar-bg)", animation: "slideInLeft 0.25s ease",
            display: "flex", flexDirection: "column",
          }}>
            <div style={{ padding: "0.75rem", display: "flex", justifyContent: "flex-end" }}>
              <button onClick={onMobileClose} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", padding: "4px" }} aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
