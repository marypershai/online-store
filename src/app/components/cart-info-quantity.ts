import { ComponentConfig } from '../../frame/tools/interfaces';
import { DMComponent } from '../../frame/index';
import { cart } from '../../app/service/cart';


class CartInfoQuantityComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
    this.createInfoQuantitySum();
  }


  public createInfoQuantitySum(): void {
    this.config.template = `
      <div class="info__cart cart-nav">        
        <svg class="icon button">
          <title>open cart</title>
          <use xlink:href="./icons.svg#Shopping Basket"></use>
        </svg>
        <p class="cart__number">${cart.cartQuantitySum()}</p>
      </div>
    `;
    this.template = this.config.template;
  }
}

const cartInfoQuantityComponent = new CartInfoQuantityComponent({
  selector: 'app-info-cart-quantity',
  template: '',
  childComponents: [],
});

export { cartInfoQuantityComponent };
