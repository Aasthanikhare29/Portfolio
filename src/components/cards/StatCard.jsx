import styles from "./StatCard.module.css";

export default function StatCard({ number, label, description, className = "" }) {
  return (
    <div className={`${styles.card} ${className}`}>
      <span className={styles.number}>{number}</span>
      <span className={styles.label}>{label}</span>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
