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
const rxjs_1 = require("rxjs");
const router_1 = require("@angular/router");
const operators_1 = require("rxjs/operators");
const throwError_1 = require("rxjs/internal/observable/throwError");
let AuthenticationService = class AuthenticationService {
    constructor(http, router) {
        this.http = http;
        this.router = router;
        this.loggedIn$ = new rxjs_1.BehaviorSubject(false);
    }
    get isLoggedIn() {
        if (localStorage.getItem('user-jwt-token')) {
            this.loggedIn$.next(true);
        }
        return this.loggedIn$.asObservable();
    }
    create(user) {
        return this.http.post('/api/users', user)
            .pipe(operators_1.map((result) => {
            if (result.token) {
                localStorage.setItem('user-jwt-token', result.token.toString());
                this.loggedIn$.next(true);
            }
            return result;
        }), operators_1.catchError(this.handleError));
    }
    login(user) {
        return this.http.post('/api/users/login', user)
            .pipe(operators_1.map((result) => {
            if (result.token) {
                localStorage.setItem('user-jwt-token', result.token.toString());
                this.loggedIn$.next(true);
            }
            return result;
        }), operators_1.catchError(this.handleError));
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user-jwt-token');
        this.loggedIn$.next(false);
        this.router.navigate(['/login']);
    }
    handleError(error) {
        let errMsg = error.error ? error.error.message : error.error;
        return throwError_1.throwError(errMsg);
    }
};
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient,
        router_1.Router])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map