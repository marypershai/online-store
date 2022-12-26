import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';
import { ProductListComponent } from './product-list.component';

class ControlComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
  }

  public events(): Record<string, string> {
    return {
      'click .view-card': 'changeProductListView',
      'click .view-list': 'changeProductListView',
    };
  }

  private changeProductListView(event: Event) {
    const targetEl = event.target as HTMLElement;
    if (targetEl.classList.contains('icon')) {
      const view: string | undefined = (targetEl.closest('.button') as HTMLElement).getAttribute('class')?.split(' ')[1];
      if (view) {
        localStorage.setItem('view', view);
      }
      console.log('my-view ' + view);
      const newview = new ProductListComponent({
        selector: 'app-product-list',
        template: '',
        childComponents: [],
      });
      newview.render();
      // window.location.search = `view=${view}`;
    }

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
