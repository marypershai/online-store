import { Product } from './product';

export const productList: [Product] = JSON.parse(JSON.stringify(require('../service/data/list.json')));

export function getProduct(id: number): Product | undefined {
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].id == id) {
      return productList[i];
    }
    return productList[i];
  }
}


