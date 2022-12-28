import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';
import { productListComponent } from './product-list.component';

class ControlComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
    this.template = this.createControlPanel();
  }

  public events(): Record<string, string> {
    return {
      'click .view-list': 'changeProductListView',
      'click .view-card': 'changeProductListView',
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

  public createControlPanel(): string {
    const view: string | null = localStorage.getItem('view'); 
    this.config.template += ` 
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
   
      <p class="search-results">Results: 20</p>
    
    <div class="controlpanel__item">
      <div class="sort-control">
        <p>Sort by</p>
        <select class="custom-select" name="sort-order" aria-label="Sort By">
          <option value="">Recommended</option>
          <option value="">Price Low To High</option>
          <option value="">Price High To Low</option>
          <option value="">Product Name A - Z</option>
          <option value="">Product Name Z - A</option>
        </select>
      </div>`;

    if (view == 'view-card' || view == undefined) {
      this.config.template += `
        <button class="button view-card button-view button-view--active">
        <svg class="icon">
          <title>View Cards</title>
          <use xlink:href="./icons.svg#view-cards"></use>
        </svg>
        </button>
        <button class="button button-view view-list">
          <svg class="icon">
            <title>View List</title>
            <use xlink:href="./icons.svg#list-b"></use>
          </svg>
        </button>    
      </div>
    
      `;
    } else {
      this.config.template += `
        <button class="button view-card button-view ">
        <svg class="icon">
          <title>View Cards</title>
          <use xlink:href="./icons.svg#view-cards"></use>
        </svg>
      </button>
      <button class="button button-view view-list button-view--active">
        <svg class="icon">
          <title>View List</title>
          <use xlink:href="./icons.svg#list-b"></use>
        </svg>
      </button>    
    </div> 
        `;
    }

    this.config.template += `
    </div>
  </section> 
   `;
    return this.config.template;
  }

}

export const controlComponent = new ControlComponent({
  selector: 'app-controlpanel',
  template: '',
   
  childComponents: [],
});


