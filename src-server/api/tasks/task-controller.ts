import * as Hapi from 'hapi';
import * as Boom from 'boom';
import { ITask } from './task';
import { IDatabase } from '../../database';
import { IServerConfigs } from '../../configs';
import { IRequest } from '../../interfaces/request';

export default class TaskController {
  private database: IDatabase;
  private configs: IServerConfigs;

  constructor(configs: IServerConfigs, database: IDatabase) {
    this.configs = configs;
    this.database = database;
  }

  public async createTask(request: IRequest, h: Hapi.ResponseToolkit) {
    const newTask: ITask = <ITask>request.payload;
    newTask.userId = request.auth.credentials.id;
    newTask.completed = false;

    try {
      const task: ITask = await this.database.taskModel.create(newTask);
      return h.response(task).code(201);
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

  public async updateTask(request: IRequest, h: Hapi.ResponseToolkit) {
    const userId = request.auth.credentials.id;
    const _id = request.params['id'];

    try {
      const task: ITask = await this.database.taskModel.findByIdAndUpdate(
        { _id, userId }, // ES6 shorthand syntax
        { $set: request.payload },
        { new: true }
      );

      if (task) {
        return task;
      } else {
        return Boom.notFound();
      }
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

  public async deleteTask(request: IRequest, h: Hapi.ResponseToolkit) {
    const userId = request.auth.credentials.id;
    const id = request.params['id'];

    const deletedTask = await this.database.taskModel.findOneAndRemove({
      _id: id,
      userId: userId
    });

    if (deletedTask) {
      return deletedTask;
    } else {
      return Boom.notFound();
    }
  }

  public async getTaskById(request: IRequest, h: Hapi.ResponseToolkit) {
    const userId = request.auth.credentials.id;
    const _id = request.params['id'];

    const task = await this.database.taskModel.findOne({ _id, userId })
      .lean(true);

    if (task) {
      return task;
    } else {
      return Boom.notFound();
    }
  }

  public async getTasks(request: IRequest, h: Hapi.ResponseToolkit) {
    const userId = request.auth.credentials.id;
    // let top = request.query["top"];
    const skip = request.query['skip'];
    const tasks = await this.database.taskModel
      .find({ userId: userId }, {'userId': 1, 'task': 1, 'completed': 1})
      .sort({createdAt: -1})
      .lean(true)
      .skip(skip);
      // .limit(top);

    return tasks;
  }
}
