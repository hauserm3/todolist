import * as Mongoose from "mongoose";
import { IUser, UserModel } from "./api/users/user";

export interface IDatabase {
  userModel: Mongoose.Model<IUser>;
  // taskModel: Mongoose.Model<ITask>;
}