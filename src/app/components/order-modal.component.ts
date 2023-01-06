import { ComponentConfig } from '../../frame/tools/interfaces';
import { DMComponent } from '../../frame/index';
import { checkEmail, checkLength, checkPhone, checkRequired } from '../../app/service/validation-form';


class OrderModalComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
    this.createOrderModal();
  }


  public createOrderModal(): void {
    this.config.template = `
      <div class="order-modal visibility-hidden">
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
          <button type="submit" class="button button--buy button--order">Submit</button>
        </form>
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
    console.log('validateForm');
    element.preventDefault();
    const username = document.querySelector('#username') as HTMLInputElement;
    const email = document.querySelector('#email') as HTMLInputElement;
    const delivery = document.querySelector('#delivery') as HTMLInputElement;
    const phone = document.querySelector('#phone') as HTMLInputElement;
    checkRequired([username, email, delivery, phone]);
    checkEmail(email);
    checkLength(username, 2, 3);
    checkLength(delivery, 3, 5);
    checkPhone(phone);
  }
}

const orderModalComponent = new OrderModalComponent({
  selector: 'app-modal',
  template: '',
  childComponents: [],
});

export { orderModalComponent };
