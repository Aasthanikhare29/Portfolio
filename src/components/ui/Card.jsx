import styles from "./Card.module.css";

export default function Card({
  children,
  padding = "default",
  hover = true,
  background = "default",
  border = true,
  className = "",
  ...props
}) {
  const classes = [
    styles.card,
    padding === "none" ? styles.paddingNone : "",
    padding === "small" ? styles.paddingSmall : "",
    padding === "large" ? styles.paddingLarge : "",
    !hover ? styles.noHover : "",
    background === "cream" ? styles.bgCream : "",
    background === "lavender" ? styles.bgLavender : "",
    background === "pink" ? styles.bgPink : "",
    background === "mint" ? styles.bgMint : "",
    !border ? styles.noBorder : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
