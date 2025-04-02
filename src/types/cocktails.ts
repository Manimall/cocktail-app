export interface RawCocktailData {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}

export interface Ingredient {
  name: string;
  measure: string;
}

export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strDrinkThumb: string;
  ingredients: Ingredient[];
}

export enum CocktailCode {
  MARGARITA = 'margarita',
  MOJITO = 'mojito',
  A1 = 'a1',
  KIR = 'kir'
}

export type CocktailCodeType = `${CocktailCode}`;

export const ALL_COCKTAIL_CODES = Object.values(CocktailCode) as CocktailCode[];
