import styles from "./Divider.module.css";

export default function Divider({ text, emoji, className = "" }) {
  return (
    <div className={`${styles.divider} ${className}`}>
      {(text || emoji) && (
        <span className={styles.content}>
          {emoji && <span className={styles.emoji}>{emoji}</span>}
          {text && <span className={styles.text}>{text}</span>}
        </span>
      )}
    </div>
  );
}
