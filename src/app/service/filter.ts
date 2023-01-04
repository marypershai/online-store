import { productListComponent } from '../components/product-list.component';
import { Product } from './product';


class FilterService {

  public categoryArr: string[] = [];

  public brandArr: string[] = [];

  private showItemsQuantity(data: Product[]):void {
    const searchResults = document.querySelector('.search-results') as HTMLElement;
    searchResults.textContent = `Results: ${data.length}`;
  }

  public productList(arr: Product[]) {

    let newArr;

    if (this.categoryArr.length > 0 && this.brandArr.length === 0) {
      newArr = arr.filter( item => this.categoryArr.includes(item.category));
    } else if (this.categoryArr.length === 0 && this.brandArr.length > 0) {
      newArr = arr.filter( item => this.brandArr.includes(item.brand));
    } else if (this.categoryArr.length > 0 && this.brandArr.length > 0) {
      newArr = arr.filter( item => this.brandArr.includes(item.brand) && this.categoryArr.includes(item.category)); 
    } else {
      newArr = arr;
    }
    // this.showItemsQuantity(newArr);
    return newArr;
  }
}

export const filter = new FilterService;


export function filterByElement(event: Event, arr: string[]): void {
  const generalEl = event.target as HTMLElement;
  const targetEl = generalEl.closest('li') as HTMLElement; 
  const input = targetEl.querySelector('input') as HTMLInputElement;
  const name = targetEl.querySelector('.item__name') as HTMLElement;

  if (input.checked && name.textContent) {
    arr.push(name.textContent);
    
  } else if (name.textContent) {
    arr.splice(arr.indexOf(name.textContent), 1);

  }  
  
  productListComponent.template = productListComponent.createListOfProducts();
  productListComponent.render();
}

