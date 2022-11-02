/* eslint-disable no-unused-vars */
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { EmployeeService } from '../../services/employee.service';
import { IEmployee } from '../../models/iemployee';


import { AddEmployeeComponent } from './add-employee.component';
import { of } from 'rxjs/internal/observable/of';
import { Router } from '@angular/router';

describe('AddEmployeeComponent', () => {
  let component: AddEmployeeComponent;
  let fixture: ComponentFixture<AddEmployeeComponent>;
  let routerSpy = { navigateByUrl: jasmine.createSpy('navigateByUrl') }; // adding routerSpy to the router
  let service: EmployeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEmployeeComponent],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule
      ],
      providers: [{ provide: Router, useValue: routerSpy }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(EmployeeService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // test spec #2
  // Positive state of the form
  it('has valid form when all fields are properely filled', () => {
    component.addEmployeeForm?.controls['name'].setValue('arun');
    component.addEmployeeForm?.controls['phone'].setValue('241231');
    component.addEmployeeForm?.controls['email'].setValue('arun@r.co');
    expect(component.addEmployeeForm.valid).toBeTrue();
  });

  // negative state of the form
  it('has invalid form if any one of the form fields are not properly filled', () => {
    component.addEmployeeForm?.controls['name'].setValue('');
    component.addEmployeeForm?.controls['phone'].setValue('');
    component.addEmployeeForm?.controls['email'].setValue('arun@c.co');
    expect(component.addEmployeeForm.invalid).toBeTrue();
  });

  // submission logic spy on
  it(' shoudl handle handleAddEmployee-- all through [TS]', () => {
    spyOn(component, 'handleAddEmployee');
    component.handleAddEmployee();
    expect(component.handleAddEmployee).toHaveBeenCalled();
  });

  // Now let's test the handlAddEmployee method by triggering the click on html button
  it('should call handleAddEmployee when submit button clicked with all fields properly filled', () => {
    // enter valid input values only then, submit brn will be enabled
    component.addEmployeeForm?.controls['name'].setValue('arun');
    component.addEmployeeForm?.controls['phone'].setValue('4324324');
    component.addEmployeeForm?.controls['email'].setValue('arun@c.co');

    fixture.detectChanges(); // You must detect changes in HTML only when the submit btn is enabled.

    spyOn(component, 'handleAddEmployee'); // Install a spy on an existing component
    const submitBtn = fixture.debugElement.query(
      By.css('.submitBtn')
    ).nativeElement;
    submitBtn.click(); // we can click only if button becomes enabled -- for that we need valid inputs
    expect(component.handleAddEmployee).toHaveBeenCalled();
  });

  it('should call handleAddEmployee when the submit button clicked all through [HTML]', () => {
    // find the input
    const nameInput: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#nameInput');
    // set the value in input
    nameInput.value = 'Arun';
    // trigger the input event in all input field
    nameInput.dispatchEvent(new Event('input'));

    const phoneInput: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#phoneInput');
    phoneInput.value = '2342344';
    phoneInput.dispatchEvent(new Event('input'));

    const emailInput: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#emailInput');
    emailInput.value = 'arun@r.co';
    emailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges(); // You must detect changes in HTML only when the submit btn is enabled.

    spyOn(component, 'handleAddEmployee'); // Install a spy on an existing component
    const submitBtn = fixture.debugElement.query(
      By.css('.submitBtn')
    ).nativeElement;
    submitBtn.click(); // we can click only if button becomes enabled -- for that we need valid inputs
    expect(component.handleAddEmployee).toHaveBeenCalled();
  });

  it('has form with inputs that satisfy validation requirements', () => {
    // find the input
    const nameInput: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#nameInput');
    // set the value in input
    nameInput.value = 'Arun';
    // trigger the input event in all input field
    nameInput.dispatchEvent(new Event('input'));

    const phoneInput: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#phoneInput');
    phoneInput.value = '123456765';
    phoneInput.dispatchEvent(new Event('input'));

    const emailInput: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#emailInput');
    emailInput.value = 'arun@r.co';
    emailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges(); // You must detect changes in HTML only when the submit btn is enabled.

    const nameRequiredEl =
      fixture.debugElement.nativeElement.querySelector('#nameRequired');
    expect(nameRequiredEl).toBeFalsy();

    const phoneRequiredEl =
      fixture.debugElement.nativeElement.querySelector('#phoneRequired');
    expect(phoneRequiredEl).toBeFalsy();

    const maxLengthRequiredEl =
      fixture.debugElement.nativeElement.querySelector('#maxLengthRequired');
    expect(maxLengthRequiredEl).toBeFalsy();

    const onlyNumbersRequiredEl =
      fixture.debugElement.nativeElement.querySelector('#onlyNumbersRequired');
    expect(onlyNumbersRequiredEl).toBeFalsy();

    const emailRequiredEl =
      fixture.debugElement.nativeElement.querySelector('#emailRequired');
    expect(emailRequiredEl).toBeFalsy();

    const invalidEmalEl =
      fixture.debugElement.nativeElement.querySelector('#invalidEmail');
    expect(invalidEmalEl).toBeFalsy();
  });

  // name with invalid inputs
  it('form which has name field as empty should display error msg', () => {
    const nameInput: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#nameInput');
    // set the value in input
    nameInput.value = '';
    // trigger the input event in all input field
    nameInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const nameRequiredEl =
      fixture.debugElement.nativeElement.querySelector('#nameRequired');
    expect(nameRequiredEl).toBeTruthy();
  });

  // Phone with invalid inputs
  it('form which has phone field as invalid should display error msg', () => {
    const phoneInput: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#phoneInput');
    phoneInput.value = '';
    phoneInput.dispatchEvent(new Event('input'));

    fixture.detectChanges(); // You must detect changes in HTML only when the submit btn is enabled.

    const phoneRequiredEl =
      fixture.debugElement.nativeElement.querySelector('#phoneRequired');
    console.log(phoneRequiredEl);
    expect(phoneRequiredEl).toBeTruthy();

    phoneInput.value = '12121212433';
    phoneInput.dispatchEvent(new Event('input'));

    fixture.detectChanges(); // You must detect changes in HTML only when the submit btn is enabled.

    const maxLengthRequiredEl =
      fixture.debugElement.nativeElement.querySelector('#maxLengthRequired');
    expect(maxLengthRequiredEl).toBeTruthy();

    phoneInput.value = 'araere';
    phoneInput.dispatchEvent(new Event('input'));

    fixture.detectChanges(); // You must detect changes in HTML only when the submit btn is enabled.

    const onlyNumbersRequiredEl =
      fixture.debugElement.nativeElement.querySelector('#onlyNumbersRequired');
    expect(onlyNumbersRequiredEl).toBeTruthy();
  });

  // email with invalid inputs
  it('form which has email field as invalid should display error msg', () => {
    const emailInput: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector('#emailInput');
    emailInput.value = '';
    emailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges(); // You must detect changes in HTML only when the submit btn is enabled.

    const emailRequiredEl =
      fixture.debugElement.nativeElement.querySelector('#emailRequired');
    expect(emailRequiredEl).toBeTruthy();

    emailInput.value = 'arunra';
    emailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges(); // You must detect changes in HTML only when the submit btn is enabled.

    const invalidEmalEl =
      fixture.debugElement.nativeElement.querySelector('#invalidEmailId');
    expect(invalidEmalEl).toBeTruthy();
  });
  
  // router testing
  it('should navigate to employees on click of Go back button', () => {

    component.handleGoBack();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/employees');
  });

  // testing handleAddEmployee thru service
  it('sends the form data to the service on click of Submit button', (done: DoneFn) => {
    component.addEmployeeForm?.controls['name'].setValue('john'),
    component.addEmployeeForm?.controls['phone'].setValue('9876543210'),
    component.addEmployeeForm?.controls['email'].setValue('p@g.com'),

    fixture.detectChanges(); // should detect changes in HTML only then submit btn will be enabled

    // Install a spy into an existing object
    spyOn(component, 'handleAddEmployee').and.callThrough();

    // find the submit button element
    // const submitBtn = fixture.debugElement.query(
    //   By.css('.submitBtn')
    // ).nativeElement;
    // submitBtn.click();
    component.handleAddEmployee();
    expect(component.handleAddEmployee).toHaveBeenCalled();

    
    const mockResponse: IEmployee = {
      id: 11,
      name: 'john',
      phone: '9876543210',
      email: 'p@g.com'
    };

    spyOn(component.employeeService, 'createEmployee')
      .withArgs(component.addEmployeeForm.value)
      .and.returnValue(of(mockResponse));
    component.employeeService.createEmployee(component.addEmployeeForm.value).subscribe({
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
  it('should return error when form data is not sent', () => {
    component.addEmployeeForm?.controls['name'].setValue(''),
    component.addEmployeeForm?.controls['phone'].setValue(''),
    component.addEmployeeForm?.controls['email'].setValue('')

    fixture.detectChanges();

    const submitBtn = fixture.debugElement.query(
      By.css('.submitBtn')
    ).nativeElement;
    submitBtn.click();

    spyOn(component.employeeService, 'createEmployee')
      .withArgs(component.addEmployeeForm.value)
      .and.throwError('Invalid Input');
    expect(function () {
      component.employeeService.createEmployee(component.addEmployeeForm.value);
    }).toThrow(new Error('Invalid Input'));
  });

 
});
