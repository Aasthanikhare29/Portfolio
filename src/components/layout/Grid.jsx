import styles from "./Grid.module.css";

export default function Grid({ children, className = "", cols = 3, gap = "default", align = "start" }) {
  const classes = [
    styles.grid,
    cols === 2 ? styles.cols2 : "",
    cols === 3 ? styles.cols3 : "",
    cols === 4 ? styles.cols4 : "",
    cols === 1 ? styles.cols1 : "",
    gap === "small" ? styles.gapSmall : "",
    gap === "large" ? styles.gapLarge : "",
    gap === "none" ? styles.gapNone : "",
    align === "center" ? styles.alignCenter : "",
    className,
  ].filter(Boolean).join(" ");

  return <div className={classes}>{children}</div>;
}
