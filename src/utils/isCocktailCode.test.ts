import { CocktailCode } from "../types";
import { isCocktailCode } from "./isCocktailCode";

describe("isCocktailCode", () => {
  it.each(Object.values(CocktailCode))(
    "should return true for valid code %s",
    (code) => {
      expect(isCocktailCode(code)).toBe(true);
    }
  );

  it("should return false for invalid strings", () => {
    const invalidCodes = [
      "Margarita",
      "mojito ",
      "MOJITO",
      "cosmopolitan",
      "a11",
      "ki r",
      "undefined",
      "123",
      "",
      "  "
    ];

    invalidCodes.forEach(code => {
      expect(isCocktailCode(code)).toBe(false);
    });
  });

  it("should return false for non-string values", () => {
    const nonStringValues = [
      123,
      null,
      undefined,
      {},
      [],
      true,
      Symbol("foo"),
      new Date(),
    ];

    nonStringValues.forEach(value => {
      expect(isCocktailCode(value)).toBe(false);
    });
  });

  it("should properly narrow the type", () => {
    const unknownValue: unknown = CocktailCode.MARGARITA;

    if (isCocktailCode(unknownValue)) {
      expect(unknownValue).toBe(CocktailCode.MARGARITA);
      expect(typeof unknownValue).toBe("string");

      const codes: CocktailCode[] = [unknownValue];
      expect(codes).toEqual([CocktailCode.MARGARITA]);
    } else {
      fail("Type guard failed");
    }
  });

  it("should handle edge cases", () => {
    expect(isCocktailCode("")).toBe(false);
    expect(isCocktailCode("   ")).toBe(false);
    expect(isCocktailCode(String(CocktailCode.A1))).toBe(true);
    expect(isCocktailCode(Object.values(CocktailCode)[0])).toBe(true);
  });
});
