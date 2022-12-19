import { DMFeatureComponent } from "../../../frame/index";
import { FeatureComponentConfig} from "../../../frame/tools/interfaces";
import { productListComponent } from "../components/product-list.component";
import { homePageComponent } from "../components/home-page.component";
import { filterComponent } from "../components/filter.component";

export class HomePageFeatureComponent extends DMFeatureComponent{
    constructor(config: FeatureComponentConfig){
        super(config);
    }
}

export const homePageFeatureComponent = new HomePageFeatureComponent({
    components: [
        productListComponent,
        filterComponent
    ],
    bootstrap: homePageComponent
})