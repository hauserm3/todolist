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
const authentication_service_1 = require("./authentication.service");
const operators_1 = require("rxjs/operators");
let JwtInterceptor = class JwtInterceptor {
    constructor(authService) {
        this.authService = authService;
    }
    intercept(request, next) {
        //add authorization header with jwt token if available
        let currentUserToken = localStorage.getItem('user-jwt-token');
        if (currentUserToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `bearer ${currentUserToken}`
                }
            });
        }
        return next.handle(request)
            .pipe(operators_1.tap(event => { }, (err) => {
            if (err instanceof http_1.HttpErrorResponse) {
                if (err.status === 401) {
                    this.authService.logout();
                }
            }
        }));
    }
};
JwtInterceptor = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService])
], JwtInterceptor);
exports.JwtInterceptor = JwtInterceptor;
//# sourceMappingURL=jwt.interceptor.js.map