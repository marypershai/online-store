// import { searchComponent } from '../components/search.component';
import { Product } from './product';
import { search } from './search';
// import { filter } from './filter';


export const productList: [Product] = JSON.parse(JSON.stringify(require('../service/data/list.json')));

export function getProduct(id: number): Product | undefined {
  return productList.find(product => product.id == id);
}


export function defineProductList(): Product[] {
  let source: Product[] = productList;
  
  if (search.isSearchOn) {
    source = search.filter(productList);    
  }
  
  // filter.productList(source);

  return source;

}

export const copyProductList: Product[] = defineProductList();