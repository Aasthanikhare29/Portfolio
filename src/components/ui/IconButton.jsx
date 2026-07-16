import { motion } from "framer-motion";
import styles from "./IconButton.module.css";

export default function IconButton({
  icon,
  variant = "default",
  shape = "circular",
  size = "medium",
  label,
  onClick,
  href,
  target,
  className = "",
  ...props
}) {
  const classes = [
    styles.iconButton,
    styles[variant],
    styles[shape],
    styles[size],
    className,
  ].filter(Boolean).join(" ");

  const content = (
    <motion.span
      className={classes}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.2 }}
      aria-label={label}
      {...props}
    >
      {icon}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={styles.link}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={styles.link} aria-label={label}>
      {content}
    </button>
  );
}
