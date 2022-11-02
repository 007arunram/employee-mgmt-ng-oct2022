import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ceb',
  template: `
    <div>
      <p>Let's send some data to parent comp</p>
      <button (click)="handleSendDataToParent()">
        Send Data to Parent Comp
      </button>
    </div>
  `,
  styles: [],
})
export class CebComponent implements OnInit {
  
  @Output() profileLoaded = new EventEmitter();

  profile = {
    name: 'Arun',
    city: 'Chennai',
  };
  constructor() {}

  ngOnInit(): void {}

  handleSendDataToParent() {
    console.log('Will send soon');
    this.profileLoaded.emit(this.profile);
  }
}
