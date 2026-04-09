import styles from './Card.module.css';
import fav from '../../assets/fav.svg';
import favFull from '../../assets/fav-full.svg';
import { useState } from 'react';
import type { FavCat } from '../../types.ts';

type Props = {
  id: string;
  url: string;
  isFavorite: boolean;
  toggleFavorite: (newFav: FavCat) => void;
};

const Card = ({ id, url, isFavorite, toggleFavorite }: Props) => {
  const [isFavHover, setIsFavHover] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getFavIcon = () => {
    if (isFavorite) return favFull;
    else if (isFavHover) return favFull;

    return fav;
  };

  return (
    <article
      className={`${styles.card} ${isLoaded ? '' : styles.skeleton} relative h-[6rem] w-[6rem] sm:h-[8rem] sm:w-[8rem] md:h-[12rem] md:w-[12rem] lg:h-[14rem] lg:w-[14rem] xl:h-[17rem] xl:w-[17rem]`}
    >
      <img
        style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
        src={url}
        alt="cat"
        onLoad={() => setIsLoaded(true)}
      />
      <button
        className={styles.likeBtn}
        onMouseEnter={() => setIsFavHover(true)}
        onMouseLeave={() => setIsFavHover(false)}
        onClick={() => {
          setIsFavHover(false);
          toggleFavorite({ id, url });
        }}
      >
        <img src={getFavIcon()} alt="Add image to favorites" />
      </button>
    </article>
  );
};

export default Card;
