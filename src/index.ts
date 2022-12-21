import { appModule } from './app/app.module';
import { bootstrap } from './frame/index';
import './assets/styles/styles.scss';

bootstrap(appModule);

require.context('./assets/image', true, /.(jpg|svg|png)$/);
