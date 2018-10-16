import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //add authorization header with jwt token if available
        // let currentUser = JSON.parse(localStorage.getItem('user-jwt-token'));
        let currentUserToken = localStorage.getItem('user-jwt-token');
        // if (currentUser && currentUser.token) {
        if (currentUserToken) {
            request = request.clone({
               setHeaders: {
                   Authorization: `bearer ${currentUserToken}`
               }
            });
        }

        return next.handle(request)
            .do(event => {},
                (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.authService.logout();
                    }
                }
        });
    }
}