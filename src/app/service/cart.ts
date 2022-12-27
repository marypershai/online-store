import { CartData } from 'frame/tools/interfaces';

class Cart {
  private cart: CartData[];

  constructor() {
    this.cart = [];
  }

  public addToCart(id: number, quantity: number): void {
    if (this.cart.find(item => item.productID == id)) {
      console.log('update - not implemented now');
    }
    this.cart.push({ 'productID': id, 'quantity': quantity });
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  public delete(id: number): void {
    const currenCart: string | null = localStorage.getItem('cart');
    if (currenCart) {
      this.cart = JSON.parse(currenCart);
      this.cart = this.cart.filter(item => item.productID !== id);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
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
}

export const cart = new Cart();