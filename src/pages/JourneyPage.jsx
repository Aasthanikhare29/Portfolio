import { Briefcase, MapPin, Star, Brain, BookOpen, Sprout, Check, Search, Compass, Palette, Code, CheckCircle, Rocket } from "lucide-react";
import AnimatedSection from "../components/common/AnimatedSection";
import PageHero from "../components/common/PageHero";
import experiences from "../data/experiences";
import processSteps from "../data/process";
import styles from "./JourneyPage.module.css";

const dotColors = [styles.dotPink, styles.dotLavender, styles.dotMint, styles.dotPeach];

const processIconMap = {
  Search: Search,
  Compass: Compass,
  Palette: Palette,
  Code: Code,
  CheckCircle: CheckCircle,
  Rocket: Rocket,
};

const learningTopics = [
  { text: "Advanced React Patterns", done: true },
  { text: "Modern Frontend Architecture", done: true },
  { text: "UI Animation", done: false },
  { text: "Accessibility (a11y)", done: false },
  { text: "Design Systems", done: false },
  { text: "Backend Integration", done: false },
];

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
          <div className={styles.timelineInner}>
            <div className={styles.timelineLine} />
            {experiences.map((exp, index) => (
              <AnimatedSection key={exp.id} delay={index * 0.12}>
                <div className={styles.item}>
                  <div
                    className={`${styles.dot} ${
                      dotColors[index % dotColors.length]
                    }`}
                  />
                  <div className={styles.card}>
                    <div className={styles.cardTop}>
                      <div>
                        <h3 className={styles.role}>{exp.role}</h3>
                        <p className={styles.company}>{exp.company}</p>
                      </div>
                      <span className={styles.date}>{exp.date}</span>
                    </div>
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
                      <div className={styles.highlight}><Star size={14} strokeWidth={1.5} /> {exp.highlight}</div>
                    )}
                  </div>
                </div>
              </AnimatedSection>
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
          <div className={styles.processGrid}>
            {processSteps.map((step, index) => {
              const ProcessIcon = processIconMap[step.icon] || CheckCircle;
              return (
                <AnimatedSection key={step.id} delay={index * 0.1}>
                  <div className={styles.processStep}>
                    <span className={styles.processNumber}>{step.number}</span>
                    <div className={styles.processIcon}><ProcessIcon size={24} strokeWidth={1.5} /></div>
                    <h3 className={styles.processStepTitle}>{step.title}</h3>
                    <p className={styles.processDesc}>{step.description}</p>
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
