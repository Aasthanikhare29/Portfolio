import Badge from "../ui/Badge";
import styles from "./SkillCard.module.css";

export default function SkillCard({ icon: Icon, title, skills = [], tools = [], compact = false }) {
  return (
    <div className={`${styles.card} ${compact ? styles.compact : ""}`}>
      {Icon && (
        <div className={styles.iconWrap}>
          <Icon size={22} strokeWidth={1.5} />
        </div>
      )}
      <h3 className={styles.title}>{title}</h3>
      {skills.length > 0 && (
        <ul className={styles.skillList}>
          {skills.map((skill) => (
            <li key={skill} className={styles.skillItem}>{skill}</li>
          ))}
        </ul>
      )}
      {tools.length > 0 && (
        <div className={styles.tools}>
          {tools.map((tool) => (
            <Badge key={tool} variant="soft" color="blue" size="small">{tool}</Badge>
          ))}
        </div>
      )}
    </div>
  );
}
