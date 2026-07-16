import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";
import styles from "./RelatedChallenges.module.css";

const difficultyColors = {
  Easy: { bg: "var(--mint)", color: "#2d7a4f" },
  Medium: { bg: "var(--yellow)", color: "#8a6d00" },
  Hard: { bg: "var(--coral)", color: "#b33a3a" },
};

export default function RelatedChallenges({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Related Posts</h2>
      <div className={styles.grid}>
        {posts.map((post) => {
          const diff = difficultyColors[post.difficulty] || difficultyColors.Medium;
          return (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className={styles.card}
            >
              <div className={styles.imageWrap}>
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className={styles.image}
                  loading="lazy"
                />
                <span
                  className={styles.difficulty}
                  style={{ background: diff.bg, color: diff.color }}
                >
                  {post.difficulty}
                </span>
              </div>
              <div className={styles.content}>
                <span className={styles.category}>{post.category}</span>
                <h3 className={styles.title}>{post.title}</h3>
                <div className={styles.meta}>
                  <span className={styles.points}>
                    <Zap size={12} />
                    {post.points} pts
                  </span>
                </div>
                <span className={styles.readMore}>
                  Read More <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
