import { summaryComponent } from '../../app/components/summary.component';
import { shoppingCartComponent } from '../../app/components/shoppingcart.component';
import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';
import { cartInfoQuantityComponent } from '../../app/components/cart-info-quantity';
import { cartInfoSumComponent } from '../../app/components/cart-info-sum';

export class AppHeader extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
  }

  public events(): Record<string, string> {
    return {
      'click .cart-nav': 'openCart',
    };
  }

  private openCart(event: Event): void {
    const targetEl = event.target as HTMLElement;
    if (targetEl.closest('.cart-nav')) {
      window.location.hash = 'cart';
      shoppingCartComponent.createShoppingCart();
      summaryComponent.createSummary();
    }
  }

}

export const appHeader = new AppHeader({
  selector: 'app-header',
  template: `
        <header class="page__container header">
          <div class="header__brand">
            <a href="#">
              <img class="header__logo" src="https://res.cloudinary.com/bartoshevich/image/upload/f_auto,q_auto/v1671804535/rs-school/online/store__logo.png" alt="">
            </a>
            <h1 class="header__title">giftsToProgrammers</h1>
          </div>

          <div class="header__info">
            <app-info-cart-sum></app-info-cart-sum>
            <app-info-cart-quantity></app-info-cart-quantity>
          </div>

        </header>
    `,
  childComponents: [cartInfoQuantityComponent, cartInfoSumComponent],
});
