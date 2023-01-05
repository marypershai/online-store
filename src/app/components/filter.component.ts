import { filterConstructor } from '../service/filter-constructor';
import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';
import { filter } from '../service/filter-service';
import { getFilteredProducts } from '../service/product-list';
import { productListComponent } from './product-list.component';
import { searchService } from '../service/search';

class FilterComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
    this.template = this.createFilterComponent();
  }

  public events(): Record<string, string> {
    return {
      'input .categories-list': 'filterByCategories',
      'input .brand-list': 'filterByBrand',
    };
  }


  private filterByCategories(event: Event): void {
    filter.getFilterCriteria(event, filter.categoryArr);
    const filteredProducts = getFilteredProducts();
    productListComponent.template = productListComponent.createListOfProducts(filteredProducts);
    productListComponent.render();
    searchService.highlightFoundText();
  }

  private filterByBrand(event: Event): void {
    filter.getFilterCriteria(event, filter.brandArr);
    const filteredProducts = getFilteredProducts();
    productListComponent.template = productListComponent.createListOfProducts(filteredProducts);
    productListComponent.render();
    searchService.highlightFoundText();
  }




  private createFilterComponent(): string {
    this.config.template = `
        <section class="filter__content">
          <h2 class="">Filter</h2>
          <section>
            <details>
              <summary>
              <h3 class="">Category</h3>
              </summary>
                <ul class="categories-list">`;

    for (const key in filterConstructor.categoriesList()) {
      this.config.template += `
        <li class="filter__item">
          <label>
            <input type="checkbox"/>
            <span class="item__name">${key}</span>
            <span class="item__number">(${filterConstructor.categoriesList()[key]})</span>
          </label>
        </li>`;
    }


    this.config.template += `
                </ul>
              </details>
              
            </section>
            <section>            
              <details>
                <summary>
                <h3 class="">Brand</h3>
                </summary>
                  <ul class="brand-list"> `;


    for (const key in filterConstructor.brandList()) {
      this.config.template += `
        <li class="filter__item">
          <label>
            <input type="checkbox"/>
            <span class="item__name">${key}</span>
            <span class="item__number">(${filterConstructor.brandList()[key]})</span>
          </label>
        </li>`;
    }  

    this.config.template += `
                  </ul>
              </details>
            </section>
            <section>
              
              <details>
                <summary>
                <h3 class="">Price</h3>
                </summary>

              <div class="range_container">
                <div class="sliders_control">
                  <label for="fromSlider">Minimum price</label>
                  <input id="fromSlider" type="range" value="10" min="0" max="100" step="1">
                  <label for="toSlider">Maximum price</label>
                  <input id="toSlider" type="range" value="40" min="0" max="100" step="1">
                </div>           
                <p class="range__info">Min-Max: <span>0</span>&mdash;&nbsp;<span>100</span> </p>
                
              </div>
              </details>
            </section>

            <section>           
              <details>
                <summary>
                <h3 class="">Stock</h3>
                </summary>

              <div class="range_container">
                <div class="sliders_control">
                    <input id="fromSlider" type="range" value="10" min="0" max="100">
                    <input id="toSlider" type="range" value="40" min="0" max="100">
                </div>           
                <p class="range__info">Min-Max: <span>0</span>&mdash;&nbsp;<span>100</span> </p>
                
              </div>
              </details>
            </section>

          </section>
      `;
    return this.config.template;
  }

}

export const filterComponent = new FilterComponent({
  selector: 'app-filter',
  template: '',
  childComponents: [],
});
