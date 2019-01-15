import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {AuthenticationService} from '../services/authentication.service';
import {UserAuth} from '../models/models';
import {SnackBarComponent} from '../snack-bar/snack-bar.component';
import {AppService} from '../app.service';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  modelLog: UserAuth = new UserAuth();
  modelReg: UserAuth = new UserAuth();
  returnUrl: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private appService: AppService,
              private authenticationService: AuthenticationService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.authenticationService.login(this.modelLog)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl, 'task']);
        },
        error => {
          this.openSnackBarError(error);
        });
  }

  register() {
    this.authenticationService.register(this.modelReg)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl, 'task']);
        },
        error => {
          this.openSnackBarError(error);
        });
  }

  openSnackBarError(message) {
    this.appService.snackBar.msg = message;
    this.appService.snackBar.err = true;
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      horizontalPosition: 'center',
      panelClass: ['dark-snackbar']
    });
  }

}
