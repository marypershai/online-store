import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';

class FilterComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
  }
}

export const filterComponent = new FilterComponent({
  selector: 'app-filter',
  template: `
        <div><h4>Here filter</h4></div>
    `,
  childComponents: [],
});
