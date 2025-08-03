const { celebrate, Joi } = require("celebrate");
const validator = require("validator");
const { validate } = require("../models/user");
const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "The minimum length of the 'name' field is 2",
      "string.max": "The maximum length of the 'name' field is 30",
      "string.empty": "The 'name' field is required",
    }),
    email: Joi.string().email().messages({
      "string.email": "The 'email' field must be a valid email address",
      "string.empty": "The 'email' field is required",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The 'password' field must be filled",
    }),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().required().messages({
      "string.email": "The 'email' field must be a valid email address",
      "string.empty": "The 'email' field is required",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The 'password' field must be filled",
    }),
  }),
});
