import * as Hapi from 'hapi';
import * as DotEnv from 'dotenv';
import * as Database from "./database";
import * as Configs from "./configs";
import {IServerConfigs} from './configs';
import {IDatabase} from './database';

import Logger from './helper/logger';

import jwt = require('hapi-auth-jwt2');


export default class Server {
  private static _instance: Hapi.Server;

  public static async start(configs: IServerConfigs, db: IDatabase): Promise<Hapi.Server> {
    try {
      Server._instance = new Hapi.Server({
        debug: { request: ['error'] },
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
          verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
      });

      await Server._instance.start();

      Logger.info(`Server - Up and running!`);
      Logger.info(`Server info`, Server._instance.info);

      return Server._instance;
    } catch (error) {
      Logger.info(`Server - There was something wrong: ${error}`);
      throw error;
    }
  }

}