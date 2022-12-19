import { DMComponent } from "../../../frame/index";
import { ComponentConfig } from "../../../frame/tools/interfaces";

class ProductListComponent extends DMComponent{
    constructor(config: ComponentConfig){
        super(config)
    }

    public createListOfProducts(number: number): string{
        this.config.template += '<div><ul>';
        for( let i = 0; i < number; i++){
            this.config.template += `<li>${i}<app-product></app-product></li>`
        }
        this.config.template += '</ul></div>';
        return this.config.template;
    }
}

const productListComponent = new ProductListComponent({
    selector: 'app-product-list',
    template: `<div>List of products</div>`,
});

productListComponent.template = productListComponent.createListOfProducts(20);

export {productListComponent, ProductListComponent};