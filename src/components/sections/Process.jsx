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

        <div className={styles.timeline}>
          {processSteps.map((step, index) => {
            const IconComponent = iconMap[step.icon] || Search;
            return (
              <AnimatedSection key={step.id} delay={index * 0.1}>
                <div className={styles.step}>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <div className={styles.stepIcon}>
                    <IconComponent size={22} strokeWidth={1.5} />
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.description}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
