import {AlbyModule} from "../modules";

export const Pipe = (function () {

    const privateProps = new WeakMap();

    return class Pipe {

        constructor(app, steps) {

            if (!app instanceof AlbyModule || !Array.isArray(steps)) {
                throw new Error("app has to be instance of AlbyModule and steps have to be an array of BaseStep");
            }

            privateProps.set(this, {
                app: app,
                steps: steps
            });
        }

        runSync() {

            for (let step of privateProps.get(this).steps) {
                new step(privateProps.get(this).app).execute(privateProps.get(this).app);
            }
        }

        async runAsync() {

            for (let step of privateProps.get(this).steps) {
                await new step(privateProps.get(this).app).execute(privateProps.get(this).app);
            }
        }
    }
})();
