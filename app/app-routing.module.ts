import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/component/about/about.component';
import { ConceptsComponent } from './concepts/components/concepts.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UnitTestingDemoComponent } from './unit-testing-demo/components/unit-testing-demo/unit-testing-demo.component';

//config the roules
const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home', animation: 'HomePage'} },
  {
    path: 'concepts',
    component: ConceptsComponent,
    data: { title: 'Concepts' },
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard],
    data: { title: 'About', animation: 'AboutPage' },
  },
  {
    path: 'unit-testing',
    component: UnitTestingDemoComponent,
    canActivate: [AuthGuard],
    data: { title: 'Unit-Testing' },
  },

  //Lazy loading
  {
    path: 'employees',
    loadChildren: () =>
      import('./employees/employees.module').then((m) => m.EmployeesModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent,
    data: { title: 'Page-Not-Found' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
