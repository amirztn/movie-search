# 🎬 Recherche de films

Petit projet React qui interroge l'API externe [OMDb](https://www.omdbapi.com/).

Ce qu'il illustre :
- **`useEffect`** pour appeler l'API quand la recherche change (avec annulation via `AbortController`)
- **Gestion du chargement et des erreurs** (`loading`, `error`)
- **Hooks personnalisés** : `useDebounce` et `useMovieSearch`
- **Docker** (build + nginx) et déploiement **Vercel**

## Structure

```
src/
├── api/omdb.js              # appel fetch à l'API
├── hooks/
│   ├── useDebounce.js       # attend que l'utilisateur arrête de taper
│   └── useMovieSearch.js    # useEffect + loading + error
├── components/              # SearchBar, MovieList, MovieCard
├── App.jsx
└── main.jsx
```

## 1. Obtenir une clé API (gratuite)

Va sur https://www.omdbapi.com/apikey.aspx, choisis « FREE », puis valide le lien reçu par e-mail.

## 2. Lancer en local

```bash
cp .env.example .env     # puis colle ta clé dans .env
npm install
npm run dev
```

Ouvre http://localhost:5173

## 3. Docker

La clé est lue au moment du build :

```bash
docker build --build-arg VITE_OMDB_API_KEY=ta_cle -t movie-search .
docker run -p 8080:80 movie-search
```

Ouvre http://localhost:8080

## 4. Déployer sur Vercel

1. Pousse le projet sur GitHub.
2. Sur https://vercel.com/new, importe le repo (Vercel détecte Vite tout seul).
3. Dans **Settings → Environment Variables**, ajoute `VITE_OMDB_API_KEY` avec ta clé.
4. Déploie (ou redéploie si tu as ajouté la variable après).

> ⚠️ La clé est visible dans le code JavaScript du navigateur (c'est le cas de toute variable `VITE_*`).
> Pour un projet d'apprentissage avec une clé gratuite, ce n'est pas grave.
