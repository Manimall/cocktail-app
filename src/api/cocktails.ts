import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Cocktail, CocktailCode, RawCocktailData } from '../types';
import { transformCocktailData } from '../utils';

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!BASE_URL) {
  throw new Error('VITE_API_BASE_URL is not defined in .env file');
}

export const cocktailsApi = createApi({
  reducerPath: 'cocktailsApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Cocktails'],
  endpoints: (builder) => ({
    getCocktailsByCode: builder.query<Cocktail[], CocktailCode>({
      // query: (code) => `search.php?s=${code}`,
      query: (code) => ({
        url: `search.php?s=${code}`,
        validateStatus: (response) => response.status >= 200 && response.status < 300,
      }),
      transformResponse: (response: unknown) => {
        if (!(typeof response === 'object' && response !== null && 'drinks' in response)) {
          throw new Error('Invalid response format')
        }

        const drinks = (response as { drinks?: RawCocktailData[] }).drinks
        return Array.isArray(drinks)
          ? drinks.map(transformCocktailData)
          : []
      },
      providesTags: (result, _error, code) =>
        result ? [{ type: 'Cocktails', id: code }] : [],
    }),
  }),
});

export const { useGetCocktailsByCodeQuery } = cocktailsApi;
