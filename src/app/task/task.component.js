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
const task_service_1 = require("../services/task.service");
const material_1 = require("@angular/material");
const models_1 = require("../models/models");
const task_dialog_component_1 = require("../task-dialog/task-dialog.component");
let TaskComponent = class TaskComponent {
    constructor(taskService, dialog) {
        this.taskService = taskService;
        this.dialog = dialog;
        this.taskList = [];
        this.task = new models_1.Task();
    }
    ngOnInit() {
        this.getTasks();
        this.taskService.taskListSub.subscribe(() => this.getTasks());
    }
    getTasks() {
        this.taskService.getTasks().subscribe((res) => {
            this.taskList = res;
        });
    }
    editTaskDialog(task) {
        let taskDialog = new models_1.TaskDialog();
        taskDialog.edit = true;
        Object.assign(taskDialog.task, task);
        const dialogRef = this.dialog.open(task_dialog_component_1.TaskDialogComponent, {
            width: '250px',
            data: taskDialog
        });
        dialogRef.afterClosed().subscribe(result => {
            if (!result)
                return;
            this.task = result;
            this.editTask(this.task);
        });
    }
    editTask(task) {
        this.taskService.editTask(task).subscribe((res) => {
            this.getTasks();
        });
    }
    deleteTask(task) {
        let taskDialog = new models_1.TaskDialog();
        taskDialog.delete = true;
        taskDialog.task = task;
        const dialogRef = this.dialog.open(task_dialog_component_1.TaskDialogComponent, {
            width: '250px',
            data: taskDialog
        });
        dialogRef.afterClosed().subscribe(result => {
            if (!result)
                return;
            this.task = result;
            this.taskService.deleteTask(this.task).subscribe((res) => {
                this.getTasks();
            });
        });
    }
};
TaskComponent = __decorate([
    core_1.Component({
        selector: 'app-task',
        templateUrl: './task.component.html',
        styleUrls: ['./task.component.css']
    }),
    __metadata("design:paramtypes", [task_service_1.TaskService,
        material_1.MatDialog])
], TaskComponent);
exports.TaskComponent = TaskComponent;
//# sourceMappingURL=task.component.js.map