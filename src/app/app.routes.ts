import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { authGuard } from './guards/auth.guard';
import { OwnerDashboardComponent } from './components/owner-dashboard/owner-dashboard.component';
import { WalkerDashboardComponent } from './components/walker-dashboard/walker-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [authGuard] },
  {
    path: 'owner-dashboard',
    component: OwnerDashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'walker-dashboard',
    component: WalkerDashboardComponent,
    canActivate: [authGuard],
  },
];
