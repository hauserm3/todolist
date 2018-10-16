import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from "./guards/auth.guard";


const appRoutes: Routes = [
    { path: 'auth', component: AuthComponent },
    { path: '', loadChildren: 'app/main/main.module#MainModule' },
    // { path: '', loadChildren: 'app/main/main.module#MainModule', canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
