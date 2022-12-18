import { AppComponent } from "../../app/app.component";
import { AppHeader } from "../../app/common/app.header";
import { NotFound } from "../../app/common/not-found.component";

export type Components = AppComponent | AppHeader | NotFound;

export interface ComponentConfig{
    template: string;
    selector: string;
}

export interface ModuleConfig{
    components: Components[];
    bootstrap: AppComponent;
    routes: RoutesObj[];
}

export interface RoutesObj{
    path: string;
    component: Components;
}