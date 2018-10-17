import * as Hapi from 'hapi';

import Logger from '../../helper/logger';
import UserController from './user-controller';

export default class UserRoutes {
  public async register(server: Hapi.Server): Promise<any> {
    return new Promise( resolve => {
      Logger.info('UserRoutes - Start adding user routes.');
      const controller = new UserController();

      server.route([
        {
          method: 'POST',
          path: '/api/users',
          config: {
            handler: controller.create,
            description: 'Method that creates a new user.',
            tags: ['api', 'users'],
            auth: false,
          }
        },
        {
          method: 'GET',
          path: '/api/users/{id}',
          config: {
            handler: controller.getById,
            description: 'Method that get a user by its id.',
            tags: ['api', 'users'],
            auth: false,
          }
        }
      ])
    });
  }
}