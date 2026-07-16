import { Quote } from "lucide-react";
import styles from "./TestimonialCard.module.css";

export default function TestimonialCard({ quote, name, role, company, avatar, compact = false }) {
  return (
    <div className={`${styles.card} ${compact ? styles.compact : ""}`}>
      <Quote size={24} className={styles.quoteIcon} />
      <p className={styles.quote}>{quote}</p>
      <div className={styles.author}>
        {avatar ? (
          <img src={avatar} alt={name} className={styles.avatar} loading="lazy" />
        ) : (
          <div className={styles.initials}>{name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0,2)}</div>
        )}
        <div className={styles.authorInfo}>
          <span className={styles.name}>{name}</span>
          <span className={styles.role}>{role}{company ? `, ${company}` : ""}</span>
        </div>
      </div>
    </div>
  );
}
