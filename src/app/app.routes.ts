import { RoutesObj } from '../frame/tools/interfaces';
import { notFound } from './common/not-found.component';
import { cartPageComponent } from './pages/components/cart-page.component';
import { homePageComponent } from './pages/components/home-page.component';

export const appRoutes: RoutesObj[] = [
  { path: '', component: homePageComponent },
  { path: 'cart', component: cartPageComponent },
  { path: '**', component: notFound },
];
