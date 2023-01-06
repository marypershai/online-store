import { filterConstructor } from '../service/filter-constructor';
import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';
import { filter } from '../service/filter-service';
import { getFilteredProducts } from '../service/product-list';
import { productListComponent } from './product-list.component';
import { searchService } from '../service/search';
import { rangeSlider } from '../service/filter-range-slider';

class FilterComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
    this.template = this.createFilterComponent();
  }

  public events(): Record<string, string> {
    return {
      'input .categories-list': 'filterByCategories',
      'input .brand-list': 'filterByBrand',
      'input .sliders_control--price': 'createPriceRange',
      'input .min-price': 'controlPriceFrom',
      'input .max-price': 'controlPriceTo',
      'input .sliders_control--stock': 'createStockRange',
      'input .min-stock': 'controlStockFrom',
      'input .max-stock': 'controlStockTo',
    };
  }


  public filteredProducts() {
    const filteredProducts = getFilteredProducts();
    productListComponent.template = productListComponent.createListOfProducts(filteredProducts);
    productListComponent.render();
    searchService.highlightFoundText();
  }

  private filterByCategories(event: Event): void {
    filter.getFilterCriteria(event, filter.categoryArr);
    this.filteredProducts();
  }

  private filterByBrand(event: Event): void {
    filter.getFilterCriteria(event, filter.brandArr);
    this.filteredProducts();
  }

  private createPriceRange() {
    const minPrice = document.querySelector('.min-price') as HTMLInputElement;
    const maxPrice = document.querySelector('.max-price') as HTMLInputElement;
    rangeSlider.fillSlider(minPrice, maxPrice, '#C6C6C6', '#111', maxPrice);
    rangeSlider.setToggleAccessible(maxPrice);
  }

  private controlPriceFrom() {
    const minPrice = document.querySelector('.min-price') as HTMLInputElement;
    const maxPrice = document.querySelector('.max-price') as HTMLInputElement;
    const minPriceNumber = document.querySelector('.min-price__number') as HTMLElement;
    rangeSlider.controlFromSlider(minPrice, maxPrice, minPriceNumber);
    this.filteredProducts();
  }

  private controlPriceTo() {
    const minPrice = document.querySelector('.min-price') as HTMLInputElement;
    const maxPrice = document.querySelector('.max-price') as HTMLInputElement;
    const maxPriceNumber = document.querySelector('.max-price__number') as HTMLElement;
    rangeSlider.controlToSlider(minPrice, maxPrice, maxPriceNumber);
    this.filteredProducts();
  }

  private createStockRange() {
    const fromSlider = document.querySelector('.min-stock') as HTMLInputElement;
    const toSlider = document.querySelector('.max-stock') as HTMLInputElement;
    rangeSlider.fillSlider(fromSlider, toSlider, '#C6C6C6', '#111', toSlider);
    rangeSlider.setToggleAccessible(toSlider);
  }

  private controlStockFrom() {
    const fromSlider = document.querySelector('.min-stock') as HTMLInputElement;
    const toSlider = document.querySelector('.max-stock') as HTMLInputElement;
    const fromInput = document.querySelector('.min-stock__number') as HTMLElement;
    rangeSlider.controlFromSlider(fromSlider, toSlider, fromInput);
    this.filteredProducts();
  }

  private controlStockTo() {
    const fromSlider = document.querySelector('.min-stock') as HTMLInputElement;
    const toSlider = document.querySelector('.max-stock') as HTMLInputElement;
    const toInput = document.querySelector('.max-stock__number') as HTMLElement;
    rangeSlider.controlToSlider(fromSlider, toSlider, toInput);
    this.filteredProducts();
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
                <div class="sliders_control sliders_control--price">
                  <label for="min-price">Minimum price</label>
                  <input id="min-price" class="min-price" type="range" value="${rangeSlider.getMinMaxPrice().min}" min="0" max="5000" step="1">
                  <label for="max-price">Maximum price</label>
                  <input id="max-price" class="max-price" type="range" value="${rangeSlider.getMinMaxPrice().max}" min="0" max="5000" step="1">
                </div>           
                <p class="range__info">Min-Max: <span class="min-price__number">${rangeSlider.getMinMaxPrice().min}</span>&mdash;&nbsp;<span class="max-price__number">${rangeSlider.getMinMaxPrice().max}</span> </p>
                
              </div>
              </details>
            </section>

            <section>           
              <details>
                <summary>
                <h3 class="">Stock</h3>
                </summary>

              <div class="range_container">
                <div class="sliders_control sliders_control--stock">
                <label for="min-stock">Minimum stock</label>
                <input id="min-stock" class="min-stock" type="range" value="${rangeSlider.getMinMaxStock().min}" min="0" max="400" step="1">
                <label for="max-stock">Maximum stock</label>
                <input id="max-stock" class="max-stock"  type="range" value="${rangeSlider.getMinMaxStock().max}" min="0" max="400" step="1">
                </div>           
                <p class="range__info">Min-Max: <span class="min-stock__number">${rangeSlider.getMinMaxStock().min}</span>&mdash;&nbsp;<span class="max-stock__number">${rangeSlider.getMinMaxStock().max}</span> </p>
                
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
