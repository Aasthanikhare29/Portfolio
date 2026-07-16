import Button from "./Button";
import styles from "./EmptyState.module.css";

export default function EmptyState({
  icon,
  title,
  description,
  action,
  actionLabel,
  onAction,
  className = "",
}) {
  return (
    <div className={`${styles.emptyState} ${className}`}>
      {icon && <div className={styles.icon}>{icon}</div>}
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}
      {action && (
        <Button variant="secondary" onClick={onAction} size="small">
          {actionLabel || "Get Started"}
        </Button>
      )}
    </div>
  );
}
