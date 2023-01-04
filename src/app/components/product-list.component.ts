import { cart } from '../service/cart';
import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';
import { addProductRoute } from '../app.routes';
import { productPageComponent } from '../pages/product-page.component';
import { defineProductList } from '../service/product-list';
import { Product } from '../service/product';
import { search } from '../service/search';
import { filter } from '../service/filter';
// import { Product } from '../service/product';
// import { searchComponent } from './search.component';


class ProductListComponent extends DMComponent {
    
  constructor(config: ComponentConfig) {
    super(config);
    this.template = this.createListOfProducts();
  }


  public createListOfProducts(): string {

    const copyProductList: Product[] = defineProductList();
    filter.productList(copyProductList);
    const view: string | null = localStorage.getItem('view'); 

    let title: string;
    let brand: string;
    let category: string;
    let price: number | string;
    let stock: number | string;

      
    if (view === 'view-card' || view === null) {      

      this.config.template = '<div class="product-list products sku-list skus">';  

    } else {
      
      this.config.template  = `
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
    }
     
          
    for (let i = 0; i < copyProductList.length; i++) {

      if (search.isSearchOn) {
        const regex = search.searchWord();          
        title = copyProductList[i].title.replace(regex, match => `<span class="search__highlight">${match}</span>`);
        brand = copyProductList[i].brand.replace(regex, match => `<span class="search__highlight">${match}</span>`);
        category = copyProductList[i].category.replace(regex, match => `<span class="search__highlight">${match}</span>`);
        price = copyProductList[i].price.toString().replace(regex, match => `<span class="search__highlight">${match}</span>`);
        stock = copyProductList[i].stock.toString().replace(regex, match => `<span class="search__highlight">${match}</span>`);
            
      } else {
        title = copyProductList[i].title;
        brand = copyProductList[i].brand;
        category = copyProductList[i].category;
        price = copyProductList[i].price;
        stock = copyProductList[i].stock;
      } 

      if (view === 'view-card' || view === null) {      

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
              <h3 class="item__name">${title}</h3>
              <div class="info__details">
                <div>
                  <p class="item__brand">Brand: ${brand}</p>
                  <p class="item__category">Category: ${category} </p>
                </div>
                <div>
                  <p class="item__price">Price, $: ${price} </p>
                  <p class="item__stock">Stock: ${stock} </p>
                </div>
              </div>
            </div>
          </div>
         
          `;
    
      } else {
        this.config.template += `
          <tr class="sku" data-id=${copyProductList[i].id}>
            <td>  <img class="image--thumbnail" src="${copyProductList[i].thumbnail}" alt="" decoding="async"> </td>   
            <td> <h3 class="item__name">${title}</h3></td>   
            <td class="item__category">${category}</td>
            <td class="item__brand">${brand} </td>
            <td class="text-right item__price">${price}</td>
            <td class="text-right item__stock">${stock}</td>
            <td>
              <button class="button button--info">
                <svg class="icon">
                  <title>Click to receive information</title>
                  <use xlink:href="./icons.svg#info"></use>
                </svg>
              </button>
            </td>
            <td class="width180">
              <button class="button button--card">Add to cart</button>
            </td>
          </tr>  
           `;
      }       
    }
        
    if (view === 'view-card' || view === null) {      

      this.config.template += `
          </div>
          `; 
  
    } else {
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

  private addProductToCart(event: Event): void {
    const targetEl = event.target as HTMLElement;
    const parentEl = targetEl.closest('.sku') as HTMLElement;
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



