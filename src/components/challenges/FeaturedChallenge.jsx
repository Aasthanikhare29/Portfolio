import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Zap, Trophy } from "lucide-react";
import styles from "./FeaturedChallenge.module.css";

const difficultyColors = {
  Easy: { bg: "var(--mint)", color: "#2d7a4f" },
  Medium: { bg: "var(--yellow)", color: "#8a6d00" },
  Hard: { bg: "var(--coral)", color: "#b33a3a" },
};

export default function FeaturedChallenge({ challenge }) {
  if (!challenge) return null;

  const diff = difficultyColors[challenge.difficulty] || difficultyColors.Medium;
  const formattedDate = new Date(challenge.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Trophy size={16} />
          Featured Post
        </motion.div>

        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          whileHover={{ y: -4 }}
        >
          <Link to={`/blog/${challenge.slug}`} className={styles.link}>
            <div className={styles.imageWrap}>
              <img
                src={challenge.coverImage}
                alt={challenge.title}
                className={styles.image}
              />
              <div className={styles.imageOverlay} />
            </div>
            <div className={styles.content}>
              <div className={styles.badges}>
                <span
                  className={styles.difficulty}
                  style={{ background: diff.bg, color: diff.color }}
                >
                  {challenge.difficulty}
                </span>
                <span className={styles.readingTime}>
                  <Clock size={12} />
                  {challenge.timeLimit}
                </span>
                <span className={styles.points}>
                  <Zap size={12} />
                  {challenge.points} pts
                </span>
              </div>
              <h2 className={styles.title}>{challenge.title}</h2>
              <p className={styles.subtitle}>{challenge.subtitle}</p>
              <p className={styles.excerpt}>{challenge.excerpt}</p>
              <div className={styles.footer}>
                <div className={styles.author}>
                  <img
                    src={challenge.authorImage}
                    alt={challenge.author}
                    className={styles.authorImage}
                  />
                  <div className={styles.authorInfo}>
                    <span className={styles.authorName}>{challenge.author}</span>
                    <span className={styles.date}>{formattedDate}</span>
                  </div>
                </div>
                <span className={styles.readMore}>
                  Solve Now <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
