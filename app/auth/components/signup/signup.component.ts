import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NavigationHelper } from 'src/app/shared/utils/navigation-helper';
import { IAuth } from '../../models/iauth';
import { AuthService } from '../../services/auth.service';
import { passwordMatchValidator } from 'src/app/shared/utils/password-match-validator';
import { passwordStrengthValidator } from 'src/app/shared/utils/password-strength-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [],
})
export class SignupComponent implements OnInit {
  //step-1 form tag equivalent
  signUpForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private navigationHelper: NavigationHelper
  ) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup(
      {
        //step-2 input tag equivalents
        email: new FormControl('', [Validators.required, Validators.email]), //step-5 Validations for required and email

        // Validations for required, minlength, maxlegth, password strength for password
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
          passwordStrengthValidator(),
        ]), // Validations for required, minlength, maxlegth, password strength for confirm password
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
          passwordStrengthValidator(),
        ]),
      },
      [passwordMatchValidator('password', 'confirmPassword')]
    );
  }

  // step-8 receive the formData
  handleSignUpForm() {
    console.log(this.signUpForm.value);
    //send the above form data to the service
    this.authService.signup(this.signUpForm.value).subscribe({
      next: (res: IAuth) => {
        // 3. get the response from service
        console.log(res);
        if (res) {
          // this.isSaved = true;
          this.toastr.success('Registered Successfully!');
          this.navigationHelper.navigateTo('/auth/login');
        }
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.error('Error Occurred! Try Again Later');
      },
    });
    this.signUpForm.reset(); // reset the form fields after submitting
  }

  // get passwordMatchError() {
  //   return (
  //     this.signUpForm.getError('mismatch') &&
  //     this.signUpForm.get('confirmPassword')?.touched &&
  //     this.signUpForm.get('confirmPassword')?.invalid
  //   );
  // }
}
