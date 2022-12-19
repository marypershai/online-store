import { DMFeatureComponent } from "../../../frame/index";
import { FeatureComponentConfig} from "../../../frame/tools/interfaces";
import { productListComponent } from "../components/product-list.component";
import { notFound } from "../../common/not-found.component";

export class NotFoundPageFeatureComponent extends DMFeatureComponent{
    constructor(config: FeatureComponentConfig){
        super(config);
    }
}

export const notFoundPageFeatureComponent = new NotFoundPageFeatureComponent({
    components: [
        productListComponent
    ],
    bootstrap: notFound
})