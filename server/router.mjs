export const Router = (function () {

    const privateProps = new WeakMap();

    return class {

        constructor(routes, readCtrl, writeCtrl) {

            routes.route('/users')
                .get((req, res) => {
                    readCtrl.getUsers()(res)
                });

            routes.route('/foods')
                .get((req, res) => readCtrl.getFoods()(res));

            routes.route('/supplements')
                .get((req, res) => readCtrl.getSupplements()(res));

            routes.route('/administrators')
                .get((req, res) => readCtrl.getAdministrators()(res));

            routes.route('/orders')
                .get((req, res) => readCtrl.getOrders()(res))
                .post((req, res) => writeCtrl.insertOrder(req.body)(res));

            privateProps.set(this, {
                routes: routes
            })
        }

        get configuration() {
            return privateProps.get(this).routes;
        }
    }

})();
