import { SortFunction } from '../../frame/tools/types';
import { Product } from './product';
import { CopyProductList } from './product-list';


function byField(field: string): SortFunction {
  return (a: Product, b: Product) => a[field as keyof Product] > b[field as keyof Product] ? 1 : -1;
}

export function sortProduct(sortingType: number | undefined) {
  switch (sortingType) {
    case 0:
      CopyProductList.sort(byField('id'));
      break;
    case 1:
      CopyProductList.sort(byField('price'));
      break;
    case 2:
      CopyProductList.sort(byField('price'));
      CopyProductList.reverse();
      break;
    case 3:
      CopyProductList.sort(byField('title'));
      break;
    case 4:
      CopyProductList.sort(byField('title'));
      CopyProductList.reverse();
      break;
  }
}