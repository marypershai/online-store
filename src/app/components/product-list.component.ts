import { Product } from '../service/product';
import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';

class ProductListComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
    this.template = this.createListOfProducts();
  }

  private createListOfProducts(number: number): string {
    this.config.template += '<div><ul class="products">';
    for (let i = 0; i < number; i += 1) {
      this.config.template += `     
      
      <li class="product__item">
        <div class="item__image">
          <img class=" image" src="https://res.cloudinary.com/bartoshevich/image/upload/v1671355831/rs-school/online/aeron/aeron_chair.jpg" alt="" decoding="async">
        
          <div class="item__links">
            <button class="button button--card">Add to cart</button>
            <button class="button button--info">
              <svg class="icon">
                <title>Click to receive information</title>
                <use xlink:href="./icons.svg#info"></use>
              </svg>
            </button>
          </div>    
        
        </div>
  
        <div class="item__info">
          <h3 class="item__name">Aeron Chair</h3>
          <div class="info__details">
            <div>
              <p class="item__brand">Brand: HermanMiller</p>
              <p class="item__category">Category: chair </p>
            </div>
            <div>
              <p class="item__price">Price, $: 1560 </p>
              <p class="item__stock">Stock: 35 </p>
            </div>
          </div>
        </div

      
      <app-product></app-product></li>
      
      `;
    }
    this.config.template += '</div>';
    return this.config.template;
  }

  public events(): unknown {
    return {
      'click .product-list': 'showProduct',
    };
  }

  private showProduct(event: unknown) {
    console.log(event);
  }
}

const productListComponent = new ProductListComponent({
  selector: 'app-product-list',
  template: `

    <h2 class="visibility-hidden">List of products</h2>
  `,
  childComponents: [],
});

export { productListComponent, ProductListComponent };
