import { controlComponent } from '../components/controlpanel.component';
import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';
import { filterComponent } from '../components/filter.component';
import { productListComponent } from '../components/product-list.component';
import { searchComponent } from '../components/search.component';

class HomePageComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
  }
}

export const homePageComponent = new HomePageComponent({
  selector: 'app-home-page',
  template: `
        <main>
          <app-search></app-search>
          <app-controlpanel></app-controlpanel>
          <app-product-list></app-product-list>
          <app-filter></app-filter>
          <div><h4>Here page with products</h4></div>
        </main>        
    `,
  childComponents: [searchComponent, controlComponent, filterComponent, productListComponent],
});
