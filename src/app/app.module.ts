import { DMModule } from '../frame/index';
import { ModuleConfig } from '../frame/tools/interfaces';
import { appComponent } from './app.component';
import { addProductRoute, appRoutes } from './app.routes';
import { appFooter } from './common/app.footer';
import { appHeader } from './common/app.header';

class AppModule extends DMModule {
  constructor(config: ModuleConfig) {
    super(config);
  }
}

export const appModule = new AppModule({
  components: [
    appHeader,
    appFooter,
  ],
  bootstrap: appComponent,
  routes: appRoutes,
  dynamicRoutes: addProductRoute,
});
