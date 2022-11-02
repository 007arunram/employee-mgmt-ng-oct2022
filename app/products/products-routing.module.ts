import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';

//lets configure the URL's
const productsRoutes:Routes = [
  { path: '', component:ProductListComponent, data: { title: 'Products' }},
  { path: 'cart', component: CartViewComponent},
  { path: ':id', component: ProductDetailsComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(productsRoutes) // registering the above routes
  ],
  exports: [ RouterModule ]
})
export class ProductsRoutingModule { }