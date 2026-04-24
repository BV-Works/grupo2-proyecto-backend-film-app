// Coge el imdbID de la URL
const id = window.location.pathname.split("/").pop();

const loadMovie = async () => {
  const res = await fetch(`/api/films?i=${id}`);
  const movieObject = await res.json();
  const movie = movieObject.Search[0];
  if (!movie || movie.Response === "False") {
    document.getElementById("film-detail").innerHTML =
      "<p>Película no encontrada</p>";
    return;
  }

  document.getElementById("film-detail").innerHTML = `
    <div class="film-detail">
      <img 
        src="${movie.poster !== "N/A" ? movie.poster : "/img/no-poster.jpg"}" 
        alt="${movie.title}"
      >
      
      <div class="movie-info">
        <h1>${movie.title}</h1>

        <p><strong>Año:</strong> ${movie.year}</p>
        <p><strong>Director:</strong> ${movie.director}</p>
        <p><strong>Género:</strong> ${movie.genre}</p>
        <p><strong>Duración:</strong> ${movie.runtime}</p>
        <p><strong>Actores:</strong> ${movie.actors}</p>
        <p><strong>Sinopsis:</strong> ${movie.plot}</p>
        <p><strong>Rating:</strong> ${movie.rating}</p>

        <button 
          class="btn" 
          id="addFavoriteBtn" 
          data-id="${movie.id}" 
          data-source="omdb"
        >
          Añadir a favoritos
        </button>
      </div>
    </div>
  `;

  // Añade el evento después de pintar el botón
  const addFavoriteBtn = document.getElementById("addFavoriteBtn");

  if (addFavoriteBtn) {
    addFavoriteBtn.addEventListener("click", () => {
      addFavorite(
        addFavoriteBtn.dataset.id,
        addFavoriteBtn.dataset.source
      );
    });
  }
};

const addFavorite = async (movieSourceId, movieSource) => {
  const res = await fetch("/api/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      movieSource,
      movieSourceId,
    }),
  });

  const data = await res.json();
  alert(data.message || data.error);
};

loadMovie();