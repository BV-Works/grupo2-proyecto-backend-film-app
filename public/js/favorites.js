import { getPoster } from "../utils/ui-helpers.js"; 
import { FavoritesAPI } from "../utils/favorites-api.js";
const grid = document.getElementById("movies-grid");

let currentFavorites = []; 

const loadFavorites = async () => {
  currentFavorites = await FavoritesAPI.getAll(); 
  renderFavoriteMovies(); 
}

const renderFavoriteMovies = () => {
  if (!currentFavorites.length) {
    grid.innerHTML = "<p>Tu lista de favoritos está vacía</p>";
    return;
  }

  grid.innerHTML = currentFavorites
    .map((fav) => {
      if (fav.unavailable) {
        return `
            <div class="movie-card">
                <h3>Película no disponible</h3>
                <p>Imposible cargar la información</p>

                <button class="btn delete-favorite-btn"
                    data-favorite-id="${fav.favoriteId} 
                    data-movie-source="omdb"
                    data-movie-source-id="${fav.movieSourceId}"
                    >Quitar de favoritos
                </button>
            </div>
        `; 
      }
      return `
      <div class="movie-card">
        <img src="${getPoster(fav.poster)}" alt="${fav.title}">
        <h3>${fav.title}</h3>
        <p>${fav.year}</p>
        <a href="/search/${fav.movieSourceId}" class="btn">Ver detalle</a>
        <button class="btn delete-favorite-btn"
          data-favorite-id="${fav.favoriteId}" 
          data-movie-source="omdb"
          data-movie-source-id="${fav.movieSourceId}"
        >Quitar de favoritos
        </button>
      </div>
    `;
    })
    .join("");
}; 

const handleFavoriteClick = async (button) => {
  const movieSourceId = button.dataset.movieSourceId;
  const favoriteId = button.dataset.favoriteId; 
  try {
      await FavoritesAPI.remove(favoriteId);

    await loadFavorites();
    renderFavoriteMovies();
  } catch (e) {
    console.error(e);
    alert("Error al actualizar favorito");
  }
};

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete-favorite-btn")) {
    await handleFavoriteClick(event.target);
  }
});

loadFavorites();