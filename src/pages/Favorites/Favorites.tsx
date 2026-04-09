import { Card } from '../../components/Card';
import styles from './Favorites.module.css';
import type { FavCat } from '../../types.ts';

type Props = {
  favorites: FavCat[];
  toggleFavorites: (newFav: FavCat) => void;
};

const Favorites = ({ favorites, toggleFavorites }: Props) => {
  if (!favorites.length) {
    return (
      <p className="flex flex-1 items-center justify-center text-xl">
        В избранном пока нет котиков :(
      </p>
    );
  }

  return (
    <div className={`${styles.wrapper} max-h-[100%] flex-1 overflow-y-scroll`}>
      <ul className={`${styles.grid} grid px-4 py-6 lg:px-10 lg:py-[2rem] xl:px-15 xl:py-[3rem]`}>
        {favorites.map((fav) => (
          <li key={fav.id}>
            <Card id={fav.id} url={fav.url} isFavorite={true} toggleFavorite={toggleFavorites} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
