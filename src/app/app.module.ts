import { DMModule } from "../frame/index";
import { ModuleConfig } from "../frame/tools/interfaces";
import { appComponent } from "./app.component";
import { appRoutes } from "./app.routes";
import { appHeader } from "./common/app.header";

class AppModule extends DMModule{
    constructor(config: ModuleConfig){
        super(config);
    }

}

export const appModule = new AppModule({
    components: [
        appHeader
    ],
    bootstrap: appComponent,
    routes: appRoutes
})