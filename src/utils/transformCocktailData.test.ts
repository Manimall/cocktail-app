import { transformCocktailData } from "./transformCocktailData";
import { RawCocktailData } from "../types";

describe("transformCocktailData fn", () => {
  const baseRawData: RawCocktailData = {
    idDrink: "123",
    strDrink: "Test Drink",
    strCategory: "Test Category",
    strAlcoholic: "Alcoholic",
    strGlass: "Test Glass",
    strInstructions: "Test Instructions",
    strDrinkThumb: "http://test.com/image.jpg",
  };

  it("should correctly transform basic fields", () => {
    const result = transformCocktailData(baseRawData);

    expect(result).toEqual({
      idDrink: "123",
      strDrink: "Test Drink",
      strCategory: "Test Category",
      strAlcoholic: "Alcoholic",
      strGlass: "Test Glass",
      strInstructions: "Test Instructions",
      strDrinkThumb: "http://test.com/image.jpg",
      ingredients: [],
    });
  });

  it("should handle ingredients with measures", () => {
    const rawData: RawCocktailData = {
      ...baseRawData,
      strIngredient1: "Lime",
      strMeasure1: "1 slice",
      strIngredient2: "Sugar",
      strMeasure2: "2 tsp",
      strIngredient3: "Tequila",
      strMeasure3: "50 ml",
    };

    const result = transformCocktailData(rawData);

    expect(result.ingredients).toEqual([
      { name: "Lime", measure: "1 slice" },
      { name: "Sugar", measure: "2 tsp" },
      { name: "Tequila", measure: "50 ml" },
    ]);
  });

  it("should handle empty measures", () => {
    const rawData: RawCocktailData = {
      ...baseRawData,
      strIngredient1: "Salt",
      strMeasure1: "",
      strIngredient2: "Pepper",
      strMeasure2: null,
      strIngredient3: "Herbs",
      strMeasure3: "  ",
    };

    const result = transformCocktailData(rawData);

    expect(result.ingredients).toEqual([
      { name: "Salt", measure: "to taste" },
      { name: "Pepper", measure: "to taste" },
      { name: "Herbs", measure: "to taste" },
    ]);
  });

  it("should ignore ingredients with empty names", () => {
    const rawData: RawCocktailData = {
      ...baseRawData,
      strIngredient1: "",
      strMeasure1: "1 cup",
      strIngredient2: "  ",
      strMeasure2: "2 tbsp",
      strIngredient3: null,
      strMeasure3: "3 oz",
    };

    const result = transformCocktailData(rawData);
    expect(result.ingredients).toEqual([]);
  });

  it("should handle maximum 15 ingredients", () => {
    const ingredients = Array.from({ length: 15 }, (_, i) => ({
      [`strIngredient${i + 1}`]: `Ingredient ${i + 1}`,
      [`strMeasure${i + 1}`]: `Measure ${i + 1}`,
    })).reduce((acc, curr) => ({ ...acc, ...curr }), {});

    const rawData: RawCocktailData = {
      ...baseRawData,
      ...ingredients,
    } as RawCocktailData;

    const result = transformCocktailData(rawData);

    expect(result.ingredients).toHaveLength(15);
    expect(result.ingredients[0]).toEqual({
      name: "Ingredient 1",
      measure: "Measure 1",
    });
    expect(result.ingredients[14]).toEqual({
      name: "Ingredient 15",
      measure: "Measure 15",
    });
  });

  it("should ignore ingredients beyond 15", () => {
    const rawData: RawCocktailData = {
      ...baseRawData,
      strIngredient16: "Extra Ingredient",
      strMeasure16: "Extra Measure",
    };

    const result = transformCocktailData(rawData);
    expect(result.ingredients).toEqual([]);
  });

  it("should handle mixed case with valid and invalid ingredients", () => {
    const rawData: RawCocktailData = {
      ...baseRawData,
      strIngredient1: "Vodka",
      strMeasure1: "50 ml",
      strIngredient2: "",
      strMeasure2: "100 ml",
      strIngredient3: "  ",
      strMeasure3: null,
      strIngredient4: "Juice",
      strMeasure4: "",
    };

    const result = transformCocktailData(rawData);

    expect(result.ingredients).toEqual([
      { name: "Vodka", measure: "50 ml" },
      { name: "Juice", measure: "to taste" },
    ]);
  });

  it("should handle null values in ingredient fields", () => {
    const rawData: RawCocktailData = {
      ...baseRawData,
      strIngredient1: null,
      strMeasure1: "100 ml",
      strIngredient2: "Gin",
      strMeasure2: null,
    };

    const result = transformCocktailData(rawData);

    expect(result.ingredients).toEqual([
      { name: "Gin", measure: "to taste" },
    ]);
  });

  it("should preserve ingredient order", () => {
    const rawData: RawCocktailData = {
      ...baseRawData,
      strIngredient1: "First",
      strMeasure1: "1st",
      strIngredient3: "Third",
      strMeasure3: "3rd",
      strIngredient2: "Second",
      strMeasure2: "2nd",
    };

    const result = transformCocktailData(rawData);

    expect(result.ingredients).toEqual([
      { name: "First", measure: "1st" },
      { name: "Second", measure: "2nd" },
      { name: "Third", measure: "3rd" },
    ]);
  });
});
