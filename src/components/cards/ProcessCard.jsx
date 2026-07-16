import styles from "./ProcessCard.module.css";

export default function ProcessCard({ step, icon: Icon, title, description, compact = false }) {
  return (
    <div className={`${styles.card} ${compact ? styles.compact : ""}`}>
      <div className={styles.stepRow}>
        <span className={styles.stepNumber}>{String(step).padStart(2, "0")}</span>
        {Icon && (
          <div className={styles.iconWrap}>
            <Icon size={20} strokeWidth={1.5} />
          </div>
        )}
      </div>
      <h3 className={styles.title}>{title}</h3>
      {!compact && <p className={styles.description}>{description}</p>}
    </div>
  );
}
