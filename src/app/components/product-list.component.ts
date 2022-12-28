import { cart } from '../service/cart';
import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';
import { addProductRoute } from '../app.routes';
import { productPageComponent } from '../pages/product-page.component';
import { copyProductList } from '../service/product-list';

class ProductListComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
    this.template = this.createListOfProducts();
  }

  public createListOfProducts(): string {
    const view: string | null = localStorage.getItem('view');
    this.config.template = '<div class="product-list products">';
    if (view == 'view-card' || view == undefined) {
      for (let i = 0; i < copyProductList.length; i += 1) {
        this.config.template += `
          <div class="product__item" data-id=${copyProductList[i].id}>
            <div class="item__image">
              <img class=" image" src="${copyProductList[i].thumbnail}" alt="" decoding="async">
            
              <div class="item__links">
                <button class="button button--card">${cart.checkButtonState(copyProductList[i].id)}</button>
                <button class="button button--info">
                  <svg class="icon">
                    <title>Click to receive information</title>
                    <use xlink:href="./icons.svg#info"></use>
                  </svg>
                </button>
              </div>    
            </div>
    
            <div class="item__info">
              <h3 class="item__name">${copyProductList[i].title}</h3>
              <div class="info__details">
                <div>
                  <p class="item__brand">Brand: ${copyProductList[i].brand}</p>
                  <p class="item__category">Category: ${copyProductList[i].category} </p>
                </div>
                <div>
                  <p class="item__price">Price, $: ${copyProductList[i].price} </p>
                  <p class="item__stock">Stock: ${copyProductList[i].stock} </p>
                </div>
              </div>
            </div>
          </div>
          `;
      }
    } else {
      this.config.template += 'new view';
    }

    this.config.template += '</div>';
    return this.config.template;
  }

  public events(): Record<string, string> {
    return {
      'click .product-list': 'showProduct',
      'click .products': 'addProductToCart',
    };
  }

  private showProduct(event: Event): void {
    const targetEl = event.target as HTMLElement;
    if (targetEl.classList.contains('icon')) {
      const parentEl = targetEl.closest('.product__item') as HTMLElement;
      const productID: string | null = parentEl.getAttribute('data-id');
      if (productID) {
        const productHash = `productID=${productID}`;
        window.location.hash = productHash;
        productPageComponent.createProductItem();
        addProductRoute(productHash);
      }
    }
  }

  private addProductToCart(event: Event): void {
    const targetEl = event.target as HTMLElement;
    const parentEl = targetEl.closest('.product__item') as HTMLElement;
    const productID: string | null = parentEl.getAttribute('data-id');
    const cartButton = targetEl.closest('.button--card') as HTMLElement;
    if (productID && cartButton.innerHTML == 'Add to cart') {
      cart.addToCart(+productID, 1);
      cartButton.innerText = 'Delete from cart';
    } else if (productID) {
      cart.delete(+productID);
      cartButton.innerText = 'Add to cart';
    }
  }

}

const productListComponent = new ProductListComponent({
  selector: 'app-product-list',
  template: '',
  childComponents: [],
});

export { productListComponent, ProductListComponent };
