import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from "react-icons/fi";
import { Download, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import styles from "./HeroVariants.module.css";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export function PortfolioHero({ eyebrow, title, description, primaryAction, secondaryAction }) {
  return (
    <div className={styles.portfolioHero}>
      <div className={styles.portfolioBg} />
      <div className="container">
        <motion.div className={styles.portfolioInner} variants={containerVariants} initial="hidden" animate="visible">
          <motion.div className={styles.portfolioContent} variants={itemVariants}>
            <Badge variant="soft" color="mint" size="medium" dot>{eyebrow || "Available for opportunities"}</Badge>
            <h1 className={styles.portfolioTitle}>{title || "I design thoughtful interfaces and bring them to life with code."}</h1>
            <p className={styles.portfolioDesc}>{description || "I'm a UI and Frontend Developer who enjoys transforming ideas into colorful, responsive and easy-to-use digital experiences."}</p>
            <div className={styles.portfolioButtons}>
              <Button variant="primary" size="large" iconRight={<FiArrowRight />}>{primaryAction || "View My Projects"}</Button>
              <Button variant="secondary" size="large" iconLeft={<Download />}>{secondaryAction || "Download Resume"}</Button>
            </div>
            <div className={styles.socialRow}>
              <div className={styles.socialDivider} />
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub"><FiGithub /></a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn"><FiLinkedin /></a>
              <a href="mailto:aastha@example.com" className={styles.socialLink} aria-label="Email"><FiMail /></a>
              <div className={styles.socialDivider} />
            </div>
          </motion.div>
          <motion.div className={styles.portfolioImage} variants={itemVariants}>
            <img src="https://picsum.photos/seed/hero-port/460/460" alt="Creative workspace" loading="eager" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function PageHero({ eyebrow, title, description, breadcrumb, icon: Icon }) {
  return (
    <div className={styles.pageHero}>
      <div className="container">
        <motion.div className={styles.pageInner} variants={containerVariants} initial="hidden" animate="visible">
          {breadcrumb && <motion.p className={styles.breadcrumb} variants={itemVariants}>{breadcrumb}</motion.p>}
          {eyebrow && <motion.span className={styles.pageEyebrow} variants={itemVariants}>{eyebrow}</motion.span>}
          {Icon && <motion.div className={styles.pageIcon} variants={itemVariants}><Icon size={20} strokeWidth={1.5} /></motion.div>}
          <motion.h1 className={styles.pageTitle} variants={itemVariants}>{title}</motion.h1>
          <motion.div className={styles.pageLine} variants={itemVariants} />
          {description && <motion.p className={styles.pageDesc} variants={itemVariants}>{description}</motion.p>}
        </motion.div>
      </div>
    </div>
  );
}

export function SplitHero({ eyebrow, title, description, primaryAction, secondaryAction, image }) {
  return (
    <div className={styles.splitHero}>
      <div className="container">
        <motion.div className={styles.splitInner} variants={containerVariants} initial="hidden" animate="visible">
          <motion.div className={styles.splitContent} variants={itemVariants}>
            {eyebrow && <span className={styles.splitEyebrow}>{eyebrow}</span>}
            <h1 className={styles.splitTitle}>{title}</h1>
            <p className={styles.splitDesc}>{description}</p>
            <div className={styles.splitButtons}>
              <Button variant="primary" size="large" iconRight={<ArrowRight />}>{primaryAction || "Get Started"}</Button>
              {secondaryAction && <Button variant="ghost" size="large">{secondaryAction}</Button>}
            </div>
          </motion.div>
          <motion.div className={styles.splitImageWrap} variants={itemVariants}>
            <img src={image || "https://picsum.photos/seed/split-hero/600/500"} alt="Hero illustration" className={styles.splitImage} loading="eager" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function MinimalHero({ eyebrow, title, description }) {
  return (
    <div className={styles.minimalHero}>
      <div className="container">
        <motion.div className={styles.minimalInner} variants={containerVariants} initial="hidden" animate="visible">
          {eyebrow && <motion.span className={styles.minimalEyebrow} variants={itemVariants}>{eyebrow}</motion.span>}
          <motion.h1 className={styles.minimalTitle} variants={itemVariants}>{title}</motion.h1>
          {description && <motion.p className={styles.minimalDesc} variants={itemVariants}>{description}</motion.p>}
          <motion.div className={styles.minimalDoodles} variants={itemVariants}>
            <span className={styles.doodle1}>~</span>
            <span className={styles.doodle2}>*</span>
            <span className={styles.doodle3}>~</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
