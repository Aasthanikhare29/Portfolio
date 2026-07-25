import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { MapPin, GraduationCap, Code, Coffee, Mail } from "lucide-react";
import AnimatedSection from "../common/AnimatedSection";
import Modal from "../ui/Modal";
import styles from "./About.module.css";

const infoCards = [
  { icon: MapPin, text: "Based in Nagpur, India" },
  { icon: GraduationCap, text: "B.Tech Computer Science" },
  { icon: Code, text: "UI and Frontend Developer" },
  { icon: Coffee, text: "Powered by curiosity and creativity" },
];

export default function About() {
  const [letterOpen, setLetterOpen] = useState(false);

  return (
    <section className={styles.about} id="about">
      <div className="container">
        <div className={styles.aboutInner}>
          <AnimatedSection className={styles.left}>
            <div className={styles.photoFrame}>
              <div className={styles.tape} />
              <img
                src="https://picsum.photos/seed/aastha-profile/400/400"
                alt="Aastha Nikhare"
                className={styles.photoPlaceholder}
                loading="lazy"
              />
              <span className={styles.handwrittenNote}>that's me!</span>
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
            <div className={styles.aboutActions}>
              <Link to="/about" className={styles.journeyBtn}>
                More About Me <FiArrowRight />
              </Link>
              <button
                className={styles.letterBtn}
                onClick={() => setLetterOpen(true)}
              >
                <Mail size={18} /> Open Letter
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <Modal
        isOpen={letterOpen}
        onClose={() => setLetterOpen(false)}
        title="An Open Letter"
        size="large"
      >
        <div className={styles.letter}>
          <p className={styles.letterDate}>July 2026</p>
          <p className={styles.letterGreeting}>Dear Visitor,</p>
          <p className={styles.letterBody}>
            Thank you for taking the time to visit my portfolio. It means a lot
            that you're here, and I hope this little corner of the internet
            gives you a sense of who I am — not just as a developer, but as a
            person who genuinely loves what she does.
          </p>
          <p className={styles.letterBody}>
            I didn't start my journey with a grand plan. I started with curiosity
            — the kind that makes you stay up late figuring out why a div won't
            center, or why a color palette feels just right. Over time, that
            curiosity turned into passion, and that passion turned into the work
            you see on this page.
          </p>
          <p className={styles.letterBody}>
            Every project here represents a lesson learned, a challenge
            overcome, or a new idea brought to life. I believe in crafting
            experiences that are not just functional, but feel thoughtful and
            intentional — because the small details are what make the big
            picture beautiful.
          </p>
          <p className={styles.letterBody}>
            If you're a recruiter, a fellow developer, a designer, or just
            someone who stumbled upon this page — I'd love to connect. Whether
            it's about a collaboration, a question, or just to say hello — my
            inbox is always open.
          </p>
          <p className={styles.letterBody}>
            Here's to building things that matter, one pixel at a time.
          </p>
          <p className={styles.letterSignoff}>With warmth and excitement,</p>
          <p className={styles.letterSignature}>Aastha Nikhare</p>
        </div>
      </Modal>
    </section>
  );
}
