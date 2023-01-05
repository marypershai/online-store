import { ComponentConfig } from '../../frame/tools/interfaces';
import { DMComponent } from '../../frame/index';
import { getProductQuantity } from '../service/product-list';
import { cart } from '../service/cart';
import { summaryComponent } from './summary.component';
import { cartInfoSumComponent } from './cart-info-sum';
import { cartInfoQuantityComponent } from './cart-info-quantity';
import { cartProductListComponent } from './cart-product-list';


class ShoppingCartComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
    this.createShoppingCart();
  }

  public createShoppingCart(): void {
    const visabilityPagination: string = cart.getCart().length > 0 ? '' : 'visibility-hidden';
    this.config.template = `
        <section class="shopping-cart cartDecrease cartIncrease">
          <div class="cart__header">
            <h2>Shopping Cart </h2>
            <div class="page__control ${visabilityPagination}">
              <div class="itemslimit">
                <p>items</p>
                <input class="page__control__input" type="text">
              </div>
              <div class="page-numbers">
                page 
                <button class="button" >
                <svg class="icon">
                  <title>prev</title>
                  <use xlink:href="./icons.svg#left"></use>
                </svg>
                </button>
                <span class="page__quantity">1</span>
                <button class="button" type="button" aria-label="plus">
                  <svg class="icon">
                    <title>next</title>
                    <use xlink:href="./icons.svg#right"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <app-cart-product-list></app-cart-product-list>
      </section>
      `;

    this.template = this.config.template;
  }

  public events(): Record<string, string> {
    return {
      'click .cartDecrease': 'decreasePurchaseQuantity',
      'click .cartIncrease': 'increasePurchaseQuantity',
    };
  }

  private decreasePurchaseQuantity(event: Event): void {
    const targetEl = event.target as HTMLElement;
    const targetParent = targetEl.closest('.button__decrease') as HTMLElement;
    if (targetParent) {
      const quantity = targetParent.nextElementSibling as HTMLElement;
      const product = targetEl.closest('.cart__item') as HTMLElement;
      const productID = product.getAttribute('data-id') as string;
      const cartProductQuantity = cart.getProductQuantity(+productID);
      if (cartProductQuantity === 1) {
        cart.dropFromCart(+productID);
        cartProductListComponent.createProductList();
        cartProductListComponent.render();
        if (!cart.getCart()) {
          (document.querySelector('app-summary-cart') as HTMLElement).classList.add('visibility-hidden');
          (document.querySelector('.page__control') as HTMLElement).classList.add('visibility-hidden');
        }
      } else {
        cart.delete(+productID);
        quantity.innerText = `${cart.getProductQuantity(+productID)}`;
        const productInfo = targetEl.closest('.purchase__numbers') as HTMLElement;
        const totalPrice = productInfo.nextElementSibling as HTMLElement;
        totalPrice.innerText = cart.totalProductPrice(+productID) + '$';
        const increaseButton = product.querySelector('.button__increase') as HTMLElement;
        if (increaseButton) {
          increaseButton.classList.remove('visibility-hidden');
        }
      }

      summaryComponent.createSummary();
      summaryComponent.render();
      cartInfoSumComponent.createInfoSum();
      cartInfoSumComponent.render();
      cartInfoQuantityComponent.createInfoQuantitySum();
      cartInfoQuantityComponent.render();
    }
  }

  private increasePurchaseQuantity(event: Event): void {
    const targetEl = event.target as HTMLElement;
    const targetParent = targetEl.closest('.button__increase') as HTMLElement;
    if (targetParent) {
      const quantity = targetParent.previousElementSibling as HTMLElement;
      const quantityNumber = +quantity.innerText;
      const product = targetEl.closest('.cart__item') as HTMLElement;
      const productID = product.getAttribute('data-id') as string;
      cart.addToCart(+productID, quantityNumber);
      quantity.innerText = `${cart.getProductQuantity(+productID)}`;
      const productInfo = targetEl.closest('.purchase__numbers') as HTMLElement;
      const totalPrice = productInfo.nextElementSibling as HTMLElement;
      totalPrice.innerText = cart.totalProductPrice(+productID) + '$';
      const productQuantity = getProductQuantity(+productID);
      if (quantityNumber === productQuantity - 1) {
        targetParent.classList.add('visibility-hidden');
      }
      summaryComponent.createSummary();
      summaryComponent.render();
      cartInfoSumComponent.createInfoSum();
      cartInfoSumComponent.render();
      cartInfoQuantityComponent.createInfoQuantitySum();
      cartInfoQuantityComponent.render();

    }
  }
}

const shoppingCartComponent = new ShoppingCartComponent({
  selector: 'app-shopping-cart',
  template: '',
  childComponents: [cartProductListComponent],
});

export { shoppingCartComponent, ShoppingCartComponent };

