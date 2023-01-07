import { SortFunction } from '../../frame/tools/types';
import { Product } from './product';
import { getFilteredProducts } from './product-list';


function byField(field: string): SortFunction {
  return (a: Product, b: Product) => a[field as keyof Product] > b[field as keyof Product] ? 1 : -1;
}

export function sortProduct(sortingType: number): Product[] {
  const data: Product[] = getFilteredProducts();
  switch (sortingType) {
    case 0:
      data.sort(byField('id'));
      break;
    case 1:
      data.sort(byField('price'));
      break;
    case 2:
      data.sort(byField('price'));
      data.reverse();
      break;
    case 3:
      data.sort(byField('title'));
      break;
    case 4:
      data.sort(byField('title'));
      data.reverse();
      break;
  }
  return data;
}