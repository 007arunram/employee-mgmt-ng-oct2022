import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { RouterModule, Routes } from '@angular/router';

// Let's config the URL's

const employeesRoutes: Routes = [
  { path: '', component: ListEmployeesComponent,  data: { title: 'Employee-Management-App' } },
  { path: 'add', component: AddEmployeeComponent },
  { path: ':id', component: EmployeeDetailsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(employeesRoutes) //registering the child routes
  ],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {}
