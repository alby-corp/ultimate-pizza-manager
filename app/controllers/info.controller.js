import template from '../views/info.html';

import {List, AdminListItem} from '../model';
import {BaseController} from "./base.controller";

export const InfoController = (function () {

    const privateProps = new WeakMap();

    return class InfoController extends BaseController {

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
                administrators = await privateProps.get(this).service.getAdministrators();
            } catch (error) {
                privateProps.get(this).alertService.error(`Error: ${error.status} - ${error.statusText}`);
                return;
            }


            const adminList = $('#admin-list');
            new List(adminList, administrators.map(admin => new AdminListItem(admin))).populate();

            return this;
        }
    };

})();
