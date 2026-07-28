import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FolderOpen, BookOpen, Layers, MessageSquare, Star, Wrench,
  Plus, PenLine, FileText, ExternalLink, Clock, ArrowUpRight,
  FileEdit,
} from "lucide-react";
import StatCard from "../components/StatCard";
import { getDashboardStats, getActivityLog, messageService, formatDate } from "../services/adminDataService";
import { projectApi, blogApi } from "../../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [p, b] = await Promise.all([projectApi.getAll(), blogApi.getAll()]);
        const s = getDashboardStats();
        if (Array.isArray(p) && p.length > 0) s.totalProjects = p.length;
        if (Array.isArray(b) && b.length > 0) s.totalBlogs = b.length;
        setStats(s);
      } catch { setStats(getDashboardStats()); }
    })();
    setActivity(getActivityLog());
    setRecentMessages(messageService.getAll().filter(m => !m.archived).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5));
  }, []);

  if (!stats) return <div className="admin-loading"><div className="admin-spinner" /></div>;

  const quickActions = [
    { label: "Add Project", icon: Plus, color: "lavender", onClick: () => navigate("/admin/projects/new") },
    { label: "Write Blog", icon: PenLine, color: "pink", onClick: () => navigate("/admin/blogs/new") },
    { label: "Add Case Study", icon: Layers, color: "blue", onClick: () => navigate("/admin/case-studies/new") },
    { label: "Update Resume", icon: FileText, color: "mint", onClick: () => navigate("/admin/resume") },
    { label: "View Messages", icon: MessageSquare, color: "yellow", onClick: () => navigate("/admin/messages") },
    { label: "View Portfolio", icon: ExternalLink, color: "cream", onClick: () => window.open("/", "_blank") },
  ];

  const publishedCount = stats.publishedProjects + stats.publishedBlogs;
  const draftCount = stats.draftProjects + (stats.totalBlogs - stats.publishedBlogs);
  const featuredCount = stats.featuredProjects + stats.featuredBlogs;
  const totalContent = stats.totalProjects + stats.totalBlogs;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">Dashboard</h2>
          <p className="admin-page-subtitle">Welcome back! Here's what's happening with your portfolio.</p>
        </div>
      </div>

      <div className="admin-grid admin-grid-4" style={{ marginBottom: "1.5rem" }}>
        <StatCard icon={FolderOpen} label="Total Projects" value={stats.totalProjects} color="lavender" subtitle={`${stats.featuredProjects} featured`} onClick={() => navigate("/admin/projects")} />
        <StatCard icon={BookOpen} label="Total Blog Posts" value={stats.totalBlogs} color="pink" subtitle={`${stats.publishedBlogs} published`} onClick={() => navigate("/admin/blogs")} />
        <StatCard icon={Layers} label="Case Studies" value={stats.totalCaseStudies} color="blue" onClick={() => navigate("/admin/case-studies")} />
        <StatCard icon={MessageSquare} label="Unread Messages" value={stats.unreadMessages} color="coral" subtitle={`${stats.totalMessages} total`} onClick={() => navigate("/admin/messages")} />
        <StatCard icon={Star} label="Testimonials" value={stats.totalTestimonials} color="yellow" onClick={() => navigate("/admin/testimonials")} />
        <StatCard icon={Wrench} label="Skills" value={stats.totalSkills} color="mint" onClick={() => navigate("/admin/skills")} />
        <StatCard icon={FolderOpen} label="Published Projects" value={stats.publishedProjects} color="mint" onClick={() => navigate("/admin/projects")} />
        <StatCard icon={FileEdit} label="Draft Projects" value={stats.draftProjects} color="yellow" onClick={() => navigate("/admin/projects")} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
        {/* Content Status */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Content Status</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { label: "Published", value: publishedCount, total: totalContent || 1, color: "var(--mint-deep)" },
              { label: "Draft", value: draftCount, total: totalContent || 1, color: "var(--yellow-deep)" },
              { label: "Featured", value: featuredCount, total: totalContent || 1, color: "var(--lavender-deep)" },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", marginBottom: "0.375rem" }}>
                  <span style={{ color: "var(--admin-text-secondary)" }}>{item.label}</span>
                  <span style={{ fontWeight: 600, color: "var(--admin-text)" }}>{item.value}</span>
                </div>
                <div style={{ height: 8, background: "var(--admin-bg)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{
                    width: `${(item.value / item.total) * 100}%`, height: "100%",
                    background: item.color, borderRadius: 999,
                    transition: "width 0.6s ease",
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Quick Actions</h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            {quickActions.map((action) => {
              const bgColors = { lavender: "var(--lavender)", pink: "var(--pink)", blue: "var(--blue)", mint: "var(--mint)", yellow: "var(--yellow)", cream: "var(--cream)", coral: "var(--coral)" };
              return (
                <button key={action.label} onClick={action.onClick} style={{
                  display: "flex", alignItems: "center", gap: "0.75rem",
                  padding: "0.875rem 1rem", border: "1px solid var(--admin-border)",
                  borderRadius: "var(--radius-sm)", background: "var(--admin-card-bg)",
                  cursor: "pointer", transition: "var(--transition-fast)",
                  fontSize: "0.8125rem", fontWeight: 500, color: "var(--admin-text)",
                  fontFamily: "var(--font-body)", textAlign: "left",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--lavender-deep)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--admin-border)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: "var(--radius-sm)",
                    background: bgColors[action.color] || bgColors.lavender,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--lavender-deep)", flexShrink: 0,
                  }}>
                    <action.icon size={16} />
                  </div>
                  {action.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {/* Recent Activity */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Recent Activity</h3>
          </div>
          {activity.length === 0 ? (
            <div className="admin-empty" style={{ padding: "1.5rem" }}>
              <div className="admin-empty-icon">
                <Clock size={24} />
              </div>
              <p style={{ fontSize: "0.8125rem" }}>No recent activity yet. Start managing your content!</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {activity.slice(0, 8).map((a) => (
                <div key={a.id} style={{
                  display: "flex", alignItems: "flex-start", gap: "0.75rem",
                  padding: "0.625rem 0", borderBottom: "1px solid var(--admin-border)",
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: "var(--lavender)", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    color: "var(--lavender-deep)", flexShrink: 0, marginTop: "2px",
                  }}>
                    <ArrowUpRight size={14} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "0.8125rem", color: "var(--admin-text)", fontWeight: 500 }}>{a.action}</div>
                    {a.details && <div style={{ fontSize: "0.75rem", color: "var(--admin-text-secondary)", marginTop: "1px" }}>{a.details}</div>}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--light-muted)", whiteSpace: "nowrap", flexShrink: 0 }}>{formatDate(a.timestamp)}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Messages */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Recent Messages</h3>
            <button onClick={() => navigate("/admin/messages")} className="admin-btn admin-btn-ghost admin-btn-sm">View All</button>
          </div>
          {recentMessages.length === 0 ? (
            <div className="admin-empty" style={{ padding: "1.5rem" }}>
              <div className="admin-empty-icon">
                <MessageSquare size={24} />
              </div>
              <p style={{ fontSize: "0.8125rem" }}>No messages yet.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {recentMessages.map((msg) => (
                <div key={msg.id} style={{
                  display: "flex", alignItems: "flex-start", gap: "0.75rem",
                  padding: "0.75rem 0", borderBottom: "1px solid var(--admin-border)",
                  cursor: "pointer",
                }} onClick={() => navigate("/admin/messages")}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: msg.read ? "var(--admin-bg)" : "var(--lavender-deep)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: msg.read ? "var(--admin-text-secondary)" : "white",
                    fontSize: "0.75rem", fontWeight: 600, flexShrink: 0,
                  }}>
                    {msg.name?.charAt(0) || "?"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "0.8125rem", fontWeight: msg.read ? 400 : 600, color: "var(--admin-text)" }}>{msg.name}</span>
                      <span style={{ fontSize: "0.7rem", color: "var(--light-muted)" }}>{formatDate(msg.createdAt)}</span>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--admin-text-secondary)", marginTop: "2px" }}>{msg.subject}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
