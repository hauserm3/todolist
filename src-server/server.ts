import * as Hapi from 'hapi';
import jwt = require('hapi-auth-jwt2');
import * as Database from "./database";
import * as Configs from "./configs";
import Logger from './helper/logger';
import {IServerConfigs} from './configs';
import {IDatabase} from './database';
import {IRequest} from './interfaces/request';
import * as Users from "./api/users";


export default class Server {
  private static _instance: Hapi.Server;
  private static db: IDatabase;

  public static async start(configs: IServerConfigs, db: IDatabase): Promise<Hapi.Server> {
    Server.db = db;
    try {
      Server._instance = new Hapi.Server({
        debug: { request: ['error'] },
        host: configs.host,
        port: configs.port,
        routes: {
          cors: {
            origin: ["*"]
          }
        }
      });

      await Server._instance.register(jwt);

      Server._instance.auth.strategy('jwt', 'jwt',
        { key: configs.jwtSecret,
          validate: Server.validateUser,
          verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
      });

      Logger.info(`Register Routes.`);
      Users.init(Server._instance, configs, db);
      Logger.info(`Routes registered sucessfully.`);

      await Server._instance.start();

      Logger.info(`Server - Up and running!`);
      Logger.info(`Server info`, Server._instance.info);

      return Server._instance;
    } catch (error) {
      Logger.info(`Server - There was something wrong: ${error}`);
      throw error;
    }
  }

  private static async validateUser(decoded: any, request: IRequest, h: Hapi.ResponseToolkit) {
    const user = await Server.db.userModel.findById(decoded.id).lean(true);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true };
  }
}