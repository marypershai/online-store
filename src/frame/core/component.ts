import { ComponentConfig } from "../tools/interfaces";

export class Component{
    private template: string;
    public selector: string;
    private element: HTMLElement | null;
    constructor(private config: ComponentConfig){
        this.template = config.template,
        this.selector = config.selector,
        this.element = null;
    }

    render(){
        this.element = document.querySelector(this.selector) as HTMLElement;
        if(!this.element) throw new Error(`Component with selector ${this.selector} wasn't found`);
        this.element.innerHTML = this.template;
    }
}