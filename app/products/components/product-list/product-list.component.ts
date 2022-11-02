import { Component, OnInit } from '@angular/core';
import { CartDataService } from 'src/app/shared/services/cart-data.service';
import { IProduct } from '../../models/iproduct';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: [
  ]
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];

  constructor( private productsService: ProductsService, private cartDataService: CartDataService ) { }

  ngOnInit(): void {
    // getting the res from service
    this.products = this.productsService.getProductList();
  }

  handleAddToCart(products: IProduct){
    // send the data to the cart data service
    this.cartDataService.addProductToCart(products);
  }

}
