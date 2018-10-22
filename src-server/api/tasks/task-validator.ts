import * as Joi from "joi";

export const createTaskModel = Joi.object().keys({
  task: Joi.string().required()
});

export const updateTaskModel = Joi.object().keys({
  task: Joi.string().required(),
  completed: Joi.boolean()
});
