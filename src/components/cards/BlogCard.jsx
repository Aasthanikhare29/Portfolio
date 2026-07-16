import { Clock, ArrowRight } from "lucide-react";
import Badge from "../ui/Badge";
import styles from "./BlogCard.module.css";

export default function BlogCard({ blog, compact = false }) {
  return (
    <div className={`${styles.card} ${compact ? styles.compact : ""}`}>
      <div className={styles.imageWrap}>
        <img src={blog.coverImage} alt={blog.title} className={styles.image} loading="lazy" />
        {blog.category && (
          <span className={styles.categoryBadge}>{blog.category}</span>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.date}>{blog.date}</span>
          {blog.readingTime && (
            <span className={styles.readTime}>
              <Clock size={12} /> {blog.readingTime} min read
            </span>
          )}
        </div>
        <h3 className={styles.title}>{blog.title}</h3>
        {!compact && <p className={styles.excerpt}>{blog.excerpt}</p>}
        <span className={styles.readMore}>
          Read More <ArrowRight size={14} />
        </span>
      </div>
    </div>
  );
}
