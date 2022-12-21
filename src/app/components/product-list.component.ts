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
    <div>List of products</div>
  `,
  childComponents: [],
}, 20);

export { productListComponent, ProductListComponent };
