"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.createUserModel = Joi.object().keys({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(3).max(30).trim().required()
});
exports.loginUserModel = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().trim().required()
});
exports.jwtValidator = Joi.object({ 'authorization': Joi.string().required() }).unknown();
//# sourceMappingURL=user-validator.js.map