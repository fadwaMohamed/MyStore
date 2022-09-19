import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

import { Product } from './../../models/product';
import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  quantity: number = 0;
  product!: Product | null;

  constructor(
    private productSer: ProductService,
    private ar: ActivatedRoute,
    private cartSer: CartService
  ) {}

  ngOnInit(): void {
    this.ar.params
      .pipe(switchMap((params) => this.productSer.getProductById(params['id'])))
      .subscribe((data) => {
        this.product = data;
        this.quantity = this.cartSer.getProductQuantity(data!.id);
      });
  }

  addToCart() {
    if (this.product) this.cartSer.addToCart(this.product, this.quantity);
  }
}
