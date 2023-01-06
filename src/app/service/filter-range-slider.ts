import { copyProductList } from './product-list';


class RangeSlider {

  getMinMaxPrice(): Record<string, number> {
    const res = { min: 0, max: 0 };
    const values: number[] = [];
    copyProductList.forEach( item => values.push(item.price));
    res.min = Math.min(...values);
    res.max = Math.max(...values);
    return res;
  }

  getMinMaxStock(): Record<string, number> {
    const res = { min: 0, max: 0 };
    const values: number[] = [];
    copyProductList.forEach( item => values.push(item.stock));
    res.min = Math.min(...values);
    res.max = Math.max(...values);
    return res;
  }

 
  public fillSlider(from: HTMLInputElement, to: HTMLInputElement, sliderColor: string, rangeColor: string, controlSlider: HTMLElement) {
    const rangeDistance = Number(to.max) - Number(to.min);
    const fromPosition = Number(from.value) - Number(to.min);
    const toPosition = Number(to.value) - Number(to.min);
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition) / (rangeDistance) * 100}%,
      ${rangeColor} ${((fromPosition) / (rangeDistance)) * 100}%,
      ${rangeColor} ${(toPosition) / (rangeDistance) * 100}%, 
      ${sliderColor} ${(toPosition) / (rangeDistance) * 100}%, 
      ${sliderColor} 100%)`;
  }

  public setToggleAccessible(currentElement: HTMLInputElement) {
    const toSlider = document.querySelector('#toSlider') as HTMLInputElement;
    if (toSlider) {
      if (Number(currentElement.value) <= 0 ) {
        toSlider.style.zIndex = '2';
      } else {
        toSlider.style.zIndex = '0';
      }
    }
  }

  private getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement) {
    const from = parseInt(currentFrom.value, 10);
    const to = parseInt(currentTo.value, 10);
    return [from, to];
  }

  public controlFromSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, fromInput: HTMLElement) {
    const [from, to] = this.getParsed(fromSlider, toSlider);
    this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    if (from > to) {
      fromSlider.value = `${to}`;
      fromInput.textContent = `${to}`;
    } else {
      fromInput.textContent = `${from}`;
    }
  }

  public controlToSlider(fromSlider: HTMLInputElement, toSlider: HTMLInputElement, toInput: HTMLElement) {
    const [from, to] = this.getParsed(fromSlider, toSlider);
    this.fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
    if (from < to) {
      toSlider.value = `${to}`;
      toInput.textContent = `${to}`;
    } else {
      toInput.textContent = `${from}`;
      toSlider.value = `${from}`;
    }
  }


}

export const rangeSlider =  new RangeSlider;

