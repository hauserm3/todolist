"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_1 = require("@angular/platform-browser");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const app_component_1 = require("./app.component");
const animations_1 = require("@angular/platform-browser/animations");
const material_1 = require("@angular/material");
const app_routing_1 = require("./app.routing");
const app_service_1 = require("./app.service");
const auth_guard_1 = require("./guards/auth.guard");
const login_guard_1 = require("./guards/login.guard");
const authentication_service_1 = require("./services/authentication.service");
const jwt_interceptor_1 = require("./services/jwt.interceptor");
const auth_component_1 = require("./auth/auth.component");
const task_component_1 = require("./task/task.component");
const http_1 = require("@angular/common/http");
const home_component_1 = require("./home/home.component");
const forms_1 = require("@angular/forms");
const snack_bar_component_1 = require("./snack-bar/snack-bar.component");
const task_dialog_component_1 = require("./task-dialog/task-dialog.component");
const task_service_1 = require("./services/task.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            auth_component_1.AuthComponent,
            task_component_1.TaskComponent,
            home_component_1.HomeComponent,
            snack_bar_component_1.SnackBarComponent,
            task_dialog_component_1.TaskDialogComponent
        ],
        imports: [
            common_1.CommonModule,
            platform_browser_1.BrowserModule,
            animations_1.BrowserAnimationsModule,
            forms_1.FormsModule,
            http_1.HttpClientModule,
            app_routing_1.routing,
            material_1.MatToolbarModule,
            material_1.MatButtonModule,
            material_1.MatCardModule,
            material_1.MatCheckboxModule,
            material_1.MatTabsModule,
            material_1.MatGridListModule,
            material_1.MatFormFieldModule,
            material_1.MatInputModule,
            material_1.MatSnackBarModule,
            material_1.MatDialogModule
        ],
        entryComponents: [
            snack_bar_component_1.SnackBarComponent,
            task_dialog_component_1.TaskDialogComponent
        ],
        providers: [
            app_service_1.AppService,
            auth_guard_1.AuthGuard,
            login_guard_1.LoginGuard,
            authentication_service_1.AuthenticationService,
            task_service_1.TaskService,
            {
                provide: http_1.HTTP_INTERCEPTORS,
                useClass: jwt_interceptor_1.JwtInterceptor,
                multi: true
            },
            { provide: common_1.LocationStrategy, useClass: common_1.PathLocationStrategy }
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map