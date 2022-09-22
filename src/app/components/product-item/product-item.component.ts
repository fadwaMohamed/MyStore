import { Component, Input, OnInit } from '@angular/core';
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
  quantity: number = 0;
  idInCart: number = -1;

  constructor(private cartSer: CartService) {}

  ngOnInit(): void {
    this.cartSer.getProductInCart(this.product).subscribe((item) => {
      if (item) {
        this.quantity = item.quantity;
        this.idInCart = item.id;
      }
    });
  }

  addToCart() {
    this.cartSer
      .editCart(new CartItem(this.idInCart, this.product, this.quantity))
      .subscribe((res) => {
        if (this.quantity != 0) this.idInCart = res.id;
        else this.idInCart = -1;
      });
  }
}
