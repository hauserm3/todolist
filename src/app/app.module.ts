import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatToolbarModule
} from '@angular/material';

import {routing} from "./app.routing";

import { AppService } from './app.service';
import { AuthGuard } from "./guards/auth.guard";
import { AuthenticationService } from "./services/authentication.service";
import { JwtInterceptor } from "./services/jwt.interceptor";
import { AuthComponent } from './auth/auth.component';
import { TaskComponent } from './task/task.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';







@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule
  ],
  providers: [
    AppService,
    AuthGuard,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
