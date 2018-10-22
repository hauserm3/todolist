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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const material_1 = require("@angular/material");
const models_1 = require("../models/models");
let TaskDialogComponent = class TaskDialogComponent {
    constructor(dialogRef, taskDialog) {
        this.dialogRef = dialogRef;
        this.taskDialog = taskDialog;
        this.task = new models_1.Task();
        this.task = this.taskDialog.task;
    }
    onCancelClick() {
        this.dialogRef.close();
    }
};
TaskDialogComponent = __decorate([
    core_1.Component({
        selector: 'app-task-dialog',
        templateUrl: './task-dialog.component.html',
        styleUrls: ['./task-dialog.component.css']
    }),
    __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [material_1.MatDialogRef,
        models_1.TaskDialog])
], TaskDialogComponent);
exports.TaskDialogComponent = TaskDialogComponent;
//# sourceMappingURL=task-dialog.component.js.map