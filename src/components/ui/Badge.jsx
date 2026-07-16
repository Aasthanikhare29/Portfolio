import styles from "./Badge.module.css";

export default function Badge({
  children,
  variant = "soft",
  color = "lavender",
  dot = false,
  icon,
  size = "medium",
  className = "",
}) {
  const classes = [
    styles.badge,
    styles[variant],
    styles[color],
    styles[size],
    dot ? styles.dot : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <span className={classes}>
      {dot && <span className={styles.dotIndicator} />}
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </span>
  );
}
