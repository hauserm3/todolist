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
const app_service_1 = require("../app.service");
let SnackBarComponent = class SnackBarComponent {
    constructor(appService) {
        this.appService = appService;
    }
    ngOnInit() {
        this.message = this.appService.snackBar.msg;
        this.error = this.appService.snackBar.err;
    }
};
SnackBarComponent = __decorate([
    core_1.Component({
        selector: 'app-snack-bar',
        templateUrl: './snack-bar.component.html',
        styleUrls: ['./snack-bar.component.css']
    }),
    __metadata("design:paramtypes", [app_service_1.AppService])
], SnackBarComponent);
exports.SnackBarComponent = SnackBarComponent;
//# sourceMappingURL=snack-bar.component.js.map