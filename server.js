const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const { NotFounError } = require("./utils/NotFoundError");
const { createUser, login } = require("./controllers/user");
const { getNews } = require("./controllers/news");
const { validateUserBody, validateLogin } = require("./middleware/validation");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  alloheaders: ["Content-Type", "Authorization"],
  credentials: true,
};

mongoose.connect("mongodb://127.0.0.1:27017/newsApp_db");

app.use(cors(corsOptions));

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  next();
});
app.get("/", (req, res) => {
  res.send("¡The backend is working!");
});

app.post("/signup", validateUserBody, createUser);
app.post("/signin", validateLogin, login);
app.get("/news", getNews);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
