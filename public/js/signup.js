// FUNCIONES SINGUP EJS:

// SUBMIT SIGNUP:
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const verifyPassword = document.getElementById("verifyPassword").value;

  if (password !== verifyPassword) {
    alert("Las contraseñas no coinciden");
    return;
  }

  const res = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    window.location.href = "/login";
  } else {
    alert(data.message);
  }
});