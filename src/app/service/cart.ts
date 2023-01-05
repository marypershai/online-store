import { CartData } from 'frame/tools/interfaces';
import { Product } from './product';
import { getProduct } from './product-list';
import { getPromoListFromLocalStorage } from './promocode';

class CartService {
  private cart: CartData[];

  constructor() {
    this.cart = [];
  }

  public addToCart(id: number, quantity: number): CartData[] {
    this.updateCartFromLocalstorage();
    const productExist = this.cart.find(item => item.productID == id);
    if (productExist) {
      productExist.quantity = productExist.quantity + 1;
    } else {
      this.cart.push({ 'productID': id, 'quantity': quantity });
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    return this.cart;
  }

  public delete(id: number): CartData[] {
    this.updateCartFromLocalstorage();
    const product = this.cart.find(item => item.productID == id) as CartData;
    if (product.quantity > 1) {
      product.quantity = product.quantity - 1;
    } else {
      this.cart = this.cart.filter(item => item.productID !== id);
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
    return this.cart;
  }

  public dropFromCart(id: number): CartData[] {
    this.updateCartFromLocalstorage();
    this.cart = this.cart.filter(item => item.productID !== id);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    return this.cart;
  }

  public checkButtonState(id: number): string {
    const currenCart: string | null = localStorage.getItem('cart');
    let buttonText = 'Add to cart';
    if (currenCart) {
      const currenCartArr: [CartData] = JSON.parse(currenCart);
      if (currenCartArr.find(item => item.productID == id)) {
        return buttonText = 'Drop from cart';
      }
    }
    return buttonText;
  }

  private updateCartFromLocalstorage(): CartData[] {
    const currenCart: string | null = localStorage.getItem('cart');
    if (currenCart) {
      this.cart = JSON.parse(currenCart);
    }
    return this.cart;
  }

  public getCart(): CartData[] {
    this.updateCartFromLocalstorage();
    return this.cart;
  }

  public getProductQuantity(id: number): number {
    this.updateCartFromLocalstorage();
    const productExist = this.cart.find(item => item.productID == id) as CartData;
    return productExist.quantity;
  }

  public totalProductPrice(id: number): number {
    this.updateCartFromLocalstorage();
    const productExistInCart = this.cart.find(item => item.productID == id) as CartData;
    const product = getProduct(productExistInCart.productID) as Product;
    return productExistInCart.quantity * product.price;
  }

  public cartSum(): number {
    this.updateCartFromLocalstorage();
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

  public checkPosibilityToAddToCart(id: number): string {
    this.updateCartFromLocalstorage();
    const productInCart = this.cart.find(item => item.productID == id) as CartData;
    const product = getProduct(productInCart.productID) as Product;
    if (productInCart.quantity == product.stock) {
      return 'visibility-hidden';
    } else {
      return '';
    }
  }

  public getSumWithDiscount(): number {
    const sum = this.cartSum();
    const discountPercentage: number | undefined = getPromoListFromLocalStorage()?.reduce((discSum, promo) => {
      return discSum + promo.discountPercentage;
    }, 0);
    if (discountPercentage) return Math.trunc(sum - sum * discountPercentage / 100);
    return sum;
  }
}

export const cart = new CartService();