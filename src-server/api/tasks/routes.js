"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const task_controller_1 = require("./task-controller");
const TaskValidator = require("./task-validator");
const user_validator_1 = require("../users/user-validator");
function default_1(server, configs, database) {
    const taskController = new task_controller_1.default(configs, database);
    server.bind(taskController);
    server.route({
        method: "POST",
        path: "/api/tasks",
        options: {
            handler: taskController.createTask,
            auth: "jwt",
            tags: ["api", "tasks"],
            description: "Create a task.",
            validate: {
                payload: TaskValidator.createTaskModel,
                headers: user_validator_1.jwtValidator
            }
        }
    });
    server.route({
        method: "GET",
        path: "/api/tasks/{id}",
        options: {
            handler: taskController.getTaskById,
            auth: "jwt",
            tags: ["api", "tasks"],
            description: "Get task by id.",
            validate: {
                params: {
                    id: Joi.string().required()
                },
                headers: user_validator_1.jwtValidator
            }
        }
    });
    server.route({
        method: "GET",
        path: "/api/tasks",
        options: {
            handler: taskController.getTasks,
            auth: "jwt",
            tags: ["api", "tasks"],
            description: "Get all tasks.",
            validate: {
                query: {
                    top: Joi.number().default(5),
                    skip: Joi.number().default(0)
                },
                headers: user_validator_1.jwtValidator
            }
        }
    });
    server.route({
        method: "PUT",
        path: "/api/tasks/{id}",
        options: {
            handler: taskController.updateTask,
            auth: "jwt",
            tags: ["api", "tasks"],
            description: "Update task by id.",
            validate: {
                params: {
                    id: Joi.string().required()
                },
                payload: TaskValidator.updateTaskModel,
                headers: user_validator_1.jwtValidator
            }
        }
    });
    server.route({
        method: "DELETE",
        path: "/api/tasks/{id}",
        options: {
            handler: taskController.deleteTask,
            auth: "jwt",
            tags: ["api", "tasks"],
            description: "Delete task by id.",
            validate: {
                params: {
                    id: Joi.string().required()
                },
                headers: user_validator_1.jwtValidator
            }
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=routes.js.map