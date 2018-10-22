import * as Mongoose from "mongoose";
import Logger from './helper/logger';
import { IDataConfiguration} from "./configs";
import { IUser, UserModel } from "./api/users/user";
import {ITask, TaskModel} from './api/tasks/task';

export interface IDatabase {
  userModel: Mongoose.Model<IUser>;
  taskModel: Mongoose.Model<ITask>;
}

export function init(config: IDataConfiguration): IDatabase {
  (<any>Mongoose).Promise = Promise;
  Mongoose.connect(process.env.MONGO_URL || config.connection);

  let mongoDb = Mongoose.connection;

  mongoDb.on("error", () => {
    Logger.error(`Unable to connect to database: ${config.connection}`);
  });

  mongoDb.once("open", () => {
    Logger.info(`Connected to database: ${config.connection}`);
  });

  return {
    userModel: UserModel,
    taskModel: TaskModel
  };
}