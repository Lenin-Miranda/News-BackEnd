const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const { BadRequestError } = require("../utils/BadRequestError");
const { NotFoundError } = require("../utils/NotFoundError");
const { ConflictError } = require("../utils/ConflictError");
const { UnauthorizedError } = require("../utils/UnauthorizedError");

module.exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (password.length < 6) {
      throw new BadRequestError("Password must be at least 6 characters long");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictError("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const userToSend = newUser.toObject();
    delete userToSend.password;

    res.status(201).send(userToSend);
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Invalid data"));
    } else if (err.code === 11000) {
      return next(new ConflictError("User already exists"));
    } else {
      return next(err);
    }
  }
};

module.exports.getCurrenUser = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return next(new NotFoundError("User not found"));
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      throw new UnauthorizedError("Incorrect password");
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).send({
      token,
      email: user.email,
      name: user.name,
      _id: user._id,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Invalid data"));
    }
    return next(err);
  }
};
