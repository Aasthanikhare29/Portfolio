import { Link } from "react-router-dom";
import { FiExternalLink, FiGithub, FiArrowRight } from "react-icons/fi";
import AnimatedSection from "../common/AnimatedSection";
import projects from "../../data/projects";
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <div className="container">
        <AnimatedSection className={styles.header}>
          <h2 className={styles.title}>Projects I'm Proud Of</h2>
          <p className={styles.subtitle}>
            A selection of interfaces and frontend experiences where I combined
            design thinking with development.
          </p>
        </AnimatedSection>

        <div className={styles.grid}>
          {projects.slice(0, 3).map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 0.1}>
              <Link to={`/projects/${project.id}`} className={styles.card}>
                <div className={styles.cardImage}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className={styles.projectImage}
                    loading="lazy"
                  />
                  <span className={styles.categoryBadge}>
                    {project.category}
                  </span>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{project.title}</h3>
                  <p className={styles.cardDesc}>{project.description}</p>
                  <div className={styles.tags}>
                    {project.technologies.map((tech) => (
                      <span key={tech} className={styles.tag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className={styles.cardActions}>
                    <span
                      className={`${styles.actionBtn} ${styles.actionBtnLive}`}
                      onClick={(e) => e.preventDefault()}
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        <FiExternalLink /> Live
                      </a>
                    </span>
                    <span
                      className={`${styles.actionBtn} ${styles.actionBtnCode}`}
                      onClick={(e) => e.preventDefault()}
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        <FiGithub /> Code
                      </a>
                    </span>
                    <span className={`${styles.actionBtn} ${styles.actionBtnCase}`}>
                      Case Study
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className={styles.viewAll}>
          <Link to="/projects" className={styles.viewAllLink}>
            View All Projects <FiArrowRight />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
