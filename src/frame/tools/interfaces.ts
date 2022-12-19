import { AppComponent } from "../../app/app.component";
import { AppHeader } from "../../app/common/app.header";
import { NotFound } from "../../app/common/not-found.component";
import { ProductListComponent } from "../../app/pages/components/product-list.component";
import { HomePageFeatureComponent } from "../../app/pages/feature-components/home-page.fcomponent";
import { DMModule } from "../index";

export type Components = AppComponent | AppHeader | NotFound | ProductListComponent;
export type FeatureComponents = HomePageFeatureComponent;

export interface ComponentConfig{
    template: string;
    selector: string;
}

export interface ModuleConfig{
    components: Components[];
    bootstrap: AppComponent;
    routes: RoutesObj[];
}

export interface FeatureComponentConfig{
    components: Components[];
    bootstrap: Components;
}

export interface RoutesObj{
    path: string;
    component: FeatureComponents;
}