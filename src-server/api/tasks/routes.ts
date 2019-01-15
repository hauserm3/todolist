import * as Hapi from 'hapi';
import * as Joi from 'joi';
import TaskController from './task-controller';
import * as TaskValidator from './task-validator';
import { jwtValidator } from '../users/user-validator';
import { IDatabase } from '../../database';
import { IServerConfigs } from '../../configs';


export default function (
  server: Hapi.Server,
  configs: IServerConfigs,
  database: IDatabase
) {
  const taskController = new TaskController(configs, database);
  server.bind(taskController);

  server.route({
    method: 'POST',
    path: '/api/tasks',
    options: {
      handler: taskController.createTask,
      auth: 'jwt',
      tags: ['api', 'tasks'],
      description: 'Create a task.',
      validate: {
        payload: TaskValidator.createTaskModel,
        headers: jwtValidator
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/api/tasks/{id}',
    options: {
      handler: taskController.getTaskById,
      auth: 'jwt',
      tags: ['api', 'tasks'],
      description: 'Get task by id.',
      validate: {
        params: {
          id: Joi.string().required()
        },
        headers: jwtValidator
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/api/tasks',
    options: {
      handler: taskController.getTasks,
      auth: 'jwt',
      tags: ['api', 'tasks'],
      description: 'Get all tasks.',
      validate: {
        query: {
          top: Joi.number().default(5),
          skip: Joi.number().default(0)
        },
        headers: jwtValidator
      }
    }
  });

  server.route({
    method: 'PUT',
    path: '/api/tasks/{id}',
    options: {
      handler: taskController.updateTask,
      auth: 'jwt',
      tags: ['api', 'tasks'],
      description: 'Update task by id.',
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: TaskValidator.updateTaskModel,
        headers: jwtValidator
      }
    }
  });

  server.route({
    method: 'DELETE',
    path: '/api/tasks/{id}',
    options: {
      handler: taskController.deleteTask,
      auth: 'jwt',
      tags: ['api', 'tasks'],
      description: 'Delete task by id.',
      validate: {
        params: {
          id: Joi.string().required()
        },
        headers: jwtValidator
      }
    }
  });

}
