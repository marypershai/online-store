import { ComponentConfig, Components } from '../tools/interfaces';

export class Component {
  public template: string;

  public selector: string;

  public childComponents: Components[];

  private element: HTMLElement | null;

  constructor(public config: ComponentConfig) {
    this.template = config.template;
    this.selector = config.selector;
    this.childComponents = config.childComponents;
    this.element = null;
  }

  public render(): void {
    this.element = document.querySelector(this.selector) as HTMLElement;
    if (!this.element) throw new Error(`Component with selector ${this.selector} wasn't found`);
    this.element.innerHTML = this.template;
    if (this.childComponents) {
      console.log(this.childComponents);
      this.childComponents.forEach((component) => component.render());
    }
  }
}
