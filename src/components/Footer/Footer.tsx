import styles from './Footer.module.scss';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <span>© CocktailsApp {currentYear}</span>
      </div>
    </footer>
  );
};
