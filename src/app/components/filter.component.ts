import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';
import { copyProductList } from '../service/product-list';
// import { Product } from '../service/product';

class FilterComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
    this.template = this.createFilterComponent();
  }

  private objectCreate(arr: string[]): Record<string, number> {
    const result: Record<string, number> = {};
    arr.forEach( item => {
      if (result[item]) {
        result[item] += 1;
      } else {
        result[item] = 1;
      }
    });
    return result;
  }

  private categoriesList = (): Record<string, number> => {   
    const categoriesList: string[] = [];
    copyProductList.forEach( item => categoriesList.push(item.category));
    categoriesList.sort((a, b) => a > b ? 1 : -1);
    return this.objectCreate(categoriesList);
  };

  private brandList = (): Record<string, number> => {
    const brandList: string[] = [];
    copyProductList.forEach(item => brandList.push(item.brand));
    brandList.sort((a, b) => a > b ? 1 : -1);
    return this.objectCreate(brandList);
  };
  
  private createFilterComponent(): string {
    this.config.template = `
        <section class="filter__content">
          <h2 class="">Filter</h2>
          <section>
            <details>
              <summary>
              <h3 class="">Category</h3>
              </summary>
                <ul>`;

    for (const key in this.categoriesList()) {
      this.config.template += `
      <li class="filter__item">
        <label>
          <input type="checkbox"/>
          ${key}
          <span>(${this.categoriesList()[key]})</span>
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
                <ul> `;


    for (const key in this.brandList()) {
      this.config.template += `
       <li class="filter__item">
         <label>
           <input type="checkbox"/>
           ${key}
           <span>(${this.brandList()[key]})</span>
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
                  <input id="fromSlider" type="range" value="10" min="0" max="100">
                  <input id="toSlider" type="range" value="40" min="0" max="100">
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
