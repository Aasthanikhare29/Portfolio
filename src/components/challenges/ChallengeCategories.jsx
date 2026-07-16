import styles from "./ChallengeCategories.module.css";

export default function ChallengeCategories({ categories, activeCategory, onSelect }) {
  return (
    <div className={styles.wrapper} role="tablist" aria-label="Challenge categories">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`${styles.chip} ${activeCategory === cat ? styles.active : ""}`}
          onClick={() => onSelect(cat)}
          role="tab"
          aria-selected={activeCategory === cat}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
