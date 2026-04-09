import { Card } from '../../components/Card';
import useCats from '../../hooks/useCats.ts';
import styles from './Home.module.css';

const Home = () => {
  const { cats, isLoading, error } = useCats();

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
      <ul className={`${styles.catGrid} grid px-15 py-[3rem]`}>
        {cats.map((cat) => (
          <li key={cat.id}>
            <Card url={cat.url} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
