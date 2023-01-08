import { AppComponent } from '../../app/app.component';
import { router } from '../index';
import { Components, ModuleConfig, RoutesObj } from '../tools/interfaces';

export class Module {
  private components: Components[];

  private bootstrapComponent: AppComponent;

  private routes: RoutesObj[] | undefined;

  private dynamicRoutes: (id: string) => void;

  constructor(private config: ModuleConfig) {
    this.components = config.components;
    this.bootstrapComponent = this.config.bootstrap;
    this.routes = config.routes;
    this.dynamicRoutes = config.dynamicRoutes;
  }

  public start(): void {
    this.initComponents();
    if (this.routes) this.initRoutes();
  }

  private initComponents(): void {
    this.bootstrapComponent.render();
    this.components.forEach(this.renderComponent.bind(this));
  }

  private initRoutes(): void {
    window.addEventListener('hashchange', this.renderRoute.bind(this));
    this.renderRoute();
  }

  private renderRoute(): void {
    const url: string = router.getUrl();
    const regExp = /productID=\d+/gm;
    if (url.match(regExp)) {
      const id: string = router.getUrl().substring(10);
      this.dynamicRoutes(`productID=${id}`);
    }

    if (this.routes) {
      let route: RoutesObj | undefined = this.routes
        .find((currentRoute) => currentRoute.path === url);

      if (typeof route === 'undefined') {
        router.clearSearch();
        route = this.routes.find((currentRoute) => currentRoute.path === '**');
      }
      if (route) {
        (document.querySelector('router-outlet') as HTMLElement).innerHTML = `<${route.component.selector}></${route.component.selector}>`;
        this.renderComponent(route.component);
      }
    }
  }

  private renderComponent(component: Components): void {
    component.render();
  }
}
