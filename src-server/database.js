"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
const logger_1 = require("./helper/logger");
const user_1 = require("./api/users/user");
const task_1 = require("./api/tasks/task");
function init(config) {
    Mongoose.Promise = Promise;
    Mongoose.connect(process.env.MONGO_URL || config.connection);
    let mongoDb = Mongoose.connection;
    mongoDb.on("error", () => {
        logger_1.default.error(`Unable to connect to database: ${config.connection}`);
    });
    mongoDb.once("open", () => {
        logger_1.default.info(`Connected to database: ${config.connection}`);
    });
    return {
        userModel: user_1.UserModel,
        taskModel: task_1.TaskModel
    };
}
exports.init = init;
//# sourceMappingURL=database.js.map