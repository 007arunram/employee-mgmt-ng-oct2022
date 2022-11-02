import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  // Setup spy
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(AuthService);
  });

  //setting up spy
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new AuthService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //testing signup method
  it('should signup details when called [HTTP SPY]', (done: DoneFn) => {
    const mockData: any = {
      email: 'eve.holt@reqres.in',
      password: 'Math@12',
      confirmPassword: 'Math@12',
    };

    const mockResponse: any = {
      id: 4,
      token: '1245@123',
    };

    httpClientSpy.post
      .withArgs(environment.signupRestApi, mockData)
      .and.returnValue(of(mockResponse)); // httpClientSpy.get will be called after calling getEmployees() only
    service.signup(mockData).subscribe({
      next: (res: any) => {
        expect(res).toEqual(mockResponse);
        done();
      },
      error: done.fail,
    });
  });

  //testing login method
  it('should login details when called [HTTP SPY]', (done: DoneFn) => {
    const mockData: any = {
      email: 'p@g.com',
      password: '213123132',
    };
    const mockResponse: any = {
      id: 11,
    };
    httpClientSpy.post
      .withArgs(environment.loginRestApi, mockData)
      .and.returnValue(of(mockResponse));

    service.login(mockData).subscribe({
      next: (res: any) => {
        expect(res).toEqual(mockResponse);
        done();
      },
      error: done.fail,
    });
  });
});
