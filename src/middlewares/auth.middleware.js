const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.accessToken;
  // Comprobamos si es una ruta de BE o FE para ajustar el error
  const isApi = req.originalUrl.startsWith("/api");

  if (!token) {
    return isApi
      ? res.status(401).json({ message: "Unauthorized" })   // error acorde si es api
      : res.redirect("/login"); // redireccion a login si es vista
  }

  try {
    req.user = jwt.verify(token, accessTokenSecret);
    return next();
  } catch (error) {
    return isApi
      ? res.status(401).json({ message: "Invalid or expired token" }) // error acorde si es api
      : res.redirect("/login"); // redireccion a login si es vista
  }
};

const authorizeAdmin = (req, res, next) => {
  const isApi = req.originalUrl.startsWith("/api");

  if (req.user.role !== "admin") {
    return isApi
      ? res.status(403).json({ message: "Admin only" })
      : res.redirect("/dashboard");
  }

  return next();
};

module.exports = {
  authenticateJWT,
  authorizeAdmin,
};
