import { CartData } from 'frame/tools/interfaces';
import { Product } from './product';
import { getProduct } from './product-list';

class CartService {
  private cart: CartData[];

  constructor() {
    this.cart = [];
  }

  public addToCart(id: number, quantity: number): CartData[] {
    this.updateCart();
    const productExist = this.cart.find(item => item.productID == id);
    if (productExist) {
      console.log('update - not implemented now');
    }
    this.cart.push({ 'productID': id, 'quantity': quantity });
    localStorage.setItem('cart', JSON.stringify(this.cart));
    return this.cart;
  }

  public delete(id: number): CartData[] {
    const currenCart: string | null = localStorage.getItem('cart');
    if (currenCart) {
      this.cart = JSON.parse(currenCart);
      this.cart = this.cart.filter(item => item.productID !== id);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    return this.cart;
  }

  public checkButtonState(id: number): string {
    const currenCart: string | null = localStorage.getItem('cart');
    let buttonText = 'Add to cart';
    if (currenCart) {
      const currenCartArr: [CartData] = JSON.parse(currenCart);
      if (currenCartArr.find(item => item.productID == id)) {
        return buttonText = 'Delete from cart';
      }
    }
    return buttonText;
  }

  private updateCart(): CartData[] {
    const currenCart: string | null = localStorage.getItem('cart');
    if (currenCart) {
      this.cart = JSON.parse(currenCart);
    }
    return this.cart;
  }

  public getCart(): CartData[] {
    this.updateCart();
    return this.cart;
  }

  public cartSum(): number {
    const sum = this.cart.reduce(function (cartSum: number, current: CartData): number {
      const product = getProduct(current.productID) as Product;
      return cartSum + product.price * current.quantity;
    }, 0);
    return sum;
  }

  public cartQuantitySum(): number {
    const quantitySum = this.cart.reduce(function (quantity: number, current: CartData): number { return quantity + current.quantity; }, 0);
    return quantitySum;
  }
}

export const cart = new CartService();