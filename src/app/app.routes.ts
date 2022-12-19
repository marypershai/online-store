import { RoutesObj } from "../frame/tools/interfaces";
import { homePageFeatureComponent } from "./pages/feature-components/home-page.fcomponent";
import { cartPageFeatureComponent } from "./pages/feature-components/cart-page.fcomponent";
import { notFoundPageFeatureComponent } from "./pages/feature-components/not-found.fcomponent";

export const appRoutes: RoutesObj[] = [
    { path: '', component: homePageFeatureComponent},
    { path: 'cart', component: cartPageFeatureComponent},
    { path: '**', component: notFoundPageFeatureComponent}
];