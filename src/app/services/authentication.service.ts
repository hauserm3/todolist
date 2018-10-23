import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable, BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {catchError, tap, map} from "rxjs/operators";
import {UserAuth} from "../models/models";
import {throwError} from 'rxjs/internal/observable/throwError';


@Injectable()
export class AuthenticationService {

  private loggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,
              private router: Router) {
  }

  get isLoggedIn() {
    if (localStorage.getItem('user-jwt-token')) {
      this.loggedIn$.next(true)
    }
    return this.loggedIn$.asObservable();
  }

  register(user: UserAuth): Observable<any> {
    return this.http.post('/api/users', user)
      .pipe(
        map((result: UserAuth) => {
          if (result.token) {
            localStorage.setItem('user-jwt-token', result.token.toString());
            this.loggedIn$.next(true);
          }
          return result;
        }),
        catchError(this.handleError)
      );
  }

  login(user: UserAuth): Observable<any> {
    return this.http.post('/api/users/login', user)
      .pipe(
        map((result: UserAuth) => {
          if (result.token) {
            localStorage.setItem('user-jwt-token', result.token.toString());
            this.loggedIn$.next(true);
          }
          return result;
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user-jwt-token');
    this.loggedIn$.next(false);
    this.router.navigate(['/auth']);
  }

  private handleError(error: any) {
    let errMsg = error.error ? error.error.message : error.error;
    return throwError(errMsg);
  }
}