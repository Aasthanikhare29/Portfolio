import { motion } from "framer-motion";
import styles from "./PageHero.module.css";

const gradients = {
  about: `linear-gradient(160deg, #1a1625 0%, #2d1f3d 40%, #1a1625 100%)`,
  projects: `linear-gradient(160deg, #1a1625 0%, #1f2a3d 40%, #1a1625 100%)`,
  skills: `linear-gradient(160deg, #1a1625 0%, #1a2d2a 40%, #1a1625 100%)`,
  journey: `linear-gradient(160deg, #1a1625 0%, #2d2a1f 40%, #1a1625 100%)`,
  contact: `linear-gradient(160deg, #1a1625 0%, #2d1f2a 40%, #1a1625 100%)`,
  things: `linear-gradient(160deg, #1a1625 0%, #2a1f2d 40%, #1a1625 100%)`,
  testimonials: `linear-gradient(160deg, #1a1625 0%, #1f2d2d 40%, #1a1625 100%)`,
  detail: `linear-gradient(160deg, #1a1625 0%, #252a3d 40%, #1a1625 100%)`,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 },
  },
};

export default function PageHero({ title, subtitle, icon: Icon, variant = "about", children }) {
  const bg = gradients[variant] || gradients.about;

  return (
    <div className={styles.hero} style={{ background: bg }}>
      <div className={styles.noise} />

      <div className="container">
        <motion.div
          className={styles.inner}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Icon && (
            <motion.div className={styles.iconWrap} variants={itemVariants}>
              <Icon size={20} strokeWidth={1.5} />
            </motion.div>
          )}

          <motion.h1 className={styles.title} variants={itemVariants}>
            {title}
          </motion.h1>

          <motion.div className={styles.line} variants={lineVariants} />

          {subtitle && (
            <motion.p className={styles.subtitle} variants={itemVariants}>
              {subtitle}
            </motion.p>
          )}

          {children && (
            <motion.div variants={itemVariants}>{children}</motion.div>
          )}
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className={styles.scrollText}>Scroll</span>
        <div className={styles.scrollLine} />
      </motion.div>

      <div className={styles.accentOrb} />
      <div className={styles.accentOrb2} />
    </div>
  );
}
