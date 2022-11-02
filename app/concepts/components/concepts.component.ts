import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { delay, forkJoin, of } from 'rxjs';

import { CebComponent } from './ceb/ceb.component';

@Component({
  selector: 'app-concepts',
  templateUrl: './concepts.component.html',
  styles: [],
})
export class ConceptsComponent implements OnInit, AfterViewInit {
  //Public Variable && Interpolation related
  appName = 'Employee Manager App!';
  companyProfile = {
    companyName: 'Cognizant',
    employee: 300000,
  };

  //Property Binding relatedp
  teamSize = 14;

  //Two way Bidning related
  courseName = 'angular13';

  //Custom Property related
  myAge = 100;
  dataReceivedFromChildComp: any;

  // for directives
  isLoggedIn = true;
  skills = ['HTML', 'CSS', 'Angular', 'NodeJs'];
  day!: number;

  //for ngTemplateOutlet
  myContext = {
    $implicit: 'World',
    age: 20,
    name: 'John',
  };

  //pipe related
  dummyText =
    'Welcome to Pipes concept! This is related to the transforming info from one format to another.';
  today: Date = new Date();

  //json pipe
  book: Object = {
    name: 'angular-syntax-helper',
    version: '5.0.3',
    author: 'Yusong Hsu',
  };

  //async pipe
  asyncPipe: any;

  // data received from child component using viewChild
  dataAccessedFromChildComp: any;

  @ViewChild(CebComponent, { static: false }) cebData!: CebComponent;

  // fork join related APi

  userApi = 'https://jsonplaceholder.typicode.com/users/';
  postsApi = 'https://jsonplaceholder.typicode.com/posts/';
  combineRes!: any;

  constructor(private cd: ChangeDetectorRef, private http: HttpClient) {}

  ngOnInit(): void {
    this.asyncPipe = of('Async Pipe Implementation').pipe(delay(2000));
    //console.log(this.cebData);
  }

  ngAfterViewInit(): void {
    console.log(this.cebData);
    // when @ViewChild with static false you can access child comp's data here
    this.dataAccessedFromChildComp = this.cebData.profile.city;
    this.cd.detectChanges();
  }
  
  handleProfileLoaded(event: any) {
    console.log('Inside handleProfileLoaded');
    console.log(event);
    this.dataReceivedFromChildComp = event;
  }

  //Event Binding related
  handleClickMe(event: any) {
    //Disable the button
    event.target.disabled = 'true';
    //Change the lable 'clicked'
    event.target.innerText = 'clicked';
  }

  //fork join
  handleForkJoin() {
    const users = this.http.get<any>(this.userApi);
    const posts = this.http.get<any>(this.postsApi);

    forkJoin([users, posts]).subscribe((res) => {
      this.combineRes = res;

      console.log('Combine Response', this.combineRes);
    });
  }
}
