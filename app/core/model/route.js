export const Route = (function () {

    const privateProps = new WeakMap();

    return class {

        constructor(config) {

            privateProps.set(this, {
                component: config.component,
                outlet: config.outlet,
                path: config.path,
                canActivate: config.canActivate ? config.canActivate : []
            });
        }

        get component() {
            return privateProps.get(this).component;
        };

        get outlet() {
            return privateProps.get(this).outlet ? privateProps.get(this).outlet : 'router-outlet';
        };

        get path() {
            return privateProps.get(this).path;
        };

        get canActivate() {
            return privateProps.get(this).canActivate;
        };
    }
})();