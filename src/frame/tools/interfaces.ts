import { AppComponent } from '../../app/app.component';
import { AppHeader } from '../../app/common/app.header';
import { NotFound } from '../../app/common/not-found.component';
import { ProductListComponent } from '../../app/pages/components/product-list.component';

export type Components = AppComponent | AppHeader | NotFound | ProductListComponent;

export interface ComponentConfig{
    template: string;
    selector: string;
    childComponents: Components[];
}

export interface RoutesObj{
    path: string;
    component: Components;
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
