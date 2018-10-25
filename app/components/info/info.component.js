import template from './info.html';

import {List, AdminListItem} from '../../model/index';
import {BaseComponent} from "../base.component";

export const InfoComponent = (function () {

    const privateProps = new WeakMap();

    return class extends BaseComponent {

        constructor(service, alertService) {

            super(template, alertService);

            privateProps.set(this, {
                service: service,
                alertService: alertService
            });
        }

        get template() {
            return template;
        }

        async execute() {
            let administrators;

            try {
                administrators = await this.invokeWithCatcher(privateProps.get(this).service.getAdministrators);
            } catch (error) {
                return;
            }

            const adminList = $('#admin-list');
            new List(adminList, administrators.map(admin => new AdminListItem(admin))).populate();

            return this;
        }
    };

})();
