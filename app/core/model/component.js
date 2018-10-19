export const Component = (function () {

    const privateProps = new WeakMap();

    return (container) => class {

        constructor(component) {

            privateProps.set(this, {
                instance: container.get(component),
                template: component.template
            });
        }

        get instance() {
            return privateProps.get(this).instance;
        };

        get template(){
            return privateProps.get(this).template;
        }
    }
})();