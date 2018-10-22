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
const Boom = require("boom");
const Jwt = require("jsonwebtoken");
class UserController {
    constructor(configs, database) {
        this.database = database;
        this.configs = configs;
    }
    generateToken(user) {
        const jwtSecret = this.configs.jwtSecret;
        const jwtExpiration = this.configs.jwtExpiration;
        const payload = { id: user._id };
        return Jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
    }
    createUser(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield this.database.userModel.create(request.payload);
                return h.response({ token: this.generateToken(user) }).code(201);
            }
            catch (error) {
                return Boom.badImplementation(error);
            }
        });
    }
    loginUser(request, h) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = request.payload;
            let user = yield this.database.userModel.findOne({ email: email });
            if (!user) {
                return Boom.unauthorized("User does not exists.");
            }
            if (!user.validatePassword(password)) {
                return Boom.unauthorized("Password is invalid.");
            }
            return { token: this.generateToken(user) };
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=user-controller.js.map