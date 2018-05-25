export const ReadController = (function () {

    const privateProps = new WeakMap();

    const responseHandler = (self, func) => async (res) => {
        try {
            const data = await func.apply(privateProps.get(self).context);

            res.status(200);
            res.send(data ? data : []);

        } catch (error) {
            res.status(500);
            res.end();
        }
    };

    return class {
        constructor(context) {

            privateProps.set(this, {
                context: context
            });
        }

        getFoods() {
            return responseHandler(this, privateProps.get(this).context.getFoods)
        };

        getUsers() {
            return responseHandler(this, privateProps.get(this).context.getUsers);
        };

        getSupplements(res) {
            return responseHandler(this,  privateProps.get(this).context.getSupplements);
        };

        getOrders() {
            return responseHandler(this,  privateProps.get(this).context.getOrders)
        };

        getAdministrators(res) {
            return responseHandler(this,  privateProps.get(this).context.getAdministrators)
        };
    };

})();

