import { useCallback, useEffect, useState } from 'react';
import type { Cat } from '../types.ts';

const useCats = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFetchingCats, setIsFetchingCats] = useState(false);

  const loadCats = useCallback(async () => {
    setIsFetchingCats(true);

    try {
      const res = await fetch(
        'https://api.thecatapi.com/v1/images/search?limit=10'
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data: Cat[] = await res.json();

      return setCats((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));

        return [...prev, ...data.filter((cat) => !existingIds.has(cat.id))];
      });
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    } finally {
      setIsLoading(false);
      setIsFetchingCats(false);
    }
  }, []);

  useEffect(() => {
    loadCats();
  }, [loadCats]);

  return { cats, isLoading, isFetchingCats, error, loadCats };
};

export default useCats;
