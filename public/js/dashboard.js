const grid = document.getElementById("movies-grid");

let currentMovies = []; 
let currentFavorites = []; 

const getPoster = (Poster) => {
  return Poster && Poster !=="N/A" ? Poster : "/img/no-poster.jpg"; 
}; 

const loadFavorites = async () => {
  currentFavorites = await FavoritesAPI.getAll(); 
}

const loadMovies = async () => {
  const res = await fetch("/api/films/random");/* , {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }); */
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
        <img src="${getPoster(movie.Poster)}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <a href="/search/${movie.imdbID}" class="btn">Ver detalle</a>
        <button class="btn favorite-btn" 
          data-movie-source="omdb"
          data-movie-source-id="${movie.imdbID}"
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
    alert("Escribe el título de una película");
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
        <img src="${movie.poster !== "N/A" ? movie.poster : "/img/no-poster.jpg"}">
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

loadMovies();
