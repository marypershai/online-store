import { CartData } from 'frame/tools/interfaces';

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
    console.log('addTocart');
    console.log(this.cart);
    return this.cart;
  }

  public delete(id: number): CartData[] {
    const currenCart: string | null = localStorage.getItem('cart');
    if (currenCart) {
      this.cart = JSON.parse(currenCart);
      this.cart = this.cart.filter(item => item.productID !== id);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    console.log('deleteFromCart');
    console.log(this.cart);
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
    console.log('getCart()');
    console.log(this.cart);
    return this.cart;
  }
}

export const cart = new CartService();