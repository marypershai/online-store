import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';

class SearchComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
  }
}

export const searchComponent = new SearchComponent({
  selector: 'app-search',
  template: `
  <img  class="page__container--full image" src="https://res.cloudinary.com/bartoshevich/image/upload/f_auto,q_auto/v1671356920/rs-school/online/oryx/oryxwith3dprinter.png" alt="monitor, linux laptop and 3D printer on desk" width="2500" height="1060">
  <section>
    <h2 class="visibility-hidden">Search Gift</h2>
    <div class="page__container search">
      <svg class="icon">
        <title>Search</title>
        <use xlink:href="./icons.svg#search"></use>
      </svg>
      <input type="search" class="search__text-input" placeholder="click and start typing to search" name="q"> 
    </div>
  </section>        
    `,
  childComponents: [],
});
