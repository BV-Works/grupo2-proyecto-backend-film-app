const loadMovies = async () => {
  const res = await fetch("/api/films/random", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const movies = await res.json();
  const grid = document.getElementById("movies-grid");

  if (!movies.length) {
    grid.innerHTML = "<p>No hay películas disponibles</p>";
    return;
  }

  grid.innerHTML = movies
    .map(
      (movie) => `
      <div class="movie-card">
        <img src="${movie.Poster !== "N/A" ? movie.Poster : "/img/no-poster.jpg"}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <a href="/search/${movie.imdbID}" class="btn">Ver detalle</a>
  <button class="btn" onclick="addFavorite('${movie.imdbID}', 'omdb')">Añadir a favoritos</button>
      </div>
    `,
    )
    .join("");
};

const addFavorite = async (movie_ref, movie_source) => {
  const res = await fetch("/api/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movie_ref, movie_source }),
  });

  const data = await res.json();
  alert(data.mensaje || data.error);
};

const searchMovies = async () => {
  const title = document.getElementById("searchInput").value;
  if (!title) {
    alert("Escribe el título de una película");
    return;
  }

  const res = await fetch(`/api/films?s=${title}`);
  const movies = await res.json();

  const grid = document.getElementById("movies-grid");

  if (!movies.Search.length) {
    grid.innerHTML = "<p>No hay resultados</p>";
    return;
  }

  grid.innerHTML = movies.Search
    .map(
      (movie) => `

      <div class="movie-card">
        <img src="${movie.Poster !== "N/A" ? movie.Poster : "/img/no-poster.jpg"}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <a href="/search/${movie.imdbID}" class="btn">Ver detalle</a>
        <button class="btn" onclick="addFavorite('${movie.imdbID}', 'omdb')">Añadir a favoritos</button>
      </div>
    `,
    )
    .join("");
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
