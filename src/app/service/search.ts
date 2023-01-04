import { Product } from './product';
// import { copyProductList } from './product-list';


class SearchService {

  public isSearchOn = false;

  public searchWord = ():RegExp => {
    const searchInput = document.querySelector('.search__text-input') as HTMLInputElement;
    const word: string | number = searchInput.value;
    return new RegExp(word, 'gi');  
  };

  public filter(arr: Product[]): Product[] {
    const word = this.searchWord();
    const newArr = arr.filter( item => item.brand.toString().match(word) || item.category.toString().match(word) || item.title.toString().match(word) || item.price.toString().match(word) || item.stock.toString().match(word)); 
    this.showItemsQuantity(newArr);
    return newArr;
  }


  private showItemsQuantity(data: Product[]):void {
    const searchResults = document.querySelector('.search-results') as HTMLElement;
    searchResults.textContent = `Results: ${data.length}`;
  }

  public productList(arr: Product[]): void {
    const word = this.searchWord();
    return arr.forEach( item => {
      item.title = item.title.replace(word, match => `<span class="search__highlight">${match}</span>`);
      item.brand = item.brand.replace(word, match => `<span class="search__highlight">${match}</span>`);
      item.category = item.category.replace(word, match => `<span class="search__highlight">${match}</span>`);
      item.price = item.price.toString().replace(word, match => `<span class="search__highlight">${match}</span>`);
      item.stock = item.stock.toString().replace(word, match => `<span class="search__highlight">${match}</span>`);
    });
  }
  

}

export const search = new SearchService; 