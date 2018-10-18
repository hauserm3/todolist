import * as Hapi from 'hapi';
import UserController from './user-controller';
import { UserModel } from "./user";
import * as UserValidator from "./user-validator";
import {IDatabase} from '../../database';
import {IServerConfigs} from '../../configs';

export default function(
  server: Hapi.Server,
  serverConfigs: IServerConfigs,
  database: IDatabase
) {
  const userController = new UserController(serverConfigs, database);
  server.bind(userController);

  server.route({
    method: "POST",
    path: "/users",
    options: {
      handler: userController.createUser,
      auth: false,
      tags: ["api", "users"],
      description: "Create a user.",
      validate: {
        payload: UserValidator.createUserModel
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "201": {
              description: "User created."
            }
          }
        }
      }
    }
  });

  server.route({
    method: "POST",
    path: "/users/login",
    options: {
      handler: userController.loginUser,
      auth: false,
      tags: ["api", "users"],
      description: "Login a user.",
      validate: {
        payload: UserValidator.loginUserModel
      },
      plugins: {
        "hapi-swagger": {
          responses: {
            "200": {
              description: "User logged in."
            }
          }
        }
      }
    }
  });
}