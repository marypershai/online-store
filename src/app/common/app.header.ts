import { DMComponent } from "../../frame/index";
import { ComponentConfig } from "../../frame/tools/interfaces";

export class AppHeader extends DMComponent{
    constructor(config: ComponentConfig){
        super(config)
    }
}

export const appHeader = new AppHeader({
    selector: 'app-header',
    template: `
        <header>
            <div class="header__logo"><a href="#">Logo here</a></div>
            <nav><a href="#cart">Cart</a></nav>
        </header>
    `
})