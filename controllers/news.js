const API_KEY = process.env.NEWS_API_KEY || "494e42497aaa4cd8ba25c47c7bdcb23f";
const { NotFoundError } = require("../utils/NotFoundError");

const getNews = async (req, res) => {
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
};

module.exports = { getNews };
