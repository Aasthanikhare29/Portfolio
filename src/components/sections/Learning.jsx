import AnimatedSection from "../common/AnimatedSection";
import { BookOpen, Check } from "lucide-react";
import styles from "./Learning.module.css";

const topics = [
  { text: "Advanced React Patterns", done: true },
  { text: "Modern Frontend Architecture", done: true },
  { text: "UI Animation", done: false },
  { text: "Accessibility (a11y)", done: false },
  { text: "Design Systems", done: false },
  { text: "Backend Integration", done: false },
];

export default function Learning() {
  return (
    <section className={styles.learning} id="learning">
      <div className="container">
        <div className={styles.inner}>
          <AnimatedSection className={styles.left}>
            <h2 className={styles.title}>
              <BookOpen size={28} strokeWidth={1.5} className={styles.titleIcon} />
              Always Learning, Always Building
            </h2>
            <p className={styles.note}>
              I believe growth comes from consistent curiosity. Here are the
              areas I'm actively exploring and improving in.
            </p>
            <p className={styles.publicNote}>
              Learning in public, experimenting often and improving one project
              at a time.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className={styles.checklist}>
              {topics.map((topic) => (
                <div key={topic.text} className={styles.checkItem}>
                  <span
                    className={`${styles.checkbox} ${
                      topic.done ? styles.checked : styles.unchecked
                    }`}
                  >
                    {topic.done && <Check size={14} strokeWidth={3} />}
                  </span>
                  <span
                    className={
                      topic.done ? styles.checkText : styles.checkTextMuted
                    }
                  >
                    {topic.text}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
