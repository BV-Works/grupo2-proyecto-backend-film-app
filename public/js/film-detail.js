// Coge el imdbID de la URL
const imdbID = window.location.pathname.split("/").pop();

const loadMovie = async () => {
  const res = await fetch(`/api/films?i=${imdbID}`);
  const movie = await res.json();

  if (!movie || movie.Response === "False") {
    document.getElementById("film-detail").innerHTML =
      "<p>Película no encontrada</p>";
    return;
  }

  document.getElementById("film-detail").innerHTML = `
    <div class="film-detail">
      <img 
        src="${movie.Poster !== "N/A" ? movie.Poster : "/img/no-poster.jpg"}" 
        alt="${movie.Title}"
      >
      
      <div class="movie-info">
        <h1>${movie.Title}</h1>

        <p><strong>Año:</strong> ${movie.Year}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
        <p><strong>Género:</strong> ${movie.Genre}</p>
        <p><strong>Duración:</strong> ${movie.Runtime}</p>
        <p><strong>Actores:</strong> ${movie.Actors}</p>
        <p><strong>Sinopsis:</strong> ${movie.Plot}</p>
        <p><strong>Rating:</strong> ${movie.imdbRating}</p>

        <button 
          class="btn" 
          id="addFavoriteBtn" 
          data-id="${movie.imdbID}" 
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