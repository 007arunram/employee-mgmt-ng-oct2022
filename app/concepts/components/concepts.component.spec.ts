import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EllipsisPipe } from 'src/app/shared/pipes/ellipsis.pipe';
import { ColorizerDirective } from '../directives/colorizer.directive';
import { CebComponent } from './ceb/ceb.component';
import { ConceptsComponent } from './concepts.component';


import { CpbComponent } from './cpb/cpb.component';

describe('ConceptsComponent', () => {
  let component: ConceptsComponent;
  let fixture: ComponentFixture<ConceptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule],
      declarations: [ ConceptsComponent, CebComponent, CpbComponent, ColorizerDirective, EllipsisPipe]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  // to have a bgcolor as red
  it('should have red <div>', () => {
    const colorizerWrapperEl: HTMLElement = fixture.nativeElement.querySelector('[data-testId="colorizerWrapper"]');
    console.log(colorizerWrapperEl);
    const bgColor = colorizerWrapperEl.style.backgroundColor;
    expect(bgColor).toBe('red');
  });

});

