import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from './guards/auth.guard';
import {LoginGuard} from './guards/login.guard';

import {AuthComponent} from './auth/auth.component';
import {HomeComponent} from './home/home.component';
import {TaskComponent} from './task/task.component';



const appRoutes: Routes = [
  {path: '', component: HomeComponent, canActivate: [LoginGuard]},
  {path: 'auth', component: AuthComponent, canActivate: [LoginGuard]},
  {path: 'task', component: TaskComponent, canActivate: [AuthGuard]},
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
