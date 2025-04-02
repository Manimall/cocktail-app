import { useParams } from 'react-router-dom';
import { useGetCocktailsByCodeQuery } from '../../api/cocktails';
import { CocktailCode } from '../../types';
import { isCocktailCode } from '../../utils';
import { CocktailCard } from '../../components/CocktailCard/CocktailCard';
import { Loader } from '../../components/Loader/Loader';
import { ErrorDisplay } from '../../components/ErrorDisplay/ErrorDisplay';
import styles from './CocktailPage.module.scss';

export const CocktailPage = () => {
  const { code } = useParams<{ code: string }>();
  const validatedCode = isCocktailCode(code) ? code : CocktailCode.MARGARITA;

  const { data: cocktails, isLoading, error } = useGetCocktailsByCodeQuery(validatedCode);

  if (isLoading) return <Loader />
  if (error) return <ErrorDisplay message={'Failed to load cocktails'} />;

  return (
    <div className={styles.page}>
      <h2>{validatedCode} Cocktails</h2>
      <div className={styles.grid}>
        {cocktails?.map((cocktail) => (
          <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
        ))}
      </div>
    </div>
  );
};
