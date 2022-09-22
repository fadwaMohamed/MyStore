import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';

import { CartItem } from './../../models/cart';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart!: Cart;
  loading: boolean = true;

  constructor(private cartSer: CartService, private router: Router) {}

  ngOnInit(): void {
    // get cart items
    this.cartSer.getCart().subscribe((data) => {
      this.cart = new Cart(data);
      this.loading = false;
    });
  }

  changeAmount(cartItem: CartItem) {
    this.cartSer.editCart(cartItem).subscribe();
  }

  checkOut(formValue: any) {
    // navigate to confirmation page
    this.router.navigate([
      'confirmation',
      formValue.fullName,
      this.cart.totalCartPrice,
    ]);
    // remove cart items
    this.cartSer.clearCart(this.cart);
  }
}
