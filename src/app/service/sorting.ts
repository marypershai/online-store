import { SortFunction } from '../../frame/tools/types';
import { Product } from './product';
import { copyProductList } from './product-list';


function byField(field: string): SortFunction {
  return (a: Product, b: Product) => a[field as keyof Product] > b[field as keyof Product] ? 1 : -1;
}

export function sortProduct(sortingType: number) {
  switch (sortingType) {
    case 0:
      copyProductList.sort(byField('id'));
      break;
    case 1:
      copyProductList.sort(byField('price'));
      break;
    case 2:
      copyProductList.sort(byField('price'));
      copyProductList.reverse();
      break;
    case 3:
      copyProductList.sort(byField('title'));
      break;
    case 4:
      copyProductList.sort(byField('title'));
      copyProductList.reverse();
      break;
  }
}