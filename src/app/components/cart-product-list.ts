import { CartData, ComponentConfig } from '../../frame/tools/interfaces';
import { DMComponent } from '../../frame/index';
import { cart } from '../service/cart';
import { Product } from '../../app/service/product';
import { getProduct } from '../../app/service/product-list';


class CartProductListComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
    this.createProductList();
  }


  public createProductList(): void {
    const currenCart: CartData[] = cart.getCart();
    if (currenCart && currenCart.length > 0) {
      this.config.template = `
          <ol class="cart__product">`;
      for (let i = 0; i < currenCart.length; i++) {
        const id: number = currenCart[i].productID;
        const product: Product | undefined = getProduct(+id);
        if (product) {
          this.config.template += `
            <li class="cart__item" data-id=${id}>
              <img class="cart__image" src="${product.thumbnail}" alt="" decoding="async">
              <div class="cart__item__desciption">
                <h3 class="item__name">${product.title}</h3>
                <p class="item__rating">Rating: ${product.rating}</p>
                <p class="item__brand">Brand: ${product.brand}</p>
                <p class="item__category">Category: ${product.category} </p>              
                <p class="item__price">Price, $: ${product.price} </p>
                <p class="item__stock">Stock: ${product.stock} </p>   
                <p class="item__description">${product.description}</p>         
              </div>

              <div class="purchase__numbers">       
                <button class="button button__decrease">
                  <svg class="cart__icon">
                    <title>minus</title>
                    <use xlink:href="./icons.svg#remove"></use>
                  </svg>
                </button>
                <span class="purchase__quantity">${cart.getProductQuantity(id)}</span>
                <button class="button button__increase ${cart.checkPosibilityToAddToCart(id)}" type="button" aria-label="plus">
                  <svg class="cart__icon">
                    <title>plus</title>
                    <use xlink:href="./icons.svg#add"></use>
                  </svg>
                </button>
              </div>
              <div class="item__total-price">
              ${cart.totalProductPrice(id)}$
              </div>
            </li>
          `;
        }
      }
      this.config.template += `
        </ol>
      `;
    } else {
      this.config.template = `
      <div class="cart--empty">
        <h1>Your сart is empty</h1>
        <p class="bold">Looks like the programmer is still without a gift </p>
        <a class="button link-as-button" href="/">Continue Shopping</a>
      </div>
      `;
    }
    this.template = this.config.template;
  }
}

const cartProductListComponent = new CartProductListComponent({
  selector: 'app-cart-product-list',
  template: '',
  childComponents: [],
});

export { cartProductListComponent };
