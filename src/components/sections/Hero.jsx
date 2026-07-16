import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from "react-icons/fi";
import { Download, Code, Palette, Layout, Globe, Sparkles, Monitor } from "lucide-react";
import Particles from "../common/Particles";
import styles from "./Hero.module.css";

const floatingItems = [
  { className: "float1", text: "React", icon: Code, delay: 0 },
  { className: "float2", text: "Figma", icon: Palette, delay: 0.6 },
  { className: "float3", text: "CSS", icon: Layout, delay: 1.2 },
  { className: "float4", text: "HTML", icon: Globe, delay: 1.8 },
  { className: "float5", text: "UI Design", icon: Sparkles, delay: 0.3 },
  { className: "float6", text: "JavaScript", icon: Monitor, delay: 0.9 },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Hero() {
  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.hero} id="home">
      <div className={styles.bgGradient} />
      <Particles count={25} />

      <div className="container">
        <motion.div
          className={styles.heroInner}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.content}>
            <motion.span className={styles.label} variants={itemVariants}>
              Hello, I'm Aastha
            </motion.span>

            <motion.h1 className={styles.heading} variants={itemVariants}>
              I design{" "}
              <span className={styles.headingAccent}>thoughtful interfaces</span>{" "}
              and bring them to life with code.
            </motion.h1>

            <motion.p className={styles.description} variants={itemVariants}>
              I'm a UI and Frontend Developer who enjoys transforming ideas into
              colorful, responsive and easy-to-use digital experiences.
            </motion.p>

            <motion.div className={styles.buttons} variants={itemVariants}>
              <button className={styles.primaryBtn} onClick={scrollToProjects}>
                View My Projects <FiArrowRight />
              </button>
              <a
                href="/resume.pdf"
                className={styles.secondaryBtn}
                download
                aria-label="Download resume"
              >
                <Download size={16} /> Download Resume
              </a>
            </motion.div>

            <motion.div className={styles.socialRow} variants={itemVariants}>
              <div className={styles.divider} />
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub"
              >
                <FiGithub />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </a>
              <a
                href="mailto:aastha@example.com"
                className={styles.socialLink}
                aria-label="Email"
              >
                <FiMail />
              </a>
              <div className={styles.divider} />
            </motion.div>

            <motion.div
              className={styles.availabilityBadge}
              variants={itemVariants}
            >
              <span className={styles.pulse} />
              Open to UI and Frontend opportunities
            </motion.div>
          </div>

          <motion.div
            className={styles.illustration}
            variants={itemVariants}
          >
            <div className={styles.illustrationCard}>
              <img
                src="https://picsum.photos/seed/aastha-hero/460/460"
                alt="Creative workspace"
                className={styles.illustrationImage}
                loading="eager"
              />
              {floatingItems.map((item) => (
                <motion.div
                  key={item.className}
                  className={`${styles.floatingElement} ${styles[item.className]}`}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: item.delay,
                    ease: "easeInOut",
                  }}
                >
                  <item.icon size={14} strokeWidth={2} />
                  {item.text}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
