import { http, HttpResponse } from 'msw'
import { BASE_URL } from '../api'
import type { RawCocktailData } from '../types'

export const handlers = [
  http.get(`${BASE_URL}/search.php`, ({ request }) => {
    const url = new URL(request.url)
    const searchParam = url.searchParams.get('s')

    if (searchParam === 'margarita') {
      const mockData: RawCocktailData = {
        idDrink: '11007',
        strDrink: 'Margarita',
        strCategory: 'Cocktail',
        strAlcoholic: 'Alcoholic',
        strGlass: 'Margarita glass',
        strInstructions: 'Mix well...',
        strDrinkThumb: 'http://example.com/margarita.jpg',
        strIngredient1: 'Tequila',
        strMeasure1: '50 ml',
      }
      return HttpResponse.json({ drinks: [mockData] })
    }

    return HttpResponse.json({ drinks: null })
  })
]
