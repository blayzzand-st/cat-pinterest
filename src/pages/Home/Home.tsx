import { Card } from '../../components/Card';
import styles from './Home.module.css';
import { useEffect, useRef } from 'react';
import type { Cat, FavCat } from '../../types.ts';

type Props = {
  cats: Cat[];
  isLoading: boolean;
  isFetchingCats: boolean;
  error: string | null;
  loadCats: () => Promise<void>;
  favorites: FavCat[];
  toggleFavorites: (newFav: FavCat) => void;
};

const Home = ({
  cats,
  isLoading,
  isFetchingCats,
  error,
  loadCats,
  favorites,
  toggleFavorites,
}: Props) => {
  const lastCardRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isFetchingCats) loadCats();
    });

    if (lastCardRef.current) {
      observer.observe(lastCardRef.current);
    }

    return () => observer.disconnect();
  }, [loadCats, cats.length]);

  if (isLoading) {
    return (
      <p className="flex flex-1 animate-pulse items-center justify-center duration-100">
        Загружаем котиков...
      </p>
    );
  }

  if (error) {
    return <p className="flex flex-1 items-center justify-center">{error}</p>;
  }

  return (
    <div className={`${styles.wrapper} max-h-[100%] flex-1 overflow-y-scroll`}>
      <ul className={`${styles.catGrid} grid px-4 py-6 lg:px-10 lg:py-[2rem] xl:px-15 xl:py-[3rem]`}>
        {cats.map((cat, idx) => (
          <li key={cat.id} ref={idx === cats.length - 1 ? lastCardRef : null}>
            <Card
              id={cat.id}
              url={cat.url}
              isFavorite={!!favorites.find((item) => item.id === cat.id)}
              toggleFavorite={toggleFavorites}
            />
          </li>
        ))}
      </ul>
      {isFetchingCats && (
        <p className="flex animate-pulse items-center justify-center duration-100">
          ...загружаем еще котиков...
        </p>
      )}
    </div>
  );
};

export default Home;
