import { useState } from "react";
import styles from "./Tooltip.module.css";

export default function Tooltip({
  children,
  content,
  position = "top",
  className = "",
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={`${styles.wrapper} ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && content && (
        <span className={`${styles.tooltip} ${styles[position]}`} role="tooltip">
          {content}
        </span>
      )}
    </div>
  );
}
