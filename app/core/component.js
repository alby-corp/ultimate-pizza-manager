export const Component = (function () {

    const privateProps = new WeakMap();

    return class {

        constructor(controller, services) {

            privateProps.set(this, {
                instance: new controller(services)
            });
        }

        get instance() {
            return privateProps.get(this).instance;
        };

    }

})();