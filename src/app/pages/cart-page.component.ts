import { summaryComponent } from '../components/summary.component';
import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';
import { shoppingCartComponent } from '../components/shoppingcart.component';

class CartPageComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
    this.createCartPage();
  }

  public createCartPage(): string {
    this.template = `
    <div class="page__container cart__page">
          <app-shopping-cart></app-shopping-cart>        
          <app-summary-cart></app-summary-cart>       
      </div
    `;
    return this.config.template;
  }
}

export const cartPageComponent = new CartPageComponent({
  selector: 'app-cart-page',
  template: '',
  childComponents: [shoppingCartComponent, summaryComponent],
});
