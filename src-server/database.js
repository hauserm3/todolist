"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
const user_1 = require("./api/users/user");
function init(config) {
    Mongoose.Promise = Promise;
    Mongoose.connect(process.env.MONGO_URL || config.connection);
    let mongoDb = Mongoose.connection;
    mongoDb.on("error", () => {
        console.log(`Unable to connect to database: ${config.connection}`);
    });
    mongoDb.once("open", () => {
        console.log(`Connected to database: ${config.connection}`);
    });
    return {
        userModel: user_1.UserModel
        // taskModel: TaskModel
    };
}
exports.init = init;
//# sourceMappingURL=database.js.map