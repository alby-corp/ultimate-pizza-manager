const BaseController = (function () {

    const privateProps = new WeakMap();

    class BaseController {
        constructor(view, outlet) {
            privateProps.set(this, {
                view: view,
                outlet: outlet
            });
        }

        initView() {
            privateProps.get(this).outlet(privateProps.get(this).view);
            return this;
        }

        populate(){
            throw new Error('Abstract method!');
        }

        async responseHandler(func) {
            try {
                return await func();
            } catch (error) {
                AlbyJs.AlertService.error(`${error.status}: ${error.statusText}`);
                throw error;
            }
        };

    }

    return BaseController

})();