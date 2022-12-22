import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';

class ProductListComponent extends DMComponent {
  constructor(config: ComponentConfig, productQuantity: number) {
    super(config);
    this.template = this.createListOfProducts(productQuantity);
  }

  private createListOfProducts(number: number): string {
    this.config.template += '<div><ul>';
    for (let i = 0; i < number; i += 1) {
      this.config.template += `<li>${i}<app-product></app-product></li>`;
    }
    this.config.template += '</ul></div>';
    return this.config.template;
  }
}

const productListComponent = new ProductListComponent({
  selector: 'app-product-list',
  template: `
  <img  class="page__container--full image" src="https://res.cloudinary.com/bartoshevich/image/upload/f_auto,q_auto/v1671356920/rs-school/online/oryx/oryxwith3dprinter.png" alt="monitor, linux laptop and 3D printer on desk" width="2500" height="1060">

    <div>List of products</div>
  `,
  childComponents: [],
}, 20);

export { productListComponent, ProductListComponent };
