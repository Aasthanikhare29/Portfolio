import { Link } from "react-router-dom";
import AnimatedSection from "../components/common/AnimatedSection";
import PageHero from "../components/common/PageHero";
import testimonials from "../data/testimonials";
import styles from "./TestimonialsPage.module.css";

export default function TestimonialsPage() {
  return (
    <div className={styles.page}>
      <PageHero
        title="Kind Words"
        subtitle="Feedback from people I've had the pleasure of working with means the world to me."
        variant="testimonials"
      />

      <section className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            {testimonials.map((t, index) => (
              <AnimatedSection key={t.id} delay={index * 0.1}>
                <div className={styles.card}>
                  <p className={styles.quote}>{t.quote}</p>
                    <div className={styles.author}>
                      <img
                        src={`https://picsum.photos/seed/person${index + 1}/100/100`}
                        alt={t.name}
                        className={styles.avatar}
                        loading="lazy"
                      />
                    <div className={styles.authorInfo}>
                      <span className={styles.authorName}>{t.name}</span>
                      <span className={styles.authorRole}>
                        {t.role}, {t.company}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <p className={styles.placeholderNote}>
            * Placeholder testimonials. Replace with real testimonials when available.
          </p>
        </div>
      </section>

      <section className={styles.cta}>
        <div className="container">
          <AnimatedSection className={styles.ctaInner}>
            <h2 className={styles.ctaTitle}>Want to work together?</h2>
            <p className={styles.ctaText}>
              I'd love to hear about your project. Let's create something great together.
            </p>
            <Link to="/contact" className={styles.ctaBtn}>
              Let's Talk →
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
