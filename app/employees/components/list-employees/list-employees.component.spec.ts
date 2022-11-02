import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { ListEmployeesComponent } from './list-employees.component';

describe('ListEmployeesComponent', () => {
  let component: ListEmployeesComponent;
  let fixture: ComponentFixture<ListEmployeesComponent>;
  let employeeService: EmployeeService;

  // Steps for Mocking
  /* 1. Have the mock data of array with 2 objects.
     2. Prepare for making a service's api method
        2.2 What service to mock? EmployeeService
        2.3 What api method to mock? getEmployees()
    3. Provide the mock data for the service request 
  */

  const mockEmployeeList = [{
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEmployeesComponent ],
      imports: [ HttpClientModule],
      providers: [
        {
          provide: EmployeeService,
          useValue: {
            //mocking getEmployees method to return mockEmployeeList data as observable
            getEmployees: () => of(mockEmployeeList)
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmployeesComponent);
    component = fixture.componentInstance;
    // important as we dependency inject this service in our component.
    employeeService = TestBed.inject(EmployeeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Approach #1 using timeOut --- checking ajax call's response
  /*it('should have 10 employees initially [APPROACH #1]', ((done) => {
    component.ngOnInit();
    setTimeout( () => {
      expect(component.employees.length).toEqual(10);
      done();
    }, 4001);
  }));

  //Should render employee named 'Leanne Graham'
  it('should render employee named "Leanne Graham"', ((done) => {
    component.ngOnInit();
    setTimeout(() => {
      fixture.detectChanges(); // after waiting for 4 sec, updates the html
      console.log(fixture.nativeElement.querySelector('h5'));
      expect(fixture.nativeElement.querySelector('h5').innerText).toBe('Leanne Graham');
      done();
    }, 4000);
  }));*/

  /* Challenges / Disadvantages of testing direct API Request like the above
    1.Time Consuming
    2. Backend REST API might have data inconsistencies
    3. Backend might 
  */

  //using mocking, checking ajax call's response
  it('should have an array with length 2 in employees [MOCKING API]', () => {
    //console.log(component.employees.length);
    expect(component.employees.length).toEqual(2);
  });

  //employees from service through mocking api
  it('should have employees from service through [MOCKING API]', () => {
    expect(component.employees).toBe(mockEmployeeList);
  });

  //TODO: test the html element h5---should have the text Virak Kohli
  it('should render employee named "Virat Kohli"', () => {
    //console.log(fixture.nativeElement.querySelector('h5'));
    expect(fixture.nativeElement.querySelector('h5').innerText).toBe('Virat Kohli');
  });

  //navigate to employee details
});
