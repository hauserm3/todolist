import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthenticationService) { }

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

    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> {
        return this.authService.isLoggedIn
            .take(1)                               // check once
            .map((isLoggedIn: boolean) => {
                if (!isLoggedIn){
                    this.router.navigate(['auth']);
                    return false;
                }
                return true;
            });
    }
}
