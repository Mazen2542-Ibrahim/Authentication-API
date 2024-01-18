import Joi from "joi";

export const UserRegisterValidation = Joi.object({
  first_name: Joi.string().lowercase().min(3).max(25).required(),
  last_name: Joi.string().lowercase().min(3).max(25).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
});

export const UserLoginValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
});
