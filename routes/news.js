const express = require("express");
const router = express.Router();
const {
  saveNews,
  getSavedNews,
  deleteSavedNews,
} = require("../controllers/news");
const { auth } = require("../middleware/auth");

router.post("/", auth, saveNews); // Guardar noticia
router.get("/", auth, getSavedNews); // Obtener todas
router.delete("/:id", auth, deleteSavedNews); // Eliminar por URL

module.exports = router;
