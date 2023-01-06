import { ComponentConfig } from '../../frame/tools/interfaces';
import { DMComponent } from '../../frame/index';


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
              <label for="username">Username</label>
              <input type="text" id="username" name="username" placeholder="Enter username">
              <small>Username must be at least 3 characters</small>
          </div>
          <div class="form-control">
              <label for="email">Email</label>
              <input type="text" id="email" name="email" placeholder="Enter email address">
              <small>Field cannot be empty</small>
          </div>
          <div class="form-control">
              <label for="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Enter password">
              <small>Password must be 8 or more characters</small>
          </div>
          <div class="form-control">
              <label for="password-confirmation">Confirm Password</label>
              <input type="password" id="password-confirmation" name="password-confirmation" placeholder="Enter password again">
              <small>Passwords must match</small>
          </div>
          <button type="submit">Submit</button>
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

  private validateForm() {
    console.log('validateForm');
  }
}

const orderModalComponent = new OrderModalComponent({
  selector: 'app-modal',
  template: '',
  childComponents: [],
});

export { orderModalComponent };
