import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { IEmployee } from '../../models/iemployee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styles: []
})
export class ListEmployeesComponent implements OnInit, OnDestroy {
  employees: IEmployee[] = [];
  employeeSubscription!: Subscription;

  constructor(
    private employeeService: EmployeeService,
    private spinner: NgxSpinnerService
  ) {
    console.log('inside constructure');
  }

  ngOnInit(): void {
    console.log('inside ngOnInit');
    // idea place for REST API calls
    // 2. send the req to the service
    this.spinner.show();
    this.employeeSubscription = this.employeeService
      .getEmployees()
      .subscribe((res: IEmployee[]) => {
        console.log(res);
        this.employees = res;
        this.spinner.hide();
      });
  }

  ngOnDestroy(): void {
    console.log('Inside Destroy');
    // if (this.employees && this.employees.length > 0) {
    //   this.employees.length = 0;
    // }
    this.employeeSubscription.unsubscribe();
  }
}
