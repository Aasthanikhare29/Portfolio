import styles from "./Radio.module.css";

export default function Radio({
  label,
  name,
  value,
  checked = false,
  onChange,
  disabled = false,
  id,
  className = "",
  ...props
}) {
  const radioId = id || `radio-${value}`;

  return (
    <label
      className={`${styles.wrapper} ${disabled ? styles.disabled : ""} ${className}`}
      htmlFor={radioId}
    >
      <input
        id={radioId}
        type="radio"
        name={name}
        value={value}
        className={styles.input}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      <span className={`${styles.circle} ${checked ? styles.checked : ""}`}>
        {checked && <span className={styles.dot} />}
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
