import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Target, Lightbulb, Wrench, Star, ArrowLeft, ExternalLink, ArrowUpRight } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import AnimatedSection from "../components/common/AnimatedSection";
import { publicProjectService } from "../admin/services/adminDataService";
import styles from "./ProjectDetailPage.module.css";

const projects = publicProjectService.getAll();

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const accentColors = {
  pink: { bg: "rgba(232, 69, 124, 0.08)", border: "rgba(232, 69, 124, 0.15)", dot: "#e8457c" },
  lavender: { bg: "rgba(139, 92, 246, 0.08)", border: "rgba(139, 92, 246, 0.15)", dot: "#8b5cf6" },
  mint: { bg: "rgba(16, 185, 129, 0.08)", border: "rgba(16, 185, 129, 0.15)", dot: "#10b981" },
  peach: { bg: "rgba(240, 130, 90, 0.08)", border: "rgba(240, 130, 90, 0.15)", dot: "#e8734a" },
};

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
          <Link to="/projects" className={styles.backBtn}>
            <ArrowLeft size={16} /> Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const accent = accentColors[project.accent] || accentColors.lavender;

  return (
    <div className={styles.page}>

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.gridBg} />
        <div className="container">
          <motion.div
            className={styles.headerInner}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp} custom={0}>
              <Link to="/projects" className={styles.backBtn}>
                <ArrowLeft size={16} /> Back to Projects
              </Link>
            </motion.div>

            <motion.div className={styles.headerMeta} variants={fadeUp} custom={1}>
              <span className={styles.categoryBadge}>{project.category}</span>
              <span className={styles.yearBadge}>{project.year}</span>
              <span className={styles.durationBadge}>{project.duration}</span>
            </motion.div>

            <motion.h1 className={styles.title} variants={fadeUp} custom={2}>
              {project.title}
            </motion.h1>

            <motion.p className={styles.headerDesc} variants={fadeUp} custom={3}>
              {project.description}
            </motion.p>

            <motion.div className={styles.headerTags} variants={fadeUp} custom={4}>
              {project.technologies.map((tech) => (
                <span key={tech} className={styles.headerTag}>{tech}</span>
              ))}
            </motion.div>

            <motion.div className={styles.headerActions} variants={fadeUp} custom={5}>
              {project.liveUrl !== "#" && (
                <a href={project.liveUrl} className={styles.actionBtn} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} /> Live Site <ArrowUpRight size={14} />
                </a>
              )}
              {project.githubUrl !== "#" && (
                <a href={project.githubUrl} className={`${styles.actionBtn} ${styles.actionBtnOutline}`} target="_blank" rel="noopener noreferrer">
                  <FiGithub size={16} /> View Code
                </a>
              )}
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* ── Screenshot Showcase ── */}
      <section className={styles.showcase}>
        <div className="container">
          <AnimatedSection>
            <div className={styles.browserFrame}>
              <div className={styles.browserBar}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.urlBar}>{project.title.toLowerCase().replace(/\s+/g, "")}.com</span>
              </div>
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className={styles.screenshot}
                loading="lazy"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Content ── */}
      <div className={styles.content}>
        <div className="container">
          <div className={styles.layout}>

            {/* Main */}
            <div className={styles.main}>

              <AnimatedSection>
                <div className={styles.overviewCard}>
                  <span className={styles.sectionLabel}>
                    <BookOpen size={14} strokeWidth={1.5} /> Overview
                  </span>
                  <p className={styles.overviewText}>{project.longDescription}</p>
                </div>
              </AnimatedSection>

              <div className={styles.psGrid}>
                <AnimatedSection delay={0.1}>
                  <div className={styles.psCard} style={{ borderTopColor: "#e8457c" }}>
                    <span className={styles.psLabel}><Target size={14} strokeWidth={1.5} /> The Problem</span>
                    <p className={styles.psText}>{project.problem}</p>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={0.15}>
                  <div className={styles.psCard} style={{ borderTopColor: "#8b5cf6" }}>
                    <span className={styles.psLabel}><Lightbulb size={14} strokeWidth={1.5} /> The Solution</span>
                    <p className={styles.psText}>{project.solution}</p>
                  </div>
                </AnimatedSection>
              </div>

              <AnimatedSection delay={0.2}>
                <div className={styles.responsibilitiesBlock}>
                  <span className={styles.sectionLabel}>
                    <Wrench size={14} strokeWidth={1.5} /> My Responsibilities
                  </span>
                  <div className={styles.respGrid}>
                    {project.responsibilities.map((r, i) => (
                      <div key={r} className={styles.respPill}>
                        <span className={styles.respNum}>{String(i + 1).padStart(2, "0")}</span>
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.25}>
                <div className={styles.techBlock}>
                  <span className={styles.sectionLabel}>Technologies Used</span>
                  <div className={styles.techPills}>
                    {project.technologies.map((tech) => (
                      <span key={tech} className={styles.techPill}>{tech}</span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <AnimatedSection delay={0.1}>
                <div className={styles.infoCard}>
                  <h4 className={styles.infoTitle}>Project Details</h4>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Role</span>
                    <span className={styles.infoValue}>{project.role}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Year</span>
                    <span className={styles.infoValue}>{project.year}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Duration</span>
                    <span className={styles.infoValue}>{project.duration}</span>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <div className={styles.highlightsCard}>
                  <h4 className={styles.infoTitle}>
                    <Star size={14} strokeWidth={1.5} /> Key Highlights
                  </h4>
                  <div className={styles.highlightsList}>
                    {project.highlights.map((h) => (
                      <div key={h} className={styles.highlightItem}>
                        <span className={styles.highlightDot} style={{ background: accent.dot }} />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </aside>

          </div>
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <AnimatedSection>
            <Link to="/projects" className={styles.ctaLink}>
              <ArrowLeft size={18} /> View All Projects
            </Link>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
