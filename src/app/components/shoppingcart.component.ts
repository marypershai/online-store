import { ComponentConfig } from '../../frame/tools/interfaces';
import { DMComponent } from '../../frame/index';
import { Product } from '../service/product';
import { getProduct } from '../service/product-list';
import { cart } from '../service/cart';


class ShoppingCartComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
    this.createShoppingCart();
  }


  private emptyCartNotion() {
    this.config.template += `
    <div class="cart--empty">
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
        <section class="shopping-cart">
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
        const id = currenCart[i].productID;
        const product: Product | undefined = getProduct(+id);
        if (product) {
          this.config.template += `
            <li class="cart__item">
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
                <button class="button">
                  <svg class="cart__icon">
                    <title>minus</title>
                    <use xlink:href="./icons.svg#remove"></use>
                  </svg>
                </button>
                <span class="purchase__quantity">1</span>
                <button class="button" type="button" aria-label="plus">
                  <svg class="cart__icon">
                    <title>plus</title>
                    <use xlink:href="./icons.svg#add"></use>
                  </svg>
                </button>
              </div>
              <div class="item__total-price">
              3000$
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
}

const shoppingCartComponent = new ShoppingCartComponent({
  selector: 'app-shopping-cart',
  template: '',
  childComponents: [],
});

export { shoppingCartComponent, ShoppingCartComponent };

