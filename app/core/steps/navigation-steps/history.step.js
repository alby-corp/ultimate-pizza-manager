import {BaseStep} from "../base.step";

export class HistoryStep extends BaseStep {

    constructor(router) {
        super(() => {

            if (router.nextUri !== undefined && router.nextUri !== window.location.pathname.replace(/^\//, "")) {
                history.pushState(null, null, router.nextUri || '/');
            }
        });
    }
}
