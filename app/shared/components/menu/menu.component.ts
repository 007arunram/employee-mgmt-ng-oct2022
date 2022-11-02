import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  OnInit
} from '@angular/core';
import { IMenu } from '../models/imenu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent implements OnInit, AfterContentInit {
  
  menuItems: IMenu[] = [
    {
      id: 1,
      name: 'Home',
      url: '/',
      isActive: true
    },
    {
      id: 2,
      name: 'Concepts',
      url: '/concepts',
      isActive: false
    },
    {
      id: 3,
      name: 'About',
      url: '/about',
      isActive: false
    },
    {
      id: 4,
      name: 'Employee Management',
      url: '/employees',
      isActive: false
    },
    {
      id: 5,
      name: 'Unit Testing',
      url: '/unit-testing',
      isActive: false
    },
    {
      id: 6,
      name: 'Products',
      url: '/products',
      isActive: false
    }
  ];

  // only footer is sending an element with elementRef #backtotop
  @ContentChild('backtotop') b2tElement!: ElementRef;
  constructor() {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    // you will get undefined if such elRef is not sent from parent comp.
    //we will see undefined once beacuse header comp does not send the elRef #backtotop
    console.log(this.b2tElement); // only footer comp sends it
    if (this.b2tElement) {
      this.b2tElement.nativeElement.style.backgroundColor = '#eee';
    }
  }
}
