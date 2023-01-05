import { CartData, ComponentConfig, Promocode } from '../../frame/tools/interfaces';
import { DMComponent } from '../../frame/index';
import { cart } from '../../app/service/cart';
import { deleteFromLocalStorage, findPromoCode, isAvaliablePromocode, setToLocalStorage } from '../../app/service/promocode';


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
              <input type="search" class="promo-code-input" placeholder="Enter promotional code" maxlength="9">
              <p class="promo__description">promo for test: 'RS', 'EPM'</p>
            </div>
            <button class="button button--buy">Buy Now</button>
          </div>
        `;
    }
    this.template = this.config.template;
  }

  public events(): Record<string, string> {
    return {
      'keyup .promo-code-input': 'setPromoCode',
    };
  }

  private setPromoCode(event: Event): void {
    const targetEl = event.target as HTMLInputElement;
    const promoCode: string = targetEl.value;
    const promoExist: Promocode | undefined = findPromoCode(promoCode);
    if (promoExist) {
      const promoBlock: HTMLDivElement = document.createElement('div');
      (document.querySelector('.promo__description') as HTMLElement).append(promoBlock);
      promoBlock.classList.add('promoblock');
      const promoCodeTag: HTMLDivElement = document.createElement('div');
      promoBlock.append(promoCodeTag);
      promoCodeTag.classList.add('promotag');
      promoCodeTag.innerHTML = `
        <span class="purchase__quantity">${promoExist.title} - ${promoExist.discountPercentage} %</span>`;
      if (isAvaliablePromocode(promoCode)) {
        promoCodeTag.innerHTML += `
        <button class="button add-promocode" type="button" aria-label="plus">
          <svg class="cart__icon">
            <title>plus</title>
            <use xlink:href="./icons.svg#add"></use>
          </svg>
        </button>
      `;
        const addPromoButton = promoCodeTag.querySelector('.add-promocode') as HTMLElement;
        addPromoButton.addEventListener('click', function () {
          const appliedCodesBlock = document.querySelector('.applied-codes') as HTMLElement;
          const appliedPromoCodeTag: HTMLDivElement = document.createElement('div');
          appliedPromoCodeTag.classList.add('applied-promo');
          appliedCodesBlock.append(appliedPromoCodeTag);
          appliedPromoCodeTag.innerHTML = `
          <span class="purchase__quantity"  data-id="${promoExist.id}">${promoExist.title} - ${promoExist.discountPercentage} %</span>
          <button class="button delete-promocode">
            <svg class="cart__icon">
              <title>minus</title>
              <use xlink:href="./icons.svg#remove"></use>
            </svg>
          </button>
        `;
          promoExist.avaliable = false;
          promoCodeTag.remove();
          setToLocalStorage(promoCode);
          const newSum = cart.getSumWithDiscount();
          const totalBlock = document.querySelector('.total') as HTMLElement;
          const totalNewSum: HTMLDivElement = document.createElement('div');
          totalNewSum.classList.add('total__sum');
          totalNewSum.innerHTML = `
                New Sum, $: <span class="total-number">${newSum}</span>
            `;
          totalBlock.append(totalNewSum);

          appliedCodesBlock.addEventListener('click', function (ev: Event): void {
            const targEl = ev.target as HTMLElement;
            const parentEl = targEl.closest('.delete-promocode') as HTMLElement;
            if (parentEl) {
              const promoID = (parentEl.previousElementSibling as HTMLHtmlElement).getAttribute('data-id') as string;
              deleteFromLocalStorage(promoID);
              const parentBlock = targEl.closest('.applied-promo') as HTMLElement;
              parentBlock.remove();
              promoExist.avaliable = true;
            }
          });
        });
      }
    }
    console.log(promoCode);
  }
}

const summaryComponent = new SummaryComponent({
  selector: 'app-summary-cart',
  template: '',
  childComponents: [],
});

export { summaryComponent, SummaryComponent };
