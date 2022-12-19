import { Components, FeatureComponentConfig } from "../tools/interfaces";

export class FeatureComponent{
    public components: Components[];
    public bootstrapComponent: Components;

    constructor(public config:FeatureComponentConfig){
        this.components = config.components,
        this.bootstrapComponent = this.config.bootstrap
    }
}