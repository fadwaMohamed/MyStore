import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from 'src/app/models/cart';

import { Product } from './../../models/product';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input('product') product!: Product;
  @Output('editCart') editCart = new EventEmitter();
  quantity: number = 0;
  idInCart: number = -1;

  constructor(private cartSer: CartService) {}

  ngOnInit(): void {
    this.checkInCart();
  }

  checkInCart() {
    this.cartSer.getProductInCart(this.product).subscribe((item) => {
      if (item) {
        this.quantity = item.quantity;
        this.idInCart = item.id;
      } else {
        this.idInCart = -1;
      }
    });
  }

  addToCart() {
    let item = new CartItem(this.idInCart, this.product, this.quantity);
    this.editCart.emit(item);

    setTimeout(() => {
      this.checkInCart();
    }, 300);
  }
}
