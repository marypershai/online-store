import { CartData, ComponentConfig } from '../../frame/tools/interfaces';
import { DMComponent } from '../../frame/index';
import { cart } from '../../app/service/cart';


class SummaryComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
    this.createSummary();
  }


  public createSummary(): void {
    const currentCart: CartData[] = cart.getCart();
    if (currentCart && currentCart.length > 0) {
      this.config.template = `
          <div class="cart-summary">
            <h2>Summary</h2>
            <div class="total">
              <div class="total__product">
                Products: <span class="total-number">${cart.cartQuantitySum()}</span>
              </div>
              <div class="total__price">
                Total sum, $: <span class="total-value">${cart.cartSum()}</span>
              </div>
            </div>
            <div class="applied-codes">
            </div>
            <div class="promo-code">
              <input type="search" placeholder="Enter promotional code" maxlength="9">
              <p class="promo__description">promo for test: 'RS', 'EPM'</p>
            </div>
            <button class="button button--buy">Buy Now</button>
          </div>
        `;
    }
    this.template = this.config.template;
  }
}

const summaryComponent = new SummaryComponent({
  selector: 'app-summary-cart',
  template: '',
  childComponents: [],
});

export { summaryComponent, SummaryComponent };
