import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

//lets configure the URL's
const authRoutes: Routes = [
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'signup', component: SignupComponent, data: { title: 'SignUp' } },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(authRoutes)], //registering the above routes
  exports: [RouterModule],
})
export class AuthRoutingModule {}
