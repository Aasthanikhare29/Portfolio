export default function StatCard({ icon: Icon, label, value, color = "lavender", subtitle, onClick }) {
  const bgColors = { pink: "var(--pink)", mint: "var(--mint)", lavender: "var(--lavender)", blue: "var(--blue)", yellow: "var(--yellow)", coral: "var(--coral)", cream: "var(--cream)" };
  const iconColors = { pink: "var(--pink-deep)", mint: "var(--mint-deep)", lavender: "var(--lavender-deep)", blue: "var(--blue-deep)", yellow: "var(--yellow-deep)", coral: "#e07a7a", cream: "#b0a8b8" };
  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--admin-card-bg)", border: "1px solid var(--admin-border)",
        borderRadius: "var(--radius-md)", padding: "1.25rem", boxShadow: "var(--shadow-sm)",
        cursor: onClick ? "pointer" : "default", transition: "var(--transition-fast)",
        display: "flex", alignItems: "center", gap: "1rem",
      }}
      onMouseEnter={e => { if (onClick) e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
      onMouseLeave={e => { if (onClick) e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: "var(--radius-md)",
        background: bgColors[color] || bgColors.lavender,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: iconColors[color] || iconColors.lavender, flexShrink: 0,
      }}>
        {Icon && <Icon size={22} strokeWidth={1.5} />}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--admin-text)", lineHeight: 1.2 }}>{value ?? 0}</div>
        <div style={{ fontSize: "0.8rem", color: "var(--admin-text-secondary)", marginTop: "0.125rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</div>
        {subtitle && <div style={{ fontSize: "0.7rem", color: "var(--light-muted)", marginTop: "0.125rem" }}>{subtitle}</div>}
      </div>
    </div>
  );
}
