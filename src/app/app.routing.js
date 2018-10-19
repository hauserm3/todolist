"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const auth_component_1 = require("./auth/auth.component");
const home_component_1 = require("./home/home.component");
const task_component_1 = require("./task/task.component");
const appRoutes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'auth', component: auth_component_1.AuthComponent },
    { path: 'task', component: task_component_1.TaskComponent },
    // { path: '', loadChildren: 'app/main/main.module#MainModule', canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map