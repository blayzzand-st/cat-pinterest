import styles from './Card.module.css';
import fav from '../../assets/fav.svg';
import favFull from '../../assets/fav-full.svg';
import { useState } from 'react';

type Props = {
  url: string;
};

const Card = ({ url }: Props) => {
  const [isFavHover, setIsFavHover] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getFavIcon = () => {
    if (isFav) return favFull;
    else if (isFavHover) return favFull;

    return fav;
  };

  const addImgToFavorites = () => {
    setIsFav((prev) => !prev);
    setIsFavHover(false);
    console.log('image add to favs!');
  };

  return (
    <article className={`${styles.card} ${isLoaded ? '' : styles.skeleton} relative h-[17rem] w-[17rem]`}>
      <img
        style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
        src={url}
        alt=""
        onLoad={() => setIsLoaded(true)}
      />
      <button
        className={styles.likeBtn}
        onMouseEnter={() => setIsFavHover(true)}
        onMouseLeave={() => setIsFavHover(false)}
        onClick={addImgToFavorites}
      >
        <img src={getFavIcon()} alt="Add image to favorites" />
      </button>
    </article>
  );
};

export default Card;
