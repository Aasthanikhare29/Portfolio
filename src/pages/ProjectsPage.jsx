import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";
import { FiArrowRight } from "react-icons/fi";
import AnimatedSection from "../components/common/AnimatedSection";
import PageHero from "../components/common/PageHero";
import projects from "../data/projects";
import styles from "./ProjectsPage.module.css";

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <PageHero
        title="Projects I'm Proud Of"
        subtitle="A selection of interfaces and frontend experiences where I combined design thinking with development to create meaningful products."
        icon={Rocket}
        variant="projects"
      />

      <div className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            {projects.map((project, index) => {
              return (
                <AnimatedSection key={project.id} delay={index * 0.1}>
                  <Link
                    to={`/projects/${project.id}`}
                    className={styles.card}
                  >
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
                      <span className={styles.viewBtn}>
                        View Case Study{" "}
                        <FiArrowRight className={styles.viewBtnArrow} />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
