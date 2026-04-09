import { useEffect, useState } from 'react';

type Cat = {
  id: string;
  url: string;
  width: number;
  height: number;
};

const useCats = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('https://api.thecatapi.com/v1/images/search?limit=10'),
      fetch('https://api.thecatapi.com/v1/images/search?limit=10'),
    ])
      .then((responses) => {
        responses.forEach((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
        });

        return Promise.all(responses.map((res) => res.json()));
      })
      .then(([batch1, batch2]) => setCats([...batch1, ...batch2]))
      .catch((err) => {
        if (err instanceof Error) setError(err.message);
        else setError(String(err));
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { cats, isLoading, error };
};

export default useCats;
