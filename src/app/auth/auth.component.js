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
const router_1 = require("@angular/router");
const material_1 = require("@angular/material");
const authentication_service_1 = require("../services/authentication.service");
const models_1 = require("../models/models");
const snack_bar_component_1 = require("../snack-bar/snack-bar.component");
const app_service_1 = require("../app.service");
let AuthComponent = class AuthComponent {
    constructor(route, router, appService, authenticationService, snackBar) {
        this.route = route;
        this.router = router;
        this.appService = appService;
        this.authenticationService = authenticationService;
        this.snackBar = snackBar;
        this.model = new models_1.UserAuth();
    }
    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    login() {
        this.authenticationService.login(this.model)
            .subscribe(data => {
            this.router.navigate([this.returnUrl, 'task']);
        }, error => {
            this.openSnackBarError(error);
        });
    }
    create() {
        this.authenticationService.create(this.model)
            .subscribe(data => {
            this.router.navigate([this.returnUrl, 'task']);
        }, error => {
            this.openSnackBarError(error);
        });
    }
    openSnackBarError(message) {
        this.appService.snackBar.msg = message;
        this.appService.snackBar.err = true;
        this.snackBar.openFromComponent(snack_bar_component_1.SnackBarComponent, {
            duration: 3000,
            horizontalPosition: 'center',
            panelClass: ['dark-snackbar']
        });
    }
};
AuthComponent = __decorate([
    core_1.Component({
        selector: 'app-auth',
        templateUrl: './auth.component.html',
        styleUrls: ['./auth.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        router_1.Router,
        app_service_1.AppService,
        authentication_service_1.AuthenticationService,
        material_1.MatSnackBar])
], AuthComponent);
exports.AuthComponent = AuthComponent;
//# sourceMappingURL=auth.component.js.map