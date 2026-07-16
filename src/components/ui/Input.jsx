import { useState } from "react";
import styles from "./Input.module.css";

export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  helperText,
  error,
  disabled = false,
  required = false,
  icon,
  id,
  className = "",
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const inputId = id || `input-${label?.toLowerCase().replace(/\s/g, "-")}`;

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
        <label className={styles.label} htmlFor={inputId}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          id={inputId}
          type={type}
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />
      </div>
      {error && <span className={styles.errorText} id={`${inputId}-error`}>{error}</span>}
      {!error && helperText && <span className={styles.helperText} id={`${inputId}-helper`}>{helperText}</span>}
    </div>
  );
}
