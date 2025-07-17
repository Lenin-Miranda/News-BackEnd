const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.NEWS_API_KEY || "494e42497aaa4cd8ba25c47c7bdcb23f";

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.get("/", (req, res) => {
  res.send("¡The backend is working!");
});

app.get("/news", async (req, res) => {
  const { q = "bitcoin" } = req.query;

  const url = `https://newsapi.org/v2/everything?q=${q}&apiKey=${API_KEY}&pageSize=100`;

  try {
    const response = await fetch(url);

    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("Error fetching news:", err);
    res.status(500).json({ error: "Error fetching news" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
