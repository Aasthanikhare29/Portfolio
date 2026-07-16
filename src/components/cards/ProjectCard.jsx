import { FiExternalLink, FiGithub } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Badge from "../ui/Badge";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project, compact = false, featured = false }) {
  return (
    <div className={`${styles.card} ${compact ? styles.compact : ""} ${featured ? styles.featured : ""}`}>
      <Link to={`/projects/${project.id}`} className={styles.imageWrap}>
        <img src={project.image} alt={project.title} className={styles.image} loading="lazy" />
        <span className={styles.category}>{project.category}</span>
      </Link>
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
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.action}>
              <FiExternalLink size={14} /> Live
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.action}>
              <FiGithub size={14} /> Code
            </a>
          )}
          <Link to={`/projects/${project.id}`} className={styles.caseStudy}>
            Case Study <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
