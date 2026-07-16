import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Zap, Users } from "lucide-react";
import styles from "./ChallengeCard.module.css";

const pastelAccents = [
  "var(--pink)",
  "var(--peach)",
  "var(--mint)",
  "var(--lavender)",
  "var(--blue)",
  "var(--yellow)",
  "var(--coral)",
];

const difficultyColors = {
  Easy: { bg: "var(--mint)", color: "#2d7a4f" },
  Medium: { bg: "var(--yellow)", color: "#8a6d00" },
  Hard: { bg: "var(--coral)", color: "#b33a3a" },
};

export default function ChallengeCard({ challenge, index = 0 }) {
  const accent = pastelAccents[index % pastelAccents.length];
  const diff = difficultyColors[challenge.difficulty] || difficultyColors.Medium;
  const formattedDate = new Date(challenge.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.article
      className={styles.card}
      style={{ "--card-accent": accent }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link to={`/blog/${challenge.slug}`} className={styles.link}>
        <div className={styles.imageWrap}>
          <img
            src={challenge.coverImage}
            alt={challenge.title}
            className={styles.image}
            loading="lazy"
          />
          <span
            className={styles.difficulty}
            style={{ background: diff.bg, color: diff.color }}
          >
            {challenge.difficulty}
          </span>
          <span className={styles.timeLimit}>
            <Clock size={12} />
            {challenge.timeLimit}
          </span>
        </div>
        <div className={styles.content}>
          <div className={styles.meta}>
            <span className={styles.category}>{challenge.category}</span>
            <span className={styles.date}>{formattedDate}</span>
          </div>
          <h3 className={styles.title}>{challenge.title}</h3>
          <p className={styles.excerpt}>{challenge.excerpt}</p>
          <div className={styles.stats}>
            <span className={styles.stat}>
              <Zap size={13} />
              {challenge.points} pts
            </span>
            <span className={styles.stat}>
              <Users size={13} />
              {challenge.completions} solved
            </span>
          </div>
          <div className={styles.footer}>
            <div className={styles.author}>
              <img
                src={challenge.authorImage}
                alt={challenge.author}
                className={styles.authorImage}
              />
              <span className={styles.authorName}>{challenge.author}</span>
            </div>
            <span className={styles.readMore}>
              Solve Challenge <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
