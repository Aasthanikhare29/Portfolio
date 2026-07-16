import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { MapPin, GraduationCap, Code, Coffee, Sparkles } from "lucide-react";
import AnimatedSection from "../common/AnimatedSection";
import styles from "./About.module.css";

const infoCards = [
  { icon: MapPin, text: "Based in Nagpur, India" },
  { icon: GraduationCap, text: "B.Tech Computer Science" },
  { icon: Code, text: "UI and Frontend Developer" },
  { icon: Coffee, text: "Powered by curiosity and creativity" },
];

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className="container">
        <div className={styles.aboutInner}>
          <AnimatedSection className={styles.left}>
            <div className={styles.photoFrame}>
              <div className={styles.tape} />
              <img
                src="https://picsum.photos/seed/aastha-profile/400/500"
                alt="Aastha Nikhare"
                className={styles.photoPlaceholder}
                loading="lazy"
              />
              <span className={styles.handwrittenNote}>that's me!</span>
            </div>
            <div className={styles.badges}>
              <span className={styles.badge}>Nagpur</span>
              <span className={styles.badge}>UI Developer</span>
            </div>
          </AnimatedSection>

          <AnimatedSection className={styles.right} delay={0.12}>
            <h2 className={styles.title}>A Little About Me</h2>
            <p className={styles.intro}>
              Hi there! I'm Aastha — a UI and Frontend Developer who loves
              turning ideas into clean, colorful and responsive digital
              experiences. I enjoy the sweet spot where design meets code, and I
              believe every interface should feel both beautiful and effortless.
              <br />
              <br />
              When I'm not designing layouts or writing React components, you'll
              find me exploring new frontend techniques, organizing ideas in
              Figma, or sipping coffee while browsing beautiful websites.
            </p>
            <div className={styles.infoCards}>
              {infoCards.map((card) => (
                <div className={styles.infoCard} key={card.text}>
                  <span className={styles.infoIcon}>
                    <card.icon size={18} strokeWidth={2} />
                  </span>
                  <span className={styles.infoText}>{card.text}</span>
                </div>
              ))}
            </div>
            <Link to="/about" className={styles.journeyBtn}>
              More About Me <FiArrowRight />
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
