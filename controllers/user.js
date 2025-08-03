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
      next(new BadRequestError("Invalid data"));
    } else if (err.code === 11000) {
      next(new ConflictError("User already exists"));
    } else {
      next(err);
    }
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new UnauthorizedError("Incorrect email or password");
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      throw new UnauthorizedError("Incorrect email or password");
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).send({
      token,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Invalid data"));
    }
    return next(err);
  }
};
