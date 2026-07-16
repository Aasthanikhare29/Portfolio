import { Check } from "lucide-react";
import styles from "./Checkbox.module.css";

export default function Checkbox({
  label,
  checked = false,
  onChange,
  disabled = false,
  id,
  className = "",
  ...props
}) {
  const checkboxId = id || `checkbox-${label?.toLowerCase().replace(/\s/g, "-")}`;

  return (
    <label
      className={`${styles.wrapper} ${disabled ? styles.disabled : ""} ${className}`}
      htmlFor={checkboxId}
    >
      <input
        id={checkboxId}
        type="checkbox"
        className={styles.input}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      <span className={`${styles.box} ${checked ? styles.checked : ""}`}>
        {checked && <Check size={12} strokeWidth={3} />}
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}
