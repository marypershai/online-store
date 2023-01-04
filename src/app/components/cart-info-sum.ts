import { ComponentConfig } from '../../frame/tools/interfaces';
import { DMComponent } from '../../frame/index';
import { cart } from '../service/cart';


class CartInfoSumComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
    this.createInfoSum();
  }


  public createInfoSum(): void {
    this.config.template = `
    <div class="info__cart">
        <svg class="icon">
          <title>total sum</title>
          <use xlink:href="./icons.svg#value"></use>
        </svg>
        <p class="cart__number">${cart.cartSum()}</p>
      </div>
    `;
    this.template = this.config.template;
  }
}

const cartInfoSumComponent = new CartInfoSumComponent({
  selector: 'app-info-cart-sum',
  template: '',
  childComponents: [],
});

export { cartInfoSumComponent };
