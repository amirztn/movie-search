import { useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import MovieList from './components/MovieList.jsx';
import { useDebounce } from './hooks/useDebounce.js';
import { useMovieSearch } from './hooks/useMovieSearch.js';

export default function App() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const { movies, loading, error } = useMovieSearch(debouncedQuery);

  const hasSearched = debouncedQuery.trim().length >= 3;

  return (
    <main className="app">
      <h1>🎬 Recherche de films</h1>
      <SearchBar value={query} onChange={setQuery} />

      {loading && <p className="status">Chargement…</p>}
      {error && <p className="status error">⚠️ {error}</p>}
      {!loading && !error && hasSearched && movies.length === 0 && (
        <p className="status">Aucun film trouvé.</p>
      )}

      <MovieList movies={movies} />
    </main>
  );
}
