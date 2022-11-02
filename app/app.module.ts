import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { HomeComponent } from './home/home.component';
import { ConceptsComponent } from './concepts/components/concepts.component';
import { CpbComponent } from './concepts/components/cpb/cpb.component';
import { CebComponent } from './concepts/components/ceb/ceb.component';
import { ColorizerDirective } from './concepts/directives/colorizer.directive';
import { DemoIfDirective } from './concepts/directives/demo-if.directive';
import { UnlessDirective } from './concepts/directives/unless.directive';
import { UnitTestingDemoComponent } from './unit-testing-demo/components/unit-testing-demo/unit-testing-demo.component';
import { CounterComponent } from './unit-testing-demo/components/counter/counter.component';
import { HighlightDirective } from './unit-testing-demo/directives/highlight.directive';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AboutComponent } from './about/component/about/about.component';
import { CalcComponent } from './about/component/calc/calc.component';
import { EllipsisPipe } from './shared/pipes/ellipsis.pipe';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BnNgIdleService } from 'bn-ng-idle';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

// Main Switching Box
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    HomeComponent,
    ConceptsComponent,
    AboutComponent,
    CpbComponent,
    CebComponent,
    CalcComponent,
    ColorizerDirective,
    DemoIfDirective,
    UnlessDirective,
    UnitTestingDemoComponent,
    CounterComponent,
    HighlightDirective,
    PageNotFoundComponent,
    EllipsisPipe
  ],
  imports: [
    BrowserModule,  
    BrowserAnimationsModule,
    FormsModule, // for ngMode
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }, BnNgIdleService],
  bootstrap: [AppComponent] // AppModule should be bootstrapped with AppComponent
})
export class AppModule { }
