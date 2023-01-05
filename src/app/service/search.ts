import { Product } from './product';
// import { copyProductList } from './product-list';

type ElementsOfSearch = HTMLHeadElement | HTMLParagraphElement;

class SearchService {

  private getsearchValue = (): RegExp => {
    const searchInput = document.querySelector('.search__text-input') as HTMLInputElement;
    const word: string | number = searchInput.value;
    return new RegExp(word, 'gi');  
  };

  public filterBySearchValue(arr: Product[]): Product[] {
    const word: RegExp = this.getsearchValue();
    const newArr = arr.filter(item => item.brand.match(word)
      || item.category.match(word)
      || item.title.match(word)
      || item.price.toString().match(word)
      || item.stock.toString().match(word),
    ); 
    this.showItemsQuantity(newArr);
    return newArr;
  }


  private showItemsQuantity(data: Product[]):void {
    const searchResults = document.querySelector('.search-results') as HTMLParagraphElement;
    searchResults.textContent = `Results: ${data.length}`;
  }

  public highlightFoundText(): void {
    const word: RegExp = this.getsearchValue();
    let elementstToSearch: ElementsOfSearch[] | null = null;

    elementstToSearch ??= [...(document.querySelectorAll('h3.item__name') as NodeListOf<HTMLHeadElement>)];
    elementstToSearch.push(...(document.querySelectorAll('.item__brand') as NodeListOf<HTMLParagraphElement>));
    elementstToSearch.push(...(document.querySelectorAll('.item__category') as NodeListOf<HTMLParagraphElement>));
    elementstToSearch.push(...(document.querySelectorAll('.item__price') as NodeListOf<HTMLParagraphElement>));
    elementstToSearch.push(...(document.querySelectorAll('.item__stock') as NodeListOf<HTMLParagraphElement>));
    
    elementstToSearch.forEach(name => {
      let text = name.innerText;
      const overlap = text.match(word);

      if (overlap && !overlap.includes('')) {
        text = text.replace(overlap[0], `<span class="search__highlight">${overlap}</span>`);
        name.innerHTML = text;
      }
    });
  }
}

export const searchService = new SearchService(); 