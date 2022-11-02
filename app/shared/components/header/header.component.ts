/* eslint-disable no-unused-vars */
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IProduct } from 'src/app/products/models/iproduct';
import { CartDataService } from '../../services/cart-data.service';
import { NavigationHelper } from '../../utils/navigation-helper';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartCount = 0;

  @Input() header: string = 'Header Content...!';
  constructor(
    public navigateHelper: NavigationHelper,
    private cartDataService: CartDataService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartDataService.latestCartItems.subscribe((cartItems: IProduct[]) => {
      this.cartCount = cartItems.length;
      console.log(cartItems);
    });
  }

  handleLogout() {
    this.authService.logout();
  }
}

/* handleGoToCart(){
    this.navigateHelper.navigateTo('products/cart');
  } */
