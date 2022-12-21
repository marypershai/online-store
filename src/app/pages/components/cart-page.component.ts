import { DMComponent } from '../../../frame/index';
import { ComponentConfig } from '../../../frame/tools/interfaces';

class CartPageComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
  }
}

export const cartPageComponent = new CartPageComponent({
  selector: 'app-cart-page',
  template: `
        <div><h4>Here cart</h4></div>
    `,
  childComponents: [],
});
