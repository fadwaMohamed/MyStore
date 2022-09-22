import { Component, OnInit } from '@angular/core';

import { Cart } from './../../models/cart';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private cartSer: CartService) {}

  ngOnInit(): void {}
}
