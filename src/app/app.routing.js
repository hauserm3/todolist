"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const auth_guard_1 = require("./guards/auth.guard");
const login_guard_1 = require("./guards/login.guard");
const auth_component_1 = require("./auth/auth.component");
const home_component_1 = require("./home/home.component");
const task_component_1 = require("./task/task.component");
const appRoutes = [
    { path: '', component: home_component_1.HomeComponent, canActivate: [login_guard_1.LoginGuard] },
    { path: 'auth', component: auth_component_1.AuthComponent, canActivate: [login_guard_1.LoginGuard] },
    { path: 'task', component: task_component_1.TaskComponent, canActivate: [auth_guard_1.AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map