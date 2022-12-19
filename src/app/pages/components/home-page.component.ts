import { DMComponent } from "../../../frame/index";
import { ComponentConfig } from "../../../frame/tools/interfaces";

class HomePageComponent extends DMComponent{
    constructor(config: ComponentConfig){
        super(config)
    }
}

export const homePageComponent = new HomePageComponent({
    selector: 'app-home-page',
    template: `
        <app-product-list></app-product-list>
        <app-filter></app-filter>
        <div><h4>Here page with products</h4></div>
    `
})