import {Container} from "./core/container";

import {AppRoutingModule} from './app-routing.module';
import {CustomElement} from "./core/model/custom-element";
import {LoginElement, MenuElement} from "./elements";
import {AlbyModule} from "./core/model/alby-module";

import './middelwares';

export class AppModule extends AlbyModule {

    static get configuration() {

        const container = new Container();

        container.initServices();
        container.initComponents();
        container.initCustomElements();

        this.container = container;
        this.routes = AppRoutingModule.configuration;
        this.customElements = [new CustomElement('alby-menu', container.get(MenuElement)), new CustomElement('alby-login', container.get(LoginElement))];

        return this;
    }
}
