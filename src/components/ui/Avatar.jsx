import styles from "./Avatar.module.css";

export default function Avatar({
  src,
  alt,
  name,
  size = "medium",
  status,
  border = false,
  className = "",
}) {
  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  const classes = [
    styles.avatar,
    styles[size],
    border ? styles.border : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      {src ? (
        <img src={src} alt={alt || name || "Avatar"} className={styles.image} loading="lazy" />
      ) : (
        <span className={styles.initials}>{initials}</span>
      )}
      {status && <span className={`${styles.status} ${styles[status]}`} aria-label={`Status: ${status}`} />}
    </div>
  );
}

export function AvatarGroup({ children, max = 4, className = "" }) {
  const items = Array.isArray(children) ? children : [children];
  const visible = items.slice(0, max);
  const remaining = items.length - max;

  return (
    <div className={`${styles.group} ${className}`}>
      {visible.map((child, i) => (
        <div key={i} className={styles.groupItem} style={{ zIndex: max - i }}>
          {child}
        </div>
      ))}
      {remaining > 0 && (
        <div className={`${styles.groupItem} ${styles.overflow}`} style={{ zIndex: 0 }}>
          <span className={styles.overflowText}>+{remaining}</span>
        </div>
      )}
    </div>
  );
}
