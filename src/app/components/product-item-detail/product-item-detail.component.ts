import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent implements OnInit {
  product!: Product | null;
  quantity: number = 1;

  constructor(private productSer: ProductService, private ar: ActivatedRoute) {}

  ngOnInit(): void {
    this.ar.params
      .pipe(switchMap((params) => this.productSer.getProductById(params['id'])))
      .subscribe((data) => (this.product = data));
  }

  addToCart() {
    console.log(this.quantity);
  }
}
