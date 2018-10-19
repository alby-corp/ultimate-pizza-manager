import template from '../views/user.html';

import {List, AdminListItem} from '../model';
import {BaseComponent} from "./base.component";

export const UserComponent = (function () {

    const privateProps = new WeakMap();

    return class extends BaseComponent {

        constructor(service, alertService) {

            super(template);

            privateProps.set(this, {
                service: service,
                alertService: alertService
            });
        }

        static get template(){
            return template;
        }

        async execute() {
            let administrators;

            try {
                administrators = await super.invokeWithCatcher(privateProps.get(this).service.getAdministrators);
            } catch (error) {
                return;
            }

            const adminList = $('#admin-list');
            new List(adminList, administrators.map(admin => new AdminListItem(admin))).populate();

            return this;
        }
    };

})();
