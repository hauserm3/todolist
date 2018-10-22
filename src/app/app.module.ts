import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatGridListModule,
  MatTabsModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule, MatDialogModule
} from '@angular/material';

import {routing} from "./app.routing";

import {AppService} from './app.service';
import {AuthGuard} from "./guards/auth.guard";
import {LoginGuard} from './guards/login.guard';
import {AuthenticationService} from "./services/authentication.service";
import {JwtInterceptor} from "./services/jwt.interceptor";
import {AuthComponent} from './auth/auth.component';
import {TaskComponent} from './task/task.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HomeComponent} from './home/home.component';
import {FormsModule} from '@angular/forms';
import {SnackBarComponent} from './snack-bar/snack-bar.component';
import {TaskDialogComponent} from './task-dialog/task-dialog.component';
import {TaskService} from './services/task.service';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TaskComponent,
    HomeComponent,
    SnackBarComponent,
    TaskDialogComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    routing,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatTabsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  entryComponents: [
    SnackBarComponent,
    TaskDialogComponent
  ],
  providers: [
    AppService,
    AuthGuard,
    LoginGuard,
    AuthenticationService,
    TaskService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
