import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartItem } from './../../models/cart';
import { Product } from './../../models/product';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];

  constructor(private cartSer: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cart = this.cartSer.getCart().items;
  }

  changeAmount(product: Product, quantity: number) {
    this.cartSer.addToCart(product, quantity);
  }

  totalPrice(): number {
    return this.cartSer.getCart().totalCartPrice;
  }

  checkOut(formValue: any) {
    this.router.navigate([
      'confirmation',
      formValue.fullName,
      this.totalPrice(),
    ]);
    this.cartSer.clearCart();
  }
}
