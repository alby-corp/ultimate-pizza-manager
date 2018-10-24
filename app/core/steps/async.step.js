export const AsyncStep = (function () {

    const privateProps = new WeakMap();

    return class {
        constructor(step) {

            privateProps.set(this, {
                step: step
            });
        }

        async execute(app) {
            await privateProps.get(this).step(app);
        }
    }
})();
