/* eslint-disable no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CartDataService } from 'src/app/shared/services/cart-data.service';
import { IProduct } from '../../models/iproduct';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styles: [],
})
export class CartViewComponent implements OnInit {
  cartItems: IProduct[] = [];

  cartProducts$!: Observable<IProduct[]>; // using async pipe

  // cartItemsSubscription!: Subscription;

  constructor(private cartDataService: CartDataService) {}

  ngOnInit(): void {

    this.cartProducts$ = this.cartDataService.latestCartItems;
    
    // this.cartItemsSubscription = this.cartDataService.latestCartItems.subscribe(
    //   (cartItems: IProduct[]) => {
    //     this.cartItems = cartItems;
    //     console.log(cartItems);
    //   }
    // );
  }

  // ngOnDestroy(): void {
  //   if (this.cartItemsSubscription) {
  //     this.cartItemsSubscription.unsubscribe();
  //   }
  // }
}
