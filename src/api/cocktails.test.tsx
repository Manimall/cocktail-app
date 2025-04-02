import { http, HttpResponse } from 'msw';
import { setupStore, store } from '../store';
import { cocktailsApi, useGetCocktailsByCodeQuery } from './cocktails';
import { server } from '../mocks/server';
import { screen } from '@testing-library/react'
import { CocktailCode, type RawCocktailData } from '../types';
import { waitFor } from '@testing-library/react';
import { renderWithProviders } from '../utils';


const mockCocktailData: RawCocktailData = {
  idDrink: '11007',
  strDrink: 'Margarita',
  strCategory: 'Cocktail',
  strAlcoholic: 'Alcoholic',
  strGlass: 'Margarita glass',
  strInstructions: 'Mix well...',
  strDrinkThumb: 'http://example.com/margarita.jpg',
  strIngredient1: 'Tequila',
  strMeasure1: '50 ml',
  strIngredient2: 'Lime Juice',
  strMeasure2: '25 ml',
}

describe('cocktailsApi', () => {
  const store = setupStore()

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' })
  })

  afterEach(() => {
    server.resetHandlers()
  })

  afterAll(() => {
    server.close()
  })

  test('successfully fetches cocktails by code', async () => {
    server.use(
      http.get('*/search.php', ({ request }) => {
        const url = new URL(request.url)
        if (url.searchParams.get('s') === CocktailCode.MARGARITA) {
          return HttpResponse.json({ drinks: [mockCocktailData] })
        }
        return HttpResponse.json({ drinks: null })
      })
    )

    const result = await store.dispatch(
      cocktailsApi.endpoints.getCocktailsByCode.initiate(CocktailCode.MARGARITA)
    )

    expect(result.data).toEqual([
      {
        idDrink: '11007',
        strDrink: 'Margarita',
        strCategory: 'Cocktail',
        strAlcoholic: 'Alcoholic',
        strGlass: 'Margarita glass',
        strInstructions: 'Mix well...',
        strDrinkThumb: 'http://example.com/margarita.jpg',
        ingredients: [
          { name: 'Tequila', measure: '50 ml' },
          { name: 'Lime Juice', measure: '25 ml' },
        ],
      }
    ])
  })

  test('handles empty response', async () => {
    server.use(
      http.get('*/search.php', () => HttpResponse.json({ drinks: null }))
    )

    const result = await store.dispatch(
      cocktailsApi.endpoints.getCocktailsByCode.initiate(CocktailCode.MOJITO)
    )

    expect(result.data).toEqual([])
  })

  test('handles network error', async () => {
    server.use(
      http.get('*/search.php', () => HttpResponse.error())
    )

    const result = await store.dispatch(
      cocktailsApi.endpoints.getCocktailsByCode.initiate('error' as CocktailCode)
    )

    expect(result.error).toMatchObject({
      status: 'FETCH_ERROR'
    })
  })

  test('provides correct tags for caching', async () => {
    server.use(
      http.get('*/search.php', () =>
        HttpResponse.json({ drinks: [mockCocktailData] }))
    );

    await store.dispatch(
      cocktailsApi.endpoints.getCocktailsByCode.initiate(CocktailCode.MARGARITA)
    );

    const state = store.getState();
    const providedTags = state[cocktailsApi.reducerPath].provided;

    const actualTags = Object.entries(providedTags?.Cocktails || {})
      .map(([id]) => ({ type: 'Cocktails' as const, id }));

    expect(actualTags).toContainEqual(
      { type: 'Cocktails', id: CocktailCode.MARGARITA }
    );
  });
});

describe('Component integration tests', () => {
  const TestComponent = ({ code }: { code: CocktailCode }) => {
    const { data, isLoading, error } = useGetCocktailsByCodeQuery(code)

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error occurred</div>

    return (
      <div>
        {data?.map(cocktail => (
          <div key={cocktail.idDrink}>{cocktail.strDrink}</div>
        ))}
      </div>
    )
  }

  test('renders loading state', async () => {
    server.use(
      http.get('*/search.php', () => new HttpResponse(null, { status: 200 }))
    )

    renderWithProviders(<TestComponent code={CocktailCode.MARGARITA} />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  test('renders data correctly', async () => {
    server.use(
      http.get('*/search.php', () =>
        HttpResponse.json({ drinks: [mockCocktailData] }))
    )

    renderWithProviders(<TestComponent code={CocktailCode.MARGARITA} />)

    await waitFor(() => {
      expect(screen.getByText('Margarita')).toBeInTheDocument()
    })
  })
});

test('caches data between requests', async () => {
  const store = setupStore()

  await store.dispatch(
    cocktailsApi.endpoints.getCocktailsByCode.initiate(CocktailCode.MARGARITA)
  )

  const secondResult = await store.dispatch(
    cocktailsApi.endpoints.getCocktailsByCode.initiate(CocktailCode.MARGARITA)
  )

  expect(secondResult.data).toEqual(expect.any(Array))
  expect(secondResult.isLoading).toBe(false)
})


test('handles concurrent requests', async () => {
  server.use(
    http.get('*/search.php', () =>
      HttpResponse.json({ drinks: [mockCocktailData] }))
  )

  const results = await Promise.all([
    store.dispatch(
      cocktailsApi.endpoints.getCocktailsByCode.initiate(CocktailCode.MARGARITA)
    ),
    store.dispatch(
      cocktailsApi.endpoints.getCocktailsByCode.initiate(CocktailCode.MARGARITA)
    )
  ])

  results.forEach(result => {
    expect(result.data).toEqual(expect.any(Array))
  })
})
