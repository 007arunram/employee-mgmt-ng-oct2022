import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService, TOAST_CONFIG } from 'ngx-toastr';
import { of } from 'rxjs';
import { IEmployee } from '../../models/iemployee';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeDetailsComponent } from './employee-details.component';

describe('EmployeeDetailsComponent', () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;
  let service: EmployeeService;
  let routerSpy = { navigateByUrl: jasmine.createSpy('navigateByUrl') }; // adding routerSpy to the router


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeDetailsComponent],
      imports: [HttpClientModule, RouterTestingModule, ToastrModule.forRoot()],
      
      providers: [
        ToastrService,
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute, 
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '10'
              })
            }
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(EmployeeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // router testing
  it('should navigate to employees on click of Go back button', () => {

    component.handleGoBack();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/employees');
  });

  it('should call ngOnInit', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should call getEmployeeById of Employee Service', () => {
    spyOn(component.employeeService, 'getEmployeeById').and.callThrough();
    component.employeeService.getEmployeeById('1');
    expect(component.employeeService.getEmployeeById).toHaveBeenCalled();
  });

  // positive test spec for fetching emp details
  it('fetches right employee details', (done: DoneFn) => {
    const empId = '1'; // url param -- empId
    const mockResponse: IEmployee = {
      id: 1,
      name: 'Virat Kohli',
      phone: '2426785',
      email: 'v@k.com'
    };

    spyOn(component.employeeService, 'getEmployeeById')
      .withArgs(empId)
      .and.returnValue(of(mockResponse));
    component.employeeService.getEmployeeById(empId).subscribe({
      next: (res) => {
        expect(res).toEqual(mockResponse);
        done();
      },
      error: () => {
        console.log('SOME ERROR OCCURED');
        done();
      }
    });
  });

  // negative code spec
  it('should return error when wrong empId sent', () => {
    spyOn(component.employeeService, 'getEmployeeById')
      .withArgs(null)
      .and.throwError('404');
    expect(function () {
      component.employeeService.getEmployeeById(null);
    }).toThrow(new Error('404'));
  });
});
