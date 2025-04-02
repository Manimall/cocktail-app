import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { cocktailsApi } from '../api/cocktails';

type RootState = {
  [cocktailsApi.reducerPath]: ReturnType<typeof cocktailsApi.reducer>;
};

export const setupTestStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: {
      [cocktailsApi.reducerPath]: cocktailsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cocktailsApi.middleware),
    preloadedState,
  });
};

export const wrapper = ({ children }: PropsWithChildren) => (
  <Provider store={setupTestStore()}>{children}</Provider>
);

export const renderWithProviders = (
  ui: React.ReactElement,
  { preloadedState, ...renderOptions }: { preloadedState?: Partial<RootState> } = {}
) => {
  const store = setupTestStore(preloadedState);
  return {
    ...render(<Provider store={store}>{ui}</Provider>, renderOptions),
    store,
  };
};
