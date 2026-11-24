import { useEffect, useState } from 'react';
import { searchMovies } from '../api/omdb.js';

// Hook personnalisé : lance la recherche quand `query` change
// et expose { movies, loading, error }.
export function useMovieSearch(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Moins de 3 caractères : on ne cherche pas.
    if (query.trim().length < 3) {
      setMovies([]);
      setError(null);
      setLoading(false);
      return;
    }

    // Permet d'annuler la requête si `query` change avant la réponse.
    const controller = new AbortController();

    async function fetchMovies() {
      setLoading(true);
      setError(null);

      try {
        const results = await searchMovies(query.trim(), controller.signal);
        setMovies(results);
      } catch (err) {
        if (err.name === 'AbortError') return; // requête annulée volontairement
        setMovies([]);
        setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchMovies();

    // Fonction de nettoyage : annule la requête en cours.
    return () => controller.abort();
  }, [query]);

  return { movies, loading, error };
}
