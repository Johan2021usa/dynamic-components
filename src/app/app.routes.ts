import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { isLoggedInGuard } from './auth/guards/is-logged-in.guard';
import { isLoggedOutGuard } from './auth/guards/is-logged-out.guard';
import { ShowcaseComponent } from './components/showcase/showcase.component';

// This array of routes must be imported in the app.config
export const routes: Routes = [
  // we use loadComponent and loadChildren to implement lazy loading charging of component
  {
    path: 'login',
    loadComponent: ()=>
      import('./components/login/login.component')
      .then(
        (com)=>com.LoginComponent
      ),
    canActivate: [isLoggedOutGuard]
  },
  {
    path:'register',
    loadComponent: ()=>
      import('./components/register/register.component')
      .then(
        (com) => com.RegisterComponent
      ),
    canActivate: [isLoggedOutGuard]
  },
  {
    path: 'showcase',
    loadComponent: ()=>
      import('./components/showcase/showcase.component')
      .then(
        (com)=> com.ShowcaseComponent
      ),
    canActivate: [isLoggedInGuard]
  },
  //The next route is the default one in case none routes matches.
  {path:'', component:DashboardComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'**', redirectTo:'dashboard', pathMatch:'full'}
];
