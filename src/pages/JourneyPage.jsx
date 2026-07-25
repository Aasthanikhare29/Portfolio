import { useRef } from "react";
import { Briefcase, MapPin, Star, Brain, BookOpen, Sprout, Check, Search, Compass, Palette, Code, CheckCircle, Rocket } from "lucide-react";
import { motion, useInView } from "framer-motion";
import AnimatedSection from "../components/common/AnimatedSection";
import PageHero from "../components/common/PageHero";
import experiences from "../data/experiences";
import processSteps from "../data/process";
import styles from "./JourneyPage.module.css";

const accentColors = [styles.cardPink, styles.cardLavender, styles.cardMint];

const processIconMap = {
  Search: Search,
  Compass: Compass,
  Palette: Palette,
  Code: Code,
  CheckCircle: CheckCircle,
  Rocket: Rocket,
};

const stepColors = [
  { bg: "var(--pink-deep)", color: "var(--white)" },
  { bg: "var(--blue-deep)", color: "var(--white)" },
  { bg: "var(--lavender-deep)", color: "var(--white)" },
  { bg: "var(--mint-deep)", color: "var(--white)" },
  { bg: "#c5940a", color: "var(--white)" },
  { bg: "var(--peach-deep)", color: "var(--white)" },
];

const learningTopics = [
  { text: "Advanced React Patterns", done: true },
  { text: "Modern Frontend Architecture", done: true },
  { text: "Backend Integration", done: true },
  { text: "UI Animation", done: false },
  { text: "Accessibility (a11y)", done: false },
  { text: "Design Systems", done: false },
];

function ExperienceCard({ exp, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <div
      ref={ref}
      className={styles.cardWrapper}
      style={{ top: `calc(80px + ${index * 24}px)` }}
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
          <p className={styles.location}><MapPin size={14} strokeWidth={1.5} /> {exp.location}</p>
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

export default function JourneyPage() {
  return (
    <div className={styles.page}>
      <PageHero
        title="My Experience So Far"
        subtitle="A timeline of my professional journey, learning milestones and the process I follow to turn ideas into polished digital experiences."
        icon={Briefcase}
        variant="journey"
      />

      <div className={styles.timeline}>
        <div className="container">
          <div className={styles.stickyContainer}>
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                exp={exp}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.process}>
        <div className="container">
          <AnimatedSection>
            <h2 className={styles.processTitle}>
              <Brain size={28} strokeWidth={1.5} /> How I Turn Ideas Into Interfaces
            </h2>
          </AnimatedSection>
          <div className={styles.stepper}>
            {processSteps.map((step, index) => {
              const ProcessIcon = processIconMap[step.icon] || CheckCircle;
              const color = stepColors[index % stepColors.length];
              return (
                <AnimatedSection key={step.id} delay={index * 0.08}>
                  <div className={styles.step}>
                    <div
                      className={styles.stepDot}
                      style={{ background: color.bg }}
                    >
                      <ProcessIcon size={20} strokeWidth={2} style={{ color: color.color }} />
                    </div>
                    <div className={styles.stepContent}>
                      <h3 className={styles.stepTitle}>{step.title}</h3>
                      <p className={styles.stepDesc}>{step.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.learning}>
        <div className="container">
          <div className={styles.learningGrid}>
            <AnimatedSection className={styles.learningLeft}>
              <h2 className={styles.learningTitle}>
                <BookOpen size={28} strokeWidth={1.5} /> Always Learning, Always Building
              </h2>
              <p className={styles.learningNote}>
                I believe growth comes from consistent curiosity. Here are the
                areas I'm actively exploring and improving in.
              </p>
              <p className={styles.publicNote}>
                Learning in public, experimenting often and improving one project
                at a time. <Sprout size={16} strokeWidth={1.5} />
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <div className={styles.checklist}>
                {learningTopics.map((topic) => (
                  <div key={topic.text} className={styles.checkItem}>
                    <span
                      className={`${styles.checkbox} ${
                        topic.done ? styles.checked : styles.unchecked
                      }`}
                    >
                      {topic.done && <Check size={14} strokeWidth={2} />}
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
      </div>
    </div>
  );
}
