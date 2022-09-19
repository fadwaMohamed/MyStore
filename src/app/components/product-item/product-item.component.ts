import { Component, Input, OnInit } from '@angular/core';

import { Product } from './../../models/product';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input('product') product!: Product;
  @Input('quantity') quantity: number = 0;

  constructor(private cartSer: CartService) {}

  ngOnInit(): void {}

  addToCart() {
    this.cartSer.addToCart(this.product, this.quantity);
  }
}
