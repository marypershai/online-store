import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';
import { addProductRoute } from '../app.routes';
import { productPageComponent } from '../pages/product-page.component';
import { productList } from '../service/product-list';

class ProductListComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
    this.template = this.createListOfProducts();
  }

  private createListOfProducts(): string {
    this.config.template = '<div class="product-list products">';
    for (let i = 0; i < productList.length; i += 1) {
      this.config.template += `
      <div class="product__item" data-id=${productList[i].id}>
        <div class="item__image">
          <img class=" image" src="${productList[i].thumbnail}" alt="" decoding="async">
        
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
          <h3 class="item__name">${productList[i].title}</h3>
          <div class="info__details">
            <div>
              <p class="item__brand">Brand: ${productList[i].brand}</p>
              <p class="item__category">Category: ${productList[i].category} </p>
            </div>
            <div>
              <p class="item__price">Price, $: ${productList[i].price} </p>
              <p class="item__stock">Stock: ${productList[i].stock} </p>
            </div>
          </div>
        </div>
      </div>
      `;
    }
    this.config.template += '</div>';
    return this.config.template;
  }

  public events(): object {
    return {
      'click .product-list': 'showProduct',
    };
  }

  private showProduct(event: Event): void {
    const targetEl = event.target as HTMLElement;
    const parentEl = targetEl.closest('.product__item') as HTMLElement;
    const productID: string | null = parentEl.getAttribute('data-id');
    if (productID) {
      const productHash = `productID=${productID}`;
      window.location.hash = productHash;
      productPageComponent.createProductItem(+productID);
      addProductRoute(productHash);
    }
  }
}

const productListComponent = new ProductListComponent({
  selector: 'app-product-list',
  template: '',
  childComponents: [],
});

export { productListComponent, ProductListComponent };
