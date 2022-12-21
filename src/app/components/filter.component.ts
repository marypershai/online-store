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
        <img  class="page__container--full" src="https://res.cloudinary.com/bartoshevich/image/upload/v1671356920/rs-school/online/oryx/oryxwith3dprinter.png" >
    `,
  childComponents: [],
});
