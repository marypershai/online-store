import { appModule } from "./app/app.module";
import { bootstrap } from "./frame/index";

bootstrap(appModule)

require.context('./assets/image', true, /.(jpg|svg|png)$/);

