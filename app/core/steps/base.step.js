export const BaseStep = (function () {

    const privateProps = new WeakMap();

    return class {
        constructor(step) {

            privateProps.set(this, {
                step: step
            });
        }

        execute(app) {
            return privateProps.get(this).step(app);
        }
    }
})();
