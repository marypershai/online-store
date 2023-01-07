import { filterConstructor } from '../service/filter-constructor';
import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';
import { filter } from '../service/filter-service';
import {  getFilteredProducts } from '../service/product-list';
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
      
      // 'input .sliders_control--stock': 'createStockRange',
      // 'input .min-stock': 'controlStockFrom',
      // 'input .max-stock': 'controlStockTo',
    };
  }


  public filteredProducts() {
    const filteredProducts = getFilteredProducts();
    productListComponent.template = productListComponent.createListOfProducts(filteredProducts);
    productListComponent.render();
    filterConstructor.brandAmountUpdate();
    filterConstructor.categoriesAmountUpdate();
    rangeSlider.priceRangeUpdate();
    rangeSlider.stockRangeUpdate();
    searchService.highlightFoundText();
  }

  private filterByCategories(event: Event): void {
    filter.getFilterCriteria(event, filter.categoryArr);
    this.filteredProducts();
    // filterConstructor.newPrice();
    
  }

  private filterByBrand(event: Event): void {
    filter.getFilterCriteria(event, filter.brandArr);
    this.filteredProducts();
    // filterConstructor.newPrice();
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

    for (const key in filterConstructor.categoriesListCreate()) {
      this.config.template += `
        <li class="filter__item">
          <label>
            <input type="checkbox"/>
            <span class="item__name">${key}</span>
            <span class="item__number categories__number--current" data-category="${key}">(${filterConstructor.categoriesListCreate()[key]}</span>
            <span class="item__number">/ ${filterConstructor.categoriesListCreate()[key]})</span>
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


    for (const key in filterConstructor.brandListCreate()) {
      this.config.template += `
        <li class="filter__item">
          <label>
            <input type="checkbox"/>
            <span class="item__name">${key}</span>
            <span class="item__number brand__number--current" data-brand="${key}">(${filterConstructor.brandListCreate()[key]}</span>
            <span class="item__number brand__number--total">/ ${filterConstructor.brandListCreate()[key]})</span>
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

                <div class="price__container">
                  <div class="range__panel range__panel--price">
                   <div class="range__one--price"></div>
                   <div class="range__two--price"></div>
                    <div class="marker price-marker--min"></div>
                    <div class="marker price-marker--max"></div>
                  </div>
                  <p class="range__info range__info--price">min-max:<span class="min-price__number">${rangeSlider.getMinMaxPrice().min}</span><span class="max-price__number">&mdash;&nbsp;${rangeSlider.getMinMaxPrice().max}</span> </p>
                </div>
               
              </details>
            </section>

            <section>           
              <details>
                <summary>
                <h3 class="">Stock</h3>
                </summary>



                <div class="stock__container">
                <div class="range__panel range__panel--stock">
                 <div class="range__one--stock"></div>
                 <div class="range__two--stock"></div>
                  <div class="marker stock-marker--min"></div>
                  <div class="marker stock-marker--max"></div>
                </div>
                <p class="range__info range__info--stock">stock range:<span class="min-price__number">${rangeSlider.getMinMaxStock().min}</span><span class="max-price__number">&mdash;&nbsp;${rangeSlider.getMinMaxStock().max}</span> </p>
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
