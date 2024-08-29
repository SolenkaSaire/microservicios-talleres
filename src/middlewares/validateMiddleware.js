const Joi = require('joi');

const userSchemas = {
  loginRequest: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  registerRequest: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  passwordRecovery: Joi.object({
    email: Joi.string().email().required(),
  }),
  user: Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    role: Joi.string(),
  }),
  userUpdate: Joi.object({
    username: Joi.string(),
    email: Joi.string().email(),
    firstName: Joi.string(),
    lastName: Joi.string(),
  }),
};

module.exports = { userSchemas };
