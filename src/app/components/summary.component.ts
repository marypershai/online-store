import { ComponentConfig } from '../../frame/tools/interfaces';
import { DMComponent } from '../../frame/index';
// import { Product } from '../service/product';
// import { getProduct } from '../service/product-list';


class SummaryComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
    this.template = this.createSummary();
  }


  private createSummary(): string {
    const currenCart: string | null = localStorage.getItem('cart');
    if (currenCart) {
           
     
      this.config.template += `
<div class="cart-summary">
  <h2>Summary</h2>
  <div class="total">
    <div class="total__product">
      Products: <span class="total-number">3</span>
    </div>
    <div class="total__price">
      Total sum, $: <span class="total-value">5000</span>
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
    return this.config.template;
  }
}

const summaryComponent = new SummaryComponent({
  selector: 'app-summary-cart',
  template: '',
  childComponents: [],
});

export { summaryComponent, SummaryComponent };
