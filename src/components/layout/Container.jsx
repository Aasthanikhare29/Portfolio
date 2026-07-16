import styles from "./Container.module.css";

export default function Container({ children, className = "", narrow = false, wide = false }) {
  const classes = [
    styles.container,
    narrow ? styles.narrow : "",
    wide ? styles.wide : "",
    className,
  ].filter(Boolean).join(" ");

  return <div className={classes}>{children}</div>;
}
