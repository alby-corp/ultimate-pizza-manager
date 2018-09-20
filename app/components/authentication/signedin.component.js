import {BaseComponent} from "../base.component";

export const SignedinComponent = (function () {

    const privateProps = new WeakMap();

    return class extends BaseComponent {

        constructor(services) {
            super(undefined);

            privateProps.set(this, {
                service: services[0],
                alertService: services[1]
            });
        }

        async execute() {
            privateProps.get(this).service.completeSignin();
        }
    };
})();
