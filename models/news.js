const mongoose = require("mongoose");

const savedNewsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true, unique: true },
    urlToImage: { type: String },
    publishedAt: { type: Date },
    source: {
      id: { type: String, default: null },
      name: { type: String },
    },
    author: { type: String },
    content: { type: String },
    keyword: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("SavedNews", savedNewsSchema);
