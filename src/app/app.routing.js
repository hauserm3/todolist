"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const auth_component_1 = require("./auth/auth.component");
const appRoutes = [
    { path: 'auth', component: auth_component_1.AuthComponent },
    { path: '', loadChildren: 'app/main/main.module#MainModule' },
    // { path: '', loadChildren: 'app/main/main.module#MainModule', canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map