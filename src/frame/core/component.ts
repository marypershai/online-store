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
      this.childComponents.forEach((component) => component.render());
    }

    this.initEvents();
  }

  private initEvents(): void {
    if (Object.getPrototypeOf(this).events) {
      const events = Object.getPrototypeOf(this).events();

      Object.keys(events).forEach((key) => {
        const listner = key.split(' ');
        if (this.element) {
          (this.element.querySelector(listner[1]) as HTMLElement)
            .addEventListener(listner[0], Object.getPrototypeOf(this)[events[key]].bind(this));
        }
      });
    }
  }
}
