import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing.module';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AddEmployeeComponent,
    ListEmployeesComponent,
    EmployeeDetailsComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    ReactiveFormsModule,
    NgxSpinnerModule, 
    FormsModule
  ]
})
export class EmployeesModule { }
