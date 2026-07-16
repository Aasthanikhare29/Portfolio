import styles from "./ChallengeTags.module.css";

export default function ChallengeTags({ tags }) {
  return (
    <div className={styles.wrapper}>
      {tags.map((tag) => (
        <span key={tag} className={styles.tag}>
          #{tag}
        </span>
      ))}
    </div>
  );
}
