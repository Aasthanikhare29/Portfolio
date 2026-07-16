import { Link } from "react-router-dom";
import { MapPin, GraduationCap, Code, Coffee, Palette, Zap, Users, Search, Sprout, Sparkles, ClipboardList, Lightbulb, Hand } from "lucide-react";
import { FiArrowRight } from "react-icons/fi";
import AnimatedSection from "../components/common/AnimatedSection";
import PageHero from "../components/common/PageHero";
import styles from "./AboutPage.module.css";

const infoCards = [
  { icon: <MapPin size={20} strokeWidth={1.5} />, text: "Based in Nagpur, India" },
  { icon: <GraduationCap size={20} strokeWidth={1.5} />, text: "B.Tech Computer Science" },
  { icon: <Code size={20} strokeWidth={1.5} />, text: "UI and Frontend Developer" },
  { icon: <Coffee size={20} strokeWidth={1.5} />, text: "Powered by curiosity and creativity" },
];

const values = [
  {
    icon: <Palette size={22} strokeWidth={1.5} />,
    title: "Design with Purpose",
    desc: "Every color, spacing and layout choice serves the user experience.",
    bg: "var(--pink)",
  },
  {
    icon: <Zap size={22} strokeWidth={1.5} />,
    title: "Build with Care",
    desc: "Clean, maintainable code that performs well and scales gracefully.",
    bg: "var(--blue)",
  },
  {
    icon: <Users size={22} strokeWidth={1.5} />,
    title: "Collaborate with Heart",
    desc: "Great products come from genuine communication and shared vision.",
    bg: "var(--mint)",
  },
  {
    icon: <Search size={22} strokeWidth={1.5} />,
    title: "Observe with Curiosity",
    desc: "I study real user behavior to make interfaces that truly work.",
    bg: "var(--lavender)",
  },
  {
    icon: <Sprout size={22} strokeWidth={1.5} />,
    title: "Grow with Intention",
    desc: "I invest in learning new skills and improving with every project.",
    bg: "var(--yellow)",
  },
  {
    icon: <Sparkles size={22} strokeWidth={1.5} />,
    title: "Delight in Details",
    desc: "The small touches, micro-interactions and polish make experiences memorable.",
    bg: "var(--peach)",
  },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <PageHero
        title="A Little About Me"
        subtitle="The person behind the pixels — my story, values and what drives me to create meaningful digital experiences."
        variant="about"
      />

      <div className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            <AnimatedSection className={styles.left}>
              <div className={styles.photoFrame}>
                <div className={styles.tape} />
                <img
                  src="https://picsum.photos/seed/aastha-about/400/500"
                  alt="Aastha Nikhare"
                  className={styles.photo}
                  loading="lazy"
                />
                <span className={styles.handwrittenNote}>that's me! <Sparkles size={14} strokeWidth={1.5} /></span>
              </div>
              <div className={styles.badges}>
                <span className={styles.badge}><MapPin size={14} strokeWidth={1.5} /> Nagpur</span>
                <span className={styles.badge}><Palette size={14} strokeWidth={1.5} /> UI Developer</span>
                <span className={styles.badge}><Code size={14} strokeWidth={1.5} /> Frontend Dev</span>
              </div>
            </AnimatedSection>

            <div className={styles.right}>
              <AnimatedSection>
                <div className={styles.sectionBlock}>
                  <span className={styles.sectionLabel}>Hey there! <Hand size={14} strokeWidth={1.5} /></span>
                  <h2 className={styles.sectionTitle}>
                    I'm Aastha Nikhare
                  </h2>
                  <p className={styles.sectionText}>
                    I'm a UI and Frontend Developer based in Nagpur, India. I
                    love the sweet spot where design meets code — where clean
                    interfaces turn into living, breathing digital experiences.
                    <br />
                    <br />
                    My journey started with a curiosity about how websites are
                    built and a passion for making things look and feel right.
                    Today, I design thoughtful interfaces in Figma and bring
                    them to life with React, creating responsive, accessible
                    and visually engaging web experiences.
                    <br />
                    <br />
                    When I'm not designing layouts or writing components, you'll
                    find me exploring new frontend techniques, browsing
                    beautiful websites for inspiration, or sipping coffee while
                    organizing ideas in Figma. I believe every interface should
                    feel both beautiful and effortless — and that's what I
                    strive to create.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <div className={styles.sectionBlock}>
                  <span className={styles.sectionLabel}>Quick facts <ClipboardList size={14} strokeWidth={1.5} /></span>
                  <div className={styles.infoCards}>
                    {infoCards.map((card) => (
                      <div className={styles.infoCard} key={card.text}>
                        <span className={styles.infoIcon}>{card.icon}</span>
                        <span className={styles.infoText}>{card.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <div className={styles.sectionBlock}>
                  <span className={styles.sectionLabel}>What I believe in <Lightbulb size={14} strokeWidth={1.5} /></span>
                  <div className={styles.valuesGrid}>
                    {values.map((v) => (
                      <div
                        key={v.title}
                        className={styles.valueCard}
                        style={{ background: v.bg }}
                      >
                        <div className={styles.valueIcon}>{v.icon}</div>
                        <h4 className={styles.valueTitle}>{v.title}</h4>
                        <p className={styles.valueDesc}>{v.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className={styles.ctaBox}>
                  <span className={styles.ctaText}>
                    Want to know about my journey? →
                  </span>
                  <Link to="/journey" className={styles.ctaBtn}>
                    View My Journey <FiArrowRight />
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
