import { summaryComponent } from '../components/summary.component';
import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';
import { shoppingCartComponent } from '../components/shoppingcart.component';
import { orderModalComponent } from '../../app/components/order-modal.component';

class CartPageComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
  }
}

export const cartPageComponent = new CartPageComponent({
  selector: 'app-cart-page',
  template: `
    <div class="page__container cart__page">
        <app-shopping-cart></app-shopping-cart>        
        <app-summary-cart></app-summary-cart>
        <app-modal></app-modal>       
    </div>
    `
  ,
  childComponents: [shoppingCartComponent, summaryComponent, orderModalComponent],
});
