import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { MapPin, GraduationCap, Code, Coffee, Mail } from "lucide-react";
import AnimatedSection from "../common/AnimatedSection";
import Modal from "../ui/Modal";
import { publicProfileService } from "../../admin/services/adminDataService";
import styles from "./About.module.css";

function useProfile() {
  const [, setVersion] = useState(0);
  const profile = publicProfileService.get();

  useEffect(() => {
    const handler = () => setVersion(v => v + 1);
    window.addEventListener("storage", handler);
    window.addEventListener("profileUpdated", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("profileUpdated", handler);
    };
  }, []);

  return profile;
}

export default function About() {
  const profile = useProfile();
  const [letterOpen, setLetterOpen] = useState(false);

  useEffect(() => {
    const handler = () => setProfile(publicProfileService.get());
    window.addEventListener("storage", handler);
    window.addEventListener("profileUpdated", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("profileUpdated", handler);
    };
  }, []);

  const infoCards = [
    { icon: MapPin, text: profile.location ? `Based in ${profile.location}` : "Based in Nagpur, India" },
    { icon: GraduationCap, text: "B.Tech Computer Science" },
    { icon: Code, text: profile.professionalTitle || "UI and Frontend Developer" },
    { icon: Coffee, text: profile.funFacts?.[0] || "Powered by curiosity and creativity" },
  ];

  return (
    <section className={styles.about} id="about">
      <div className="container">
        <div className={styles.aboutInner}>
          <AnimatedSection className={styles.left}>
            <div className={styles.photoFrame}>
              <div className={styles.tape} />
              <img
                src={profile.profileImage || "https://picsum.photos/seed/aastha-profile/400/400"}
                alt={profile.fullName || "Aastha Nikhare"}
                className={styles.photoPlaceholder}
                loading="lazy"
              />
              <span className={styles.handwrittenNote}>that's me!</span>
            </div>
          </AnimatedSection>

          <AnimatedSection className={styles.right} delay={0.12}>
            <h2 className={styles.title}>A Little About Me</h2>
            <p className={styles.intro}>
              {profile.aboutDescription || `Hi there! I'm Aastha — a UI and Frontend Developer who loves turning ideas into clean, colorful and responsive digital experiences.`}
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
          <p className={styles.letterGreeting}>Dear Visitor</p>
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
          <p className={styles.letterSignoff}>With warmth and excitement</p>
          <p className={styles.letterSignature}>Aastha Nikhare</p>
        </div>
      </Modal>
    </section>
  );
}
