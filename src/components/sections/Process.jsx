import AnimatedSection from "../common/AnimatedSection";
import processSteps from "../../data/process";
import { Search, Compass, Palette, Code, CheckCircle, Rocket } from "lucide-react";
import styles from "./Process.module.css";

const iconMap = {
  Search,
  Compass,
  Palette,
  Code,
  CheckCircle,
  Rocket,
};

const stepColors = [
  { bg: "var(--pink-deep)", color: "var(--white)" },
  { bg: "var(--blue-deep)", color: "var(--white)" },
  { bg: "var(--lavender-deep)", color: "var(--white)" },
  { bg: "var(--mint-deep)", color: "var(--white)" },
  { bg: "#c5940a", color: "var(--white)" },
  { bg: "var(--peach-deep)", color: "var(--white)" },
];

export default function Process() {
  return (
    <section className={styles.process} id="process">
      <div className="container">
        <AnimatedSection className={styles.header}>
          <h2 className={styles.title}>How I Turn Ideas Into Interfaces</h2>
          <p className={styles.subtitle}>
            A thoughtful approach to turning concepts into polished digital
            experiences.
          </p>
        </AnimatedSection>

        <div className={styles.stepper}>
          {processSteps.map((step, index) => {
            const IconComponent = iconMap[step.icon] || Search;
            const stepColor = stepColors[index % stepColors.length];
            return (
              <AnimatedSection key={step.id} delay={index * 0.08}>
                <div className={styles.step}>
                  <div
                    className={styles.dot}
                    style={{ background: stepColor.bg }}
                  >
                    <IconComponent size={20} strokeWidth={2} style={{ color: stepColor.color }} />
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
    </section>
  );
}
