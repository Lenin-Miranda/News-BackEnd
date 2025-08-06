const API_KEY = process.env.NEWS_API_KEY || "494e42497aaa4cd8ba25c47c7bdcb23f";
const SavedNews = require("../models/news");
const { BadRequestError } = require("../utils/BadRequestError");
const { NotFoundError } = require("../utils/NotFoundError");
const { ConflictError } = require("../utils/ConflictError");
const { UnauthorizedError } = require("../utils/UnauthorizedError");
const { ServerError } = require("../utils/ServerError");

module.exports.getNews = async (req, res, next) => {
  const { q = "bitcoin" } = req.query;

  const url = `https://newsapi.org/v2/everything?q=${q}&apiKey=${API_KEY}&pageSize=100`;

  try {
    const response = await fetch(url);

    const data = await response.json();

    res.json(data);
  } catch (err) {
    next(new ServerError("Communication error"));
  }
};

module.exports.saveNews = async (req, res, next) => {
  try {
    const {
      source,
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      content,
      keyword,
    } = req.body;
    const news = new SavedNews({
      userId: req.user._id,
      source,
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      content,
      keyword,
    });

    const saved = await news.save();
    res.status(201).json(saved);
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConflictError("Item already saved"));
    }
    return next(new ServerError("Error saving news"));
  }
};

module.exports.getSavedNews = async (req, res, next) => {
  try {
    const saved = await SavedNews.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(saved);
  } catch (err) {
    return next(new ServerError("Error retrieving saved news"));
  }
};

module.exports.deleteSavedNews = async (req, res, next) => {
  try {
    const news = await SavedNews.findById(req.params.id);

    if (!news) {
      return next(new NotFoundError("News not found"));
    }

    if (news.userId.toString() !== req.user._id.toString()) {
      return next(new UnauthorizedError("Not authorized to delete this news"));
    }

    await SavedNews.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "News removed from saved" });
  } catch (err) {
    return next(new ServerError("Error deleting the news"));
  }
};
