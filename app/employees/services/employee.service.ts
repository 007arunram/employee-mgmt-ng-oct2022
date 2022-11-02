import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IEmployee } from '../models/iemployee';

@Injectable({
  providedIn: 'root' // This tells Angular to provide the service in the application root level 
  // and the service will be created once (singleton service ) and 
  // provide the same instance in every module that injects this class.
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  // create employee
  createEmployee(formData: IEmployee): Observable<IEmployee> {
    // 1. get the form data from comp
    console.log(formData);

    // 2. send the form data to the REST API
    //  2.1 what's the REST API URL?
    // 2.2 what's the http method? POST
    // 2.3 what's the REST API Client tool? HttpClient
    return this.http
      .post<IEmployee>(environment.employeesRestApi, formData)
      .pipe(
        map((res: IEmployee) => {
          // 3. get the res from the REST API
          //console.log(res);
          //4. send the res to the comp
          return res;
        })
      );
  }

  // list employees
  getEmployees():Observable<IEmployee[]> {
    // 1. get the req from the comp
    //2. send the req to the REST API
    //2.1 what's the REST API Endpoint?
    //2.2 what's the Http Method?
    //2.3 what's the REST API Client? HttpClient

    return this.http.get<IEmployee[]>(environment.employeesRestApi).pipe(
      map((res: IEmployee[]) => { // 3. get the res from the REST API
        //console.log(res);
        //4. send the res to the comp
        return res;
      })
    );
  }

  getEmployeeById(empId: string | null): Observable<IEmployee>{
    //console.log('will load employee1');
    const restApiUrl = `${environment.employeesRestApi}/${empId}`;
    return this.http.get<IEmployee>(restApiUrl).pipe(
      map((res: IEmployee) => { // get the res from the REST API
        //console.log(res);
        // send the res to the comp
        return res;
      })
    );
  }

  //Update employees data
  updateEmployee(empData: IEmployee) {
    //console.log(empData);
    return this.http
      .put<IEmployee>(`${environment.employeesRestApi}/${empData.id}`, empData) // send the updated data to the REST API
      .pipe(
        map((res: any) => { //  get the res from the REST API
          //console.log(res);
          return res; // send the res to the comp
        })
      );
  }

  //Delete Employee data
  deleteEmployeeId(empId: number){
    return this.http.delete<IEmployee>(`${environment.employeesRestApi}/${empId}`) // delete the employee data from the REST API
      .pipe(
        map((res: any) => { // get the res from the REST API
          return res; // send the res to the comp
        })
      )
  }
}
