import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';

export class AppHeader extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
  }
}

export const appHeader = new AppHeader({
  selector: 'app-header',
  template: `
        <header class="page__container header">
          <div class="header__brand">
            <a href="/">
              <img class="header__logo" src="https://res.cloudinary.com/bartoshevich/image/upload/f_auto,q_auto/v1671659722/rs-school/online/logo.png" alt="">
            </a>
            <h1 class="header__title">giftsToProgrammers</h1>
          </div>

          <div class="header__info">

            <div class="info__cart">
              <svg class="icon">
                <title>total sum</title>
                <use xlink:href="./icons.svg#value"></use>
              </svg>
              <p class="cart__number">0</p>
            </div>

            <div class="info__cart">
              <svg class="icon">
                <title>number of sku</title>
                <use xlink:href="./icons.svg#Shopping Basket"></use>
              </svg>
              <p class="cart__number">0</p>
            </div>

          </div>

        </header>
    `,
  childComponents: [],
});
