import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CocktailCode } from '../../types';

export const HomePage = () => {
  const navigate = useNavigate();
  const defaultCode = CocktailCode.MARGARITA;

  useEffect(() => {
    navigate(`/${defaultCode}`, { replace: true });
  }, [navigate, defaultCode]);

  return null;
};
