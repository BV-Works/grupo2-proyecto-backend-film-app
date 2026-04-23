// FUNCIONES ADMIN USERS EJS:

// editar usuario
document.addEventListener("click", (e) => {
  // EDITAR
  if (e.target.classList.contains("edit-btn")) {
    const btn = e.target;
    editUser(
      btn.dataset.id,
      btn.dataset.name,
      btn.dataset.email,
      btn.dataset.role
    );
  }

  // ELIMINAR
  if (e.target.classList.contains("delete-btn")) {
    deleteUser(e.target.dataset.id);
  }
});

const loadUsers = async () => {
  const res = await fetch("/api/users");
  const users = await res.json();

  const list = document.getElementById("users-list");

  if (!users.length) {
    list.innerHTML = "<p>No hay usuarios</p>";
    return;
  }

  list.innerHTML = users
    .map(
      (user) => `
      <div class="user-card">
        <p><strong>${user.name}</strong> - ${user.email} - ${user.role}</p>
        <button 
          class="btn edit-btn"
          data-id="${user.id}"
          data-name="${user.name}"
          data-email="${user.email}"
          data-role="${user.role}"
        >Editar</button>
        <button class="btn delete-btn"
        data-id="${user.id}"
        >Eliminar</button>
      </div>
    `
    )
    .join("");
};

const editUser = async (id, name, email, role) => {
  const nuevoNombre = prompt("Nombre:", name);
  const nuevoEmail = prompt("Email:", email);
  const nuevoRole = prompt("Role (user/admin):", role);

  const res = await fetch(`/api/user/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: nuevoNombre,
      email: nuevoEmail,
      role: nuevoRole,
    }),
  });

  const data = await res.json();
  alert(data.message || data.error);
  loadUsers();
};

const deleteUser = async (id) => {
  if (!confirm("¿Estás segura de que quieres eliminar este usuario?")) return;

  const res = await fetch(`/api/user/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  alert(data.message || data.error);
  loadUsers();
};

loadUsers();
