// import { rangeSlider } from './filter-range-slider';

import { Product } from './product';
import { copyProductList, getFilteredProducts } from './product-list';

class FilterConstructor {

  public categoriesListCreate = (): Record<string, number> => {   
    const categoriesList: string[] = [];
    copyProductList.forEach( item => categoriesList.push(item.category));
    categoriesList.sort((a, b) => a > b ? 1 : -1);
    return this.objectValuesCount(categoriesList);
  };

  public brandListCreate = (): Record<string, number> => {
    const brandList: string[] = [];
    copyProductList.forEach(item => brandList.push(item.brand));
    brandList.sort((a, b) => a > b ? 1 : -1);
    return this.objectValuesCount(brandList);
  };


  private objectValuesCount(arr: string[]): Record<string, number> {
    const result: Record<string, number> = {};
    arr.forEach( item => {
      if (result[item]) {
        result[item] += 1;
      } else { 
        result[item] = 1;
      }
    });
    return result;
  }

  private actualCategoriesListCreate = (): Record<string, number> => {   
    const categoriesList: string[] = [];
    const data: Product[] = getFilteredProducts();
    data.forEach( item => categoriesList.push(item.category));
    categoriesList.sort((a, b) => a > b ? 1 : -1);
    return this.objectValuesCount(categoriesList);
  };


  private actualBrandListCreate = (): Record<string, number> => {
    const brandList: string[] = [];
    const data: Product[] = getFilteredProducts();
    data.forEach(item => brandList.push(item.brand));
    brandList.sort((a, b) => a > b ? 1 : -1);
    return this.objectValuesCount(brandList);
  };


  public brandAmountUpdate(): void {
    const brandList = this.actualBrandListCreate();
    const brandsInStockNumber = document.querySelectorAll('.brand__number--current') as NodeListOf<HTMLElement>;
    brandsInStockNumber.forEach(item => {
      const brand = item.dataset.brand as string; 
      let brandNumber = `${brandList[brand]}`; 
      if (brandNumber === 'undefined') {
        brandNumber = '0';
      }
      item.textContent = `(${brandNumber}`;
    });     
  }


  public categoriesAmountUpdate(): void {
    const categoriesList = this.actualCategoriesListCreate();
    const categoriesInStockNumber = document.querySelectorAll('.categories__number--current') as NodeListOf<HTMLElement>;
    categoriesInStockNumber.forEach(item => {
      const brand = item.dataset.category as string; 
      let categoryNumber = `${categoriesList[brand]}`; 
      if (categoryNumber === 'undefined') {
        categoryNumber = '0';
      }
      item.textContent = `(${categoryNumber}`;
    });     
  }


  public priceMinMaxUpdate():Record<string, number | undefined> {    
    const data: Product[] = getFilteredProducts();
    const prices = data.map( item => item.price).sort((a, b) => a - b);
    return { min: prices.at(0), max: prices.at(-1) };
  }

  public stockMinMaxUpdate():Record<string, number | undefined> {    
    const data: Product[] = getFilteredProducts();
    const stock = data.map( item => item.stock).sort((a, b) => a - b);
    return { min: stock.at(0), max: stock.at(-1) };
  }

}
  


export const filterConstructor = new FilterConstructor;