import styles from "./SectionTitle.module.css";

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  background = "default",
  action,
  className = "",
}) {
  const classes = [
    styles.wrapper,
    align === "center" ? styles.center : "",
    align === "right" ? styles.right : "",
    background === "dark" ? styles.dark : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      {title && <h2 className={styles.title}>{title}</h2>}
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
