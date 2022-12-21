import { DMComponent } from '../frame/index';
import { ComponentConfig } from '../frame/tools/interfaces';

export class AppComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
  }
}

export const appComponent = new AppComponent({
  selector: 'app-root',
  template: `
        <app-header></app-header>
        <router-outlet></router-outlet>
    `,
  childComponents: [],
});
