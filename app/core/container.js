export const Class = (function () {

    const privateProps = new WeakMap();

    return class {

        constructor(definition, dependencies, singleton = false, funcFactory = false) {
            privateProps.set(this, {
                definition: definition,
                dependencies: dependencies,
                singleton: singleton,
                funcFactory: funcFactory
            })
        }

        get definition() {
            return privateProps.get(this).definition;
        }

        get dependencies() {
            return privateProps.get(this).dependencies;
        }

        get singleton() {
            return privateProps.get(this).singleton;
        }

        get funcFactory() {
            return privateProps.get(this).singleton;
        }
    }

})();

export const Container = (function () {

    const privateProps = new WeakMap();

    function getResolvedDependencies(service) {
        let classDependencies = [];
        if (service.dependencies) {
            classDependencies = service.dependencies.map((dep) => {
                return getInstance.call(this, dep)
            })
        }
        return classDependencies
    }

    function createInstance(service) {
        return service.definition(...getResolvedDependencies.call(this, service))
    }

    const isClass = definition => {
        return typeof definition === 'function'
    };

    function tryGetService(key, callback) {

        const service = privateProps.get(this).services.get(key);

        if (service) {
            callback(service);
            return true;
        }

        callback(new Class(key, key));
        return false;
    }

    function getInstance(key) {

        let c;

        if (tryGetService.call(this, key, service => c = service) && isClass(c.definition)) {

            if (c.singleton) {
                const singletonInstance = privateProps.get(this).singletons.get(key);
                if (singletonInstance) {
                    return singletonInstance
                } else {
                    const newSingletonInstance = createInstance.call(this, c);
                    privateProps.get(this).singletons.set(key, newSingletonInstance);
                    return newSingletonInstance
                }
            }

            return createInstance.call(this, c)

        } else {
            return c.definition
        }
    }

    return class {

        constructor() {
            privateProps.set(this, {
                services: new Map(),
                singletons: new Map()
            });
        }

        register(definition, dependencies) {
            privateProps.get(this).services.set(definition, new Class(definition, dependencies));
        }

        singleton(definition, dependencies) {
            privateProps.get(this).services.set(definition, new Class((...args) => new definition(...args), dependencies, true));
        }

        element(definition, dependencies) {
            privateProps.get(this).services.set(definition, new Class(definition, dependencies, false, true));
        }

        factory(definition, factory) {
            privateProps.get(this).services.set(definition, new Class(() => factory, [], false, true));
        }

        get(key) {
            return getInstance.call(this, key);
        }
    };
})();
