"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.createTaskModel = Joi.object().keys({
    task: Joi.string().required()
});
exports.updateTaskModel = Joi.object().keys({
    task: Joi.string().required(),
    completed: Joi.boolean()
});
//# sourceMappingURL=task-validator.js.map