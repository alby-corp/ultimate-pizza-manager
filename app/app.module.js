import {AlbyModule} from "./core/modules/alby.module";
import {Container} from "./core/container";
import {CustomElement} from "./core/model/custom-element";

import {AppRoutingModule} from './app-routing.module';
import './middelwares';
import {LoginElement, MenuElement} from "./elements";

export const AppModule = (function () {

    return class extends AlbyModule {

        constructor() {

            const container  = new Container();

            container.initServices();
            container.initComponents();
            container.initCustomElements();
            container.initGuards();

            const customElements = [new CustomElement('alby-menu', container.get(MenuElement)), new CustomElement('alby-login', container.get(LoginElement))];

            super(container, AppRoutingModule, customElements);
        }
    }
})();