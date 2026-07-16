import styles from "./Section.module.css";

export default function Section({ children, className = "", id, padding = "default", background = "default" }) {
  const classes = [
    styles.section,
    padding === "none" ? styles.paddingNone : "",
    padding === "small" ? styles.paddingSmall : "",
    padding === "large" ? styles.paddingLarge : "",
    background === "cream" ? styles.bgCream : "",
    background === "lavender" ? styles.bgLavender : "",
    background === "pink" ? styles.bgPink : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <section id={id} className={classes}>
      {children}
    </section>
  );
}
