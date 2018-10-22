"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("./user-controller");
const UserValidator = require("./user-validator");
const handleError = function (request, h, err) {
    // console.error('err', err);
    err.output.payload.message = err.details[0].message;
    throw err;
};
function default_1(server, serverConfigs, database) {
    const userController = new user_controller_1.default(serverConfigs, database);
    server.bind(userController);
    server.route({
        method: "POST",
        path: "/api/users",
        options: {
            handler: userController.createUser,
            auth: false,
            tags: ["api", "users"],
            description: "Create a user.",
            validate: {
                payload: UserValidator.createUserModel,
                failAction: handleError
            }
        }
    });
    server.route({
        method: "POST",
        path: "/api/users/login",
        options: {
            handler: userController.loginUser,
            auth: false,
            tags: ["api", "users"],
            description: "Login a user.",
            validate: {
                payload: UserValidator.loginUserModel,
                failAction: handleError
            }
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map