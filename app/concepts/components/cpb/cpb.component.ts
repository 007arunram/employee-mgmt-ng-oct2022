import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cpb',
  template: `
    <div>
      Parent to Child Component Communicaiton
      <p>My Age: {{ age }}</p>
    </div>
  `,
  styles: [],
})
export class CpbComponent implements OnInit {

  @Input() age = 24;
  
  constructor() {}

  ngOnInit(): void {}
}
