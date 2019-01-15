import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import {map, take} from 'rxjs/operators';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthenticationService) { }

    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.isLoggedIn
          .pipe(
            take(1),                               // check once
            map((isLoggedIn: boolean) => {
              if (isLoggedIn) {
                this.router.navigate(['task']);
                return false;
              }
              return true;
            })
          );
    }
}
