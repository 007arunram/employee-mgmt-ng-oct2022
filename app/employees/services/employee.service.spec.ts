import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEmployee } from '../models/iemployee';

import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  // Setup spy
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(EmployeeService);
  });

  //setting up spy
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    service = new EmployeeService(httpClientSpy);
    
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //testing getEmployees method
  it('should return employees when called [HTTP SPY]', ( done: DoneFn) => {
    //mock data for employees
    const mockEmployeeList: IEmployee[] = [{
      id: 1,
      name: 'Virat Kohli',
      email: 'v@k.com',
      phone: '1-770-736-803'
    }, {
      id: 2,
      name: 'Steve Smith',
      email: 's@s.com',
      phone: '010-692-6599'
    }];

    // calling get method in service and returning mock data to it
    httpClientSpy.get.and.returnValue(of(mockEmployeeList));  // httpClientSpy.get will be called after calling getEmployees() only

    service.getEmployees() // calling getEmployees() method in employee.service.ts
      .subscribe({
        next: (res: IEmployee[]) => {
          expect(res).toEqual(mockEmployeeList);
          done();
        },
        error: done.fail
      })
  });

  //testing createEmployees method
  it('should add employee details when called [HTTP SPY]', (done: DoneFn) => {
    const mockData: any = {
      name: 'John',
      phone: '9876543210',
      email: 'p@g.com'
    };
    const mockResponse: IEmployee = {
      id: 11,
      name: 'John',
      phone: '9876543210',
      email: 'p@g.com'
    };
    httpClientSpy.post.withArgs(environment.employeesRestApi, mockData).and.returnValue(of(mockResponse));

    service.createEmployee(mockData)
      .subscribe({
        next: (res: any) => {
          expect(res).toEqual(mockResponse);
          done();
        },
        error: done.fail
      })
  });
});
