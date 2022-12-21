import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';

export class NotFound extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
  }
}

export const notFound = new NotFound({
  selector: 'app-not-found',
  template: `
        <h1>404</h1>
        <h2>Page Not Found Error</h2>
        <a href="#"> Go to home page </a>
    `,
  childComponents: [],
});
