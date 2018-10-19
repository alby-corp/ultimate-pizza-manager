import template from './login-advisor.html';

import {BaseComponent} from "../base.component";

export class LoginAdvisorComponent extends BaseComponent {

    constructor(authService) {

        super(template);
        this._authService = authService;
    }

    static get template() {
        return template;
    }

    async execute() {
        if(await this._authService.user !== undefined){
            const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/';
            AlbyJs.Router.navigate(returnUrl);
        }
    }
}
