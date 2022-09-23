import { CartService } from './../../services/cart.service';
import { CartItem } from 'src/app/models/cart';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

import { Product } from './../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productSer: ProductService,
    private cartSer: CartService
  ) {}

  ngOnInit(): void {
    this.productSer.getProducts().subscribe((data) => (this.products = data));
  }

  editCart(item: CartItem) {
    this.cartSer.editCart(item).subscribe();
  }
}
