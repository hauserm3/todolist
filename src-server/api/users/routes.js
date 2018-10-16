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
const logger_1 = require("../../helper/logger");
const controller_1 = require("./controller");
class UserRoutes {
    register(server) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                logger_1.default.info('UserRoutes - Start adding user routes.');
                const controller = new controller_1.default();
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
                ]);
            });
        });
    }
}
exports.default = UserRoutes;
//# sourceMappingURL=routes.js.map