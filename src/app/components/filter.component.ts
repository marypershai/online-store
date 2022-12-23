import { DMComponent } from '../../frame/index';
import { ComponentConfig } from '../../frame/tools/interfaces';

class FilterComponent extends DMComponent {
  constructor(config: ComponentConfig) {
    super(config);
  }
}

export const filterComponent = new FilterComponent({
  selector: 'app-filter',
  template: `
        <section class="filter__content">
          <h2 class="">Filter</h2>
          <section>
            <details>
              <summary>
              <h3 class="">Category</h3>
              </summary>
                <ul> 
                  <li class="filter__item">
                    <label>
                      <input type="checkbox"/>
                      Mug
                      <span>(2)</span>
                    </label>
                  </li>
                  <li class="filter__item">
                    <label>
                      <input type="checkbox"/>
                      Laptop
                      <span>(4)</span>
                    </label>
                  </li>
                </ul>
            </details>
            
          </section>


          <section>            
            <details>
              <summary>
              <h3 class="">Brand</h3>
              </summary>
                <ul> 
                  <li class="filter__item">
                    <label>
                      <input type="checkbox"/>
                      System76
                      <span>(2)</span>
                    </label>
                  </li>
                  <li class="filter__item">
                    <label>
                      <input type="checkbox"/>
                      Apple
                      <span>(4)</span>
                    </label>
                  </li>
                </ul>
            </details>
          </section>
          <section>
            
            <details>
              <summary>
              <h3 class="">Price</h3>
              </summary>

            <div class="range_container">
              <div class="sliders_control">
                  <input id="fromSlider" type="range" value="10" min="0" max="100">
                  <input id="toSlider" type="range" value="40" min="0" max="100">
              </div>           
              <p class="range__info">Min-Max: <span>0</span>&mdash;&nbsp;<span>100</span> </p>
              
            </div>
            </details>
          </section>

          <section>           
            <details>
              <summary>
              <h3 class="">Stock</h3>
              </summary>

            <div class="range_container">
              <div class="sliders_control">
                  <input id="fromSlider" type="range" value="10" min="0" max="100">
                  <input id="toSlider" type="range" value="40" min="0" max="100">
              </div>           
              <p class="range__info">Min-Max: <span>0</span>&mdash;&nbsp;<span>100</span> </p>
              
            </div>
            </details>
          </section>

        </section>
    `,
  childComponents: [],
});
