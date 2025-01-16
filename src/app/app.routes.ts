import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { isLoggedInGuard } from './auth/guards/is-logged-in.guard';
import { isLoggedOutGuard } from './auth/guards/is-logged-out.guard';
import { ShowcaseComponent } from './components/showcase/showcase.component';

export const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent, canActivate: [isLoggedOutGuard]},
  {path: 'showcase', component: ShowcaseComponent, canActivate: [isLoggedInGuard]},
];
