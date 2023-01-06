// import { productListComponent } from '../components/product-list.component';

import { Product } from './product';
import { searchService } from './search';


class FilterService {

  public categoryArr: string[] = [];

  public brandArr: string[] = [];


  public getFilterCriteria(event: Event, arr: string[]): void  {
    const generalEl = event.target as HTMLElement;
    const targetEl = generalEl.closest('li') as HTMLElement; 
    const input = targetEl.querySelector('input') as HTMLInputElement;
    const name = targetEl.querySelector('.item__name') as HTMLElement;

    if (input.checked && name.textContent) {
      arr.push(name.textContent);
    
    } else if (name.textContent) {
      arr.splice(arr.indexOf(name.textContent), 1);

    }  
  }

  public getFilteredProducts(arr: Product[]): Product[] {
    let newArr;
    const minPrice = document.querySelector('.min-price__number') as HTMLElement; 
    const maxPrice = document.querySelector('.max-price__number') as HTMLElement; 
    const minStock = document.querySelector('.min-stock__number') as HTMLElement; 
    const maxStock = document.querySelector('.max-stock__number') as HTMLElement; 

    if (this.categoryArr.length > 0 && this.brandArr.length === 0) {
      newArr = arr.filter( item => this.categoryArr.includes(item.category));
    } else if (this.categoryArr.length === 0 && this.brandArr.length > 0) {
      newArr = arr.filter( item => this.brandArr.includes(item.brand));
    } else if (this.categoryArr.length > 0 && this.brandArr.length > 0) {
      newArr = arr.filter( item => this.brandArr.includes(item.brand) && this.categoryArr.includes(item.category)); 
    } else {
      newArr = arr;
    }

    const finalArr = newArr.filter( item => Number(item.price) <= Number(maxPrice.textContent) && Number(item.price) >= Number(minPrice.textContent) && Number(item.stock) <= Number(maxStock.textContent) && Number(item.stock) >= Number(minStock.textContent));
    searchService.showItemsQuantity(finalArr);
    return finalArr;
  }

  public clearFilter() {
    this.brandArr = [];
    this.categoryArr = [];    
  }


}

export const filter = new FilterService;


