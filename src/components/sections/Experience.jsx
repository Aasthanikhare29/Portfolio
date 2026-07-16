import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { Briefcase, Star } from "lucide-react";
import AnimatedSection from "../common/AnimatedSection";
import experiences from "../../data/experiences";
import styles from "./Experience.module.css";

const dotColors = [styles.dotPink, styles.dotLavender, styles.dotMint];

export default function Experience() {
  return (
    <section className={styles.experience} id="journey">
      <div className="container">
        <AnimatedSection className={styles.header}>
          <h2 className={styles.title}>My Experience So Far</h2>
        </AnimatedSection>

        <div className={styles.timeline}>
          {experiences.map((exp, index) => (
            <AnimatedSection key={exp.id} delay={index * 0.12}>
              <div className={styles.item}>
                <div
                  className={`${styles.dot} ${dotColors[index % dotColors.length]}`}
                />
                <div className={styles.card}>
                  <div className={styles.cardTop}>
                    <div>
                      <h3 className={styles.role}>{exp.role}</h3>
                      <p className={styles.company}>{exp.company}</p>
                    </div>
                    <span className={styles.date}>{exp.date}</span>
                  </div>
                  <p className={styles.location}>{exp.location}</p>
                  <p className={styles.description}>{exp.description}</p>
                  <div className={styles.techTags}>
                    {exp.technologies.map((tech) => (
                      <span key={tech} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  {exp.highlight && (
                    <div className={styles.highlight}>
                      <Star size={14} strokeWidth={2} /> {exp.highlight}
                    </div>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className={styles.viewAll}>
          <Link to="/journey" className={styles.viewAllLink}>
            View Full Journey <FiArrowRight />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
