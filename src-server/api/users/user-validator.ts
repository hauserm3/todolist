import * as Joi from 'joi';

export const createUserModel = Joi.object().keys({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(3).max(30).trim().required()
});

export const loginUserModel = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().trim().required()
});

export const jwtValidator = Joi.object({'authorization': Joi.string().required()}).unknown();
