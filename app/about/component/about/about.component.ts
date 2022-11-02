import { Component, NgZone, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  state,
  animate,
  style,
} from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styles: [],
  animations: [
    trigger('childAnimation', [
      // ...
      state(
        'open',
        style({
          width: '500px',
          height: '100px',
          opacity: 1,
          backgroundColor: 'yellow',
        })
      ),
      state(
        'closed',
        style({
          width: '250px',
          height: '150px',
          opacity: 0.8,
          backgroundColor: 'blue',
        })
      ),
      transition('* => *', [animate('1s')]),
    ]),
    trigger('inOutPaneAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }), //apply default styles before animation starts
        animate(
          '750ms ease-in-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }), //apply default styles before animation starts
        animate(
          '600ms ease-in-out',
          style({ opacity: 0, transform: 'translateX(-100%)' })
        ),
      ]),
    ]),
  ],
})
export class AboutComponent implements OnInit {
  featureName = 'About Us';
  progress: number = 0;
  label!: string;

  isDisabled = false;
  isOpen = false;
  display = false;

  constructor(private _ngZone: NgZone, public translate: TranslateService) {
    
    translate.addLangs(['en', 'fr', 'ta']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    console.log(browserLang);
    translate.use(browserLang.match(/en|ta/) ? browserLang : 'en');
  }

  ngOnInit(): void {}

  // Loop inside the Angular zone
  // so the UI DOES refresh after each setTimeout cycle
  processWithinAngularZone() {
    this.label = 'inside';
    this.progress = 0;
    this._increaseProgress(() => console.log('Inside Done!'));
  }

  // Loop outside of the Angular zone
  // so the UI DOES NOT refresh after each setTimeout cycle
  processOutsideOfAngularZone() {
    this.label = 'outside';
    this.progress = 0;
    this._ngZone.runOutsideAngular(() => {
      debugger;
      this._increaseProgress(() => {
        // reenter the Angular zone and display done
        this._ngZone.run(() => {
          console.log('Outside Done!');
        });
      });
    });
  }

  _increaseProgress(doneCallback: () => void) {
    this.progress += 1;
    console.log(`Current progress: ${this.progress}%`);

    if (this.progress < 100) {
      window.setTimeout(() => this._increaseProgress(doneCallback), 10);
    } else {
      doneCallback();
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
