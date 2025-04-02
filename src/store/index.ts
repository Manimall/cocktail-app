import { configureStore } from '@reduxjs/toolkit';
import { cocktailsApi } from '../api/cocktails';

interface RootState {
  [cocktailsApi.reducerPath]: ReturnType<typeof cocktailsApi.reducer> & {
    providedTags?: Array<{ type: string; id: string }>
  };
}

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: {
      [cocktailsApi.reducerPath]: cocktailsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cocktailsApi.middleware),
    preloadedState,
  });
};

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
