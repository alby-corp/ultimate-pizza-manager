import {BaseComponent} from "../components/base.component";

export const SignedInComponent = (function () {

    const privateProps = new WeakMap();

    return class extends BaseComponent {

        constructor(authService, alertService) {
            super(undefined);

            privateProps.set(this, {
                service: authService,
                alertService: alertService
            });
        }

        async execute() {
        }

        static get template(){ return ''; }
    };
})();
