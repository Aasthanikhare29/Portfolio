import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import AnimatedSection from "../common/AnimatedSection";
import styles from "./CTA.module.css";

export default function CTA() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <AnimatedSection className={styles.inner}>
          <h2 className={styles.title}>
            Let's Create Something <span className={styles.highlight}>Meaningful</span> Together
          </h2>
          <p className={styles.subtitle}>
            Have a project in mind or just want to say hello? I'd love to hear
            from you.
          </p>
          <div className={styles.actions}>
            <Link to="/contact" className={styles.primaryBtn}>
              Get In Touch <FiArrowRight />
            </Link>
            <Link to="/projects" className={styles.secondaryBtn}>
              View Projects
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
