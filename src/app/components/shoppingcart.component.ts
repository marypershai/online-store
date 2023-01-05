import { ComponentConfig } from '../../frame/tools/interfaces';
import { DMComponent } from '../../frame/index';
import { Product } from '../service/product';
import { getProduct, getProductQuantity } from '../service/product-list';
import { cart } from '../service/cart';
import { summaryComponent } from './summary.component';
import { cartInfoSumComponent } from './cart-info-sum';
import { cartInfoQuantityComponent } from './cart-info-quantity';
import { appHeader } from '../../app/common/app.header';


class ShoppingCartComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
    this.createShoppingCart();
  }


  private emptyCartNotion() {
    this.config.template += `
    <div class="cart--empty cartDecrease cartIncrease">
      <h1>Your сart is empty</h1>
      <p class="bold">Looks like the programmer is still without a gift </p>
      <a class="button link-as-button" href="/">Continue Shopping</a>
    </div>
    `;
  }

  public createShoppingCart(): void {
    const currenCart = cart.getCart();
    if (currenCart && currenCart.length > 0) {
      this.config.template = `
        <section class="shopping-cart cartDecrease cartIncrease">
          <div class="cart__header">
            <h2>Shopping Cart </h2>
            <div class="page__control">
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
          <ol class="cart__product">`;

      for (let i = 0; i < currenCart.length; i++) {
        const id: number = currenCart[i].productID;
        const product: Product | undefined = getProduct(+id);
        if (product) {
          this.config.template += `
            <li class="cart__item" data-id=${id}>
              <img class="cart__image" src="${product.thumbnail}" alt="" decoding="async">
              <div class="cart__item__desciption">
                <h3 class="item__name">${product.title}</h3>
                <p class="item__rating">Rating: ${product.rating}</p>
                <p class="item__brand">Brand: ${product.brand}</p>
                <p class="item__category">Category: ${product.category} </p>              
                <p class="item__price">Price, $: ${product.price} </p>
                <p class="item__stock">Stock: ${product.stock} </p>   
                <p class="item__description">${product.description}</p>         
              </div>

              <div class="purchase__numbers">       
                <button class="button button__decrease">
                  <svg class="cart__icon">
                    <title>minus</title>
                    <use xlink:href="./icons.svg#remove"></use>
                  </svg>
                </button>
                <span class="purchase__quantity">${cart.getProductQuantity(id)}</span>
                <button class="button button__increase ${cart.checkPosibilityToAddToCart(id)}" type="button" aria-label="plus">
                  <svg class="cart__icon">
                    <title>plus</title>
                    <use xlink:href="./icons.svg#add"></use>
                  </svg>
                </button>
              </div>
              <div class="item__total-price">
              ${cart.totalProductPrice(id)}$
              </div>
            </li>
          `;
        }
      }
      this.config.template += `
        </ol>
      </section>
      `;
    } else {
      this.emptyCartNotion();
    }
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
      cart.delete(+productID);
      quantity.innerText = `${cart.getProductQuantity(+productID)}`;
      const productInfo = targetEl.closest('.purchase__numbers') as HTMLElement;
      const totalPrice = productInfo.nextElementSibling as HTMLElement;
      totalPrice.innerText = cart.totalProductPrice(+productID) + '$';
      const increaseButton = product.querySelector('.button__increase') as HTMLElement;
      if (increaseButton) {
        increaseButton.classList.remove('visibility-hidden');
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
      if (quantityNumber === getProductQuantity(+productID) - 1) {
        targetParent.classList.add('visibility-hidden');
      }
      summaryComponent.createSummary();
      summaryComponent.render();
      cartInfoSumComponent.createInfoSum();
      cartInfoQuantityComponent.createInfoQuantitySum();
      appHeader.render();
    }
  }
}

const shoppingCartComponent = new ShoppingCartComponent({
  selector: 'app-shopping-cart',
  template: '',
  childComponents: [],
});

export { shoppingCartComponent, ShoppingCartComponent };

