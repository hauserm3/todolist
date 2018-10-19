import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from "./guards/auth.guard";

import {AuthComponent} from './auth/auth.component';
import {HomeComponent} from './home/home.component';
import {TaskComponent} from './task/task.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'task', component: TaskComponent},
  // { path: '', loadChildren: 'app/main/main.module#MainModule', canActivate: [AuthGuard] },
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
