export default function MovieCard({ movie }) {
  const hasPoster = movie.Poster && movie.Poster !== 'N/A';

  return (
    <li className="movie-card">
      {hasPoster ? (
        <img src={movie.Poster} alt={`Affiche de ${movie.Title}`} loading="lazy" />
      ) : (
        <div className="no-poster">Pas d'affiche</div>
      )}
      <h3>{movie.Title}</h3>
      <p>{movie.Year}</p>
    </li>
  );
}
