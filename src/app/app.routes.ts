import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { protegerGuard } from './guards/proteger.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [protegerGuard]},
  { path: 'usuario', component: UserComponent, canActivate: [protegerGuard]},
  { path: '**', component: ErrorPageComponent },
];
