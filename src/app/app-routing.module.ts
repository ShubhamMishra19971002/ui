import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../auth.guard'; // Ensure correct path
import { AuthRedirectComponent } from './auth-redirect/auth-redirect.component';
import { LoginComponent } from './login/login.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route redirects to login
  { path: 'login', component: LoginComponent }, // Non-logged-in users land here
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'authroute', component: AuthRedirectComponent }, // Google Auth redirect
  { path: 'posts/:id', component: PostDetailComponent }, // Public route (anyone can view posts)
  { path: '**', redirectTo: 'login' }, // Wildcard route: Redirect unknown routes to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
