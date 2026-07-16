import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import AnimatedSection from "../common/AnimatedSection";
import testimonials from "../../data/testimonials";
import styles from "./Testimonials.module.css";

const avatarImages = [
  "https://picsum.photos/seed/person1/100/100",
  "https://picsum.photos/seed/person2/100/100",
  "https://picsum.photos/seed/person3/100/100",
];

export default function Testimonials() {
  return (
    <section className={styles.testimonials} id="testimonials">
      <div className="container">
        <AnimatedSection className={styles.header}>
          <h2 className={styles.title}>
            Kind Words From People I've Worked With
          </h2>
        </AnimatedSection>

        <div className={styles.grid}>
          {testimonials.map((t, index) => (
            <AnimatedSection key={t.id} delay={index * 0.1}>
              <div className={styles.card}>
                <p className={styles.quote}>{t.quote}</p>
                <div className={styles.author}>
                  <img
                    src={avatarImages[index % avatarImages.length]}
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

        <AnimatedSection className={styles.viewAll}>
          <Link to="/testimonials" className={styles.viewAllLink}>
            Read More Testimonials <FiArrowRight />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
