export const BaseComponent = (function () {

    const privateProps = new WeakMap();

    return class {

        constructor(template, alertService) {

            privateProps.set(this, {
                alertService: alertService
            });
        }

        get template() {
            throw new Error('Abstract Property!')
        }

        async execute() {
            throw new Error('Abstract Method!')
        };

        get alertService() {
            return privateProps.get(this).alertService;
        }

        async invokeWithCatcher(func) {
            try {
                return await func();
            } catch (error) {

                if(error.status === 401)
                    return;


                privateProps.get(this).alertService.error(`Error: ${error.status} ${error.statusText}`);
                throw new Error();
            }
        }
    };

})();
