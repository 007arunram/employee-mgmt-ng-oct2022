/* 
How to write test
Where to write test
*/
// Test Pattern: Given, When , Then
//Given
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AboutComponent } from './about/component/about/about.component';
import { AppComponent } from './app.component'; //Taking up the comp for testing
import { CebComponent } from './concepts/components/ceb/ceb.component';
import { ConceptsComponent } from './concepts/components/concepts.component';
import { CpbComponent } from './concepts/components/cpb/cpb.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { MenuComponent } from './shared/components/menu/menu.component';
// group of related test cases - TEST SUITE
describe('AppComponent', () => {
  //When
  beforeEach(async () => {
    // Similar to App module
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [AppComponent, HeaderComponent, FooterComponent, MenuComponent, HomeComponent, AboutComponent, ConceptsComponent, CpbComponent, CebComponent]
    }).compileComponents();
  });
  // test spec #1
  it('should have proper app component', () => {
    // 'it' -- api from jasmine
    //when
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance; // We are taking up component.ts testing
    // Then (Assert)
    //'exact'-- api from jasmine | toBeTruthy is matcher of jasmine
    expect(app).toBeTruthy();
  });
  
  //test spec #2 
  it('should have a variable title with value being \'employee-mgmt-ng-sept2022\'', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toBe('employee-mgmt-ng-sept2022');

  });
});
