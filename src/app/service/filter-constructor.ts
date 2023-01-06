// import { rangeSlider } from './filter-range-slider';
import { Product } from './product';
import { copyProductList, getFilteredProducts } from './product-list';

class FilterConstructor {

  private objectCreate(arr: string[]): Record<string, number> {
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


  public categoriesList = (): Record<string, number> => {   
    const categoriesList: string[] = [];
    copyProductList.forEach( item => categoriesList.push(item.category));
    categoriesList.sort((a, b) => a > b ? 1 : -1);
    return this.objectCreate(categoriesList);
  };

  private categoriesListCurrent = (): Record<string, number> => {   
    const categoriesList: string[] = [];
    const data: Product[] = getFilteredProducts();
    data.forEach( item => categoriesList.push(item.category));
    categoriesList.sort((a, b) => a > b ? 1 : -1);
    return this.objectCreate(categoriesList);
  };

  public brandList = (): Record<string, number> => {
    const brandList: string[] = [];
    copyProductList.forEach(item => brandList.push(item.brand));
    brandList.sort((a, b) => a > b ? 1 : -1);
    return this.objectCreate(brandList);
  };

  private brandListCurrent = (): Record<string, number> => {
    const brandList: string[] = [];
    const data: Product[] = getFilteredProducts();
    data.forEach(item => brandList.push(item.brand));
    brandList.sort((a, b) => a > b ? 1 : -1);
    return this.objectCreate(brandList);
  };

  public brandListUpdate(): void {
    const brandList = this.brandListCurrent();
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

  public categoriesListUpdate(): void {
    const categoriesList = this.categoriesListCurrent();
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
  

}

export const filterConstructor = new FilterConstructor;