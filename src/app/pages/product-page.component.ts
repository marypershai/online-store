import { Product } from '../service/product';
import { getProduct } from '../service/product-list';
import { DMComponent, router } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';
import { cart } from '../service/cart';

class ProductPageComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
    this.createProductItem();
  }


  createProductItem(): void {
    const id: string = router.getUrl().substring(10);
    const product: Product | undefined = getProduct(+id);
    if (product) {
      this.template = `
      
        <div class="page__container product-detail-container">
          <ol class="breadcrumb">
            <li class="breadcrumb__item"><a href="/" class="breadcrumb__link">giftToProgrammers</a></li>
            <li class="breadcrumb__item">${product.category}</li>
            <li class="breadcrumb__item">${product.brand}</li>
            <li class="breadcrumb__item">${product.title}</li>
          </ol>
          <div class="product__panel">
              <div class="product__image-carousel">
              <div class="product__image--wrapper">
                <img class="product__image--primary" src="${product.images[0]}" alt="${product.title}">   
              </div>
                               
              <div class="image__list__wrapper">
                <ul class="image__list">  
                  <li><img class="image__list__item image__list__item--active" src=${product.images[0]} width="60" height="60" alt=""></li>               
        
        `;
      for (let i = 1; i < product.images.length; i++) {
        this.template += `<li><img class="image__list__item" src=${product.images[i]} width="60" height="60" alt=""></li>`;
      }

      this.template += `
                </ul> 
                </div>
              </div>
              <div class="product__info-section">
                <h2>${product.title}</h2>
                <div class="product__feature">${product.description}</div>
                <div class="product__feature"><span class="bold">Category:</span> ${product.category}</div>
                <div class="product__feature"><span class="bold">Brand:</span> ${product.brand}</div>
                <div class="product__feature"><span class="bold">Rating:</span> ${product.rating}</div>  
                <div class="product__feature"><span class="bold">Discount:</span> ${product.discountPercentage}%</div>
                <div class="product__feature"><span class="bold">Price:</span> ${product.price}$</div>
                <div class="product__feature"><span class="bold">In stock:</span> ${product.stock}</div>
                <div class="pruduct__buttons">
                  <button class="button button--card">${cart.checkButtonState(product.id)}</button>
                  <button class="button button--buy">Buy Now</button>
                </div>            
              </div>
            </div>
          <div> `;
    }
  }

  private selectionRemove(): void {
    const imageList: NodeListOf<Element> = document.querySelectorAll('.image__list__item');
    imageList.forEach((el) => {
      el.classList.remove('image__list__item--active');
    });
  }

  private events(): Record<string, string> {
    return {
      'click .image__list': 'changeImage',
      'click .button--card': 'addProductToCart',
    };
  }

  private changeImage(event: Event): void {
    const targetEl = event.target as HTMLImageElement;
    const mainImage: HTMLImageElement | null = document.querySelector('.product__image--primary');

    if (targetEl.classList.contains('image__list__item') && mainImage) {
      this.selectionRemove();
      targetEl.classList.add('image__list__item--active');
      mainImage.src = targetEl.src;
    }
  }

  private addProductToCart(event: Event): void {
    const cartButton = event.currentTarget as HTMLElement;
    console.log(cartButton);
    const productID: string = router.getUrl().substring(10);
    if (productID && cartButton.innerHTML == 'Add to cart') {
      cart.addToCart(+productID, 1);
      cartButton.innerHTML = 'Delete from cart';
    } else if (productID) {
      cart.delete(+productID);
      cartButton.innerHTML = 'Add to cart';
    }
  }

}

export const productPageComponent = new ProductPageComponent({
  selector: 'app-product-page',
  template: `
        <div><h4>Here page with this product</h4></div>
    `,
  childComponents: [],
});
