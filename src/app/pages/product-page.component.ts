import { Product } from '../service/product';
import { getProduct } from '../service/product-list';
import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';

class ProductPageComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
  }

  createProductItem(id: number) {
    const product: Product | undefined = getProduct(id);
    if (product) {
      this.template += `
        <div>
          <div>Title ${product.title}</div>
          <div>Price ${product.price}$</div>
          <div>Discount ${product.discountPercentage}%</div>
          <div>Rating ${product.rating}</div>
          <div>In stock ${product.stock}</div>
          <div>Description ${product.description}</div>
          <div>      
        `;

      product.images.forEach((link) => { this.template += `<img src=${link} width="100px" height="100px">`; });
      this.template += '</div></div>';
    }
  }

}

export const productPageComponent = new ProductPageComponent({
  selector: 'app-product-page',
  template: `
        <div><h4>Here page with this product</h4></div>
    `,
  childComponents: [],
});
