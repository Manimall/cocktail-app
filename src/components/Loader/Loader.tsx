import styles from './Loader.module.scss';

interface LoaderProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Loader = ({
  message = 'Loading cocktails...',
  size = 'md'
}: LoaderProps) => (
  <div className={styles.container}>
    <div className={`${styles.loader} ${styles[size]}`}></div>
    {message && <p className={styles.message}>{message}</p>}
  </div>
);
