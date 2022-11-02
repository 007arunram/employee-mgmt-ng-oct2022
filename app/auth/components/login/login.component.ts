import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NavigationHelper } from 'src/app/shared/utils/navigation-helper';
import { AuthService } from '../../services/auth.service';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService, // service for authentication
    private toastr: ToastrService,
    private navigationHelper: NavigationHelper, // navigationHelper class in injected for navigation purpose
    private activatedRoute: ActivatedRoute,
    private bnNgIdle: BnNgIdleService
  ) {}

  ngOnInit(): void {}

  handleLogin(formData: NgForm) {
    // receiving form data from the template
    console.log(formData.value);
    // sending form data to the service
    this.authService.login(formData.value).subscribe({
      // positive case for login
      next: (res: any) => {
        // 3. get the response from service
        console.log(res);
        if (res.token) {
          // received token as response on successful login from the backend(REST API)
          // Let's save the token in cookies/localStorage/sessionStorage

          localStorage.setItem('authToken', res.token);
          // post login redirect to the return URL
          const redirectTo =
            this.activatedRoute.snapshot.queryParams['redirectTo'];
          this.navigationHelper.navigateTo(redirectTo);
          this.toastr.success('Login Successful!');

          // navigate to log in page if user is inactive for 2 mins
          this.bnNgIdle.startWatching(120).subscribe(() => {
            if (localStorage.getItem('authToken')) {
              this.toastr.error('Session Expired, Login Again');
              this.navigationHelper.navigateTo('/auth/login');
              localStorage.removeItem('authToken');
              this.bnNgIdle.stopTimer(); // stop timer
            }
          });
        }
      },
      // negative case for login
      error: (error: any) => {
        // error occured while login with invalid credentials
        console.log(error); // logging the error catched from the REST API
        this.toastr.error('Invalid Email or Password');
      },
    });
  }
}
