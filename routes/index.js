const express = require("express");
const router = express.Router();

const { createUser, login } = require("../controllers/user");
const { getNews } = require("../controllers/news");
const { validateUserBody, validateLogin } = require("../middleware/validation");

const userRoutes = require("./user");
const savedNewsRoutes = require("./news");

// Rutas públicas
router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateLogin, login);
router.get("/news", getNews);

// Rutas protegidas
router.use("/users", userRoutes);
router.use("/news-saved", savedNewsRoutes);

module.exports = router;
