import { DMFeatureComponent } from "../../../frame/index";
import { FeatureComponentConfig} from "../../../frame/tools/interfaces";
import { productListComponent } from "../components/product-list.component";
import { cartPageComponent } from "../components/cart-page.component";

export class CartPageFeatureComponent extends DMFeatureComponent{
    constructor(config: FeatureComponentConfig){
        super(config);
    }
}

export const cartPageFeatureComponent = new CartPageFeatureComponent({
    components: [
        productListComponent
    ],
    bootstrap: cartPageComponent
})