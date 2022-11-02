import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

// decorator
@Directive({
  selector: '[appColorizer]'
})
export class ColorizerDirective {
  divEl: any;
  //hostbinding
  @HostBinding('style.border') border!: string;
  @HostBinding('style.padding') padding!: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
    // attribute selector
    //console.log('Inside directive...');

    //find an element in which the directive is used
    //console.log(this.elRef);
    this.divEl = elRef.nativeElement;

    //pass spl instructions to the element using JS
    /* divEl.style.backgroundColor = 'orange';
    divEl.style.color = '#fff';
    divEl.style.height = '100px';
    divEl.style.padding = '20px'; */

    ////pass spl instructions to the element using Angular's renderer
    renderer.setStyle(this.divEl, 'backgroundColor', 'red');
    renderer.setStyle(this.divEl, 'color', '#fff');
    renderer.setStyle(this.divEl, 'height', '100px');
    renderer.setStyle(this.divEl, 'padding', '20px');

    const newPara = renderer.createElement('p'); //<p></p>
    renderer.setStyle(newPara, 'float', 'right'); // <p style='float:left'></p>
    renderer.setStyle(newPara, 'font-size', '10px'); // <p style='float:left; font-size:10px'></p>
    const poweredByText = renderer.createText('Powered by Colorized Directive'); // Powered By Colorizer Directive
    renderer.appendChild(newPara, poweredByText); // <p style='float:left; font-size:10px'>Powered By Colorizer Directive</p>
    renderer.appendChild(this.divEl, newPara);
  }

  //Handle Events inside Directive -- click, mouseover, mouseout
  @HostListener('click', ['$event.target'])
  handleClick(targetEl: any) {
    //console.log('Clicked');
    //console.log(targetEl); // will show the element in which the click event occured
    this.renderer.setStyle(targetEl, 'backgroundColor', 'yellow');
    this.renderer.setStyle(targetEl, 'color', '#000');
    this.border = '2px solid green';

    const newSpan = this.renderer.createElement('span'); //<span></span>
    this.renderer.setStyle(newSpan, 'font-size', '12px');
    const developedByText = this.renderer.createText('Developed by Arun');
    this.renderer.appendChild(newSpan, developedByText); // <span>Developed by Arun</span>
    this.renderer.appendChild(this.divEl, newSpan);
  }

  // work on mouseover -- change bg color to lightgreen
  @HostListener('mouseover') 
  handleMouseOver() {
    this.renderer.setStyle(this.divEl, 'background-color', 'lightgreen');
    this.padding = '10px';
    this.border = '10px green solid';
  }

  // work on mouseout -- change the bg color to red
  @HostListener('mouseout') 
  handleMouseOut() {
    this.renderer.setStyle(this.divEl, 'background-color', 'red');
    this.padding = '';
    this.border = '';
  }
}
