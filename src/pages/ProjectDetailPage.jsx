import { useParams, Link } from "react-router-dom";
import { BookOpen, Target, Lightbulb, Wrench, Star } from "lucide-react";
import { FiArrowLeft, FiExternalLink, FiGithub } from "react-icons/fi";
import AnimatedSection from "../components/common/AnimatedSection";
import PageHero from "../components/common/PageHero";
import projects from "../data/projects";
import styles from "./ProjectDetailPage.module.css";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className={styles.page}>
        <div className="container" style={{ paddingTop: "200px", textAlign: "center" }}>
          <h1>Project Not Found</h1>
          <p style={{ color: "var(--muted)", margin: "1rem 0 2rem" }}>
            The project you're looking for doesn't exist.
          </p>
          <Link to="/projects" className={styles.backLink}>
            <FiArrowLeft /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <Link to="/projects" className={styles.backLink}>
          <FiArrowLeft /> Back to Projects
        </Link>
      </div>

      <PageHero
        title={project.title}
        variant="detail"
      >
        <p className={styles.heroCategory}>
          {project.category} • {project.year}
        </p>
        <div className={styles.heroTags}>
          {project.technologies.map((tech) => (
            <span key={tech} className={styles.tag}>
              {tech}
            </span>
          ))}
        </div>
        <div className={styles.heroActions}>
          {project.liveUrl !== "#" && (
            <a
              href={project.liveUrl}
              className={`${styles.actionBtn} ${styles.primaryAction}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiExternalLink /> Live Site
            </a>
          )}
          {project.githubUrl !== "#" && (
            <a
              href={project.githubUrl}
              className={`${styles.actionBtn} ${styles.secondaryAction}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub /> View Code
            </a>
          )}
        </div>
      </PageHero>

      <div className={styles.imageSection}>
        <div className="container">
          <AnimatedSection>
            <div className={styles.imageContainer}>
              <img
                src={project.image}
                alt={project.title}
                className={styles.heroImage}
                loading="lazy"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className={styles.content}>
        <div className="container">
          <div className={styles.contentGrid}>
            <div className={styles.mainContent}>
              <AnimatedSection>
                <div className={styles.sectionBlock}>
                  <span className={styles.sectionLabel}>Overview <BookOpen size={14} strokeWidth={1.5} /></span>
                  <p className={styles.sectionText}>
                    {project.longDescription}
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className={styles.sectionBlock}>
                  <span className={styles.sectionLabel}>The Problem <Target size={14} strokeWidth={1.5} /></span>
                  <p className={styles.sectionText}>{project.problem}</p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <div className={styles.sectionBlock}>
                  <span className={styles.sectionLabel}>The Solution <Lightbulb size={14} strokeWidth={1.5} /></span>
                  <p className={styles.sectionText}>{project.solution}</p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className={styles.sectionBlock}>
                  <span className={styles.sectionLabel}>
                    My Responsibilities <Wrench size={14} strokeWidth={1.5} />
                  </span>
                  <div className={styles.responsibilitiesList}>
                    {project.responsibilities.map((r) => (
                      <div key={r} className={styles.responsibility}>
                        <span className={styles.bullet}>→</span>
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <div className={styles.sidebar}>
              <AnimatedSection delay={0.1}>
                <div className={styles.sidebarCard}>
                  <h4 className={styles.sidebarTitle}>Project Details</h4>
                  <div className={styles.sidebarItem}>
                    <span className={styles.sidebarLabel}>Role</span>
                    <span className={styles.sidebarValue}>{project.role}</span>
                  </div>
                  <div className={styles.sidebarItem}>
                    <span className={styles.sidebarLabel}>Year</span>
                    <span className={styles.sidebarValue}>{project.year}</span>
                  </div>
                  <div className={styles.sidebarItem}>
                    <span className={styles.sidebarLabel}>Duration</span>
                    <span className={styles.sidebarValue}>
                      {project.duration}
                    </span>
                  </div>
                  <div className={styles.sidebarItem}>
                    <span className={styles.sidebarLabel}>Technologies</span>
                    <div className={styles.heroTags} style={{ justifyContent: "flex-start" }}>
                      {project.technologies.map((tech) => (
                        <span key={tech} className={styles.tag}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <div className={styles.sidebarCard}>
                  <h4 className={styles.sidebarTitle}>Key Highlights</h4>
                  <div className={styles.highlightsList}>
                    {project.highlights.map((h) => (
                      <div key={h} className={styles.highlight}>
                        <Star size={14} strokeWidth={1.5} /> {h}
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
