import styles from "./Loader.module.css";

export function Spinner({ size = 24, className = "" }) {
  return (
    <div className={`${styles.spinner} ${className}`} style={{ width: size, height: size }} aria-label="Loading" role="status">
      <div className={styles.spinnerRing} />
    </div>
  );
}

export function DotsLoader({ className = "" }) {
  return (
    <div className={`${styles.dots} ${className}`} aria-label="Loading" role="status">
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
    </div>
  );
}

export function Skeleton({ width = "100%", height = 20, borderRadius, className = "" }) {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{ width, height, borderRadius: borderRadius || "var(--radius-sm)" }}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard({ className = "" }) {
  return (
    <div className={`${styles.skeletonCard} ${className}`} aria-hidden="true">
      <Skeleton height={180} borderRadius="var(--radius-md) var(--radius-md) 0 0" />
      <div className={styles.skeletonBody}>
        <Skeleton width="40%" height={14} />
        <Skeleton width="90%" height={20} />
        <Skeleton width="70%" height={14} />
      </div>
    </div>
  );
}

export function PageLoader({ className = "" }) {
  return (
    <div className={`${styles.pageLoader} ${className}`} aria-label="Loading page" role="status">
      <Spinner size={36} />
    </div>
  );
}

export function ButtonLoader({ className = "" }) {
  return <Spinner size={16} className={className} />;
}
