// FUNCIONES LOGIN EJS :

// SUBMIT DEL LOGIN
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  debugger
  if (res.ok) {
    if (data.role === "admin") {
      window.location.href = "/admin-movies";
    } else {
      window.location.href = "/dashboard";
    }
  } else {
    alert(data.message);
  }
});


