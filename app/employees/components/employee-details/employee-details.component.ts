import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { IEmployee } from '../../models/iemployee';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styles: []
})
export class EmployeeDetailsComponent implements OnInit {
  
  employee: any;
  duplicateEmployee: any;

  constructor(
    public employeeService: EmployeeService,
    public route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // using ngxspinner this.spinner.show();
    this.spinner.show();
    // get the employee id from the url params
    const empId: string | null = this.route.snapshot.paramMap.get('id');
    this.employeeService
      .getEmployeeById(empId)
      .subscribe((res: IEmployee) => {
        console.log(res);
        this.employee = res;
        // using ngxspinner  this.spinner.hide();
        this.spinner.hide();
      });
  }

  handleGoBack() {
    this.router.navigateByUrl('/employees');
  }

  handleEditModalOpen() {
    this.duplicateEmployee = { ...this.employee }; //shallow copy
  }

  handleUpdateEmployee(updateEmployeeForm: NgForm) {
    // submission handler
    console.log(this.duplicateEmployee);
    const empId: string | null = this.route.snapshot.paramMap.get('id');
    //2. send the updated employee data to the service
    this.employeeService
      .updateEmployee(this.duplicateEmployee)
      .subscribe((res: IEmployee) => {
        //3. get the updated res from the service
        console.log(res);
        if (res) {
          this.toastr.success('Updated successfully...!', 'Employee Details');
          this.employee = res; // send the res to the view
        }
      });
  }

  handleDeleteEmployee() {
    this.spinner.show();
    this.employeeService
      .deleteEmployeeId(this.employee.id) // send the employee id to the service
      .subscribe((res: IEmployee) => {
        // get the res of deleted employee
        if (res) {
          this.toastr.success(
            'Redirecting to Employees page.',
            'Deleted Successfully...!',
            { timeOut: 3000 }
          );
          this.employee = '';
          setTimeout(() => {
            this.spinner.hide();
            this.router.navigateByUrl('/employees');
          }, 2500);
        }
      });
  }
}
