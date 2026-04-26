import { getPoster } from "../utils/ui-helpers.js"; 
import { FavoritesAPI } from "../utils/favorites-api.js";
const grid = document.getElementById("movies-grid");

let currentMovies = []; 
let currentFavorites = []; 

const loadFavorites = async () => {
  currentFavorites = await FavoritesAPI.getAll(); 
}

const loadMovies = async () => {
  const res = await fetch("/api/films/random");
  const movies = await res.json();

  currentMovies = movies; 

  await loadFavorites(); 

  renderMovies(); 
}; 

const renderMovies = () => {
  if (!currentMovies.length) {
    grid.innerHTML = "<p>No hay películas disponibles</p>";
    return;
  }

  grid.innerHTML = currentMovies
    .map((movie) => {
      const favorite = FavoritesAPI.findFavorite(
        currentFavorites, 
        "omdb",
        movie.imdbID,
      ); 
      const isFavorite = Boolean(favorite); 

      return `
      <div class="movie-card">
        <img class="movie-poster" src="${getPoster(movie.poster)}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>${movie.year}</p>
        <a href="/search/${movie.movieSourceId}" class="btn">Ver detalle</a>
        <button class="btn favorite-btn" 
          data-movie-source="${movie.movieSource}"
          data-movie-source-id="${movie.movieSourceId}"
          data-favorite-id="${favorite ? favorite.favoriteId : ""}"
          data-is-favorite="${isFavorite}"
        >${isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        </button>
      </div>
    `;
    })
    .join("");
}; 

const handleFavoriteClick = async (button) => {
  const movieSource = button.dataset.movieSource;
  const movieSourceId = button.dataset.movieSourceId;
  const favoriteId = button.dataset.favoriteId;
  const isFavorite = button.dataset.isFavorite === "true";

  try {
    if (isFavorite) {
      await FavoritesAPI.remove(favoriteId);
    } else {
      await FavoritesAPI.add(movieSource, movieSourceId);
    }

    await loadFavorites();
    renderMovies();
  } catch (e) {
    console.error(e);
    alert("Error actualizando favorito");
  }
};

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("favorite-btn")) {
    await handleFavoriteClick(event.target);
  }
});

const searchMovies = async () => {
  const title = document.getElementById("searchInput").value;

  if (!title) {
    loadMovies();
    // alert("Escribe el título de una película");
    return;
  }

  const res = await fetch(`/api/films?s=${title}`);
  const movies = await res.json();

  const grid = document.getElementById("movies-grid");

  if (!movies || !movies.Search || movies.Search.length === 0) {
    grid.innerHTML = "<p>No hay resultados</p>";
    return;
  }

  grid.innerHTML = movies.Search.map(
    (movie) => `
      <div class="movie-card">
        <img class="movie-poster" src="${movie.poster !== "N/A" ? movie.poster : "/img/no-poster.png"}">
        <h3>${movie.title}</h3>
        <p>${movie.year}</p>
        <a href="/search/${movie.id}" class="btn">Ver detalle</a>
      </div>
    `,
  ).join("");
};

document.getElementById("searchInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchMovies();
});

document
  .getElementsByClassName("btn btn-search")[0]
  .addEventListener("click", (event) => {
    searchMovies();
  });

document.addEventListener("error", (e) => {
  if (e.target.classList.contains("movie-poster")) {
    e.target.src = "/img/no-poster.png";
  }
}, true);

loadMovies();
