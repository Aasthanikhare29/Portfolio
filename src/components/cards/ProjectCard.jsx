import { FiExternalLink, FiGithub } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Badge from "../ui/Badge";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project, compact = false, featured = false }) {
  return (
    <div className={`${styles.card} ${compact ? styles.compact : ""} ${featured ? styles.featured : ""}`}>
      <Link to={`/projects/${project.id}`} className={styles.cardLink}>
        <div className={styles.imageWrap}>
          <img src={project.image} alt={project.title} className={styles.image} loading="lazy" />
          <span className={styles.category}>{project.category}</span>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{project.title}</h3>
          {!compact && <p className={styles.desc}>{project.description}</p>}
          <div className={styles.tags}>
            {project.technologies.slice(0, compact ? 3 : 5).map((tech) => (
              <Badge key={tech} variant="soft" color="lavender" size="small">{tech}</Badge>
            ))}
          </div>
          <div className={styles.actions}>
            {project.liveUrl && (
              <span className={styles.action} onClick={(e) => e.stopPropagation()}>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <FiExternalLink size={14} /> Live
                </a>
              </span>
            )}
            {project.githubUrl && (
              <span className={styles.action} onClick={(e) => e.stopPropagation()}>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <FiGithub size={14} /> Code
                </a>
              </span>
            )}
            <span className={styles.caseStudy}>
              Case Study <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
