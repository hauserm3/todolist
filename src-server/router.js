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
const routes_1 = require("./api/users/routes");
const logger_1 = require("./helper/logger");
class Router {
    static loadRoutes(server) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('Router - Start adding routes.');
            yield new routes_1.default().register(server);
            logger_1.default.info('Router - Finish adding routes.');
        });
    }
}
exports.default = Router;
//# sourceMappingURL=router.js.map