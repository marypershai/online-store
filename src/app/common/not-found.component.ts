import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';

export class NotFound extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
  }
}

export const notFound = new NotFound({
  selector: 'app-not-found',
  template: `
     <div class="page__container error-page__block">
     <img class="error-page__image" src="https://res.cloudinary.com/bartoshevich/image/upload/f_auto,q_auto/v1672236374/rs-school/online/zen.webp" alt="zen tree" width="1200" height="1200">
       <div class="error-page__text">
         <h1>The time of this page has not come yet </h1>
         <p class="bold">Error 404</p>
        
          <a class="button error-page__button" href="/"> Try our Homepage </a>
          
       </div> 
     </div>        
    `,
  childComponents: [],
});
