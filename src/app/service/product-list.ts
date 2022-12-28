import { Product } from './product';

export const productList: [Product] = JSON.parse(JSON.stringify(require('../service/data/list.json')));

export const copyProductList: [Product] = productList;

export function getProduct(id: number): Product | undefined {
  return productList.find(product => product.id == id);
}