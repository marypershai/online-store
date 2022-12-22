import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';

export class AppFooter extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
  }
}

export const appFooter = new AppFooter({
  selector: 'app-footer',
  template: `
        <footer class="footer">
        <h2 class="visibility-hidden">Credentials</h2>

          <div class="page__container footer__content">            
            <div class="footer__copyright">
              <p class="footer__year">2023</p>
              <a class="link" href="https://github.com/marypershai/online-store">code source</a>
            </div>

            <div class="footer__general">
              <div class="footer__students">
                <a class="link" href="https://github.com/marypershai">Maryia Piarshai</a>
                <a class="link" href="https://github.com/bartoshevich">Dmitry Bartoshevich</a>
              </div>
              <a class="link" href="https://rs.school/js/" target="_blank" rel="noopener noreferrer">
                <img loading="lazy" decoding="async" src="./rs_school_js.svg" alt="RSSchool logo" width="200" height="70">
              </a>
            </div>

          </div>

        </footer>
    `,
  childComponents: [],
});
