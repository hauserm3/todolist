"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hapi = require("hapi");
const jwt = require("hapi-auth-jwt2");
const logger_1 = require("./helper/logger");
const Users = require("./api/users");
const Tasks = require("./api/tasks");
class Server {
    static start(configs, db) {
        return __awaiter(this, void 0, void 0, function* () {
            Server.db = db;
            try {
                Server._instance = new Hapi.Server({
                    debug: { request: ['error'] },
                    host: configs.host,
                    port: configs.port,
                    routes: {
                        cors: {
                            origin: ['*']
                        }
                    }
                });
                yield Server._instance.register(jwt);
                Server._instance.auth.strategy('jwt', 'jwt', { key: configs.jwtSecret,
                    validate: Server.validateUser,
                    verifyOptions: { algorithms: ['HS256'] } // pick a strong algorithm
                });
                logger_1.default.info(`Register Routes.`);
                Users.init(Server._instance, configs, db);
                Tasks.init(Server._instance, configs, db);
                logger_1.default.info(`Routes registered sucessfully.`);
                yield Server._instance.start();
                logger_1.default.info(`Server - Up and running!`);
                logger_1.default.info(`Server info`, Server._instance.info);
                return Server._instance;
            }
            catch (error) {
                logger_1.default.info(`Server - There was something wrong: ${error}`);
                throw error;
            }
        });
    }
    static validateUser(decoded, request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield Server.db.userModel.findById(decoded.id).lean(true);
            if (!user) {
                return { isValid: false };
            }
            return { isValid: true };
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map