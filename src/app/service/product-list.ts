import { Product } from './product';

export const productListStart: [Product] = JSON.parse(JSON.stringify(require('../service/data/list.json')));

export const productListCurrent: [Product] = productListStart;

function byField(field: string) {
  return (a: Product, b: Product) => a[field as keyof Product] > b[field as keyof Product] ? 1 : -1;
}

export function getProduct(id: number): Product | undefined {
  return productListStart.find(product => product.id == id);
}

export function sortProduct(sortingType: number | undefined) {
  switch (sortingType) {
    case 0:
      productListCurrent.sort(byField('id'));
      break;
    case 1:
      productListCurrent.sort(byField('price'));
      break;
    case 2:
      productListCurrent.sort(byField('price'));
      productListCurrent.reverse();
      break;
    case 3:
      productListCurrent.sort(byField('title'));
      break;
    case 4:
      productListCurrent.sort(byField('title'));
      productListCurrent.reverse();
      break;
  }
}