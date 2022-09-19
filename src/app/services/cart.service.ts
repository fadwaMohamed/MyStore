import { Injectable } from '@angular/core';

import { Cart, CartItem } from './../models/cart';
import { Product } from './../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  getCart(): Cart {
    let cart = localStorage.getItem('cart');
    return new Cart(cart ? JSON.parse(cart).items : []);
  }

  private getCartItemIndex(productId: number, cartItems: CartItem[]) {
    return cartItems.findIndex((item) => item.product.id == productId);
  }

  addToCart(product: Product, quantity: number) {
    let cartItems = this.getCart().items;
    let existIndex = this.getCartItemIndex(product.id, cartItems);

    if (existIndex >= 0) {
      // remove product
      if (quantity == 0) cartItems.splice(existIndex, 1);
      // update quantity
      else cartItems[existIndex].quantity = quantity;
    }
    // add product
    else if (quantity != 0)
      cartItems.push({ product: product, quantity: quantity });

    localStorage.setItem('cart', JSON.stringify({ items: cartItems }));
  }

  getProductQuantity(productId: number) {
    return this.getCart().productQuantity(productId);
  }

  clearCart() {
    localStorage.setItem('cart', JSON.stringify({ items: [] }));
  }
}
