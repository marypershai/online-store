import { cart } from '../service/cart';
import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';
import { addProductRoute } from '../app.routes';
import { productPageComponent } from '../pages/product-page.component';
import { cartInfoSumComponent } from './cart-info-sum';
import { cartInfoQuantityComponent } from './cart-info-quantity';
import { appHeader } from '../../app/common/app.header';
import { cartProductListComponent } from './cart-product-list';

import { productList } from '../service/product-list';
import { Product } from '../service/product';


class ProductListComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
    this.template = this.createListOfProducts();
  }

  public createListOfProducts(sortedProductList?: Product[]): string {

    const copyProductList: Product[] = sortedProductList ?? [...productList];
    const view: string | null = localStorage.getItem('view');


    if (view == 'view-card' || view == null) {

      this.config.template = '<div class="product-list products sku-list skus">';
      for (let i = 0; i < copyProductList.length; i += 1) {
        this.config.template += `
          <div class="product__item sku" data-id=${copyProductList[i].id}>
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

      this.config.template += '</div>';

    } else {

      this.config.template = `
      <div class="products__table sku-list skus">
        <table>
         <caption class="visibility-hidden">Selected products in tabular form  </caption>
         <thead class="sticky"> 
           <th></th>
           <th>Title</th>
           <th>Category</th>
           <th>Brand</th>
           <th class="text-right">Price</th> 
           <th class="text-right">Stock</th>
           <th></th>
           <th></th>
         </thead>
         <tbody>
         `;


      for (let i = 0; i < copyProductList.length; i += 1) {
        this.config.template += `
        <tr class="sku" data-id=${copyProductList[i].id}>
          <td>  <img class="image--thumbnail" src="${copyProductList[i].thumbnail}" alt="" decoding="async"> </td>   
          <td> <h3 class="item__name">${copyProductList[i].title}</h3></td>   
          <td class="item__category">${copyProductList[i].category}</td>
          <td class="item__brand">${copyProductList[i].brand} </td>
          <td class="text-right item__price">${copyProductList[i].price}</td>
          <td class="text-right item__stock">${copyProductList[i].stock}</td>
          <td>
            <button class="button button--info">
              <svg class="icon">
                <title>Click to receive information</title>
                <use xlink:href="./icons.svg#info"></use>
              </svg>
            </button>
          </td>
          <td class="width180">
            <button class="button button--card">${cart.checkButtonState(copyProductList[i].id)}</button>
          </td>
        </tr>  
         `;
      }
      this.config.template += `
          </tbody>
        </table> 
        </div>
         `;

    }
    
    return this.config.template;
  }

  public events(): Record<string, string> {
    return {

      'click .sku-list': 'showProduct',
      'click .skus': 'addProductToCart',

    };
  }

  protected showProduct(event: Event): void {
    const targetEl = event.target as HTMLElement;
    if (targetEl.closest('.button--info')) {
      const parentEl = targetEl.closest('.sku') as HTMLElement;
      const productID: string | null = parentEl.getAttribute('data-id');
      if (productID) {
        const productHash = `productID=${productID}`;
        window.location.hash = productHash;
        productPageComponent.createProductItem();
        addProductRoute(productHash);
      }
    }
  }

  protected addProductToCart(event: Event): void {
    const targetEl = event.target as HTMLElement;
    if (targetEl.classList.contains('button--card')) {
      const parentEl = targetEl.closest('.sku') as HTMLElement;
      const productID: string | null = parentEl.getAttribute('data-id');
      const cartButton = targetEl.closest('.button--card') as HTMLElement;
      if (productID && cartButton.innerText == 'Add to cart') {
        cart.addToCart(+productID, 1);
        cartButton.innerText = 'Drop from cart';
      } else if (productID) {
        cart.dropFromCart(+productID);
        cartButton.innerText = 'Add to cart';
      }
      cartInfoSumComponent.createInfoSum();
      cartInfoQuantityComponent.createInfoQuantitySum();
      cartProductListComponent.createProductList();
      appHeader.render();
    }
  }

}

const productListComponent = new ProductListComponent({
  selector: 'app-product-list',
  template: '',
  childComponents: [],
});

export { productListComponent, ProductListComponent };
