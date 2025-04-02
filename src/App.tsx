import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Menu } from './components/Menu';
import { HomePage } from './pages/HomePage/HomePage';
import { ErrorDisplay } from './components/ErrorDisplay';
import { CocktailPage } from './pages/CocktailPage/CocktailPage';
import { Footer } from './components/Footer';
import styles from './App.module.scss';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className={styles.container}>
          <Menu />
          <main className={styles.content}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/:code" element={<CocktailPage />} />
              <Route path="*" element={<ErrorDisplay message="Page not found" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
