import { Product } from './product';

export const productList: [Product] = JSON.parse(JSON.stringify(require('../service/data/list.json')));

export const copyProductList: [Product] = productList;

export function getProduct(id: number): Product | undefined {
  return productList.find(product => product.id == id);
}

export function getProductQuantity(id: number): number {
  const currentProduct = getProduct(id) as Product;
  return currentProduct.stock;
}