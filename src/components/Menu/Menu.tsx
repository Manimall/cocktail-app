import { NavLink } from 'react-router-dom';
import { CocktailCode, ALL_COCKTAIL_CODES } from '../../types';
import styles from './Menu.module.scss';

const COCKTAIL_NAMES: Record<CocktailCode, string> = {
  [CocktailCode.MARGARITA]: 'Margarita',
  [CocktailCode.MOJITO]: 'Mojito',
  [CocktailCode.A1]: 'A1',
  [CocktailCode.KIR]: 'Kir'
};

export const Menu = () => (
  <nav className={styles.menu}>
    <ul className={styles.list}>
      {ALL_COCKTAIL_CODES.map((code) => (
        <li key={code} className={styles.item}>
          <NavLink
            to={`/${code}`}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            {COCKTAIL_NAMES[code]}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);
