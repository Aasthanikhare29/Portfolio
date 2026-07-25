import { motion } from "framer-motion";
import styles from "./PageHero.module.css";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
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

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 },
  },
};

export default function PageHero({ title, subtitle, icon: Icon, children }) {
  return (
    <div className={styles.hero}>
      <div className={styles.gridBg} />

      <div className="container">
        <motion.div
          className={styles.inner}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Icon && (
            <motion.div className={styles.iconWrap} variants={itemVariants}>
              <Icon size={18} strokeWidth={1.5} />
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

      <div className={styles.orb1} />
      <div className={styles.orb2} />
    </div>
  );
}
