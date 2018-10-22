import * as Mongoose from "mongoose";

export interface ITask extends Mongoose.Document {
  userId: string;
  task: string;
  completed: boolean;
  createdAt: Date;
  updateAt: Date;
}

export const TaskSchema = new Mongoose.Schema(
  {
    userId: { type: String, required: true },
    task: { type: String, required: true },
    completed: Boolean
  },
  {
    timestamps: true
  }
);

export const TaskModel = Mongoose.model<ITask>("Task", TaskSchema);
