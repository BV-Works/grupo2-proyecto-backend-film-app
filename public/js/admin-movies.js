// FUNCIONES ADMIN MOVIES EJS:
// Guardar
const saveBtn = document.getElementById("saveBtn");
if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    saveMovie();
  });
}

// Cancelar
const cancelBtn = document.getElementById("cancelBtn");
if (cancelBtn) {
  cancelBtn.addEventListener("click", () => {
    hideForm();
  });
}

// Crear nueva película
const createBtn = document.getElementById("createBtn");
if (createBtn) {
  createBtn.addEventListener("click", () => {
    showForm();
  });
}
// editar película
document.addEventListener("click", (e) => {
  // EDITAR
  if (e.target.classList.contains("editBtn")) {
    const btn = e.target;
    editMovie(
      btn.dataset.id,
      btn.dataset.title,
      btn.dataset.poster,
      btn.dataset.year,
      btn.dataset.director,
      btn.dataset.genre,
      btn.dataset.runtime,
      btn.dataset.plot,
      btn.dataset.actors
    );
  }

  // ELIMINAR
  if (e.target.classList.contains("deleteBtn")) {
    deleteMovie(e.target.dataset.id);
  }
});
// Mostrar formulario crear peli
const showForm = () => {
  document.getElementById("movie-form").style.display = "block";
  document.getElementById("form-title").textContent = "Nueva película";
  document.getElementById("movie-id").value = "";
  document.getElementById("title").value = "";
  document.getElementById("poster").value = "";
  document.getElementById("year").value = "";
  document.getElementById("director").value = "";
  document.getElementById("genre").value = "";
  document.getElementById("runtime").value = "";
  document.getElementById("plot").value = "";
  document.getElementById("actors").value = "";
};
// Ocultar formulario crear peli

const hideForm = () => {
  document.getElementById("movie-form").style.display = "none";
};
// Cargar peliculas admin mongo
const loadMovies = async () => {
  const res = await fetch("/api/films/admin");
  const movies = await res.json();

  const list = document.getElementById("movies-list");

  if (!movies.length) {
    list.innerHTML = "<p>No hay películas</p>";
    return;
  }

  list.innerHTML = movies
    .map(
      (movie) => `
      <div class="movie-card">
        <img src="${movie.poster}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>${movie.year} - ${movie.director}</p>

        <button 
          class="btn editBtn"
          data-id="${movie._id}"
          data-title="${movie.title}"
          data-poster="${movie.poster}"
          data-year="${movie.year}"
          data-director="${movie.director}"
          data-genre="${movie.genre}"
          data-runtime="${movie.runtime}"
          data-plot="${movie.plot}"
          data-actors="${movie.actors}"
        >
          Editar
        </button>

        <button 
          class="btn deleteBtn"
          data-id="${movie._id}"
        >
          Eliminar
        </button>
      </div>
    `,
    )
    .join("");
};
// crear peli mongo
const saveMovie = async () => {
  const id = document.getElementById("movie-id").value;
  const body = {
    title: document.getElementById("title").value,
    poster: document.getElementById("poster").value,
    year: document.getElementById("year").value,
    director: document.getElementById("director").value,
    genre: document.getElementById("genre").value,
    runtime: document.getElementById("runtime").value,
    plot: document.getElementById("plot").value,
    actors: document.getElementById("actors").value,
  };

  const url = id ? `/api/films/${id}` : "/api/films";
  const method = id ? "PUT" : "POST";

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  alert(data.message || data.error);
  hideForm();
  loadMovies();
};
// edit peli mongo
const editMovie = (
  id,
  title,
  poster,
  year,
  director,
  genre,
  runtime,
  plot,
  actors
) => {
  document.getElementById("movie-form").style.display = "block";
  document.getElementById("form-title").textContent = "Editar película";
  document.getElementById("movie-id").value = id;
  document.getElementById("title").value = title;
  document.getElementById("poster").value = poster;
  document.getElementById("year").value = year;
  document.getElementById("director").value = director;
  document.getElementById("genre").value = genre;
  document.getElementById("runtime").value = runtime;
  document.getElementById("plot").value = plot;
  document.getElementById("actors").value = actors;
};
// borrar peli mongo
const deleteMovie = async (id) => {
  if (!confirm("¿Segur@ que quieres eliminar esta película?")) return;

  const res = await fetch(`/api/films/${id}`, { method: "DELETE" });
  const data = await res.json();
  alert(data.message || data.error);
  loadMovies();
};

loadMovies();
