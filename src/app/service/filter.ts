import { productListComponent } from '../components/product-list.component';



class FilterService {
  public filterCategoryArr: string[] = [];

  public filterBrandArr: string[] = [];
}

export const filterService = new FilterService;



export function filterByElement(event: Event, arr: string[]): void {
  const generalEl = event.target as HTMLElement;
  const targetEl = generalEl.closest('li') as HTMLElement; 
  const input = targetEl.querySelector('input') as HTMLInputElement;
  const name = targetEl.querySelector('.item__name') as HTMLElement;

  if (input.checked && name.textContent) {
    arr.push(name.textContent);
    productListComponent.template = productListComponent.createListOfProducts();
    productListComponent.render();
  } else if (name.textContent) {
    arr.splice(arr.indexOf(name.textContent), 1);
    productListComponent.template = productListComponent.createListOfProducts();
    productListComponent.render();
  }       
}

