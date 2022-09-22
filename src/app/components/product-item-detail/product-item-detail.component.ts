import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { CartItem } from 'src/app/models/cart';

import { Product } from './../../models/product';
import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  product!: Product | null;
  quantity: number = 0;
  idInCart: number = -1;

  constructor(
    private productSer: ProductService,
    private ar: ActivatedRoute,
    private cartSer: CartService
  ) {}

  ngOnInit(): void {
    this.ar.params
      .pipe(switchMap((params) => this.productSer.getProductById(params['id'])))
      .pipe(
        switchMap((data) => {
          this.product = data;
          if (data) return this.cartSer.getProductInCart(data);
          else return of(null);
        })
      )
      .subscribe((item) => {
        if (item) {
          this.quantity = item.quantity;
          this.idInCart = item.id;
        }
      });
  }

  addToCart() {
    if (this.product)
      this.cartSer
        .editCart(new CartItem(this.idInCart, this.product, this.quantity))
        .subscribe();
  }
}
