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
const DotEnv = require("dotenv");
const Configs = require("./configs");
const logger_1 = require("./helper/logger");
const jwt = require("hapi-auth-jwt2");
const serverConfig = Configs.getServerConfigs();
class Server {
    static start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                DotEnv.config({
                    path: `${process.cwd()}/.env`,
                });
                Server._instance = new Hapi.Server();
                Server._instance.connection({
                    host: process.env.HOST,
                    port: process.env.PORT,
                });
                yield Server._instance.register(jwt);
                Server._instance.auth.strategy('jwt', 'jwt', { key: serverConfig.jwtSecret,
                    validate: validate,
                    verifyOptions: { algorithms: ['HS256'] } // pick a strong algorithm
                });
                server.auth.strategy('jwt', 'jwt', { key: 'NeverShareYourSecret',
                    validate: validate,
                    verifyOptions: { algorithms: ['HS256'] } // pick a strong algorithm
                });
                yield Server._instance.start();
                logger_1.default.info(`Server - Up and running!`);
                return Server._instance;
                ;
            }
            catch (error) {
                logger_1.default.info(`Server - There was something wrong: ${error}`);
                throw error;
            }
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map