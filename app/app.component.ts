import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  ChildrenOutletContexts,
  NavigationEnd,
  Router,
} from '@angular/router';
import { filter} from 'rxjs';

import { slideInAnimation } from './shared/animations/animations';

@Component({
  selector: 'app-root', //exposed in a selector - mandatory
  templateUrl: './app.component.html', // html - showld be only one mandatory
  styleUrls: ['./app.component.css'], // css - can be multiple and optional
  // encapsulation: ViewEncapsulation.Emulated,
  animations: [
    slideInAnimation 
  ],
})
export class AppComponent {
  title = 'employee-mgmt-ng-sept2022';

  constructor(
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private contexts: ChildrenOutletContexts
  ) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        var rt = this.getChild(this.activatedRoute);
        rt.data.subscribe((data: any) => {
          console.log(data);
          this.titleService.setTitle(`Emp Manager | ${data.title}`);
        });
      });
  }

  getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
