import { copyProductList } from '../service/product-list';
import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';

class SearchComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
    this.template = this.createSearchComponent(); 
  }

  private createSearchComponent(): string {
    this.config.template = `
    <img  class="page__container--full image" src="https://res.cloudinary.com/bartoshevich/image/upload/f_auto,q_auto/v1671819843/rs-school/online/Accessories.png" alt="picture with slogan 'say goodbye to gifting guesswork'" width="3000" height="400">
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
      `;
    return this.config.template; 
  }

  public events(): Record<string, string> {
    return {
      'keyup .search__text-input': 'filterBySearch',
    };
  }

  private filterBySearch() {
    const searchInput = document.querySelector('.search__text-input') as HTMLInputElement;
    const word: string | number = searchInput.value;
    const regex = new RegExp(word, 'gi');
    
    const dataList = copyProductList.filter( item => item.brand.toString().match(regex) || item.category.toString().match(regex) || item.title.toString().match(regex) || item.description.toString().match(regex) || item.price.toString().match(regex) || item.stock.toString().match(regex)); 
    
    console.log(dataList);
    
  }
}

export const searchComponent = new SearchComponent({
  selector: 'app-search',
  template: '',
  childComponents: [],
});
