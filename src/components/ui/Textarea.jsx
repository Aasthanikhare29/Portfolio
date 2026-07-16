import { useState } from "react";
import styles from "./Textarea.module.css";

export default function Textarea({
  label,
  placeholder,
  value,
  onChange,
  helperText,
  error,
  disabled = false,
  required = false,
  rows = 4,
  maxLength,
  id,
  className = "",
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const textareaId = id || `textarea-${label?.toLowerCase().replace(/\s/g, "-")}`;
  const charCount = value?.length || 0;

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
        <label className={styles.label} htmlFor={textareaId}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        className={styles.textarea}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        rows={rows}
        maxLength={maxLength}
        aria-invalid={!!error}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      <div className={styles.footer}>
        {error && <span className={styles.errorText}>{error}</span>}
        {!error && helperText && <span className={styles.helperText}>{helperText}</span>}
        {maxLength && <span className={styles.charCount}>{charCount}/{maxLength}</span>}
      </div>
    </div>
  );
}
