export const BaseController = (function () {

    const privateProps = new WeakMap();

    return class BaseController {

        constructor(template, alertService) {

            privateProps.set(this, {
                template: template,
                alertService: alertService
            });
        }

        get template() {
            return privateProps.get(this).template;
        }

        async execute() {
            throw new Error('Abstract Method!')
        };

        async invokeWithCatcher(func) {
            try {
                return await func();
            } catch (error) {
                privateProps.get(this).alertService.error(`Error: ${error.status} ${error.statusText}`);
                throw new Error();
            }
        }
    };

})();
