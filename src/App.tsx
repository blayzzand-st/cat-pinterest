import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import Favorites from './pages/Favorites/Favorites.tsx';
import { Header } from './components/Header';
import { useEffect, useState } from 'react';
import type { FavCat } from './types.ts';
import useCats from './hooks/useCats.ts';

function App() {
  const [favorites, setFavorites] = useState<FavCat[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('favs') ?? '[]');
    } catch {
      return [];
    }
  });

  const { cats, loadCats, isLoading, isFetchingCats, error } = useCats();

  const toggleFavorite = (newFav: FavCat) => {
    if (favorites.find((item) => item.id === newFav.id)) {
      setFavorites((prev) => prev.filter((cat) => cat.id !== newFav.id));
    } else {
      setFavorites((prev) => [...prev, newFav]);
    }
  };

  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              cats={cats}
              loadCats={loadCats}
              isLoading={isLoading}
              isFetchingCats={isFetchingCats}
              error={error}
              favorites={favorites}
              toggleFavorites={toggleFavorite}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites favorites={favorites} toggleFavorites={toggleFavorite} />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
