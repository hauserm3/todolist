import * as Hapi from 'hapi';
import UserController from './user-controller';
import { UserModel } from "./user";
import * as UserValidator from "./user-validator";
import {IDatabase} from '../../database';
import {IServerConfigs} from '../../configs';

const handleError = function (request, h, err) {
  // console.error('err', err);
  err.output.payload.message = err.details[0].message;
  throw err;
};

export default function(
  server: Hapi.Server,
  serverConfigs: IServerConfigs,
  database: IDatabase
) {
  const userController = new UserController(serverConfigs, database);
  server.bind(userController);

  server.route({
    method: "POST",
    path: "/api/users",
    options: {
      handler: userController.createUser,
      auth: false,
      tags: ["api", "users"],
      description: "Create a user.",
      validate: {
        payload: UserValidator.createUserModel,
        failAction: handleError
      }
    }
  });

  server.route({
    method: "POST",
    path: "/api/users/login",
    options: {
      handler: userController.loginUser,
      auth: false,
      tags: ["api", "users"],
      description: "Login a user.",
      validate: {
        payload: UserValidator.loginUserModel,
        failAction: handleError
      }
    }
  });
}