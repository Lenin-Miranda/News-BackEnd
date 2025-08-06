const express = require("express");
const router = express.Router();

const { getCurrenUser } = require("../controllers/user");
const { auth } = require("../middleware/auth");

router.get("/me", auth, getCurrenUser);

module.exports = router;
