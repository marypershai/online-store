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
        
          <app-search></app-search>
          <app-controlpanel></app-controlpanel>
          <section class="page__container workspace">
          <section class=filter>
          <app-filter></app-filter>
          </section>
          <section class="product-list">
          <app-product-list></app-product-list> 
          </section>
             
          </section> 
             
    `,
  childComponents: [searchComponent, controlComponent, filterComponent, productListComponent],
});
