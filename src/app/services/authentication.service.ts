import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable, BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {catchError, tap, map} from "rxjs/operators";
import {AuthResult, UserAuth} from "../interfaces/user";


@Injectable()
export class AuthenticationService {

    private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient,
                private router: Router) { }

    get isLoggedIn() {
        if(localStorage.getItem('user-jwt-token')) {
            this.loggedIn$.next(true)
        }
        return this.loggedIn$.asObservable();
    }


    login(user: UserAuth): Observable<any> {
        return this.http.post('/api/auth/login', user)
          .pipe(
            map((result: AuthResult) => {
              if (result.token) {
                localStorage.setItem('user-jwt-token', result.token.toString());
                this.loggedIn$.next(true);
                console.log('rez', result);
              }
              return result;
            }),
            catchError(this.handleError)
          );
    }

    // login(user: User): Observable<any> {
    //     return this.http.post('/api/auth/login', user)
    //         .pipe(
    //             tap(data => console.log('src-server data:', data)),
    //             catchError(this.handleError('getData'))
    //         );
    // }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user-jwt-token');
        this.loggedIn$.next(false);
        this.router.navigate(['/login']);
    }

    private handleError(error: any) {
        let errMsg = (error.error) ? error.error : console.error(error);
        return Observable.throw(errMsg);
    }
}