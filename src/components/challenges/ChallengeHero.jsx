import { motion } from "framer-motion";
import { Flame, Search, ArrowDown } from "lucide-react";
import { getStats } from "../../data/challenges";
import styles from "./ChallengeHero.module.css";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function ChallengeHero({ onScrollToChallenges }) {
  const stats = getStats();

  return (
    <section className={styles.hero}>
      <div className={styles.bgDecor}>
        <div className={`${styles.doodle} ${styles.doodle1}`}>⚡</div>
        <div className={`${styles.doodle} ${styles.doodle2}`}>🔥</div>
        <div className={`${styles.doodle} ${styles.doodle3}`}>💎</div>
        <div className={`${styles.doodle} ${styles.doodle4}`}>🎯</div>
        <div className={`${styles.doodle} ${styles.doodle5}`}>🏆</div>
      </div>
      <div className="container">
        <motion.div
          className={styles.inner}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className={styles.iconWrap} variants={itemVariants}>
            <Flame size={20} strokeWidth={1.5} />
          </motion.div>

          <motion.p className={styles.label} variants={itemVariants}>
            Sharpen your skills
          </motion.p>

          <motion.h1 className={styles.title} variants={itemVariants}>
            Blog & Writeups
          </motion.h1>

          <motion.div className={styles.line} variants={itemVariants} />

          <motion.p className={styles.subtitle} variants={itemVariants}>
            Thoughts on frontend development, design patterns, and things I've learned along the way.
          </motion.p>

          <motion.div className={styles.statsRow} variants={itemVariants}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{stats.total}</span>
              <span className={styles.statLabel}>Posts</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{stats.totalPoints}</span>
              <span className={styles.statLabel}>Total Points</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{stats.totalCompletions}</span>
              <span className={styles.statLabel}>Solutions</span>
            </div>
          </motion.div>

          <motion.div className={styles.actions} variants={itemVariants}>
            <button
              className={styles.browseBtn}
              onClick={onScrollToChallenges}
              aria-label="Browse posts"
            >
              <Search size={16} />
              Browse Posts
            </button>
            <button
              className={styles.latestBtn}
              onClick={onScrollToChallenges}
              aria-label="View all posts"
            >
              View All
              <ArrowDown size={16} />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
