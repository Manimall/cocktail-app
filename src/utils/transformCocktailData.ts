import { RawCocktailData, Cocktail, Ingredient } from "../types";

export const transformCocktailData = (data: RawCocktailData): Cocktail => {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 15; i++) {
    const name = data[`strIngredient${i}`];
    if (name && name.trim() !== '') {
      ingredients.push({
        name,
        measure: data[`strMeasure${i}`]?.trim() || 'to taste'
      });
    }
  }

  return {
    idDrink: data.idDrink,
    strDrink: data.strDrink,
    strCategory: data.strCategory,
    strAlcoholic: data.strAlcoholic,
    strGlass: data.strGlass,
    strInstructions: data.strInstructions,
    strDrinkThumb: data.strDrinkThumb,
    ingredients,
  };
};
