export class UserAuth {
  constructor() {}
  _id: string;
  username: string;
  email: string;
  password: string;
  token: string;
}

export class snackBar {
  constructor(){}
  msg: string;
  err: boolean;
}

export class Task {
  constructor(){}
  userId: string;
  _id: string;
  task: string;
  completed: boolean;
}

export class TaskDialog {
  constructor(task: Task = new Task()){ this.task = task}
  task: Task;
  edit: boolean;
  delete: boolean;
}