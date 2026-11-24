import MovieCard from './MovieCard.jsx';

export default function MovieList({ movies }) {
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}
