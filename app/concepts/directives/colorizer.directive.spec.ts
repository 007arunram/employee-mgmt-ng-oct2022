import { Component, DebugElement, ElementRef, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ColorizerDirective } from './colorizer.directive';

@Component({
  template: `
    <div appColorizer>
      Random Text
    </div>
  `
})
class MockComponent {}

describe('ColorizerDirective', () => {
  let fixture: ComponentFixture<MockComponent>;
  let wrapper: HTMLElement;
  
  beforeEach( () => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        MockComponent,
        ColorizerDirective
      ]
    }).createComponent(MockComponent);

    fixture.detectChanges();

    wrapper = fixture.nativeElement as HTMLElement;
  });

  // p should contain the text as Powered by Colorized Directive
  it('p should have text Powered by Colorized Directive', () => {
    const pText = wrapper.querySelector('p');
    expect(pText?.textContent).toBe('Powered by Colorized Directive');
  });

  // div containing the test Random Text
  it('div should have text Random Text', () => {
    expect(wrapper?.textContent).toMatch('Random Text');
  });

  // to have a div element with different styles
  it('div should have bgcolor, color, height styles', () => {
    const divEl = wrapper.querySelector('div');
    expect(divEl?.style.backgroundColor).toBe('red');
    expect(divEl?.style.color).toBe('rgb(255, 255, 255)');
    expect(divEl?.style.height).toBe('100px');
  });

});
