import styles from "./Toggle.module.css";

export default function Toggle({
  label,
  checked = false,
  onChange,
  disabled = false,
  id,
  className = "",
  ...props
}) {
  const toggleId = id || `toggle-${label?.toLowerCase().replace(/\s/g, "-")}`;

  return (
    <label
      className={`${styles.wrapper} ${disabled ? styles.disabled : ""} ${className}`}
      htmlFor={toggleId}
    >
      <input
        id={toggleId}
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        role="switch"
        aria-checked={checked}
        {...props}
      />
      <span className={`${styles.track} ${checked ? styles.on : ""}`}>
        <span className={styles.thumb} />
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
