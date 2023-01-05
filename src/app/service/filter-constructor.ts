import { copyProductList } from './product-list';

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

  public brandList = (): Record<string, number> => {
    const brandList: string[] = [];
    copyProductList.forEach(item => brandList.push(item.brand));
    brandList.sort((a, b) => a > b ? 1 : -1);
    return this.objectCreate(brandList);
  };

}

export const filterConstructor = new FilterConstructor;