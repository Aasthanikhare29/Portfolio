import { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./Select.module.css";

export default function Select({
  label,
  placeholder = "Select an option",
  options = [],
  value,
  onChange,
  helperText,
  error,
  disabled = false,
  required = false,
  id,
  className = "",
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const selectId = id || `select-${label?.toLowerCase().replace(/\s/g, "-")}`;

  const wrapperClasses = [
    styles.wrapper,
    focused ? styles.focused : "",
    error ? styles.error : "",
    disabled ? styles.disabled : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className={styles.label} htmlFor={selectId}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.selectWrapper}>
        <select
          id={selectId}
          className={styles.select}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown className={styles.arrow} size={16} />
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
      {!error && helperText && <span className={styles.helperText}>{helperText}</span>}
    </div>
  );
}
