import { CartData, ComponentConfig, Promocode } from '../../frame/tools/interfaces';
import { DMComponent } from '../../frame/index';
import { cart } from '../../app/service/cart';
import { checkPromoInLocalStorage, deletePromoFromLocalStorage, findPromoCode, getPromoListFromLocalStorage, setPromoToLocalStorage } from '../../app/service/promocode';


class SummaryComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
    this.createSummary();
  }

  public createSummary(): void {
    const currentCart: CartData[] = cart.getCart();
    const crossClass: string = cart.cartSum() === cart.getSumWithDiscount() ? '' : 'cross-text';
    if (currentCart && currentCart.length > 0) {
      this.config.template = `
          <div class="cart-summary">
            <h2>Summary</h2>
            <div class="total">
              <div class="total__product">
                Products: <span class="total-number">${cart.cartQuantitySum()}</span>
              </div>
              <div class="total__price">
                Total sum, $: <span class="total-value ${crossClass}">${cart.cartSum()}</span>
              </div>
              ${this.checkNewSum()}
            </div>
            <div class="applied-codes">
            ${this.checkAvaliblePromo()}
            </div>
            <div class="promo-code">
              <input type="search" class="promo-code-input" placeholder="Enter promotional code" maxlength="9">
              <p class="promo__description">promo for test: 'RS', 'EPM'</p>
              <div class="promotag"></div>
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
      'click .applied-codes': 'deletePromoCode',
    };
  }

  private setPromoCode(event: Event): void {
    const targetEl = event.target as HTMLInputElement;
    const promoCode: string = targetEl.value;
    const promoExist: Promocode | undefined = findPromoCode(promoCode);
    const promoCodeTag = document.querySelector('.promotag') as HTMLElement;
    if (promoExist) {
      promoCodeTag.innerHTML = `
        <span class="purchase__quantity">${promoExist.title} - ${promoExist.discountPercentage} %</span>`;
      if (!checkPromoInLocalStorage(promoExist.id)) {
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
          promoCodeTag.innerHTML = '';
          setPromoToLocalStorage(promoCode);
          if (document.querySelector('.total__sum')) {
            const totalSumBlock = document.querySelector('.total__sum span') as HTMLElement;
            totalSumBlock.innerText = `${cart.getSumWithDiscount()}`;
          } else {
            const totalBlock = document.querySelector('.total') as HTMLElement;
            const totalNewSum: HTMLDivElement = document.createElement('div');
            totalNewSum.classList.add('total__sum');
            totalNewSum.innerHTML = `
              New Sum, $: <span class="total-number">${cart.getSumWithDiscount()}</span>
            `;
            totalBlock.append(totalNewSum);
          }
        });
      }
    }
  }

  private checkAvaliblePromo(): string {
    let resultBlock = '';
    if (getPromoListFromLocalStorage()?.length) {
      getPromoListFromLocalStorage()?.forEach((promo) => {
        resultBlock += `
        <div class="applied-promo">
            <span class="purchase__quantity" data-id="${promo.id}">${promo.title} - ${promo.discountPercentage} %</span>
            <button class="button delete-promocode">
              <svg class="cart__icon">
                <title>minus</title>
                <use xlink:href="./icons.svg#remove"></use>
              </svg>
            </button>
          </div>`;
      });
    }
    return resultBlock;
  }

  private deletePromoCode(event: Event): void {
    const targetEl = event.target as HTMLInputElement;
    const currentPromo = targetEl.closest('.delete-promocode') as HTMLElement;
    if (currentPromo) {
      const promoID = (currentPromo.previousElementSibling as HTMLElement).getAttribute('data-id');
      const currentPromoBlock = targetEl.closest('.applied-promo') as HTMLElement;
      if (promoID) {
        deletePromoFromLocalStorage(promoID);
        currentPromoBlock.remove();
        const totalNewSum = document.querySelector('.total__sum span') as HTMLElement;
        totalNewSum.innerText = `${cart.getSumWithDiscount()}`;
      }
      if (getPromoListFromLocalStorage()?.length == 0) {
        (document.querySelector('.total__sum') as HTMLElement).remove();
        (document.querySelector('.total-value') as HTMLElement).classList.remove('cross-text');
      }
    }
  }

  private checkNewSum(): string {
    let resultBlock = '';
    if (getPromoListFromLocalStorage()?.length) {
      resultBlock = `
        <div class="total__sum">
          New Sum, $: <span class="total-number">${cart.getSumWithDiscount()}</span>
        </div>
      `;
    }
    return resultBlock;
  }
}

const summaryComponent = new SummaryComponent({
  selector: 'app-summary-cart',
  template: '',
  childComponents: [],
});

export { summaryComponent, SummaryComponent };
