const BaseController = (function () {

    const privateProps = new WeakMap();

    class BaseController {
        constructor(view, outlet, alertService) {
            privateProps.set(this, {
                view: view,
                outlet: outlet,
                alertService: alertService
            });
        }

        initView() {
            privateProps.get(this).outlet(privateProps.get(this).view);
            return this;
        }

        execute(){
            throw new Error('Abstract method!');
        }

        responseHandler(func) {
            try {
                return func();
            } catch (error) {
                privateProps.get(this).alertService.error(`${error.status}: ${error.statusText}`);
                throw new Error(error.message);
            }
        };

    }

    return BaseController

})();