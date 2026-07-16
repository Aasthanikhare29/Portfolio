import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from "lucide-react";
import styles from "./Alert.module.css";

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

export default function Alert({
  type = "info",
  title,
  children,
  closable = false,
  onClose,
  className = "",
}) {
  const Icon = icons[type];

  return (
    <div className={`${styles.alert} ${styles[type]} ${className}`} role="alert">
      <Icon size={18} className={styles.icon} />
      <div className={styles.content}>
        {title && <p className={styles.title}>{title}</p>}
        {children && <p className={styles.description}>{children}</p>}
      </div>
      {closable && (
        <button className={styles.close} onClick={onClose} aria-label="Close alert">
          <X size={14} />
        </button>
      )}
    </div>
  );
}
