import { Product } from './product';

export class Cart {
  constructor(public items: CartItem[]) {}

  /* get totalCount(): number {
    return this.items.reduce((p, item) => p + item.quantity, 0);
  } */

  get totalCartPrice(): number {
    return this.items.reduce((p, c) => p + c.product.price * c.quantity, 0);
  }

  productQuantity(productId: number): number {
    let item = this.items.find((p) => p.product.id == productId);
    return item ? item.quantity : 0;
  }
}

export class CartItem {
  constructor(
    public id: number,
    public product: Product,
    public quantity: number
  ) {}
}
