import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../services/employee.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IEmployee } from '../../models/iemployee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styles: []
})
export class AddEmployeeComponent implements OnInit {
  isSaved = false;

  //step 1 Have form tag equivalent in TS
  addEmployeeForm!: FormGroup;
  constructor(
    public employeeService: EmployeeService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    //1. connect with Service
  }
  
  ngOnInit(): void {
    // Step 1 continues
    this.addEmployeeForm = new FormGroup({
      // Step 2 : Have the input tags equivalent in TS
      name: new FormControl('', Validators.required), // Step 5 : Let's work on validation
      phone: new FormControl('', [
        Validators.required,
        // eslint-disable-next-line quotes
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$')
      ]), // for Step 6 : refer html
      email: new FormControl('', [Validators.required, Validators.email]) // can add multiple validators
      // for Step : 3 refer html
    });
  }

  handleAddEmployee(): void {
    this.spinner.show();
    console.log('submitted');
    console.log(this.addEmployeeForm);
    //form data
    console.log(this.addEmployeeForm.value);
    //2. send the above from data to service
    this.employeeService
      .createEmployee(this.addEmployeeForm.value)
      .subscribe((res: any) => {
        //3. get the res from service
        console.log(res);
        if (res && res.id) {
          this.toastr.success('Saved Successfully');
          this.addEmployeeForm.reset();
          this.spinner.hide();
        }
      });
  }

  handleGoBack() {
    this.router.navigateByUrl('/employees')

  }
}
