import { Search, X } from "lucide-react";
import styles from "./ChallengeSearch.module.css";

export default function ChallengeSearch({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <Search size={16} className={styles.icon} />
      <input
        type="text"
        className={styles.input}
        placeholder="Search challenges by title, description, or tags..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search challenges"
      />
      {value && (
        <button
          className={styles.clear}
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
