import { Component, Input, OnInit } from '@angular/core';

import { Product } from './../../models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input('product') product!: Product;
  quantity: number = 1;

  constructor() {}

  ngOnInit(): void {}

  addToCart() {
    console.log(this.quantity);
  }
}
