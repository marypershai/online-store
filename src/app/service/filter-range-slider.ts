import { filterConstructor } from './filter-constructor';
import { copyProductList } from './product-list';


class RangeSlider {

  getMinMaxPrice(): Record<string, number | undefined> {     
    const prices = copyProductList.map( item => item.price).sort((a, b) => a - b);
    return { min: prices.at(0), max: prices.at(-1) };
  }

  getMinMaxStock(): Record<string, number | undefined> {
    const stocks = copyProductList.map( item => item.stock).sort((a, b) => a - b);
    return { min: stocks.at(0), max: stocks.at(-1) };
  }

 
  public priceRangeUpdate():void {
    
    const pricePanel = document.querySelector('.range__panel--price') as HTMLElement;
    const duration = pricePanel.clientWidth; 

    const minPrice = filterConstructor.priceMinMaxUpdate().min;
    const maxPrice = filterConstructor.priceMinMaxUpdate().max;
    const minPriceMarker = document.querySelector('.price-marker--min') as HTMLElement;
    const maxPriceMarker = document.querySelector('.price-marker--max') as HTMLElement;
    const priceInfo = document.querySelector('.range__info--price') as HTMLElement;
    

    if (maxPrice === undefined || minPrice === undefined) {
      minPriceMarker.style.left = '0';
      maxPriceMarker.style.left = `${duration}` + 'px';
      priceInfo.textContent = 'Item not found';
      const secondPart = document.querySelector('.range__two--price') as HTMLElement;
      secondPart.style.backgroundColor = '#fff';
    
    } else if (minPrice === maxPrice) {
      const maxRangePrice = maxPrice + 300; 
      minPriceMarker.style.left = (minPrice * duration / maxRangePrice)  + 'px';
      maxPriceMarker.style.left = minPriceMarker.style.left;
      priceInfo.innerHTML = `one price: ${minPrice}`;
      this.pricePanelColor(minPrice, maxPrice, maxRangePrice, '#c1c2c5');
    } else {
      const maxRangePrice = maxPrice + 300; 
      minPriceMarker.style.left = (minPrice * duration / maxRangePrice)  + 'px';
      maxPriceMarker.style.left = (maxPrice * duration / maxRangePrice)  + 'px';
      priceInfo.innerHTML = `min-max: ${minPrice}` + ' — ' + `${maxPrice}`;
      this.pricePanelColor(minPrice, maxPrice, maxRangePrice, '#c1c2c5'); 
    }     

  }


  private pricePanelColor(minPrice: number, maxPrice: number, maxRangePrice: number, color: string) {
    const pricePanel = document.querySelector('.range__panel--price') as HTMLElement;
    const duration = pricePanel.clientWidth; 
 

    const firstPart = document.querySelector('.range__one--price') as HTMLElement;
    const secondPart = document.querySelector('.range__two--price') as HTMLElement;
    secondPart.style.backgroundColor = color;

    firstPart.style.width = (minPrice * duration /  maxRangePrice) + 'px';
    secondPart.style.width = (maxPrice - minPrice)  * duration /  maxRangePrice + 'px';

  }


  public stockRangeUpdate():void {
    
    const stockPanel = document.querySelector('.range__panel--stock') as HTMLElement;
    const duration = stockPanel.clientWidth; 

    const minStock = filterConstructor.stockMinMaxUpdate().min;
    const maxStock = filterConstructor.stockMinMaxUpdate().max;
    const minStockMarker = document.querySelector('.stock-marker--min') as HTMLElement;
    const maxStockMarker = document.querySelector('.stock-marker--max') as HTMLElement;
    const stockInfo = document.querySelector('.range__info--stock') as HTMLElement;
    

    if (maxStock === undefined || minStock === undefined) {
      minStockMarker.style.left = '0';
      maxStockMarker.style.left = `${duration}` + 'px';
      stockInfo.textContent = 'Item not found';
      const secondPart = document.querySelector('.range__two--stock') as HTMLElement;
      secondPart.style.backgroundColor = '#fff';
    
    } else if (minStock === maxStock) {
      const maxRangeStock = 400; 
      minStockMarker.style.left = (minStock * duration / maxRangeStock)  + 'px';
      maxStockMarker.style.left = minStockMarker.style.left;
      stockInfo.innerHTML = `stock range: ${minStock}`;
      this.stockPanelColor(minStock, maxStock, maxRangeStock, '#c1c2c5');
    } else {
      const maxRangeStock = 400; 
      minStockMarker.style.left = (minStock * duration / maxRangeStock)  + 'px';
      maxStockMarker.style.left = (maxStock * duration / maxRangeStock)  + 'px';
      stockInfo.innerHTML = `stock range: ${minStock}` + ' — ' + `${maxStock}`;
      this.stockPanelColor(minStock, maxStock, maxRangeStock, '#c1c2c5'); 
    }     

  }

  private stockPanelColor(minStock: number, maxStock: number, maxRangeStock: number, color: string) {
    const stockPanel = document.querySelector('.range__panel--stock') as HTMLElement;
    const duration = stockPanel.clientWidth;  

    const firstPart = document.querySelector('.range__one--stock') as HTMLElement;
    const secondPart = document.querySelector('.range__two--stock') as HTMLElement;
    secondPart.style.backgroundColor = color;

    firstPart.style.width = (minStock * duration /  maxRangeStock) + 'px';
    secondPart.style.width = (maxStock - minStock)  * duration /  maxRangeStock + 'px';

  }


}

export const rangeSlider =  new RangeSlider;

