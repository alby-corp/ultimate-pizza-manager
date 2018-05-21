export const BaseController = (function () {

    const privateProps = new WeakMap();

    return class BaseController {

        constructor(template) {

            privateProps.set(this, {
                template: template
            });
        }

        get template() {
            return privateProps.get(this).template;
        }

        async execute() {
            throw new Error('Abstract Method!')
        };
    };

})();
