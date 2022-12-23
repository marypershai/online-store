import { RoutesObj } from '../frame/tools/interfaces';
import { notFound } from './common/not-found.component';
import { cartPageComponent } from './pages/cart-page.component';
import { homePageComponent } from './pages/home-page.component';
import { productPageComponent } from './pages/product-page.component';

export const appRoutes: RoutesObj[] = [
  { path: '', component: homePageComponent },
  { path: 'cart', component: cartPageComponent },
  { path: '**', component: notFound },
];

export function addRoute(id: string) {
  appRoutes.push({
    path: id, component: productPageComponent,
  });
}
