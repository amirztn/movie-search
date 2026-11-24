// Appel à l'API externe OMDb : https://www.omdbapi.com/
// La clé est lue depuis la variable d'environnement VITE_OMDB_API_KEY.
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export async function searchMovies(query, signal) {
  if (!API_KEY) {
    throw new Error(
      "Clé API manquante : définis VITE_OMDB_API_KEY (voir .env.example).",
    );
  }

  const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Erreur réseau (${response.status})`);
  }

  const data = await response.json();

  // OMDb répond toujours en 200, l'erreur est dans le JSON.
  if (data.Response === 'False') {
    if (data.Error === 'Movie not found!') return [];
    throw new Error(data.Error || "Erreur de l'API");
  }

  return data.Search;
}
