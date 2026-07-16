import Badge from "../ui/Badge";
import styles from "./ExperienceCard.module.css";

export default function ExperienceCard({ role, company, date, description, technologies = [], compact = false }) {
  return (
    <div className={`${styles.card} ${compact ? styles.compact : ""}`}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.role}>{role}</h3>
          <p className={styles.company}>{company}</p>
        </div>
        <span className={styles.date}>{date}</span>
      </div>
      {!compact && description && <p className={styles.description}>{description}</p>}
      {technologies.length > 0 && (
        <div className={styles.tech}>
          {technologies.map((tech) => (
            <Badge key={tech} variant="soft" color="mint" size="small">{tech}</Badge>
          ))}
        </div>
      )}
    </div>
  );
}
