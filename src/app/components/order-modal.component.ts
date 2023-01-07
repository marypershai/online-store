import { ComponentConfig } from '../../frame/tools/interfaces';
import { DMComponent } from '../../frame/index';
import { checkCardNumber, checkCvv, checkEmail, checkLength, checkPhone, checkRequired } from '../../app/service/validation-form';
import { appHeader } from '../../app/common/app.header';
import { productListComponent } from './product-list.component';
import { summaryComponent } from './summary.component';
import { cartInfoSumComponent } from './cart-info-sum';
import { cartInfoQuantityComponent } from './cart-info-quantity';
import { cartProductListComponent } from './cart-product-list';
import { cartPageComponent } from '../../app/pages/cart-page.component';


class OrderModalComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
    this.createOrderModal();
  }


  public createOrderModal(): void {
    this.config.template = `
      <div class="order-modal visibility-hidden b-popup">
        <div class="b-popup-content">
          <form id="form" class="form">
            <h2>Personal Info</h2>
            <div class="form-control">
                <label for="username">Name</label>
                <input type="text" id="username" name="username" placeholder="Enter username">
                <small>Username must be at least 3 characters</small>
            </div>
            <div class="form-control">
              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" placeholder="Enter phone number">
              <small>You phone number is invalid</small>
            </div>
            <div class="form-control">
              <label for="delivery">Delivery Address</label>
              <input type="text" id="delivery" name="delivery" placeholder="Enter delivery address">
              <small>You delivery address is invalid</small>
            </div>
            <div class="form-control">
                <label for="email">Email</label>
                <input type="text" id="email" name="email" placeholder="Enter email address">
                <small>Field cannot be empty</small>
            </div>

            <div class="card-info">
              <div class="form-control">
                <label for="cardnumber">Card Number</label>
                <input type="number" id="cardnumber" name="cardnumber" placeholder="Enter card number">
                <small>You card number is invalid</small>
              </div>
              <div class="form-control">
                <label for="date">Expired date</label>
                <input type="text" id="delivery" name="delivery" placeholder="  /  ">
                <small>You expired date is invalid</small>
              </div>
              <div class="form-control">
                  <label for="cvv">CVV</label>
                  <input type="number" id="cvv" name="cvv" placeholder="cvv">
                  <small>Field cannot be empty</small>
              </div>
            </div>

            <button type="submit" class="button button--buy button--order">Submit</button>
          </form>
        </div>
      </div>
    `;
    this.template = this.config.template;
  }

  public events(): Record<string, string> {
    return {
      'submit .form': 'validateForm',
    };
  }

  private validateForm(element: HTMLFormElement): void {
    element.preventDefault();
    const username = document.querySelector('#username') as HTMLInputElement;
    const email = document.querySelector('#email') as HTMLInputElement;
    const delivery = document.querySelector('#delivery') as HTMLInputElement;
    const phone = document.querySelector('#phone') as HTMLInputElement;
    const cardnumber = document.querySelector('#cardnumber') as HTMLInputElement;
    const cvv = document.querySelector('#cvv') as HTMLInputElement;
    checkRequired([username, email, delivery, phone, cardnumber, cvv]);
    checkEmail(email);
    checkLength(username, 2, 3);
    checkLength(delivery, 3, 5);
    checkPhone(phone);
    const cardType: string = checkCardNumber(cardnumber);
    const addCardClass = cardnumber.closest('.form-control') as HTMLElement;
    if (cardType) {
      addCardClass.classList.add(cardType);
    }
    checkCvv(cvv);
    const errorClass = document.querySelector('.error') as HTMLInputElement;
    if (!errorClass) {
      localStorage.removeItem('cart');
      localStorage.removeItem('promocode');
      cartProductListComponent.createProductList();
      cartProductListComponent.render();
      cartPageComponent.render();
      productListComponent.createListOfProducts();
      summaryComponent.createSummary();
      summaryComponent.render();
      cartInfoSumComponent.createInfoSum();
      cartInfoQuantityComponent.createInfoQuantitySum();
      appHeader.render();
      cartProductListComponent.createProductList();
      cartProductListComponent.render();
      setTimeout(function () {
        window.location.hash = '#';
      }, 3000);
    }
  }
}

const orderModalComponent = new OrderModalComponent({
  selector: 'app-modal',
  template: '',
  childComponents: [],
});

export { orderModalComponent };
