import { Product } from '../../app/service/product';

export type SortFunction = (a: Product, b: Product) => number;