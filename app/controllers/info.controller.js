import template from '../views/info.html';

import {List, AdminListItem} from '../model';
import {BaseController} from "./base.controller";

export const InfoController = (function () {

    const privateProps = new WeakMap();

    return class extends BaseController {

        constructor(services) {

            super(template);

            privateProps.set(this, {
                service: services[0],
                alertService: services[1]
            });
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
