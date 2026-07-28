import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, Bell, ExternalLink, LogOut, User, ChevronDown } from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function AdminHeader({ title, onMenuToggle, collapsed }) {
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = () => {
    setProfileOpen(false);
    logout();
    navigate("/admin/login");
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const pageMap = [
        { keywords: ["project"], path: "/admin/projects" },
        { keywords: ["blog", "post", "article"], path: "/admin/blogs" },
        { keywords: ["case", "study"], path: "/admin/case-studies" },
        { keywords: ["skill"], path: "/admin/skills" },
        { keywords: ["experience", "job", "work"], path: "/admin/experience" },
        { keywords: ["education", "school", "college", "degree"], path: "/admin/education" },
        { keywords: ["testimonial", "review"], path: "/admin/testimonials" },
        { keywords: ["service"], path: "/admin/services" },
        { keywords: ["message", "inbox"], path: "/admin/messages" },
        { keywords: ["profile", "about"], path: "/admin/profile" },
        { keywords: ["resume", "cv"], path: "/admin/resume" },
        { keywords: ["social", "link"], path: "/admin/social-links" },
        { keywords: ["setting", "config"], path: "/admin/settings" },
        { keywords: ["dashboard", "home"], path: "/admin" },
      ];
      const match = pageMap.find(({ keywords }) => keywords.some(k => q.includes(k)));
      setSearchOpen(false);
      setSearchQuery("");
      navigate(match ? match.path : "/admin");
    }
  };

  return (
    <header style={{
      position: "fixed", top: 0, right: 0, left: collapsed ? "var(--admin-sidebar-collapsed)" : "var(--admin-sidebar-w)",
      height: "var(--admin-header-h)", background: "rgba(255,255,255,0.85)",
      backdropFilter: "blur(12px)", borderBottom: "1px solid var(--admin-border)",
      zIndex: 50, transition: "left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 1.5rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button onClick={onMenuToggle} style={{
          display: "none", background: "none", border: "none", cursor: "pointer",
          padding: "4px", color: "var(--admin-text-secondary)",
        }} className="mobile-menu-btn" aria-label="Toggle menu">
          <Menu size={20} />
        </button>
        <div>
          <h1 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--admin-text)", fontFamily: "var(--font-heading)" }}>{title || "Dashboard"}</h1>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div className="admin-search" style={{ width: searchOpen ? "240px" : "36px", transition: "width 0.25s ease" }}>
          {searchOpen ? (
            <div style={{ position: "relative" }}>
              <Search size={14} className="search-icon" style={{ left: "0.625rem" }} />
              <input
                type="text" placeholder="Search pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                onBlur={() => setTimeout(() => { setSearchOpen(false); setSearchQuery(""); }, 200)}
                autoFocus
                style={{ width: "100%", fontSize: "0.8125rem" }}
              />
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} style={{
              width: 36, height: 36, borderRadius: "var(--radius-sm)", border: "none",
              background: "transparent", cursor: "pointer", display: "flex",
              alignItems: "center", justifyContent: "center",
              color: "var(--admin-text-secondary)",
            }} aria-label="Open search">
              <Search size={16} />
            </button>
          )}
        </div>

        <a href="/" target="_blank" rel="noopener noreferrer" style={{
          display: "none", alignItems: "center", gap: "0.375rem",
          padding: "0.4rem 0.75rem", fontSize: "0.8125rem", fontWeight: 500,
          borderRadius: "var(--radius-sm)", color: "var(--admin-text-secondary)",
          textDecoration: "none", border: "1px solid var(--admin-border)",
          transition: "var(--transition-fast)",
        }}
          className="admin-view-portfolio"
          onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--lavender-deep)"}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--admin-border)"}
        >
          <ExternalLink size={14} />
          <span>View Portfolio</span>
        </a>

        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button onClick={() => setProfileOpen(!profileOpen)} style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.375rem", borderRadius: "var(--radius-sm)",
            border: "none", background: profileOpen ? "var(--admin-bg)" : "transparent",
            cursor: "pointer", transition: "var(--transition-fast)",
          }} aria-label="Profile menu" aria-expanded={profileOpen}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "var(--lavender-deep)", display: "flex",
              alignItems: "center", justifyContent: "center",
              color: "white", fontSize: "0.75rem", fontWeight: 600,
            }}>
              A
            </div>
            <div style={{ display: "none", textAlign: "left" }} className="admin-profile-name">
              <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--admin-text)", lineHeight: 1.2 }}>Admin</div>
              <div style={{ fontSize: "0.65rem", color: "var(--admin-text-secondary)" }}>{user?.email}</div>
            </div>
            <ChevronDown size={14} style={{ color: "var(--admin-text-secondary)", display: "none" }} className="admin-profile-name" />
          </button>

          {profileOpen && (
            <div style={{
              position: "absolute", top: "100%", right: 0, marginTop: "0.375rem",
              background: "var(--admin-card-bg)", border: "1px solid var(--admin-border)",
              borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-lg)",
              minWidth: "200px", padding: "0.375rem", zIndex: 60,
            }}>
              <div style={{ padding: "0.625rem 0.75rem", borderBottom: "1px solid var(--admin-border)", marginBottom: "0.25rem" }}>
                <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--admin-text)" }}>Admin</div>
                <div style={{ fontSize: "0.75rem", color: "var(--admin-text-secondary)" }}>{user?.email}</div>
              </div>
              <Link to="/admin/profile" onClick={() => setProfileOpen(false)} style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                padding: "0.5rem 0.75rem", borderRadius: "var(--radius-sm)",
                textDecoration: "none", color: "var(--admin-text)", fontSize: "0.8125rem",
                transition: "var(--transition-fast)",
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--admin-bg)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <User size={14} /> Edit Profile
              </Link>
              <button onClick={handleLogout} style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                padding: "0.5rem 0.75rem", borderRadius: "var(--radius-sm)",
                width: "100%", border: "none", background: "transparent",
                cursor: "pointer", color: "var(--color-error)", fontSize: "0.8125rem",
                fontFamily: "var(--font-body)", transition: "var(--transition-fast)",
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--color-error-light)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
