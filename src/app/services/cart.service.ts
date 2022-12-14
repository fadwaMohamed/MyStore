import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Cart } from 'src/app/models/cart';

import { CartItem } from './../models/cart';
import { Product } from './../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private url: string = 'http://localhost:3000/cartItems';

  constructor(private http: HttpClient) {}

  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.url);
  }

  // is product exist in cart
  getProductInCart(product: Product): Observable<CartItem | null> {
    return this.getCart().pipe(
      map((cartItems) => {
        let cartItem = cartItems.find((item) => item.product.id == product.id);
        if (cartItem) return cartItem;
        return null;
      })
    );
  }

  editCart(cartItem: CartItem): Observable<any> {
    // add new product
    if (cartItem.id == -1) return this.addToCart(cartItem);
    // remove product
    else if (cartItem.quantity == 0) {
      setTimeout(() => {
        alert('Removed from cart');
      }, 100);
      return this.removeFromCart(cartItem.id);
    }
    // update quantity of existing product
    else return this.updateQuantity(cartItem);
  }

  private addToCart(cartItem: CartItem): Observable<CartItem> {
    alert('Added successfully to the cart');

    return this.http.post<CartItem>(this.url, {
      product: cartItem.product,
      quantity: cartItem.quantity,
    });
  }

  private removeFromCart(id: number): Observable<any> {
    //alert('Will remove from cart');

    return this.http.delete(`${this.url}/${id}`);
  }

  private updateQuantity(cartItem: CartItem): Observable<object> {
    //alert('Product updated successfully');

    return this.http.put(`${this.url}/${cartItem.id}`, cartItem);
  }

  clearCart(cart: Cart) {
    cart.items.forEach((item) => this.removeFromCart(item.id).subscribe());
  }
}
