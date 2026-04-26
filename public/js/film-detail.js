import { getPoster } from "../utils/ui-helpers.js"; 
import { FavoritesAPI } from "../utils/favorites-api.js";
const movieId = window.location.pathname.split("/").pop();
const filmDetail = document.getElementById("film-detail");

let currentMovie = null;
let currentFavorites = [];

const loadFavorites = async () => {
  currentFavorites = await FavoritesAPI.getAll();
};

const loadMovie = async () => {
  try {
    const res = await fetch(`/api/films?i=${movieId}`);
    const data = await res.json();

    if (!res.ok || data.Reponse === "False" || !data.Search?.length) {
      filmDetail.innerHTML = "<p>Película no encontrada</p>";
      return;
    }

    currentMovie = data.Search[0];

    await loadFavorites();

    renderMovie();
  } catch (e) {
    console.error(e);
    filmDetail.innerHTML = "<p>Error cargando la película</p>";
  }
};

const renderMovie = () => {
  const favorite = FavoritesAPI.findFavorite(
    currentFavorites,
    currentMovie.movieSource,
    currentMovie.movieSourceId
  );

  const isFavorite = Boolean(favorite);

  filmDetail.innerHTML = `
    <div class="film-detail">
      <img 
        src="${getPoster(currentMovie.poster)}" 
        alt="${currentMovie.title}"
      >
      
      <div class="movie-info">
        <h1>${currentMovie.title}</h1>

        <p><strong>Año:</strong> ${currentMovie.year || "No disponible"}</p>
        <p><strong>Director:</strong> ${currentMovie.director || "No disponible"}</p>
        <p><strong>Género:</strong> ${currentMovie.genre || "No disponible"}</p>
        <p><strong>Duración:</strong> ${currentMovie.runtime || "No disponible"}</p>
        <p><strong>Actores:</strong> ${currentMovie.actors || "No disponible"}</p>
        <p><strong>Sinopsis:</strong> ${currentMovie.plot || "No disponible"}</p>
        <p><strong>Rating:</strong> ${currentMovie.rating || "No disponible"}</p>

        <button 
          class="btn favorite-btn"
          data-movie-source="${currentMovie.movieSource}"
          data-movie-source-id="${currentMovie.movieSourceId}"
          data-favorite-id="${favorite ? favorite.favoriteId : ""}"
          data-is-favorite="${isFavorite}"
        > 
          ${isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"} 
        </button>
      </div>
    </div>
  `;
}; // ahora tenemos display dinámico del botón (añadir/quitar)

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
    renderMovie();
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

loadMovie();