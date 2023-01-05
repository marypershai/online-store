import { Product } from './product';
import { searchService } from './search';

export const productList: [Product] = JSON.parse(JSON.stringify(require('../service/data/list.json')));

export function getProduct(id: number): Product | undefined {
  return productList.find(product => product.id == id);
}


export const getFilterProducts = (): Product[]  => searchService.filterBySearchValue([...productList]);

export const copyProductList: Product[] = [...productList];