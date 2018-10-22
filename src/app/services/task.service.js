"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const index_1 = require("rxjs/index");
const models_1 = require("../models/models");
const operators_1 = require("rxjs/operators");
const throwError_1 = require("rxjs/internal/observable/throwError");
let TaskService = class TaskService {
    constructor(http) {
        this.http = http;
        this.taskListSub = new index_1.Subject();
    }
    getTasks() {
        return this.http.get('/api/tasks')
            .pipe(operators_1.catchError(this.handleError));
    }
    createTask(task) {
        return this.http.post('/api/tasks', task)
            .pipe(operators_1.map((res) => {
            let task = new models_1.Task();
            task = { userId: res.userId, _id: res._id, task: res.task, completed: res.completed };
            this.taskListSub.next();
            return task;
        }), operators_1.catchError(this.handleError));
    }
    editTask(task) {
        return this.http.put(`/api/tasks/${task._id}`, { task: task.task, completed: task.completed })
            .pipe(operators_1.catchError(this.handleError));
    }
    deleteTask(task) {
        return this.http.delete(`/api/tasks/${task._id}`)
            .pipe(operators_1.catchError(this.handleError));
    }
    handleError(error) {
        let errMsg = error.error ? error.error.message : error.error;
        return throwError_1.throwError(errMsg);
    }
};
TaskService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map