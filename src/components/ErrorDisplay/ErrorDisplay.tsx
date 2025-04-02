import styles from './ErrorDisplay.module.scss';

interface ErrorDisplayProps {
  message: string;
  variant?: 'error' | 'warning';
}

export const ErrorDisplay = ({ message, variant = 'error' }: ErrorDisplayProps) => (
  <div className={`${styles.container} ${styles[variant]}`}>
    <div className={styles.icon}>
      {variant === 'error' ? '⚠️' : 'ℹ️'}
    </div>
    <h3 className={styles.title}>
      {variant === 'error' ? 'Something went wrong' : 'Attention'}
    </h3>
    <p className={styles.message}>{message}</p>
  </div>
);
