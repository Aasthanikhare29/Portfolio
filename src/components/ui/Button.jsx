import { motion } from "framer-motion";
import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  iconLeft,
  iconRight,
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  className = "",
  ariaLabel,
  ...props
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    loading ? styles.loading : "",
    disabled ? styles.disabled : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {!loading && iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
      {children && <span className={styles.label}>{children}</span>}
      {!loading && iconRight && <span className={styles.iconRight}>{iconRight}</span>}
    </motion.button>
  );
}
