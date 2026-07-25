import { useRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { Star } from "lucide-react";
import { motion, useInView } from "framer-motion";
import AnimatedSection from "../common/AnimatedSection";
import experiences from "../../data/experiences";
import styles from "./Experience.module.css";

const accentColors = [styles.cardPink, styles.cardLavender, styles.cardMint];

function ExperienceCard({ exp, index, total }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
      <div
        ref={ref}
        className={styles.cardWrapper}
        style={{ top: `calc(100px + ${index * 24}px)` }}
      >
      <motion.div
        className={`${styles.card} ${accentColors[index % accentColors.length]}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={
          isInView
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.95 }
        }
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className={styles.cardNumber}>
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className={styles.cardContent}>
          <span className={styles.date}>{exp.date}</span>
          <h3 className={styles.role}>{exp.role}</h3>
          <p className={styles.company}>{exp.company}</p>
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
      </motion.div>
    </div>
  );
}

export default function Experience() {
  return (
    <section className={styles.experience} id="journey">
      <div className="container">
        <AnimatedSection className={styles.header}>
          <h2 className={styles.title}>My Experience So Far</h2>
          <p className={styles.subtitle}>
            A quick look at the roles and milestones that have shaped me.
          </p>
        </AnimatedSection>

        <div className={styles.stickyContainer}>
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              index={index}
              total={experiences.length}
            />
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
