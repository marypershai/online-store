import { filter } from './filter-service';
import { Product } from './product';
import { searchService } from './search';

export const productList: [Product] = JSON.parse(JSON.stringify(require('../service/data/list.json')));

export const copyProductList: [Product] = [...productList];

export function getProduct(id: number): Product | undefined {
  return productList.find(product => product.id == id);
}

export function getProductQuantity(id: number): number {
  const currentProduct = getProduct(id) as Product;
  return currentProduct.stock;
}


const searchProducts = (): Product[]  => searchService.filterBySearchValue([...productList]);
const filteredProducts = (): Product[] => filter.getFilteredProducts([...productList]);

export const getSearchProducts = (): Product[]  => filteredProducts() ? searchService.filterBySearchValue(filteredProducts()) : searchService.filterBySearchValue([...productList]);

export const getFilteredProducts = (): Product[] => searchProducts() ? filter.getFilteredProducts(searchProducts()) : filter.getFilteredProducts([...productList]);