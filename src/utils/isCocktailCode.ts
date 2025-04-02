import { CocktailCode } from "../types";

export const isCocktailCode = (code: unknown): code is CocktailCode => {
  return typeof code === 'string' &&
         Object.values<string>(CocktailCode).includes(code);
};
