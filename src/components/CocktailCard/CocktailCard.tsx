import { Cocktail } from '../../types';
import styles from './CocktailCard.module.scss';

interface CocktailCardProps {
  cocktail: Cocktail;
}

export const CocktailCard = ({ cocktail }: CocktailCardProps) => (
  <article className={styles.card}>
    <img
      src={cocktail.strDrinkThumb}
      alt={cocktail.strDrink}
      loading="lazy"
      width={300}
      height={300}
      className={styles.image}
    />
    <div className={styles.info}>
      <h3 className={styles.title}>{cocktail.strDrink}</h3>

      <div className={styles.meta}>
        <span>{cocktail.strCategory}</span>
        <span className={styles.separator}> • </span>
        <span>{cocktail.strAlcoholic}</span>
        <span className={styles.separator}> • </span>
        <span>{cocktail.strGlass}</span>
      </div>

      <div className={styles.section}>
        <h4 className={styles.subtitle}>Instructions:</h4>
        <p className={styles.text}>{cocktail.strInstructions}</p>
      </div>

      <div className={styles.section}>
        <h4 className={styles.subtitle}>Ingredients:</h4>
        <ul className={styles.list}>
          {cocktail.ingredients.map((ingredient, index) => (
            <li key={index} className={styles.listItem}>
              {ingredient.measure && <span className={styles.measure}>{ingredient.measure}</span>}
              <span>{ingredient.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </article>
);
