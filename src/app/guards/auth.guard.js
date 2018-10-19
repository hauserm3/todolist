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
const authentication_service_1 = require("../services/authentication.service");
const operators_1 = require("rxjs/operators");
let AuthGuard = class AuthGuard {
    constructor(router, authService) {
        this.router = router;
        this.authService = authService;
    }
    // canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //   if (localStorage.getItem('user-jwt-token')) {
    //     // logged in so return true
    //     return true;
    //   }
    //
    //   // not logged in so redirect to login page with the return url
    //   this.router.navigate(['login']);
    //   return false;
    // }
    canActivate(router, state) {
        return this.authService.isLoggedIn
            .pipe(operators_1.take(1), // check once
        operators_1.map((isLoggedIn) => {
            if (!isLoggedIn) {
                this.router.navigate(['auth']);
                return false;
            }
            return true;
        }));
    }
};
AuthGuard = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router,
        authentication_service_1.AuthenticationService])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map