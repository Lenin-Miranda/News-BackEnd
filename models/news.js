const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  keyword: String,
  title: String,
  text: String,
  date: String,
  source: String,
  link: String,
  image: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});
