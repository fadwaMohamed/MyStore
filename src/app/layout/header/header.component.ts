import { Component, OnInit } from '@angular/core';

import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  totalCount: number = 0;

  constructor(private cartSer: CartService) {}

  ngOnInit(): void {
    this.changeCount();
  }

  changeCount() {
    this.totalCount = this.cartSer.getCart().totalCount;
  }
}
