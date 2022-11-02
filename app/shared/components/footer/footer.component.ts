import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="text-center">
      <hr />
      <app-menu>
        <li class="nav-item" #backtotop>
          <a class="nav-link" href="#">Back to Top</a>
        </li>
      </app-menu>
      <p style="color:blue; backgroundColor:#ADD8E6">&copy;Copyright | Arun R</p>
    </footer>
  `,
  styles: []
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
