import { Flame } from "lucide-react";
import styles from "./EmptyState.module.css";

export default function EmptyState({ message = "No items found." }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.iconWrap}>
        <Flame size={32} />
      </div>
      <h3 className={styles.heading}>Nothing here yet</h3>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
