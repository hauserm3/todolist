import * as Hapi from "hapi";
import * as Boom from "boom";
import * as Jwt from "jsonwebtoken";
import { IUser } from "./user";
import { IDatabase } from "../../database";
import { IServerConfigs } from "../../configs";
import { IRequest, ILoginRequest } from "../../interfaces/request";

export default class UserController {
  private database: IDatabase;
  private configs: IServerConfigs;

  constructor(configs: IServerConfigs, database: IDatabase) {
    this.database = database;
    this.configs = configs;
  }

  private generateToken(user: IUser) {
    const jwtSecret = this.configs.jwtSecret;
    const jwtExpiration = this.configs.jwtExpiration;
    const payload = { id: user._id };

    return Jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
  }

  public async createUser(request: IRequest, h: Hapi.ResponseToolkit) {
    try {
      let user: any = await this.database.userModel.create(request.payload);
      return h.response({ token: this.generateToken(user) }).code(201);
    } catch (error) {
      return Boom.badImplementation(error);
    }
  }

  public async loginUser(request: ILoginRequest, h: Hapi.ResponseToolkit) {
    const { email, password } = request.payload;

    let user: IUser = await this.database.userModel.findOne({ email: email });

    if (!user) {
      return Boom.unauthorized("User does not exists.");
    }

    if (!user.validatePassword(password)) {
      return Boom.unauthorized("Password is invalid.");
    }

    return { token: this.generateToken(user) };
  }

}
