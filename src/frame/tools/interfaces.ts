import { AppComponent } from '../../app/app.component';
import { AppHeader } from '../../app/common/app.header';
import { NotFound } from '../../app/common/not-found.component';
import { ProductListComponent } from '../../app/components/product-list.component';

export type Components = AppComponent | AppHeader | NotFound | ProductListComponent;

export interface ComponentConfig {
  template: string;
  selector: string;
  childComponents: Components[];
}

export interface RoutesObj {
  path: string;
  component: Components;
}

export interface ModuleConfig {
  components: Components[];
  bootstrap: AppComponent;
  routes: RoutesObj[];
  dynamicRoutes: (id: string) => void;
}

export interface FeatureComponentConfig {
  components: Components[];
  bootstrap: Components;
}

export interface ProductData {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  stock: number;
  rating: number;
  brand: string;
  category: string;
  description: string;
  thumbnail: string;
  images: string[];
}

export interface CartData {
  productID: number;
  quantity: number;
}

export interface Promocode {
  id: string;
  title: string;
  discountPercentage: number;
  avaliable?: boolean;
}
