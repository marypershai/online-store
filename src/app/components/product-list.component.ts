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

  public createListOfProducts(): string {
    const view: string | null = localStorage.getItem('view');    
    if (view == 'view-card' || view == undefined) {
      this.config.template = '<div class="product-list products sku-list">';
      for (let i = 0; i < productList.length; i += 1) {
        this.config.template += `
          <div class="product__item sku" data-id=${productList[i].id}>
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
    } else {

      this.config.template += `
      <div class="products__table sku-list">
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


      for (let i = 0; i < productList.length; i += 1) {
        this.config.template += `
        <tr class="sku" data-id=${productList[i].id}>
          <td>  <img class="image--thumbnail" src="${productList[i].thumbnail}" alt="" decoding="async"> </td>   
          <td> <h3 class="item__name">${productList[i].title}</h3></td>   
          <td class="item__category">${productList[i].category}</td>
          <td class="item__brand">${productList[i].brand} </td>
          <td class="text-right item__price">${productList[i].price}</td>
          <td class="text-right item__stock">${productList[i].stock}</td>
          <td>
            <button class="button button--info">
              <svg class="icon">
                <title>Click to receive information</title>
                <use xlink:href="./icons.svg#info"></use>
              </svg>
            </button>
          </td>
          <td>
            <button class="button button--card">Add to cart</button>
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

    this.config.template += '</div>';
    return this.config.template;
  }

  public events(): Record<string, string> {
    return {
      'click .sku-list': 'showProduct',
    };
  }

  private showProduct(event: Event): void {
    const targetEl = event.target as HTMLElement;
    console.log(targetEl);
    if (targetEl.classList.contains('icon')) {
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

}

const productListComponent = new ProductListComponent({
  selector: 'app-product-list',
  template: '',
  childComponents: [],
});

export { productListComponent, ProductListComponent };
