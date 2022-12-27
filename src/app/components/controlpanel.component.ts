import { productListCurrent, sortProduct } from '../../app/service/product-list';
import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';
import { productListComponent } from './product-list.component';

class ControlComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
  }

  public events(): Record<string, string> {
    return {
      'click .view-list': 'changeProductListView',
      'click .view-card': 'changeProductListView',
      'change .schema-order': 'changeProductOrder',
    };
  }

  private changeProductListView(event: Event): void {
    const targetEl = event.currentTarget as HTMLElement;
    const view: string | undefined = targetEl.getAttribute('class')?.split(' ')[1];
    if (view) {
      localStorage.setItem('view', view);
    }
    productListComponent.template = productListComponent.createListOfProducts();
    productListComponent.render();
    window.location.search = `view=${view}`;
  }

  private changeProductOrder(): void {
    const select = document.querySelector('.schema-order') as HTMLSelectElement | null;
    const currentOption = select?.selectedIndex;
    sortProduct(currentOption);
    productListComponent.template = productListComponent.createListOfProducts();
    productListComponent.render();
  }
}

export const controlComponent = new ControlComponent({
  selector: 'app-controlpanel',
  template: `
  <section class="container--full controlpanel">
    <h2 class="visibility-hidden">Panel to control SKUs flow</h2>
    <div class="page__container controlpanel__content">
    <div class="controlpanel__item">
      
      <button class="button button--filter" onclick="document.querySelector('.filter').classList.toggle('filter--open')">
      <svg class="icon">
        <title>Filter</title>
        <use xlink:href="./icons.svg#filter"></use>
      </svg>
      Filter
      </button>
      <button class="button button--restart button--underlined">Clear all</button>
      <button class="button button--save button--underlined">Copy link</button>
    </div>
   
      <p class="search-results">Results: ${productListCurrent.length}</p>
    
    <div class="controlpanel__item">
      <div class="sort-control">
        <p>Sort by</p>
        <select class="custom-select schema-order" name="sort-order" aria-label="Sort By">
          <option value="0">Recommended</option>
          <option value="1">Price Low To High</option>
          <option value="2">Price High To Low</option>
          <option value="3">Product Name A - Z</option>
          <option value="4">Product Name Z - A</option>
        </select>
      </div>
      <button class="button view-card">
        <svg class="icon">
          <title>View Cards</title>
          <use xlink:href="./icons.svg#view-cards"></use>
        </svg>
      </button>
      <button class="button view-list">
        <svg class="icon">
          <title>View List</title>
          <use xlink:href="./icons.svg#view-list"></use>
        </svg>
      </button>    
    </div>
     
      
    </div>
  </section>        
    `,
  childComponents: [],
});
