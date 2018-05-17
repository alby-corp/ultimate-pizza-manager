import {Helpers} from '../helpers/helpers';

export const ReadController = (function () {
    const privateProps = new WeakMap();

    return class ReadController {
        constructor(context) {

            privateProps.set(this, {
                context: context
            });
        }

        async getFoods(res) {
            await Helpers.makeResponse(res, privateProps.get(this).getFoods)
        };

        async getUsers(res) {
            await Helpers.makeResponse(res, privateProps.get(this).getUsers)
        };

        async getSupplements(res) {
            await Helpers.makeResponse(res, privateProps.get(this).getSupplements)
        };

        async getOrders(res) {
            await Helpers.makeResponse(res, privateProps.get(this).getOrders)
        };

        async getAdministrators(res) {
            await Helpers.makeResponse(res, privateProps.get(this).getAdministrators)
        };
    }

})();

