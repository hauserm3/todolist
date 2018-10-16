import * as Hapi from 'hapi';
import * as DotEnv from 'dotenv';
import * as Configs from "./configs";

import Logger from './helper/logger';

import jwt = require('hapi-auth-jwt2');

const serverConfig = Configs.getServerConfigs();

export default class Server {
  private static _instance: Hapi.Server;

  public static async start(): Promise<Hapi.Server> {
    try {
      DotEnv.config({
        path: `${process.cwd()}/.env`,
      });

      Server._instance = new Hapi.Server();

      Server._instance.connection({
        host: process.env.HOST,
        port: process.env.PORT,
      });

      await Server._instance.register(jwt);

      Server._instance.auth.strategy('jwt', 'jwt',
        { key: serverConfig.jwtSecret,
          validate: validate,            // validate function defined above
          verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
      });

      server.auth.strategy('jwt', 'jwt',
        { key: 'NeverShareYourSecret',          // Never Share your secret key
          validate: validate,            // validate function defined above
          verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
        });

      await Server._instance.start();

      Logger.info(`Server - Up and running!`);

      return Server._instance;;
    } catch (error) {
      Logger.info(`Server - There was something wrong: ${error}`);
      throw error;
    }
  }

}