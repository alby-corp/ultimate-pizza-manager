import {BaseController} from "../base.controller";

export const SignedInController = (function () {

    return class extends BaseController {

        constructor(alertService) {
            super(undefined, alertService);
        }

        async execute() {
            AlbyJs.Authentication.completeSignin();
        }
    };
})();
