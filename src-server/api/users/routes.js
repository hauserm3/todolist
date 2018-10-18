"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./user-controller");
const UserValidator = require("./user-validator");
function default_1(server, serverConfigs, database) {
    const userController = new user_controller_1.default(serverConfigs, database);
    server.bind(userController);
    server.route({
        method: "POST",
        path: "/users",
        options: {
            handler: userController.createUser,
            auth: false,
            tags: ["api", "users"],
            description: "Create a user.",
            validate: {
                payload: UserValidator.createUserModel
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "201": {
                            description: "User created."
                        }
                    }
                }
            }
        }
    });
    server.route({
        method: "POST",
        path: "/users/login",
        options: {
            handler: userController.loginUser,
            auth: false,
            tags: ["api", "users"],
            description: "Login a user.",
            validate: {
                payload: UserValidator.loginUserModel
            },
            plugins: {
                "hapi-swagger": {
                    responses: {
                        "200": {
                            description: "User logged in."
                        }
                    }
                }
            }
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map