import { searchService } from '../service/search';
import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';
import { getSearchProducts } from '../service/product-list';
import { productListComponent } from './product-list.component';
import { filterConstructor } from '../service/filter-constructor';
import { rangeSlider } from '../service/filter-range-slider';

class SearchComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
  }

  public events(): Record<string, string> {
    return {
      'keyup .search__text-input': 'filterBySearch',
    };
  }

  public filterBySearch() {
    const searchedProducts = getSearchProducts();
    productListComponent.template = productListComponent.createListOfProducts(searchedProducts);
    productListComponent.render();
    filterConstructor.brandAmountUpdate();
    filterConstructor.categoriesAmountUpdate();
    rangeSlider.priceRangeUpdate();
    rangeSlider.stockRangeUpdate();
    searchService.highlightFoundText();
  }
}

export const searchComponent = new SearchComponent({
  selector: 'app-search',
  template: `
  <img  class="page__container--full image" src="https://res.cloudinary.com/bartoshevich/image/upload/f_auto,q_auto/v1671819843/rs-school/online/Accessories.png" alt="picture with slogan 'say goodbye to gifting guesswork'" width="3000" height="400">
  <section>
    <h2 class="visibility-hidden">Search Gift</h2>
    <div class="page__container search">
      <svg class="icon">
        <title>Search</title>
        <use xlink:href="./icons.svg#search"></use>
      </svg>
      <input type="search" class="search__text-input" placeholder="click and start typing to search" title="start typing" name="q"> 
    </div>
  </section>        
    `,
  childComponents: [],
});