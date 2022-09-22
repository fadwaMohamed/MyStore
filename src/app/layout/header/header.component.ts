import { Component, OnInit } from '@angular/core';

//import { Cart } from './../../models/cart';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  //cart!: Cart;

  constructor() {}
  //constructor(private cartSer: CartService) {}

  ngOnInit(): void {
    //this.cartSer.getCart().subscribe((data) => (this.cart = new Cart(data)));
  }
}
