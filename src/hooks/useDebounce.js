import { useEffect, useState } from 'react';

// Renvoie `value` seulement après `delay` ms sans changement.
// Évite de lancer une requête à chaque touche tapée.
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer); // nettoyage si `value` change avant la fin
  }, [value, delay]);

  return debouncedValue;
}
