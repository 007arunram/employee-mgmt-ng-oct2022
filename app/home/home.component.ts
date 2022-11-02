import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `<div class="container"> 
  <div class="jumbotron">
    <div class="inner">
          <h1 class="whitney">Welcome to Growpro Angular Training</h1>
          <p><a class="btn btn-primary btn-lg" role="button">Learn more &raquo;</a></p>
    </div>
      </div>
  </div> `,
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
